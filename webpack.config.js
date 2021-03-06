const { resolve } = require('path')
const path = require('path')
const webpack = require('webpack')
const MinaEntryPlugin = require('@tinajs/mina-entry-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinaRuntimePlugin = require('@tinajs/mina-runtime-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const loaders = {
  script: 'babel-loader',
  style: {
    loader: 'postcss-loader',
    options: {
      config: {
        path: resolve('./postcss.config.js'),
      },
    },
  },
}

module.exports = {
  context: resolve('src'),
  entry: './app.vue',
  output: {
    path: resolve('dist'),
    filename: '[name]',
    publicPath: '/',
    globalObject: 'wx',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@tinajs/mina-loader',
            options: {
              loaders,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        include: /node_modules/,
        use: '@tinajs/mina-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: loaders.script,
      },
      {
        test: /\.(css|wxss)$/,
        exclude: /node_modules/,
        use: loaders.style,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[hash:6].[ext]',
          },
        },
      },
      {
        test: /\.wxs$/,
        use: {
          loader: '@tinajs/wxs-loader',
          options: {
            name: 'wxs/[name].[hash:6].[ext]',
          },
        },
      },
      {
        test: /\.wxml$/,
        use: [{
          loader: 'relative-file-loader',
          options: {
            name: 'wxml/[name].[hash:6].[ext]',
          },
        }, {
          loader: '@tinajs/wxml-loader',
          options: {
            raw: true,
            enforceRelativePath: true,
            root: resolve('src'),
          },
        }],
      },
    ],
  },
  resolve: {
    symlinks: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false,
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{
    //     from: path.resolve(__dirname, './project.config.json'),
    //     // from: '../project.config.json',
    //     to: 'project.config.json'
    //   }]
    // }),
    new MinaEntryPlugin(),
    new MinaRuntimePlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common.js',
      minChunks: 2,
      minSize: 0,
    },
    runtimeChunk: {
      name: 'runtime.js',
    },
  },
  mode: isProduction ? 'production' : 'none',
}
