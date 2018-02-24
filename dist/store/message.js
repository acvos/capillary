'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = exports.get = exports.extend = exports.combine = exports.collapse = exports.extract = exports.construct = exports.isInstance = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('../path');

var _isObject = require('../utils/is-object');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function Message(layers) {
  this.layers = layers || [];
}

var normalize = function normalize(args) {
  return (0, _isObject2.default)(args) ? args : { $$$: args };
};
var denormalize = function denormalize(layer) {
  return layer.hasOwnProperty('$$$') ? layer.$$$ : layer;
};

var isInstance = exports.isInstance = function isInstance(data) {
  return data instanceof Message;
};

var construct = exports.construct = function construct(data) {
  for (var _len = arguments.length, scopes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    scopes[_key - 1] = arguments[_key];
  }

  return isInstance(data) ? data : new Message([normalize(data)].concat(scopes));
};

var extract = exports.extract = function extract(input) {
  return isInstance(input) ? denormalize(input.layers[0]) : input;
};

var collapse = exports.collapse = function collapse(input) {
  return isInstance(input) ? {
    data: extract(input),
    scope: input.layers.slice(1).reduce(function (acc, next) {
      return _extends({}, acc, next);
    }, {})
  } : { data: input, scope: {} };
};

var combine = exports.combine = function combine(input, output) {
  return construct.apply(undefined, [output.layers[0]].concat(_toConsumableArray(output.layers.slice(1).concat(input.layers))));
};

var extend = exports.extend = function extend(func) {
  return function (input) {
    return construct.apply(undefined, [func(construct(input))].concat(_toConsumableArray(construct(input).layers.slice(1))));
  };
};

var get = exports.get = function get(location, input) {
  var path = extract(location);
  if (path === '') {
    return input;
  }

  var i = void 0,
      value = void 0;
  for (i in input.layers) {
    value = (0, _path.read)(path, input.layers[i]);
    if (value !== undefined) break;
  }

  return construct.apply(undefined, [value].concat(_toConsumableArray(input.layers.slice(1))));
};

var set = exports.set = function set(location, value, input) {
  return construct.apply(undefined, [input.layers[0], (0, _path.write)(extract(location), extract(value), {})].concat(_toConsumableArray(input.layers.slice(1))));
};