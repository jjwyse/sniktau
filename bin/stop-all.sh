#!/usr/bin/env sh

lsof -i :3002 | grep LISTEN | awk '{print $2}' | xargs kill -9
