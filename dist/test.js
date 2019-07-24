"use strict";

var _index = require("./index");

var assert = require("assert");

function test_a(_$de, _$vl) {
  if (_$rZ === _$yV) {
    _$rZ = _$wL(_$tM);
  }

  return _$rZ;
}

function test_b(_$ae, _$bc) {
  if (_$rZ === _$kV) {
    _$r1 = _$sL(_$ae);
  }

  return _$r2;
}

function test_c(_$ae, _$bc, _$ad) {
  if (_$rZ === _$kV) {
    _$r1 = _$sL(_$ae);
  }

  return _$r2;
}

var test_d = function test_d(a, b) {
  if (a === b) {
    a = c(d);
  }

  return e;
};

assert.strictEqual((0, _index.Match)(test_a, test_b), true);
assert.strictEqual((0, _index.Match)(test_a, test_c), false);
assert.strictEqual((0, _index.Match)(test_a, test_d), true);

var literal_str_a = function literal_str_a() {
  return "1";
};

var literal_str_b = function literal_str_b() {
  return "2";
};

var literal_digit_a = function literal_digit_a() {
  return 1;
};

var literal_digit_b = function literal_digit_b() {
  return 2;
};

var literal_digit_c = function literal_digit_c() {
  return a + 1;
};

var literal_digit_d = function literal_digit_d() {
  return b + 2;
};

assert.strictEqual((0, _index.Match)(literal_str_a, literal_str_b), true);
assert.strictEqual((0, _index.Match)(literal_digit_a, literal_digit_b), true);
assert.strictEqual((0, _index.Match)(literal_digit_c, literal_digit_d), true);

var this_a = function this_a() {
  this._$rD();
};

var this_b = function this_b() {
  this._$bD();
};

var this_c = {
  fn: function fn() {
    this.a();
  }
};
assert.strictEqual((0, _index.Match)(this_a, this_b), true);
assert.strictEqual((0, _index.Match)(this_a, this_c.fn), true);
{
  var with_regex_b = function with_regex_b(_$rw) {
    return _$nV.call(_$rw[_$d1()](), /{s*returns*([A-Za-z0-9$_]+);?s*}/)[1];
  };

  var with_regex_a = function with_regex_a(_$uX) {
    return _$ni.call(_$uX[_$tp()](), /{\s*return\s*([A-Za-z0-9$_]+);?\s*}/)[1];
  };

  assert.strictEqual((0, _index.Match)(with_regex_a, with_regex_b), true);
}