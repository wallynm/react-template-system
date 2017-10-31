const path = require('path');
const fs = require('fs')

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const entryPoints = {};
const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())


// Loop entry points
dirs(`${__dirname}/src/templates`).map(entry => entryPoints[`templates/${entry}`] =  `${__dirname}/src/templates/${entry}/index.js`) 

// Sets default entry point
entryPoints.main  ='./src/main.js';

console.info(entryPoints)
const extractSass = new ExtractTextPlugin({
    filename: "css/[name].css",
    disable: process.env.NODE_ENV === "development"
});

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
  name: 'commons',
  filename: 'commons.js'
})

const plugins = [
  extractSass,
  extractCommons
];

const browserConfig = {
    devServer: { 
      historyApiFallback: true,
      disableHostCheck: true
    },
    entry: entryPoints,
    output: {
      path: `${__dirname}/.build/`,
      filename: "js/[name].js"
    },
    devtool: "cheap-module-source-map",
    resolve: {
      modules: [
        "node_modules",
        __dirname + "/src"
      ]
    },
    module: {
        rules: [
        {
          test: /\.bundle\.js$/,
          use: 'bundle-loader'
        },
        {
          test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: "file-loader",
          options: {
            name: "./.build/media/[name].[ext]",
            publicPath: url => url.replace(/.build/, "")
          }
        },
        {
          test: /\.s(a|c)ss$/,
            use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  modules: false,
                  url: true,
                  sourceMap: false,
                  minimize: true,
                  localIdentName: false
                    ? '[name]-[local]-[hash:base64:5]'
                    : '[hash:base64:5]'
                }
              },
              { loader: 'sass-loader' },
              { loader: 'postcss-loader' }
            ]
          }))
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: /(node_modules)/,        
        },
        {
          test: /js$/,
          exclude: /(node_modules)/,
          loader: "babel-loader"
        },
        {
          test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
          use: 'url-loader'
        },
      ]
    },
    plugins: plugins
  };

  module.exports = browserConfig;
