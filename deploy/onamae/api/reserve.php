<?php
/*
 * Z&GLOBAL reservation BFF (PHP) for the お名前.com static host (www.z-global.jp).
 *
 * PHP port of deploy/zglobal-hp/reserve_guard.js (the nginx njs BFF used on the
 * home Docker host). Same protection model + same upstream, so reservations land
 * in the SAME hire-service / admin-renew regardless of which front serves the site.
 *
 * Flow:  browser --POST /api/reserve {..., botcheck, hcaptchaToken}-->
 *   1. reject if the honeypot (botcheck) is set                          -> 400
 *   2. require an hCaptcha token; verify at api.hcaptcha.com/siteverify   -> 403
 *      using the secret loaded from a non-web-readable config file
 *   3. on success, strip the anti-spam fields and forward the JSON body to
 *      the Hireservice public booking API, relaying status/body unchanged.
 *
 * The status codes + JSON error shapes mirror the njs guard EXACTLY so the
 * existing front-end (dev/site/js/reserve.js) handles both fronts identically.
 */

// Hireservice public booking API base (staging today; production TBD).
// Keep in sync with deploy/zglobal-hp/Dockerfile HIRESERVICE_API_BASE.
const HIRESERVICE_API_BASE = 'https://api-renew.fly-japan.jp/api';

const MAX_BODY_BYTES = 16384; // mirror njs client_max_body_size 16k

header('Content-Type: application/json; charset=utf-8');

/** Emit a JSON response and stop. */
function out(int $status, array $obj): void {
    http_response_code($status);
    echo json_encode($obj, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** Load the hCaptcha secret from a non-web-readable file (never committed). */
function load_hcaptcha_secret(): string {
    // 1) environment (if the host ever exposes it)
    $env = getenv('HCAPTCHA_SECRET');
    if (is_string($env) && trim($env) !== '') {
        return trim($env);
    }
    // 2) <docroot>/api/.hcaptcha_secret.php  — the WORKING location on this
    //    お名前.com account: the FTP login root (public_html/) is NOT writable
    //    (FTP 553), so the secret lives in the writable /api/ dir as a dotfile
    //    that *returns* its value. PHP parses it -> emits NO output, so it is
    //    never served as text (verified: GET returns an empty body).
    // 3) ../../zglobal_hcaptcha_secret.php — preferred above-docroot location,
    //    kept as a fallback in case the login root becomes writable.
    foreach ([__DIR__ . '/.hcaptcha_secret.php',
              __DIR__ . '/../../zglobal_hcaptcha_secret.php'] as $path) {
        if (is_file($path)) {
            $val = include $path; // each file does: <?php return 'ES_...';
            if (is_string($val) && trim($val) !== '') {
                return trim($val);
            }
        }
    }
    return '';
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method === 'OPTIONS') { http_response_code(204); exit; } // same-origin: no CORS body
if ($method !== 'POST')    { out(405, ['errors' => ['method_not_allowed']]); }

$raw = file_get_contents('php://input');
if ($raw === false) { $raw = ''; }
if (strlen($raw) > MAX_BODY_BYTES) {
    out(413, ['errors' => ['payload_too_large']]);
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    out(400, ['errors' => ['invalid_json']]);
}

// 1) honeypot — a real user can never tick this hidden box
if (!empty($data['botcheck'])) {
    error_log('reserve.php: honeypot triggered, dropping request');
    out(400, ['errors' => ['spam_detected']]);
}

// 2) hCaptcha token required + verified server-side
$token = isset($data['hcaptchaToken']) ? trim((string)$data['hcaptchaToken']) : '';
if ($token === '') {
    out(403, ['errors' => ['captcha_required']]);
}

$secret = load_hcaptcha_secret();
if ($secret === '') {
    error_log('reserve.php: HCAPTCHA_SECRET is not configured');
    out(502, ['errors' => ['captcha_misconfigured']]);
}

$ok = false;
$verify = curl_init('https://api.hcaptcha.com/siteverify');
curl_setopt_array($verify, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => http_build_query(['secret' => $secret, 'response' => $token]),
    CURLOPT_HTTPHEADER     => ['Content-Type: application/x-www-form-urlencoded'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
]);
$vres = curl_exec($verify);
if ($vres === false) {
    error_log('reserve.php: hcaptcha verify error: ' . curl_error($verify));
    curl_close($verify);
    out(502, ['errors' => ['captcha_verify_unavailable']]);
}
curl_close($verify);
$vjson = json_decode($vres, true);
$ok = is_array($vjson) && !empty($vjson['success']);
if (!$ok) {
    error_log('reserve.php: hcaptcha rejected ' .
              json_encode(($vjson['error-codes'] ?? []), JSON_UNESCAPED_SLASHES));
    out(403, ['errors' => ['captcha_failed']]);
}

// 3) forward the booking (without the anti-spam fields) to hire-service
unset($data['hcaptchaToken'], $data['botcheck']);
$payload = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$up = curl_init(HIRESERVICE_API_BASE . '/v1/public-bookings');
curl_setopt_array($up, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json', 'Accept: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 20,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
]);
$body = curl_exec($up);
if ($body === false) {
    error_log('reserve.php: upstream error: ' . curl_error($up));
    curl_close($up);
    out(502, ['errors' => ['upstream_unavailable']]);
}
$code = (int) curl_getinfo($up, CURLINFO_HTTP_CODE);
$ct   = (string) curl_getinfo($up, CURLINFO_CONTENT_TYPE);
curl_close($up);

// relay the upstream status + body through unchanged (201 + reservationNo on success;
// 400/422/429 problem+json passed through for the front-end to map back to fields)
http_response_code($code ?: 502);
header('Content-Type: ' . ($ct !== '' ? $ct : 'application/json'));
echo $body;
