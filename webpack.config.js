const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // Use 'production' for deployment
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'), // Ensure output path is 'build'
    filename: 'bundle.js',
    publicPath: '/Ogero_project1.github.io/', // Set to the correct subdirectory
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 8080,
    open: true,
    historyApiFallback: true, // Fixes "Cannot GET /register"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
};