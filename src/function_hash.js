import { Parse } from "./parser";

import _ from "lodash";
import hash from "@emotion/hash";

const IGNORE_LIST = ["name", "pattern", "property", "value"];

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

function getNormalizedTree(func) {
  let tree = Parse(func);
  let treeString = JSON.stringify(iter(tree));
  return treeString;
}

export function FunctionStructureHash(func) {
  let treeString = getNormalizedTree(func);
  return hash(treeString);
}
