#!/usr/bin/env sh

export PATH=/opt/node/bin:$PATH

cd /home/sniktau/workspace/sniktau/client
npm install
npm run start:deploy
