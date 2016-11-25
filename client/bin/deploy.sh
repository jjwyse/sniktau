#!/usr/bin/env sh

BASE_DIR=$1
APP_SERVER=$SNIKTAU_APP_SERVER

# stop all running sniktau processes
ssh sniktau@$APP_SERVER 'bash -s' < bin/stop-all.sh

# scp all necessary artifacts
scp -r $BASE_DIR/client/src sniktau@$APP_SERVER:/home/sniktau/workspace/sniktau/client
scp -r $BASE_DIR/client/dist sniktau@$APP_SERVER:/home/sniktau/workspace/sniktau/client
scp $BASE_DIR/client/.babelrc sniktau@$APP_SERVER:/home/sniktau/workspace/sniktau/client/.babelrc
scp $BASE_DIR/client/webpack.config.js sniktau@$APP_SERVER:/home/sniktau/workspace/sniktau/client/webpack.config.js
scp $BASE_DIR/client/webpack.prod.config.js sniktau@$APP_SERVER:/home/sniktau/workspace/sniktau/client/webpack.prod.config.js
scp $BASE_DIR/client/package.json sniktau@$APP_SERVER:/home/sniktau/workspace/sniktau/client/package.json

# start sniktau on app server
ssh sniktau@$APP_SERVER 'bash -s' < client/bin/redeploy.sh
