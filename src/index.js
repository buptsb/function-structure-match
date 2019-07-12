import { parseScript } from "shift-parser";
import { isUserDefinedFunction } from "./utils";
import { DeepDiff } from "deep-diff";
import _ from "lodash";

function parse(fn) {
  // in case of anonymous functions
  let code = `var a = ${fn.toString()};`;
  let tree = parseScript(code).statements[0].declaration.declarators[0].init;
  return tree;
}

export function Match(base, target, debug = false) {
  if (!isUserDefinedFunction(base) || !isUserDefinedFunction(target)) {
    return false;
  }

  let treeBase = parse(base),
    treeTarget = parse(target);
  let diff = DeepDiff(treeBase, treeTarget, {
    normalize: (path, key, lhs, rhs) => {
      if (key == "name" || key == "property") {
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
