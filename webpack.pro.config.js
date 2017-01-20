var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PRODUCTION = process.env.NODE_ENV === 'production'; // injecting your Node.js environment
var DEVELOPMENT = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    theme: './src/scripts/index.js',
    vendor: [
    	'font-awesome-loader',
      'bootstrap',
      'sidr/dist/jquery.sidr'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'js/[name].min.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?minimize!sass-loader',
          publicPath: '../'
        }),
        include: path.resolve(__dirname, "src/styles/")
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        query: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file-loader',
        query: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader',
        query: {
          name: 'images/[name].[ext]'
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({ filename: 'css/style.min.css', allChunks: true }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
      'window.Tether': 'tether',
    }),
    new HtmlWebpackPlugin({
      title: 'Homepage',
      filename: 'index.html',
      favicon: 'src/favicon.ico',
      template: 'src/home.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Booking',
      favicon: 'src/favicon.ico',
      filename: 'booking.html',
      template: 'src/booking.html'
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(PRODUCTION),
      DEVELOPMENT: JSON.stringify(DEVELOPMENT)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'] // Specify the common bundle's name.
    })
  ]
}
