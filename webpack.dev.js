const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development', // Enables fast builds and better debugging
  devtool: 'inline-source-map', // Provides detailed source maps for debugging

  output: {
    filename: '[name].js', // Keeps file names readable in development mode
    assetModuleFilename: 'assets/[name][contenthash:8][ext]', // Ensures unique asset file naming
    publicPath: '/', // Sets base path for assets
  },

  devServer: {
    static: path.resolve(__dirname, 'dist'), // Serves static files from 'dist' directory
    compress: true, // Enables gzip compression for faster performance
    port: 3000, // Sets the port for the dev server
    hot: true, // Enables Hot Module Replacement (HMR) for real-time updates
    open: true, // Automatically opens the browser when the server starts
    historyApiFallback: true, // Supports single-page applications with routing
    allowedHosts: 'all', // Allows all hosts to access the dev server
  },

  module: {
    rules: [
      {
        test: /\.scss$/i, // Handles SCSS file imports
        use: [
          'style-loader', // Injects styles directly into the DOM
          'css-loader', // Resolves CSS imports
          'postcss-loader', // Applies PostCSS transformations
          'sass-loader', // Compiles SCSS to CSS
        ],
      },
    ],
  },
});
