FROM nginx:alpine

# Static site
COPY site/ /usr/share/nginx/html/

# BFF relay config (envsubst-templated at container start by nginx entrypoint)
COPY default.conf.template /etc/nginx/templates/default.conf.template

# Hireservice public booking API base (override per environment).
# staging: https://api-renew.fly-japan.jp/api  | production: TBD (Phase 8)
ENV HIRESERVICE_API_BASE=https://api-renew.fly-japan.jp/api

# Only substitute our own var so nginx's $uri/$host etc. stay intact.
ENV NGINX_ENVSUBST_FILTER=HIRESERVICE_API_BASE
