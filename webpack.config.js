const webpack = require('webpack');
const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');

const config = {
  entry: ['./src/index.js'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new BabiliPlugin());
}

module.exports = config;
