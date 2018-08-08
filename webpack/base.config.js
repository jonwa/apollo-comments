module.exports = {
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {}
          }
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
