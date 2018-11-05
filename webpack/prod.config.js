/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  externals: {
    '@afconsult/apollo': '@afconsult/apollo',
    classnames: 'classnames',
    'prop-types': 'prop-types',
    react: 'react',
    'react-dom': 'react-dom',
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
    filename: 'js/apollo-comments.min.js',
    libraryTarget: 'umd',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: 'css/apollo-comments.css',
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
});
