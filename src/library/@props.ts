import type moment from 'moment';

// eslint-disable-next-line @mufan/reference-missing-proof
import type Hexo from 'hexo';

interface Model<T> {
  /**
   * Warehouse method
   * https://hexojs.github.io/warehouse/
   */
  toArray(): T[];
  /**
   * Warehouse method
   * https://hexojs.github.io/warehouse/
   */
  count(): number;
  /**
   * Warehouse method
   * https://hexojs.github.io/warehouse/
   */
  forEach(fn: (v: T, i: number) => void): void;
  /**
   * Warehouse method
   * https://hexojs.github.io/warehouse/
   */
  filter(fn: (v: T, i: number) => boolean): Model<T>;
  /**
   * Warehouse method
   * https://hexojs.github.io/warehouse/
   */
  map<U>(fn: (v: T, i: number) => U): U[];
}

interface Site {
  posts: Model<Hexo.Locals.Post>;
  pages: Model<Hexo.Locals.Page>;
  categories: Model<Hexo.Locals.Category>;
  tags: Model<Hexo.Locals.Tag>;
  data: {[key: string]: any};
}

type HexoCssHelperParams = string | Record<string, any>;
type HexoJsHelperParams = string | Record<string, any>;

export interface ComponentProps<
  TConfig extends Hexo['config'] = Hexo['config'],
  TThemeConfig extends TConfig = TConfig,
> {
  site: Site;
  page: Hexo.Locals.Page;
  config: TConfig;
  theme: TThemeConfig;
  path: string;
  url: string;
  env: Hexo['env'];
  // layout use
  body?: string;
  // helpers

  /// https://hexo.io/zh-cn/docs/helpers#%E7%BD%91%E5%9D%80
  url_for(path: string, options?: {relative: boolean}): string;
  relative_url(from: string, to: string): string;
  // https://en.gravatar.com/site/implement/images/
  gravatar(
    email: string,
    options?:
      | number
      | {
          s?: number;
          d?: string;
          f?: 'y' | undefined;
          r?: 'g' | 'pg' | 'r' | 'x';
        },
  ): string;
  full_url_for(path: string): string;

  /// https://hexo.io/zh-cn/docs/helpers#HTML-%E6%A0%87%E7%AD%BE (这个分类对当前插件作用不大，不建议使用)
  css(css: HexoCssHelperParams | HexoCssHelperParams[]): string;
  js(js: HexoJsHelperParams | HexoJsHelperParams[]): string;
  link_to(
    path: string,
    title?: string,
    options?: {external?: boolean; class?: string; id?: string},
  ): string;
  mail_to(
    path: string,
    title?: string,
    options?: {
      class?: string;
      id?: string;
      subject?: string;
      cc?: string;
      bcc?: string;
      body?: string;
    },
  ): string;
  image_tag(
    path: string,
    options?: {
      alt?: string;
      class?: string;
      id?: string;
      width?: string;
      height?: string;
    },
  ): string;
  favicon_tag(path: string): string;
  feed_tag(path: string): string;

  /// https://hexo.io/zh-cn/docs/helpers#%E6%9D%A1%E4%BB%B6%E5%87%BD%E6%95%B0
  is_current(path: string, strict?: boolean): boolean;
  is_home(): boolean;
  is_post(): boolean;
  is_page(): boolean;
  is_archive(): boolean;
  is_year(): boolean;
  is_month(): boolean;
  is_category(category?: string): boolean;
  is_tag(tag?: string): boolean;

  /// https://hexo.io/zh-cn/docs/helpers#%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%A4%84%E7%90%86
  trim(str: string): string;
  strip_html(str: string): string;
  titlecase(str: string): string;
  markdown(str: string): string;
  render(str: string, engine: string): string;
  /**
   *
   * @param str
   * @param length default 80
   */
  word_wrap(str: string, length?: number): string;
  truncate(
    str: string,
    options?: {
      length?: number | undefined;
      omission?: string | undefined;
      separator?: string | undefined;
    },
  ): string;
  escape_html(str: string): string;

  /// https://hexo.io/zh-cn/docs/helpers#%E6%A8%A1%E6%9D%BF
  partial(
    layout: string,
    locals?: any,
    options?: {
      cache?: boolean;
      only?: boolean;
    },
  ): string;
  fragment_cache(id: string, fn: () => string): string;

  /// https://hexo.io/zh-cn/docs/helpers#%E6%97%A5%E6%9C%9F%E4%B8%8E%E6%97%B6%E9%97%B4
  date(date: number | string | Date, format?: string): string;
  date_xml(date: number | string | Date): string;
  time(time: number | string | Date, format?: string): string;
  full_date(date: number | string | Date, format?: string): string;
  // 文档没有，但 log 出来有
  // relative_date(): string;
  // time_tag(): string;
  moment: typeof moment;

  /// https://hexo.io/zh-cn/docs/helpers#%E5%88%97%E8%A1%A8
  list_categories(
    categories: Model<Hexo.Locals.Category>,
    options?: {
      orderby?: string;
      order?: 1 | -1;
      show_count?: boolean;
      style?: string;
      separator?: string;
      depth?: number;
      class?: string;
      transform?: (category: string) => string;
      suffix?: string;
    },
  ): string;
  list_tags(
    tags: Model<Hexo.Locals.Tag>,
    options?: {
      orderby?: string;
      order?: 1 | -1;
      show_count?: boolean;
      style?: string;
      separator?: string;
      // 未搬运高级用法
      class?: string;
      transform?: (tag: string) => string;
      amount?: number;
      suffix?: string;
    },
  ): string;
  list_archives(options?: {
    type?: 'yearly' | 'monthly';
    order?: 1 | -1;
    show_count?: boolean;
    format?: string;
    style?: string;
    separator?: string;
    class?: string;
    transform?: (name: string) => string;
  }): string;
  list_posts(
    posts: Model<Hexo.Locals.Post>,
    options?: {
      orderby?: string;
      order?: 1 | -1;
      style?: string;
      separator?: string;
      class?: string;
      amount?: number;
      transform?: (tag: string) => string;
    },
  ): string;
  tagcloud(
    tags: Model<Hexo.Locals.Tag>,
    options?: {
      min_font?: number;
      max_font?: number;
      unit?: string;
      amount?: number;
      orderby?: string;
      order?: 1 | -1;
      color?: boolean;
      start_color?: string;
      end_color?: string;
      class?: string;
      level?: number;
    },
  ): string;
  tag_cloud: ComponentProps['tagcloud'];

  /// https://hexo.io/zh-cn/docs/helpers#%E5%85%B6%E4%BB%96
  paginator(options?: {
    base?: string;
    format?: string;
    total?: number;
    current?: number;
    prev_text?: string;
    next_text?: string;
    space?: string;
    prev_next?: boolean;
    end_size?: number;
    mid_size?: number;
    show_all?: boolean;
    escape?: boolean;
  }): string;
  search_form(options?: {
    class?: string;
    text?: string;
    button?: string | boolean;
  }): string;
  number_format(
    num: number,
    options?: {
      precision?: number;
      delimiter?: string;
      separator?: string;
    },
  ): string;
  meta_generator(): string;
  /// see https://hexo.io/zh-cn/docs/helpers#open-graph
  open_graph(options?: any): string;
  toc(
    str: string,
    options?: {
      class?: string;
      list_number?: boolean;
      max_depth?: number;
      min_depth?: number;
    },
  ): string;

  // 文档中没有的
  // inspect: [Function: bound inspectObject],
  // log: [Function: bound log]
}
