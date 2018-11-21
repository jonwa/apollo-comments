/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  devServer: {
    contentBase: './playground',
  },
  devtool: 'inline-source-map',
  entry: ['react-hot-loader/patch', './playground/index.jsx'],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              // Insert styles where portal.css is (which is at the top)
              insertAt: 'top'
            },
          },
          'css-loader?modules=true&localIdentName=[local]',
          'postcss-loader',
        ]
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './playground/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
});
