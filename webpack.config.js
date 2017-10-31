const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const extractSass = new ExtractTextPlugin({
    filename: "public/css/[name].css",
    disable: process.env.NODE_ENV === "development"
});

const videoJsProvider = new webpack.ProvidePlugin({
  'videojs': 'video.js',
  'window.videojs': 'video.js',
});

const bundleAnalyzer = new BundleAnalyzer;

const plugins = [
  extractSass,
  // bundleAnalyzer
];

const browserConfig = {
    devServer: { 
      historyApiFallback: true,
      disableHostCheck: true
    },
    entry: "./src/main.js",
    output: {
      path: __dirname,
      filename: "./public/bundle.js"
    },
    devtool: "cheap-module-source-map",
    resolve: {
      modules: [
        "node_modules",
        __dirname + "/src"
      ],
      alias: {
        'videojs-contrib-hls': 'videojs-contrib-hls/dist/videojs-contrib-hls',
      }
    },
    module: {
      rules: [
        {
          test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: "file-loader",
          options: {
            name: "public/media/[name].[ext]",
            publicPath: url => url.replace(/public/, "")
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
