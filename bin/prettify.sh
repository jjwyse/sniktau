#!/usr/bin/env sh

ARGS='--write --print-width=120 --tab-width=2 --single-quote=true --trailing-comma=true --bracket-spacing=false'

COMPONENT_FILES=`find src/components -name "*.js*"`
./node_modules/.bin/prettier $ARGS $COMPONENT_FILES

PAGES_FILES=`find src/pages -name "*.js*"`
./node_modules/.bin/prettier $ARGS $PAGES_FILES

STATE_FILES=`find src/state -name "*.js*"`
./node_modules/.bin/prettier $ARGS $STATE_FILES

UTIL_FILES=`find src/util -name "*.js*"`
./node_modules/.bin/prettier $ARGS $UTIL_FILES
