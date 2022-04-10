import * as FS from 'fs/promises';
import * as Path from 'path';

import 'require-tsx';

// eslint-disable-next-line @mufan/import-path-shallowest
import {ComponentProps} from '../../bld/library';
// eslint-disable-next-line @mufan/import-path-shallowest
import {renderer} from '../../bld/library/@renderer';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  let props!: ComponentProps;

  let filePath = Path.join(__dirname, '../../src/test/@app.tsx');

  let result = await renderer(
    {
      text: await FS.readFile(filePath, 'utf8'),
      path: filePath,
    },
    props,
  );

  if (!result.includes('#06f')) {
    throw Error('THE_ONLY_ONE_TEST_CASES_FAILED');
  }
})();
