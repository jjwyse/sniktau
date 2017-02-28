#!/usr/bin/env sh

export PATH=/opt/node/bin:$PATH
cd /home/sniktau/workspace/sniktau

## make sure dependencies are up-to-date
npm i

# fire 'er up'
npm run start:prod
