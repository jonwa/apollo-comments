/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?minimize&modules=true&localIdentName=apollo-[local]',
          'postcss-loader',
        ],
      },
    ],
  },
  output: {
    filename: 'js/apollo-comments.js',
    libraryTarget: 'umd',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/apollo-comments.css',
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        output: {
          beautify: true,
        },
      },
    }),
  ],
});
