import { isUserDefinedFunction } from "./utils";
import { Parse } from "./parser";
import { FunctionStructureHash } from "./function_hash";

import { DeepDiff } from "deep-diff";
import _ from "lodash";

export function Match_old(base, target, debug = false) {
  if (!isUserDefinedFunction(base) || !isUserDefinedFunction(target)) {
    return false;
  }

  {
    let lenBase = base.toString().replace(/  /g, "").length;
    let lenTarget = target.toString().replace(/  /g, "").length;
    const threshold = 30;
    if (Math.abs(lenBase - lenTarget) > threshold) {
      return false;
    }
  }

  let treeBase = Parse(base),
    treeTarget = Parse(target);
  let diff = DeepDiff(treeBase, treeTarget, {
    normalize: (path, key, lhs, rhs) => {
      if (key == "name" || key == "property" || key == "pattern") {
        return [1, 1];
      } else if (key == "value") {
        const typ = _.get(treeBase, path).type;
        // `BooleanLiteral`, `NumericLiteral`, `StringLiteral`...
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

export function Match(base, target, debug = false) {
  if (!isUserDefinedFunction(base) || !isUserDefinedFunction(target)) {
    return false;
  }
  return FunctionStructureHash(base) == FunctionStructureHash(target);
}
