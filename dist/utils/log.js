'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = require('../store');

var log = function log(input) {
  if (input instanceof Promise) {
    return input.then(log);
  }

  console.log((0, _store.extract)(input));

  return input;
};

exports.default = log;