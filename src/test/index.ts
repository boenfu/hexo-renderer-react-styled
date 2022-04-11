import * as FS from 'fs/promises';
import * as Path from 'path';

// inject compiler
// eslint-disable-next-line @mufan/import-path-shallowest
import '../../bld/library/@inject';

import {ComponentProps} from '../../bld/library';
// eslint-disable-next-line @mufan/import-path-shallowest
import {renderer} from '../../bld/library/@renderer';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  let props!: ComponentProps;

  // import source file
  let filePath = Path.join(__dirname, '../../src/test/@app.tsx');

  let result = await renderer(
    {
      text: await FS.readFile(filePath, 'utf8'),
      path: filePath,
    },
    props,
  );

  if (!result.includes('#06f')) {
    throw Error('Styled components transform failed');
  }

  if (!result.includes('fill="currentColor"')) {
    throw Error('Svg transform failed');
  }

  console.info('Test passed');
})();
