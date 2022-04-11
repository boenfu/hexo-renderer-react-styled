# hexo-renderer-react-styled

😎 wow ～ use react + style-components write your hexo theme

## Example

- theme directory

```bash
└── your-theme
    ├── layout
    │   ├── @types
    │   │   └── global.d.ts
    │   ├── components
    │   │   ├── header.tsx
    │   │   ├── index.ts
    │   │   └── posts
    │   │       ├── @item.tsx
    │   │       ├── index.ts
    │   │       └── posts.tsx
    │   ├── index.tsx
    │   └── layout.tsx
    └── tsconfig.json
```

- index page example

```tsx
import React, {FC} from 'react';
import styled from 'styled-components';
import {Posts} from './components';

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
      <Sidebar />
    </Index>
  );
};

export default Component;
```

**Try it ?🙊**

## Usage

Installation:

```bash
yarn add hexo-renderer-react-styled # Or npm install --save hexo-renderer-react-styled
```

**That's all, hexo will auto load**

## Who Use

- [hexo-theme-wanghu](https://github.com/boenfu/hexo-theme-wanghu) - “忘乎”（ 仿知乎主题 ）

## License

MIT License.
