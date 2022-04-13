import {inject} from 'require-tsx';

import {rawComplier} from './@raw';
import {svgComplier} from './@svg';
import {watchComplier} from './@watch';

inject({
  '.jsx': watchComplier,
  '.ts': watchComplier,
  '.tsx': watchComplier,
  '.svg': svgComplier,
  '.css': rawComplier,
});
