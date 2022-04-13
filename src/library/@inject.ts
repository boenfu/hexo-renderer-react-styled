import {inject} from 'require-tsx';

import {svgComplier} from './@svg';
import {watchComplier} from './@watch';

inject({
  '.jsx': watchComplier,
  '.ts': watchComplier,
  '.tsx': watchComplier,
  '.svg': svgComplier,
});
