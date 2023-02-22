const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');
const paths = require('./paths');
const path = require('path');

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',
  output: {
    path: path.normalize(paths.build),
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js',
  },
  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    contentBase: path.normalize(paths.build),
    index: '/',
    open: true,
    compress: true,
    hot: true,
    port: 3000,
    host: 'test.rocketplantech.com',
    https: true,
    noInfo: true, //This turns off information regarding the bundle.  Set to false if you need to view the messages
  },

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              // modules: true,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
        include: /\.module\.css$/i,
      },
      {
        test: /\.(scss|css)$/i,
        use: [
          'style-loader',
          // 'css-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
        exclude: /\.module\.css$/i,
      },
    ],
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
});
