'use strict';

var config = require('kinda-config').get('kinda-repository');

var Factory = {
  create: function(name, url, collections, options) {
    if (!name) name = config.name;
    if (!name) throw new Error('name is missing');
    if (!url) url = config.url;
    if (!url) throw new Error('url is missing');
    if (!collections) collections = config.collections;
    if (!(collections instanceof Array)) throw new Error('collections parameter is invalid');
    if (!options) options = config.options;
    var pos = url.indexOf(':');
    if (pos === -1) throw new Error('invalid url');
    var protocol = url.substr(0, pos);
    switch (protocol) {
      case 'mysql':
      case 'websql':
      case 'sqlite':
        return require('kinda-local-repository').create(name, url, collections, options);
      case 'http':
      case 'https':
        return require('kinda-remote-repository').create(name, url, collections, options);
      default:
        throw new Error('unknown protocol');
    }
  }
};

module.exports = Factory;
