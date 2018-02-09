const path = require('path');

const APP_DIR =  path.resolve(__dirname, 'app');
const BUILD_DIR = path.resolve(__dirname, 'public/js');

module.exports = {
  context: APP_DIR,
  entry: './index.js',

  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },

  watch: true,
  watchOptions: {
    poll: true
  },

  module: {
    rules: [
      // JS and JSX
      {
        test: /(\.jsx$|\.js$)/,
        use: [
          {loader: "eslint-loader"},
          { loader: 'babel-loader' }
        ],
        exclude: /node_modules/
      },

      // SCSS
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ],
        exclude: /node_modules/
      }
    ]
  },

  target: 'electron',

  plugins: []
};
