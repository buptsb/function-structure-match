import { Match } from "./index";
const assert = require("assert");

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

let test_d = function(a, b) {
  if (a === b) {
    a = c(d);
  }
  return e;
};

assert.strictEqual(Match(test_a, test_b, true), true);
assert.strictEqual(Match(test_a, test_c, true), false);
assert.strictEqual(Match(test_a, test_d, true), true);

let literal_str_a = function() {
  return "1";
};
let literal_str_b = function() {
  return "2";
};
let literal_digit_a = function() {
  return 1;
};
let literal_digit_b = function() {
  return 2;
};
let literal_digit_c = function() {
  return a + 1;
};
let literal_digit_d = function() {
  return b + 2;
};
assert.strictEqual(Match(literal_str_a, literal_str_b, true), true);
assert.strictEqual(Match(literal_digit_a, literal_digit_b, true), true);
assert.strictEqual(Match(literal_digit_c, literal_digit_d, true), true);

let this_a = function() {
  this._$rD();
};

let this_b = function() {
  this._$bD();
};

let this_c = {
  fn: function() {
    this.a();
  }
};
assert.strictEqual(Match(this_a, this_b, true), true);
assert.strictEqual(Match(this_a, this_c.fn, true), true);

{
  function with_regex_a(_$uX) {
    return _$ni.call(_$uX[_$tp()](), /{\s*return\s*([A-Za-z0-9$_]+);?\s*}/)[1];
  }
  let with_regex_b = function(arg) {
    return a.call(b[c()](), /abcdeffffffffffffffffffffff/)[0];
  };
  assert.strictEqual(Match(with_regex_a, with_regex_b, true), true);
}

{
  // named and unnamed function
  function _$rs(_$aW) {
    ++_$ww;
    _$xZ(3);
  }
  let sample = function(_$kE) {
    ++_$wo;
    _$xC(3);
  };
  assert.strictEqual(Match(_$rs, sample, true), true);
}
