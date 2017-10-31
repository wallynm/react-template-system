const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "public/css/[name].css",
    disable: process.env.NODE_ENV === "development"
});

const defineNodeEnv = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify("production")
    // 'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
});

const videoJsProvider = new webpack.ProvidePlugin({
  videojs: 'video.js',
  'window.videojs': 'video.js',
});

const globalFix = new webpack.DefinePlugin({
  'typeof global': JSON.stringify('undefined'),
});


const uglify = new UglifyJSPlugin({
  uglifyOptions: {
    parallel: true,
    mangle: {
      safari10: true,
      reserved: ['videojs', 'windows.videojs']
    },
    compress: {
      unused: true,
      dead_code: true, // big one--strip code that will never execute
      warnings: false, // good for prod apps so users can't peek behind curtain
      // drop_debugger: true,
      conditionals: true,
      evaluate: true,
      // drop_console: true, // strips console statements
      sequences: true,
      booleans: true,
      inline: true,
      join_vars: true,
      passes: 3
    },
    output: {
      comments: false,
      beautify: false,
      preserve_line: false
    }
  },
  extractComments: true,  
  sourceMap: true  
});

const gzip = new CompressionPlugin({
  asset: "[path].gz[query]",
  algorithm: "gzip",
  test: /\.js$|\.css$|\.html$/,
  threshold: 10240,
  minRatio: 0.8
});

const plugins = [
  defineNodeEnv,
  extractSass,
  videoJsProvider,
  // globalFix,
  uglify,
  gzip
];

module.exports = {
  devServer: { 
      historyApiFallback: true,
      disableHostCheck: true
  },
  entry: "./src/main.js",
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  resolve: {
    alias: {
      'video.js$': 'video.js/dist/video.cjs.js',
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
        exclude: /node_modules/,
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
