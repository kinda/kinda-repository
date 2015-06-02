'use strict';

let Factory = {
  create(options = {}) {
    let url = options.url;
    if (!url) throw new Error('url is missing');
    let pos = url.indexOf(':');
    if (pos === -1) throw new Error('invalid url');
    let protocol = url.substr(0, pos);
    switch (protocol) {
      case 'mysql':
      case 'websql':
      case 'sqlite':
        return require('kinda-local-repository').create(options);
      case 'http':
      case 'https':
        return require('kinda-remote-repository').create(options);
      default:
        throw new Error('unknown protocol');
    }
  }
};

module.exports = Factory;
