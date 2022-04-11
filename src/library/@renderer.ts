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
    console.error(error);
    return (error as Error)?.stack ?? '';
  } finally {
    sheet.seal();
  }
}
