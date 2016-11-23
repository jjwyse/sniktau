#!/usr/bin/env sh

BASE_DIR=$1
APP_SERVER=$SNIKTAU_APP_SERVER

# stop all running sniktau processes
ssh sniktau@$APP_SERVER 'bash -s' < bin/stop-all.sh

scp -r $BASE_DIR/* sniktau@$APP_SERVER:/home/sniktau/workspace/sniktau
ssh sniktau@$APP_SERVER 'bash -s' < bin/copy.sh

# start sniktau on app server
ssh sniktau@$APP_SERVER 'bash -s' < bin/redeploy.sh
