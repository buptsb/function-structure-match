import { parseScript } from "shift-parser";

export function Parse(fn) {
  // in case of anonymous functions
  let code = `var a = ${fn.toString()};`;
  let tree = parseScript(code).statements[0].declaration.declarators[0].init;
  return tree;
}
