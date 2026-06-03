/*
 * hCaptcha human-check guard for POST /api/reserve  (nginx njs module)
 *
 * Same protection model as www.fly-japan.jp (hCaptcha + honeypot), but the
 * verified request is forwarded to the EXISTING Hireservice booking API
 * instead of Web3Forms — so reservation numbers / hire-service integration
 * are preserved.
 *
 * Flow:
 *   browser --POST /api/reserve {..., botcheck, hcaptchaToken}-->
 *     guardReserve():
 *       1. reject if the honeypot (botcheck) is set
 *       2. require an hCaptcha token and verify it at api.hcaptcha.com/siteverify
 *          using the secret from env HCAPTCHA_SECRET
 *       3. on success, strip the anti-spam fields and forward the JSON body to
 *          the internal /__reserve_upstream location (-> hire-service), then
 *          relay the upstream status/body back to the browser unchanged.
 *
 * Secret: read at runtime from env HCAPTCHA_SECRET (declared via `env` in
 * nginx.conf, provided through the container environment — never committed).
 */

function json(r, status, obj) {
    r.headersOut['Content-Type'] = 'application/json';
    r.return(status, JSON.stringify(obj));
}

async function guardReserve(r) {
    if (r.method === 'OPTIONS') { r.return(204); return; }
    if (r.method !== 'POST')    { r.return(405); return; }

    let data;
    try {
        data = JSON.parse(r.requestText || '{}');
    } catch (e) {
        json(r, 400, { errors: ['invalid_json'] });
        return;
    }

    // 1) honeypot — a real user can never tick this hidden box
    if (data.botcheck) {
        r.log('reserve: honeypot triggered, dropping request');
        json(r, 400, { errors: ['spam_detected'] });
        return;
    }

    // 2) hCaptcha token required + verified server-side
    var token = data.hcaptchaToken || '';
    if (!token) {
        json(r, 403, { errors: ['captcha_required'] });
        return;
    }

    var secret = (process.env.HCAPTCHA_SECRET || '').trim();
    if (!secret) {
        r.error('reserve: HCAPTCHA_SECRET is not configured');
        json(r, 502, { errors: ['captcha_misconfigured'] });
        return;
    }

    var ok = false;
    try {
        var body = 'secret=' + encodeURIComponent(secret) +
                   '&response=' + encodeURIComponent(token);
        var resp = await ngx.fetch('https://api.hcaptcha.com/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        });
        var result = await resp.json();
        ok = !!(result && result.success);
        if (!ok) {
            r.log('reserve: hcaptcha rejected ' +
                  JSON.stringify((result && result['error-codes']) || []));
        }
    } catch (e) {
        r.error('reserve: hcaptcha verify error: ' + e.message);
        json(r, 502, { errors: ['captcha_verify_unavailable'] });
        return;
    }

    if (!ok) {
        json(r, 403, { errors: ['captcha_failed'] });
        return;
    }

    // 3) forward the booking (without the anti-spam fields) to hire-service
    delete data.hcaptchaToken;
    delete data.botcheck;

    var up;
    try {
        up = await r.subrequest('/__reserve_upstream', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    } catch (e) {
        r.error('reserve: upstream error: ' + e.message);
        json(r, 502, { errors: ['upstream_unavailable'] });
        return;
    }

    var ct = (up.headersOut && up.headersOut['Content-Type']) || 'application/json';
    r.headersOut['Content-Type'] = ct;
    r.return(up.status, up.responseText);
}

export default { guardReserve };
