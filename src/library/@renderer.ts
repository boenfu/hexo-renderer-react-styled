import * as FS from 'fs';

import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';
import {transform} from 'sucrase';
import {NodeVM, NodeVMOptions} from 'vm2';

import {ComponentProps} from './props';

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
  let sheet = new ServerStyleSheet();

  try {
    let compiler = (text: string, file: string): string => {
      return transform(text, {
        transforms: ['typescript', 'imports', 'jsx'],
        production: true,
        enableLegacyBabel5ModuleInterop: true,
        filePath: file,
      }).code;
    };

    let options: NodeVMOptions = {
      console: 'inherit',
      eval: false,
      sourceExtensions: ['js', 'jsx', 'ts', 'tsx'],
      compiler(code, file) {
        if (!file.endsWith('js')) {
          return compiler(code, file);
        }

        return code;
      },
      require: {
        external: true,
        customRequire(id: string) {
          if (!id.includes('node_modules')) {
            return NodeVM.code(
              compiler(FS.readFileSync(id, 'utf8'), id),
              id,
              options,
            );
          }

          // eslint-disable-next-line @typescript-eslint/no-require-imports
          return require(id);
        },
      },
    };

    let html = renderToStaticMarkup(
      createElement(StyleSheetManager, {
        sheet: sheet.instance,
        children: createElement(NodeVM.code(text, filePath, options), props),
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
