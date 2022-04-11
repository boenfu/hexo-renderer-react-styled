import decache from 'decache';
import {defaultContentCompiler, inject} from 'require-tsx';

import {renderer} from './@renderer';

function noCacheComplier(this: any, content: string, fileName: string): string {
  decache(fileName);
  return defaultContentCompiler.call(this, content, fileName);
}

inject({
  '.jsx': noCacheComplier,
  '.ts': noCacheComplier,
  '.tsx': noCacheComplier,
});

hexo.extend.renderer.register('jsx', 'html', renderer, false);
hexo.extend.renderer.register('tsx', 'html', renderer, false);

export * from './props';
