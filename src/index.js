import { parseScript } from "shift-parser";
import { isUserDefinedFunction } from "./utils";
import { DeepDiff } from "deep-diff";

function parse(fn) {
  // in case of anonymous functions
  let code = `var a = ${fn.toString()};`;
  let tree = parseScript(code).statements[0].declaration.declarators[0].init;
  return tree;
}

export function Match(base, target) {
  if (!isUserDefinedFunction(base) || !isUserDefinedFunction(target)) {
    return false;
  }

  let diff = DeepDiff(parse(base), parse(target), {
    normalize: (path, key, lhs, rhs) => {
      if (key === "name") {
        return [lhs, lhs];
      }
    }
  });
  return diff === undefined;
}

export function MatchDebug(base, target) {
  if (!isUserDefinedFunction(base) || !isUserDefinedFunction(target)) {
    return false;
  }

  let treeBase = parse(base),
    treeTarget = parse(target);
  let diff = DeepDiff(treeBase, treeTarget, {
    normalize: (path, key, lhs, rhs) => {
      if (key === "name") {
        return [lhs, lhs];
      }
    }
  });
  return { diff, treeBase, treeTarget };
}
