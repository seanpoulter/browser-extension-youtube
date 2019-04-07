import { DOMEventTarget } from "../Observable";

export function isDOMEventTarget(arg: any): arg is DOMEventTarget {
  return arg
    && typeof arg.addEventListener === 'function'
    && typeof arg.removeEventListener === 'function';
}
