const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const common = require('./webpack.common.js');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/auth/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap'
      },
      shared: packageJson.dependencies
    })
  ]
});