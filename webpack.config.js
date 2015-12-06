const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const sassLoaders = [
  'css-loader?sourceMap',
  'postcss-loader',
  'sass-loader?includePaths[]=' + path.resolve(__dirname, '/client/app')
  ];

module.exports = {
  entry: {
    app:
        [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        './client/app/src/index.js'
        ]
  },
  output: {
    path: path.join(__dirname + '/client/dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js'
  },
  resolve:  {
    extensions: ['', '.js', '.scss'],
    moduleDirectories: ['app', 'node_modules']
  },
  modules: {
    loaders: [
    {
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel?presets[]=es2015'
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
    }
    ]
  },
  devServer: {
    contentBase: './client/dist',
    hot: true
  },
  debug: true,
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.HotModuleReplacementPlugin()
  ],
  postcss: [
  autoprefixer({
      browsers: ['last 2 versions']
    })
  ]
}







