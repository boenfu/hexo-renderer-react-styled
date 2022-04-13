import {transform as svgTransform} from '@svgr/core';

import {watchComplier} from './@watch';

export function svgComplier(
  this: any,
  content: string,
  fileName: string,
): string {
  content = svgTransform.sync(
    content,
    {
      icon: true,
      replaceAttrValues: {
        '#000': 'currentColor',
        '#000000': 'currentColor',
      },
    },
    {
      componentName: 'Svg',
    },
  );

  return watchComplier.call(this, content, fileName);
}
