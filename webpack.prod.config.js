const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const APP_DIR =  path.resolve(__dirname, 'app');
const BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  context: APP_DIR,
  entry: './index.js',

  output: {
    path: BUILD_DIR,
    publicPath: './',
    filename: 'js/[name].[chunkhash].js'
  },

  module: {
    rules: [
      // JS and JSX
      {
        test: /(\.jsx$|\.js$)/,
        use: [
          { loader: 'babel-loader' },
          { loader: "eslint-loader" }
        ],
        exclude: /node_modules/
      },

      // SCSS
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }),
        exclude: /node_modules/
      },

      // Fonts
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            }
          }
        ]
      }
    ]
  },

  target: 'electron',

  plugins: [
    new ProgressBarPlugin(),
    new MinifyPlugin(),
    new UglifyJsPlugin(),
    new ExtractTextPlugin('css/style.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    })
  ]
};
