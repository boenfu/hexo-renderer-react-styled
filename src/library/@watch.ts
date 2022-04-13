import * as Path from 'path';

import decache from 'decache';
import {defaultContentCompiler} from 'require-tsx';

export function watchComplier(
  this: any,
  content: string,
  fileName: string,
): string {
  if (!Path.basename(fileName).startsWith('_')) {
    decache(fileName);
  }

  return defaultContentCompiler.call(this, content, fileName);
}
