declare global {
  const hexo: {
    extend: {
      renderer: {
        register: (
          input: string,
          output: string,
          renderer: (
            data: {
              text: string;
              path?: string;
            },
            options: unknown,
          ) => Promise<string> | string,
          sync: boolean,
        ) => Promise<void> | void;
      };
    };
  };
}

export {};
