/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
  externals: {
    '@afconsult/apollo': '@afconsult/apollo',
    classnames: 'classnames',
    moment: 'moment',
    'normalize.css': 'normalize.css',
    'prop-types': 'prop-types',
    quill: 'quill',
    'quill-mention': 'quill-mention',
    react: 'react',
    'react-dom': 'react-dom',
    'react-quill': 'react-quill',
    shortid: 'shortid',
  },
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
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
    filename: 'apollo-comments.min.js',
    libraryTarget: 'umd',
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
    }),
    new UglifyJSPlugin({
      extractComments: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'apollo-comments.min.css',
    }),
  ],
});
