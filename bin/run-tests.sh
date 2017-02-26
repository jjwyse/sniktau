# Script to find all test files to run
TESTS=`find src -name "*.test*"`
NODE_PATH=./src mocha $TESTS --compilers js:babel-core/register --require src/test/helper.js --require ignore-styles --recursive
