'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _polyMap = require('poly-map');

var _polyMap2 = _interopRequireDefault(_polyMap);

var _store = require('./store');

var _state = require('./state');

var _transport = require('./transport');

var _isObject = require('./utils/is-object');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var constant = function constant(x) {
  return (0, _store.extend)(function () {
    return x;
  });
};

var collection = function collection(items) {
  return (0, _transport.sequential)([(0, _transport.parallel)((0, _polyMap2.default)(structure, items)), _state.collect]);
};

var structure = function structure(predicate) {
  if (typeof predicate === 'function') {
    return predicate;
  }

  if ((0, _isObject2.default)(predicate) || predicate instanceof Array) {
    return collection(predicate);
  }

  return constant(predicate);
};

exports.default = structure;