'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isObject = function isObject(x) {
  return x !== null && x !== undefined && x.constructor && x.constructor.name === 'Object';
};

exports.default = isObject;