import 'require-tsx';

import {renderer} from './@renderer';

hexo.extend.renderer.register('jsx', 'html', renderer, false);
hexo.extend.renderer.register('tsx', 'html', renderer, false);

export * from './props';
