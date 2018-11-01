'use strict';
const babelRegister = require('babel-register');
const babelPolyfill = require('babel-polyfill');

module.exports = {
  networks: {
    local: {
      host: 'localhost',
      port: 9545,
      gas: 5000000,
      gasPrice: 5e9,
      network_id: '*'
    }
  }
};
