#!/usr/bin/bash
DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi
. "$DIR/parseParameters.sh"

# Set all environ variables, then run nodemon
echo NODE_ENV=development >"$DIR/../.env"
echo SERVER_DIR=$PWD >>"$DIR/../.env"

# DOMAINS
echo DOMAIN="${arguments[DOMAIN]}" >>"$DIR/../.env"
echo SUBDOMAIN="${arguments[SUBDOMAIN]}" >>"$DIR/../.env"
echo DOMAINEXTENSION="${arguments[DOMAINEXTENSION]}" >>"$DIR/../.env"

# PORTS
echo SECURE_PORT="${arguments[SECUREPORT]}" >>"$DIR/../.env"
echo DEV_PORT="${arguments[DEVELOPMENTPORT]}" >>"$DIR/../.env"
echo INSECURE_PORT="${arguments[INSECUREPORT]}" >>"$DIR/../.env"
# TODO : add config for production to not use maps

# PROTOCOL
echo BACKEND_PROTOCOL="${arguments[BACKENDPROTOCOL]}" >>"$DIR/../.env"

# DIRECTORIES
mkdir -p dist/src
if [[ ! -f "dist/src/app.js" ]]; then
  echo "console.log('initializing');" >dist/src/app.js
fi

# Start all children
# "$DIR/startChildren.sh"

tsc -w
