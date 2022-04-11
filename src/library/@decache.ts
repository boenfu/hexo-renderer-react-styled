import decache from 'decache';
import {defaultContentCompiler} from 'require-tsx';

export function noCacheComplier(
  this: any,
  content: string,
  fileName: string,
): string {
  decache(fileName);
  return defaultContentCompiler.call(this, content, fileName);
}
