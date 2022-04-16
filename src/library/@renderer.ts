import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';

import {ComponentProps} from './@props';

export async function renderer(
  {
    text,
    path: filePath,
  }: {
    text: string;
    path?: string;
  },
  props: ComponentProps,
): Promise<string> {
  if (!filePath) {
    return text;
  }

  let sheet = new ServerStyleSheet();

  try {
    let html = renderToStaticMarkup(
      createElement(StyleSheetManager, {
        sheet: sheet.instance,
        // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
        children: createElement(require(filePath), props),
      }),
    );

    let styles = sheet.getStyleTags();

    return `${styles}${html}`;
  } catch (error: any) {
    console.error(error?.message);
    return errorHint((error as Error)?.message ?? '');
  } finally {
    sheet.seal();
  }
}

function errorHint(error: string): string {
  return `<pre style="max-width:640px;color: #fff;background: rgba(0,0,0,0.6);backdrop-filter: blur(2px);border-radius: 4px;padding: 24px;margin: 24px auto;box-shadow: 0 0 2px #000;line-height: 1.4;text-shadow: 0 0 2px #000;word-break: break-all;white-space: pre-line;">${error
    .split('\n')
    .join('<br />')}</pre>`;
}
