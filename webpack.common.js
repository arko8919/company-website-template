const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // Entry point - The main file where Webpack starts bundling
  entry: './src/index.js',

  // Output configuration - Defines where bundled files will be stored
  output: {
    filename: '[name].[contenthash:8].js', // Uses content hashing for cache busting
    path: path.resolve(__dirname, 'dist'), // Output directory
    assetModuleFilename: 'assets/[name][contenthash:8][ext]', // Structure for asset files
    clean: true, // Cleans the output directory before each build
  },

  // Resolve options - Helps Webpack understand file extensions
  resolve: {
    extensions: ['.js'], // Allows imports without specifying file extensions
  },

  module: {
    rules: [
      {
        test: /\.html$/i, // Allows importing HTML files as modules
        use: ['html-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i, // Handles image files
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][contenthash:8][ext]', // Defines file storage path
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Handles font files
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][contenthash:8][ext]', // Defines file storage path
        },
      },
      {
        test: /\.js$/, // Handles JavaScript files
        exclude: /node_modules/, // Excludes node_modules to speed up builds
        use: {
          loader: 'babel-loader', // Transpiles modern JavaScript
          options: {
            presets: ['@babel/preset-env'], // Converts ES6+ to compatible versions
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html', // Uses a template for HTML generation
      minify: {
        removeComments: true, // Removes comments
        collapseWhitespace: true, // Minifies HTML by collapsing spaces
        removeAttributeQuotes: true, // Removes unnecessary quotes
      },
    }),
    new ESLintPlugin({
      extensions: ['js'], // Lints JavaScript files
      fix: true, // Automatically fixes linting issues
    }),
  ],
};
