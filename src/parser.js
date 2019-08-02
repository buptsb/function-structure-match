import { parseScript } from "shift-parser";
import _ from "lodash";

export function Parse(fn) {
  let code;
  // in case of anonymous functions
  if (_.isFunction(fn)) {
    code = `var a = ${fn.toString()};`;
  } else if (_.isString(fn)) {
    code = `var a = ${fn};`;
  } else {
    throw new Error(`${fn} is not a function.`);
  }
  let tree = parseScript(code).statements[0].declaration.declarators[0].init;
  return tree;
}
