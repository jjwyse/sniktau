#!/usr/bin/env sh

export PATH=/opt/node/v5.4.0/bin:$PATH

cd /home/sniktau/workspace/sniktau
npm install
npm run start:deploy:production
