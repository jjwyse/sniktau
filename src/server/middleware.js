import express from 'express';
import path from 'path';
import api from './api';

/**
 * middleware.js
 * Loads the proper middleware for each environment
 * This is a modified version of react-boilerplate's middleware
 * https://github.com/mxstbr/react-boilerplate/blob/master/server/middlewares/frontendMiddleware.js
 */
const addDevMiddleware = (app, webpackConfig) => {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    silent: true,
    stats: 'errors-only',
    publicPath: 'http://localhost:7337/assets',
    index: path.join(compiler.outputPath, '../index.html'),
    serverSideRender: true, // not entirely true, but needed to add stats to the context
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we need configure express to use the in-memory index
  const fs = middleware.fileSystem;

  // Checks if the asset request is one of our in-memory assets
  // (bundles, css) and serves it up. If it's not in memory, we pass
  // everything down to the next handler
  app.get('/assets/*', (req, res, next) => {
    const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
    const assets = assetsByChunkName.app;

    let allAssets = [];
    if (Array.isArray(assets)) {
      assets.push(assetsByChunkName.vendor);
      allAssets = allAssets.concat(assets);
    } else {
      allAssets.push(assets);
      allAssets.push(assetsByChunkName.vendor);
    }

    const pathedAssets = allAssets.map(asset => {
      return '/assets/' + asset;
    });

    if (pathedAssets && pathedAssets.indexOf(req.url) !== -1) {
      fs.readFile(path.join(compiler.outputPath, '../', req.url), (error, file) => {
        if (error) {
          next(error);
        } else {
          res.send(file.toString());
          res.end();
        }
      });
    } else {
      next();
    }
  });

  app.use('/assets/css', express.static(path.resolve(__dirname, '../../dist/assets/css')));
  app.use('/assets/img', express.static(path.resolve(__dirname, '../../dist/assets/img')));
  app.use('/assets/swagger', express.static(path.resolve(__dirname, '../../dist/assets/swagger')));

  app.get('*', (req, res, next) => {
    fs.readFile(path.join(compiler.outputPath, '../index.html'), (error, file) => {
      if (error) {
        next(error);
      } else {
        res.set('content-type', 'text/html');
        res.send(file.toString());
        res.end();
      }
    });
  });
};

// Production middlewares
const addProdMiddleware = (app, options) => {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(__dirname, '../../dist');
  const helmet = require('helmet');

  // Set up security defaults
  // https://github.com/helmetjs/helmet
  app.use(helmet());

  app.use(publicPath, express.static(outputPath));

  // Serve up our compressed files when js is requested
  app.get('*.js', (req, res, next) => {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  });

  // send all requests to index.html so browserHistory in React Router works
  app.get('*', (req, res) => {
    res.sendFile('index.html', {root: outputPath});
  });
};

module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  // initialize api handlers
  api(app);

  if (isProd) {
    addProdMiddleware(app, options);
  } else {
    const webpackConfig = require('../../webpack.config.js')('dev');
    addDevMiddleware(app, webpackConfig);
  }

  return app;
};
