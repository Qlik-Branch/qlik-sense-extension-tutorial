var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './src/js/index.js',
    p0: './src/js/100/100. Prereq Qliks Open Ecosystem.js',
    p1: './src/js/101/101. What Are Extensions.js',
    p2: './src/js/102/102. Hello World.js',
    p3: './src/js/103/103. Make it Data Driven.js',
    p4: './src/js/104/104. Make it Selectable.js',
    p5: './src/js/105/105. Make it Stylish.js',
    p6: './src/js/106/106. Make it Responsive.js',
    p7: './src/js/107/107. Make it Universal.js',
    p8: './src/js/108/108. Make it Scalable.js'
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: './images/[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/html/index.ejs',
      filename: 'index.html',
      title: 'Qlik Sense Tutorial',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      template: "src/html/100. Prereq Qliks Open Ecosystem/100. Prereq Qliks Open Ecosystem.ejs",
      filename: "100. Prereq Qliks Open Ecosystem.html",
      title: "Prereq: Qlik's Open Ecosystem",
      chunks: ['app', 'p0']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/101. What Are Extensions/101. What Are Extensions.ejs',
      filename: '101. What Are Extensions.html',
      title: 'What Are Extensions',
      chunks: ['app', 'p1']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/102. Hello World/102. Hello World.ejs',
      filename: '102. Hello World.html',
      title: 'Hello World',
      chunks: ['app', 'p2']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/103. Make it Data Driven/103. Make it Data Driven.ejs',
      filename: '103. Make it Data Driven.html',
      title: 'Make it Data Driven',
      chunks: ['app', 'p3']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/104. Make it Selectable/104. Make it Selectable.ejs',
      filename: '104. Make it Selectable.html',
      title: 'Make it Selectable',
      chunks: ['app', 'p4']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/105. Make it Stylish/105. Make it Stylish.ejs',
      filename: '105. Make it Stylish.html',
      title: 'Make it Stylish',
      chunks: ['app', 'p5']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/106. Make it Responsive/106. Make it Responsive.ejs',
      filename: '106. Make it Responsive.html',
      title: 'Make it Responsive',
      chunks: ['app', 'p6']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/107. Make it Universal/107. Make it Universal.ejs',
      filename: '107. Make it Universal.html',
      title: 'Make it Universal',
      chunks: ['app', 'p7']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/108. Make it Scalable/108. Make it Scalable.ejs',
      filename: '108. Make it Scalable.html',
      title: 'Make it Scalable',
      chunks: ['app', 'p8']
    }),
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ],
  devtool: 'cheap-module-eval-source-map',
}