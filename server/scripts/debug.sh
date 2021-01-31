#!/usr/bin/bash
# Set all environ variables, then run nodemon
echo NODE_ENV=development > .env
echo SERVER_DIR=$PWD >> .env

# PORTS
echo SECURE_PORT=8080 >> .env
echo DEV_PORT=5050 >> .env
echo UPGRADE_PORT=8081  >> .env
echo BACKEND_HOSTNAME=localhost >> .env
echo BACKEND_PROTOCOL=http >> .env

tsc -w