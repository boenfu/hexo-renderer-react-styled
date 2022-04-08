import {renderer} from './@renderer';

void hexo.extend.renderer.register('jsx', 'html', renderer, false);
void hexo.extend.renderer.register('tsx', 'html', renderer, false);
