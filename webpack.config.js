const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractStyles = new ExtractTextPlugin('css/[name].[hash].css');
const CompressionPlugin = require('compression-webpack-plugin');
const properties = {
  googleMapsKey: process.env.SNIKTAU_GOOGLE_MAPS_KEY,
  stravaClientId: process.env.SNIKTAU_STRAVA_CLIENT_ID,
  stravaClientSecret: process.env.SNIKTAU_STRAVA_CLIENT_SECRET,
  redirectUri: process.env.SNIKTAU_REDIRECT_URL,
};

// The assignment of the `output: { publicPath: $ }`
// Essentially this is where static assets are stored
// relative to index.html
// This is what we will set to a CDN in production
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/assets/';

const webpackConfig = env => {
  const addPlugin = (add, plugin) => add ? plugin : undefined;
  const ifProd = plugin => addPlugin(env.prod, plugin);
  const ifDev = plugin => addPlugin(!env.prod, plugin);
  const removeEmpty = array => array.filter(i => !!i);

  return {
    // The base directory for resolving entry points
    // and loaders from configuration
    context: path.resolve(__dirname, 'src'),
    entry: {
      app: removeEmpty([
        // Setup modern hot-reloading
        ifDev('webpack-hot-middleware/client'),
        ifDev('react-hot-loader/patch'),
        // The primary entry point for where the SPA begins execution
        path.resolve(__dirname, 'src', 'index.jsx'),
      ]),
      vendor: [
        'immutability-helper',
        'ramda',
        'react',
        'react-ace',
        'react-addons-css-transition-group',
        'react-dom',
        'react-ga',
        'react-imageloader',
        'react-markdown',
        'react-redux',
        'react-router',
        'react-router-redux',
        'redux',
        'redux-auth-wrapper',
        'redux-thunk',
        'url',
      ],
    },
    output: {
      // Seperates out different bundle files
      // and appends a cache buster to them
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].chunk.js',
      // Tells webpack where to put the build
      path: path.resolve(__dirname, 'dist/assets'),
      publicPath: PUBLIC_PATH,
    },
    devtool: env.prod ? 'cheap-module-source-map' : 'eval',
    bail: true,
    module: {
      loaders: [
        {
          test: /(\.js|\.jsx)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
        },
        {
          test: /(\.scss|\.css)$/,
          include: path.style,
          loader: ExtractStyles.extract({
            loader: [
              'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
              'postcss-loader',
              'sass-loader',
            ],
            fallbackLoader: 'style-loader',
          }),
        },
        {
          test: /\.svg/,
          loader: 'svg-url-loader',
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
      ],
    },
    plugins: removeEmpty([
      // Remove bits from moment.js that we don't need
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // Pass in options into plugins that are ready for webpack2 yet
      new webpack.LoaderOptionsPlugin({
        options: {
          context: __dirname,
          sassLoader: {
            includePaths: [path.resolve(__dirname, 'src/stylesheets')],
            // includes this import in every .scss file
            // so variables are available where needed
            data: '@import "utils/_theme.scss";',
          },
        },
      }),
      // Adds support for hot reloading
      ifDev(new webpack.HotModuleReplacementPlugin()),
      // Pulls our .scss out of the bundle into its own file
      ExtractStyles,
      // I can't remember what this one does...
      // minifies stuff and tells it to be quiet I guess?
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        quiet: true,
      })),
      // replaces 'process.env.NODE_ENV' with 'production'
      ifProd(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      })),
      // Minifies our code
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // Yeah! Screw that guy!
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
      })),
      // Chunks out our vendor files
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        children: true,
        minChunks: 2,
        async: true,
      })),
      // Builds our index.html and injects the proper
      // hashed bundle files
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        filename: '../index.html',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      // Compresses our assets
      ifProd(new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      })),
    ]),
    resolve: {
      // Tells webpack which filetypes to load
      extensions: ['.js', '.jsx', '.css', '.scss'],
      // Makes packages available by an alias, so you don't
      // need to worry about relative paths, also tree-shaking
      // works better when used with src, so we overwrite some of
      // our node module imports to include the src files, and not
      // the specified min file in the module's package.json
      alias: {
        app$: path.resolve(__dirname, 'src/index.jsx'),
        components: path.resolve(__dirname, 'src/components/'),
        pages: path.resolve(__dirname, 'src/pages/'),
        properties: path.resolve(__dirname, 'properties.js'),
        state: path.resolve(__dirname, 'src/state/'),
        test: path.resolve(__dirname, 'src/test/'),
        util: path.resolve(__dirname, 'src/util/'),
        routes$: path.resolve(__dirname, 'src/routes.jsx'),
        root$: path.resolve(__dirname, 'src/root.jsx'),
        variables$: path.resolve(__dirname, 'src/variables.js'),
      },
    },
    // Tell webpack how to set up our node environment
    node: {
      fs: 'empty',
    },
    // Make web related variables available to our code, such as `window`
    target: 'web',
    // Pass in our properties
    externals: {
      properties: JSON.stringify(properties),
    },
  };
};

module.exports = webpackConfig;
