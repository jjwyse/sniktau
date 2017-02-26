const express = require('express');
const path = require('path');
const setupMiddleware = require('./middleware');
const logger = require('./logger');
const app = express();

setupMiddleware(app, {
  outputPath: path.resolve(__dirname, '../../dist'),
  publicPath: '/',
});

const PORT = process.env.PORT || 7337;
const HOST = process.env.HOST || null;
const prettyHost = HOST || 'localhost';

/* eslint consistent-return:0 */
app.listen(PORT, HOST, error => {
  if (error) {
    return logger.error(error.message);
  }

  logger.appStarted(PORT, prettyHost);
});
