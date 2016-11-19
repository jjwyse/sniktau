#!/usr/bin/env sh

lsof -i :8090 | grep LISTEN | awk '{print $2}' | xargs kill -9
