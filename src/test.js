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

assert.strictEqual(Match(test_a, test_b), true);
assert.strictEqual(Match(test_a, test_c), false);
assert.strictEqual(Match(test_a, test_d), true);
