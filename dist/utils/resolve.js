'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = require('../store');

var resolve = function resolve(flow) {
  return Promise.resolve(typeof flow === 'function' ? flow((0, _store.message)()) : flow).then(_store.message.extract);
};

exports.default = resolve;