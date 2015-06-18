'use strict';

let _ = require('lodash');

let Factory = {
  create(application, options) {
    if (_.isPlainObject(application)) {
      options = application;
      application = undefined;
    }
    if (!options) options = {};
    let url = options.url;
    if (!url) throw new Error('url is missing');
    let pos = url.indexOf(':');
    if (pos === -1) throw new Error('invalid url');
    let protocol = url.substr(0, pos);
    switch (protocol) {
      case 'mysql':
      case 'websql':
      case 'sqlite':
        return require('kinda-local-repository').create(application, options);
      case 'http':
      case 'https':
        return require('kinda-remote-repository').create(application, options);
      default:
        throw new Error('unknown protocol');
    }
  }
};

module.exports = Factory;
