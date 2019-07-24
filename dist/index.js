"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Match = Match;

var _shiftParser = require("shift-parser");

var _utils = require("./utils");

var _deepDiff = require("deep-diff");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function parse(fn) {
  // in case of anonymous functions
  var code = "var a = ".concat(fn.toString(), ";");
  var tree = (0, _shiftParser.parseScript)(code).statements[0].declaration.declarators[0].init;
  return tree;
}

function Match(base, target) {
  var debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!(0, _utils.isUserDefinedFunction)(base) || !(0, _utils.isUserDefinedFunction)(target)) {
    return false;
  }

  {
    var lenBase = base.toString().length;
    var lenTarget = target.toString().length;
    var threshold = 30;

    if (Math.abs(lenBase - lenTarget) > threshold) {
      return false;
    }
  }
  var treeBase = parse(base),
      treeTarget = parse(target);
  var diff = (0, _deepDiff.DeepDiff)(treeBase, treeTarget, {
    normalize: function normalize(path, key, lhs, rhs) {
      if (key == "name" || key == "property" || key == "pattern") {
        return [1, 1];
      } else if (key == "value") {
        var typ = _lodash["default"].get(treeBase, path).type; // `BooleanLiteral`, `NumericLiteral`, `StringLiteral`...


        if (typ.startsWith("Literal")) {
          return [1, 1];
        } else {
          return [lhs, rhs];
        }
      }
    }
  });

  if (debug) {
    console.log(treeBase, treeTarget, diff);
  }

  return diff === undefined;
}