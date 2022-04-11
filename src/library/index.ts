import './@inject';

import type {ComponentProps as _ComponentProps} from './@props';
import {renderer} from './@renderer';

hexo.extend.renderer.register('jsx', 'html', renderer, false);
hexo.extend.renderer.register('tsx', 'html', renderer, false);

declare namespace ReactStyled {
  interface ComponentProps extends _ComponentProps {}
}

export = ReactStyled;
