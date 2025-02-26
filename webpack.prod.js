const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const glob = require('glob');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
  mode: 'production', // Enables optimizations for production build
  devtool: 'source-map', // Generates source maps for debugging

  output: {
    filename: '[name].[contenthash:8].js', // Cache busting for JavaScript files
    chunkFilename: '[id].[contenthash:8].js', // Cache busting for dynamically imported files
    path: path.resolve(__dirname, 'dist'), // Output directory
    assetModuleFilename: 'assets/[name][contenthash:8][ext]', // Asset file naming pattern
    publicPath: '/', // Base path for all assets
  },

  cache: {
    type: 'filesystem', // Enables persistent caching for faster rebuilds
  },

  performance: {
    hints: 'warning', // Warns if assets exceed size limits
    maxEntrypointSize: 400000,
    maxAssetSize: 350000,
  },

  optimization: {
    usedExports: true, // Tree shaking to remove unused code
    sideEffects: true, // Optimization for side-effect imports
    minimize: true, // Enables minification
    splitChunks: {
      chunks: 'all', // Enables code splitting
      minSize: 20000,
      maxSize: 244000,
      minChunks: 1,
      automaticNameDelimiter: '-',
      cacheGroups: {
        styles: {
          test: /\.css$/, // Separates CSS into its own chunk
          name: 'styles',
          chunks: 'all',
          enforce: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/, // Splits vendor dependencies into a separate chunk
          name: 'vendors',
          chunks: 'all',
          enforce: true,
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(), // Minifies CSS
      new TerserPlugin({
        parallel: true, // Enables parallel processing for faster builds
        terserOptions: {
          compress: {
            drop_console: true, // Removes console logs in production
          },
        },
      }),
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css', // Cache busting for CSS files
      chunkFilename: '[id].[contenthash:8].css',
    }),
    new CleanWebpackPlugin(), // Cleans the dist folder before each build
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'), // Defines the production environment
    }),
    new CompressionPlugin({
      algorithm: 'gzip', // Gzip compression for assets
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/*`, {
        nodir: true,
      }), // Removes unused CSS
      safelist: {
        standard: [/^btn-/, /^nav-/], // Prevents removal of certain classes
      },
    }),
    ...(process.env.ANALYZE === 'true'
      ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static', // Generates a static report
            openAnalyzer: false,
          }),
        ]
      : []),
  ],

  module: {
    rules: [
      {
        test: /\.scss$/i, // Handles SCSS files
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
});
