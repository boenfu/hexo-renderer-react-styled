import decache from 'decache';
import {defaultContentCompiler} from 'require-tsx';
import hash from 'string-hash';

const moduleHashMap = new Map<string, number>();

export function watchComplier(
  this: any,
  content: string,
  fileName: string,
): string {
  let hasNumber = hash(content);

  if (moduleHashMap.get(fileName) !== hasNumber) {
    decache(fileName);
    moduleHashMap.set(fileName, hasNumber);
  }

  return defaultContentCompiler.call(this, content, fileName);
}
