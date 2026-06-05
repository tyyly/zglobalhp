<?php
/*
 * TEMPLATE — copy to "zglobal_hcaptcha_secret.php" and upload it ABOVE the
 * www.z-global.jp docroot, i.e. to the FTP login root (public_html/), NOT into
 * z-global.jp/.  reserve.php loads it via __DIR__ . '/../../zglobal_hcaptcha_secret.php'.
 *
 * Why a PHP file that returns the value (not a .txt / .env): even if the file is
 * ever requested over HTTP, PHP executes it and a top-level `return` emits NO
 * output, so the secret can never leak in a response body.
 *
 * The value is the hCaptcha *Secret Key* (Account-level secret, "ES_..." form)
 * that matches the public Site Key on the contact pages
 * (data-sitekey="44ced706-b740-4c78-806c-86426f4ab20a").
 * It is NOT the Site Key. NEVER commit the real value to git.
 *
 * hCaptcha does not let you re-copy a secret from the dashboard. If the real
 * value is lost, generate a new one (hCaptcha dashboard -> Generate New Secret)
 * and update this file. The same secret also lives in the home Docker host at
 * ~/docker/zglobal-hp/.env (HCAPTCHA_SECRET).
 */

return 'ES_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
