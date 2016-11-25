#!/usr/bin/env sh

export PATH=/opt/node/bin:$PATH

cd /home/sniktau/workspace/sniktau
npm install
npm run start:deploy
