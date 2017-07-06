var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/web/js/index.js',
    p0: './src/web/js/100. Prereq Qliks Open Ecosystem.js',
    p1: './src/web/js/101. What Are Extensions.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: './images/[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/web/html/index.ejs',
      filename: 'index.html',
      title: 'Qlik Sense Tutorial',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      template: "src/web/html/100. Prereq Qliks Open Ecosystem/100. Prereq Qliks Open Ecosystem.ejs",
      filename: "100. Prereq Qliks Open Ecosystem.html",
      title: "Prereq: Qlik's Open Ecosystem",
      chunks: ['app', 'p0']
    }),
    new HtmlWebpackPlugin({
      template: 'src/web/html/101. What Are Extensions/101. What Are Extensions.ejs',
      filename: '101. What Are Extensions.html',
      title: 'What Are Extensions',
      chunks: ['app', 'p1']
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor'
    // })
  ],
  devtool: 'cheap-module-eval-source-map',
}