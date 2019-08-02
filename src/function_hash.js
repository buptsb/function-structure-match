import { Parse } from "./parser";

import _ from "lodash";
import hash from "@emotion/hash";

const IGNORE_LIST = ["name", "pattern", "property", "value"];
const HASH_KEY = "_HASH_";

function iter(o) {
  return _.reduce(
    o,
    (result, val, key) => {
      // if (_.isPlainObject(val) || _.isArray(val)) {
      if (_.isObjectLike(val)) {
        let tmp = iter(val);
        if (_.size(tmp) > 0) {
          result[key] = tmp;
        }
        return result;
      } else if (_.includes(IGNORE_LIST, key)) {
        return result;
      } else {
        result[key] = val;
        return result;
      }
    },
    {}
  );
}

export function GetNormalizedTree(func) {
  let tree = Parse(func);
  return iter(tree);
}

export function FunctionStructureHash(func) {
  let hashVal = _.get(func, HASH_KEY);
  if (hashVal) {
    return hashVal;
  }
  let treeString = JSON.stringify(GetNormalizedTree(func));
  hashVal = hash(treeString);
  _.set(func, HASH_KEY, hashVal);
  return hashVal;
}
