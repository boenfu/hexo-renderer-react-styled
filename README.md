# hexo-renderer-react-styled

😎 wow ～ use react + style-components write your hexo theme

## Features

- zero configure
- import sub components directly
- file extensions support `.tsx` `.ts` `.jsx` `.svg`
- auto transform svg source file to react component by [svgr](https://github.com/gregberge/svgr)

## Example

- theme directory

```bash
└── your-theme
    ├── layout
    │   ├── components
    │   │   ├── header.tsx
    │   │   ├── index.ts
    │   │   └── posts
    │   │       ├── @item.tsx
    │   │       ├── index.ts
    │   │       └── posts.tsx
    │   ├── icons
    │   │   └── github.svg
    │   ├── index.tsx
    │   └── layout.tsx
    └── tsconfig.json
```

- index page example

```tsx
// index.tsx
import React, {FC} from 'react';
import styled from 'styled-components';
import {Posts} from './components';
// see usage/svg
import Github from './icons/github.svg';

const Index = styled.div`
  // ... css
`;

const Main = styled.div`
  // ... css
`;

const Sidebar = styled.div`
  // ... css
`;

// Perfect type hint
const Component: FC<HexoComponentProps> = props => {
  const {page} = props;

  return (
    <Index>
      <Main>
        <Posts posts={page.posts} />
      </Main>
      <Sidebar>
        <Github />
      </Sidebar>
    </Index>
  );
};

export default Component;
```

**Try it ?🙊**

## Usage

### Installation:

```bash
yarn add hexo-renderer-react-styled # Or npm install --save hexo-renderer-react-styled
```

**That's all, hexo will auto load**

### SVG

If need import ".svg" file, add module declare file for your project.

```ts
declare module '*.svg' {
  const fc: (props: any) => any;
  export default fc;
}
```

svgComplier will replace `#000`/`#000000` to `currentColor` by default

## Who Use

- [hexo-theme-wanghu](https://github.com/boenfu/hexo-theme-wanghu) - “忘乎”（ 仿知乎主题 ）

## License

MIT License.
