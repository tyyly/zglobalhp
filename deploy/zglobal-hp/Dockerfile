FROM nginx:alpine

# njs module (server-side hCaptcha verification) + CA bundle (ngx.fetch TLS).
# nginx strips env vars from workers by default, so `env HCAPTCHA_SECRET;` is
# declared in the main context to expose the secret to njs (process.env).
RUN apk add --no-cache nginx-module-njs ca-certificates \
 && printf 'load_module modules/ngx_http_js_module.so;\nenv HCAPTCHA_SECRET;\n' > /tmp/nginx.head \
 && cat /etc/nginx/nginx.conf >> /tmp/nginx.head \
 && mv /tmp/nginx.head /etc/nginx/nginx.conf

# Static site
COPY site/ /usr/share/nginx/html/

# BFF relay config (envsubst-templated at container start by nginx entrypoint)
COPY default.conf.template /etc/nginx/templates/default.conf.template

# njs guard (reads HCAPTCHA_SECRET from the environment at runtime)
COPY reserve_guard.js /etc/nginx/njs/reserve_guard.js

# Hireservice public booking API base (override per environment).
# staging: https://api-renew.fly-japan.jp/api  | production: TBD (Phase 8)
ENV HIRESERVICE_API_BASE=https://api-renew.fly-japan.jp/api

# hCaptcha Secret Key (verifies the human-check token server-side).
# The default below is hCaptcha's official TEST secret — it ALWAYS passes and
# gives NO real protection. In production, override with the real Secret Key
# from the hCaptcha dashboard via the container env / .env (never commit it):
#   docker compose -> environment: [ "HCAPTCHA_SECRET=0x...." ]
ENV HCAPTCHA_SECRET=0x0000000000000000000000000000000000000000

# Only substitute our own var so nginx's $uri/$host etc. stay intact.
ENV NGINX_ENVSUBST_FILTER=HIRESERVICE_API_BASE
