#!/usr/bin/env sh

BASE_DIR=$1
APP_SERVER=$SNIKTAU_APP_SERVER

# stop all running sniktau processes
ssh sniktau@$APP_SERVER 'bash -s' < bin/stop-all.sh

# scp all necessary artifacts
scp -r $BASE_DIR/dist sniktau@$APP_SERVER:/home/sniktau/workspace/sniktau
scp -r $BASE_DIR/src/assets sniktau@$APP_SERVER:/home/sniktau/workspace/sniktau/dist/assets
scp -r $BASE_DIR/package.json sniktau@$APP_SERVER:/home/sniktau/workspace/sniktau
scp -r $BASE_DIR/src/server sniktau@$APP_SERVER:/home/sniktau/workspace/sniktau/src
scp -r $BASE_DIR/.babelrc sniktau@$APP_SERVER:/home/sniktau/workspace/sniktau
scp -r $BASE_DIR/webpack.config.js sniktau@$APP_SERVER:/home/sniktau/workspace/sniktau

# start sniktau on app server
ssh sniktau@$APP_SERVER 'bash -s' < bin/redeploy.sh
