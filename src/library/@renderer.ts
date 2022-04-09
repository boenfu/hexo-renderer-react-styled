import vm from 'vm';

import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';
import {transform} from 'sucrase';

import {ComponentProps} from './props';

export async function renderer(
  {
    text,
    path,
  }: {
    text: string;
    path?: string;
  },
  props: ComponentProps,
): Promise<string> {
  let sheet = new ServerStyleSheet();

  try {
    let js = transform(text, {
      transforms: ['typescript', 'imports', 'jsx'],
      production: true,
      filePath: path,
    }).code;

    let context: vm.Context = {
      require,
      console,
      exports: {},
    };

    vm.runInNewContext(js, context, {
      displayErrors: true,
    });

    let html = renderToStaticMarkup(
      createElement(StyleSheetManager, {
        sheet: sheet.instance,
        children: createElement(context.exports.default, props),
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
