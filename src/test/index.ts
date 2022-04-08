import * as FS from 'fs/promises';
import * as Path from 'path';

// eslint-disable-next-line @mufan/import-path-shallowest
import {renderer} from '../../bld/library/@renderer';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  let result = await renderer(
    {
      text: await FS.readFile(
        Path.join(__dirname, '../../src/test/@app.tsx'),
        'utf8',
      ),
    },
    {},
  );

  if (!result.includes('#06f')) {
    throw Error('THE_ONLY_ONE_TEST_CASES_FAILED');
  }
})();
