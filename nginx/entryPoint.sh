#!/bin/sh

echo EntryPoint

set -xe

: "${SMART_OAUTH2_CLIENT_SECRET?Need an SMART OAUTH2 secret}"

echo /usr/share/nginx/html/smart/*.js

ls /usr/share/nginx/html/smart

sed -i "s/CAT_COOKIE_DOMAIN/$CAT_COOKIE_DOMAIN/g" /usr/share/nginx/html/smart/main.js

sed -i "s/SMART_OAUTH2_CLIENT_SECRET/$SMART_OAUTH2_CLIENT_SECRET/g" /usr/share/nginx/html/smart/main.js

sed -i "s~FHIR_SERVER_URL~$FHIR_SERVER_URL~g" /usr/share/nginx/html/smart/main.js

sed -i "s~SMART_CARDIAC_URL~$SMART_CARDIAC_URL~g" /usr/share/nginx/html/smart/main.js

sed -i "s~SMART_GROWTH_CHART_URL~$SMART_GROWTH_CHART_URL~g" /usr/share/nginx/html/smart/main.js

sed -i "s/LOGIN_URL/$LOGIN_URL/g" /usr/share/nginx/html/smart/main.js

exec "$@"
