import {inject} from 'require-tsx';

import {noCacheComplier} from './@decache';
import {svgComplier} from './@svg';

inject({
  '.jsx': noCacheComplier,
  '.ts': noCacheComplier,
  '.tsx': noCacheComplier,
  '.svg': svgComplier,
});
