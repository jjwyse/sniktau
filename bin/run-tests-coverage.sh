# Script to find all test files to run
TESTS=`find src -name "*.test*"`
NODE_PATH=./src babel-node ./node_modules/istanbul/lib/cli cover node_modules/mocha/bin/_mocha src/test/coverer.js $TESTS -- --require src/test/helper.js --require ignore-styles --recursive --timeout 10000
