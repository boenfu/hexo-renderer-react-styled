import decache from 'decache';
import {defaultContentCompiler} from 'require-tsx';
import hash from 'string-hash';

const moduleHashMap = new Map<string, number>();

export function watchComplier(
  this: any,
  content: string,
  fileName: string,
): string {
  let existed = moduleHashMap.get(fileName);
  let current = hash(content);

  if (existed && existed !== current) {
    decache(fileName);
  }

  moduleHashMap.set(fileName, current);

  return defaultContentCompiler.call(this, content, fileName);
}
