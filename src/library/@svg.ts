import {transform as svgTransform} from '@svgr/core';

import {noCacheComplier} from './@decache';

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

  return noCacheComplier.call(this, content, fileName);
}
