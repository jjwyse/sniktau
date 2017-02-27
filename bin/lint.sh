#!/usr/bin/env sh

FILE_TYPE=$1
find src -name '*.'$FILE_TYPE | xargs ./node_modules/.bin/eslint --max-warnings 0 --fix
