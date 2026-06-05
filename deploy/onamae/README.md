# お名前.com (www.z-global.jp) reservation BFF — PHP

The public site `www.z-global.jp` is served as **static files from the お名前.com
rental server** (host `www325.onamae.ne.jp`, docroot `/z-global.jp/`). That host
has **no nginx njs**, so the reservation form's `POST /api/reserve` returned
**404** and bookings never reached hire-service / **admin-renew**.

This directory adds a tiny **PHP BFF** that runs *on the お名前.com host* and does
the same job as the home-Docker njs guard (`deploy/zglobal-hp/reserve_guard.js`):
honeypot → hCaptcha verify → forward to the Hireservice public booking API. So the
site stays on its reliable static host (no dependency on the home server) and
bookings flow to the same admin-renew.

```
browser (contact.html) → POST /api/reserve
  → [お名前 .htaccess rewrite] → /api/reserve.php
      1. honeypot (botcheck) → 400
      2. hCaptcha token verify (api.hcaptcha.com) → 403 on fail
      3. forward → https://api-renew.fly-japan.jp/api/v1/public-bookings
  → 201 + reservationNo → admin-renew
```

PHP confirmed on host: **PHP 8.2.30, curl + openssl on, allow_url_fopen=1**, and a
server-side `POST` to api-renew succeeds (returns the 400 validation body). The
chain works.

## Status (verified 2026-06-05)

Deployed + validated on production. Front-end is **unchanged** — `dev/site/js/reserve.js`
still posts to `/api/reserve` on every host (njs handles it on home Docker; this
`.htaccess` handles it here). Verified end-to-end with hCaptcha **test** creds:

- `/api/reserve` (rewrite) honeypot → **400** `spam_detected`
- `/api/reserve` no token → **403** `captcha_required`
- `/api/reserve` test-token + invalid body → **upstream 400** (verify+forward proven)
- existing pages (ja/en/zh/ko, css, js) all still **200**; `/api/` → **403** (no listing)

**Real hCaptcha Secret installed 2026-06-05** — endpoint is **live with real
verification**: a fake token now returns **403** `captcha_failed` (not 502), and a
direct `siteverify` confirmed the secret is accepted (`invalid-input-response`, not
`invalid-input-secret`). Final check left to a human: solve the real challenge on
`contact.html`, submit, confirm a reservation number + the row in **admin-renew**.

## Files

| local | upload to (FTP) | purpose |
|---|---|---|
| `api/reserve.php` | `/z-global.jp/api/reserve.php` | the BFF |
| `api/.htaccess`   | `/z-global.jp/api/.htaccess`  | route `/api/reserve` → `reserve.php` |
| `.hcaptcha_secret.php` (from `hcaptcha_secret.example.php`) | `/z-global.jp/api/.hcaptcha_secret.php` | real hCaptcha Secret, never web-served, never committed |

> **Secret location note:** the ideal spot is *above* the docroot, but this
> お名前.com account's FTP login root (`public_html/`) is **not writable** (FTP
> **553**). So the secret lives inside the writable `/api/` dir as the dotfile
> `.hcaptcha_secret.php`. Safety rests on PHP being active (it is — 8.2.30) + the
> `<?php return '...';` no-output pattern: a direct GET of the file returns an
> **empty** body (verified), never the secret text.

## Deploy

FTP creds are in the repo-root `.env` (gitignored): host `www325.onamae.ne.jp`,
user `flyhpadmin@z-global.jp`, FTPS explicit (port 21). Use git-bash + curl
(`--ssl-reqd`); PowerShell mangles the quoting.

```bash
set -a; . .env; set +a
# 1) BFF + routing (already deployed 2026-06-05)
curl --ssl-reqd --ftp-create-dirs --user "$FTP_USER:$FTP_PASS" -T deploy/onamae/api/reserve.php "ftp://$FTP_HOST/z-global.jp/api/reserve.php"
curl --ssl-reqd --user "$FTP_USER:$FTP_PASS" -T deploy/onamae/api/.htaccess   "ftp://$FTP_HOST/z-global.jp/api/.htaccess"
# 2) ACTIVATION — install the real hCaptcha Secret (the ONE remaining step):
printf "<?php return '%s';\n" 'ES_REAL_SECRET_HERE' > /tmp/.hcaptcha_secret.php
curl --ssl-reqd --user "$FTP_USER:$FTP_PASS" -T /tmp/.hcaptcha_secret.php "ftp://$FTP_HOST/z-global.jp/api/.hcaptcha_secret.php"
rm -f /tmp/.hcaptcha_secret.php
```

## Verify

```bash
# honeypot -> 400 spam_detected
curl -s -o /dev/null -w "%{http_code}\n" -X POST -H 'Content-Type: application/json' \
  --data '{"botcheck":"on"}' https://www.z-global.jp/api/reserve            # 400
# no token -> 403 captcha_required
curl -s -X POST -H 'Content-Type: application/json' --data '{}' \
  https://www.z-global.jp/api/reserve                                       # 403 captcha_required
# real solve in the browser -> 201 + reservation number, visible in admin-renew
```

If `POST /api/reserve` returns the WordPress 404 instead of the PHP (the docroot
`# BEGIN WordPress` catch-all `RewriteRule . /index.php [L]` shadowed the
per-directory rule), add this to the **docroot** `/z-global.jp/.htaccess`,
**above** the `# BEGIN WordPress` line (back it up first):

```apache
# BEGIN Z&GLOBAL reservation BFF
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule ^api/reserve/?$ api/reserve.php [L]
</IfModule>
# END Z&GLOBAL reservation BFF
```

Then `/api/reserve.php` still works directly as a fallback endpoint.

## Secret state — installed 2026-06-05 ✅

The contact pages use the **real** Site Key `44ced706-b740-4c78-806c-86426f4ab20a`;
the matching real **Secret Key** (`ES_…` form) is now installed at
`/z-global.jp/api/.hcaptcha_secret.php` and verified accepted by hCaptcha. The
secret value is **not** stored in this repo (gitignored) — keep it only on the
server file + your password manager. The same value should also be put in the home
Docker `~/docker/zglobal-hp/.env` (`HCAPTCHA_SECRET`) when that host is back up, so
the staging njs BFF matches.

To re-install or rotate the secret later, three ways:

1. **From the home server** when it is back up:
   `ssh -i ~/.ssh/id_ed25519 yuri@100.122.141.37 'grep HCAPTCHA_SECRET ~/docker/zglobal-hp/.env'`
   then run Deploy step 2 with that value.
2. **Paste** the saved secret into Deploy step 2.
3. **Regenerate** on the hCaptcha dashboard (Generate New Secret) and update BOTH
   here (step 2) and the home `~/docker/zglobal-hp/.env`.

After install, verify a real solve on `https://www.z-global.jp/contact.html` returns
a reservation number and the booking appears in **admin-renew**. hire-service upstream
is staging (`api-renew.fly-japan.jp`); switch `HIRESERVICE_API_BASE` in `reserve.php`
when production hire-service goes live.
