declare const __COMMIT_SHA__: string;

/*
 * Starlight virtual modules we import directly. Starlight 0.42 ships as
 * JavaScript and no longer bundles ambient virtual-module types (the old
 * `@astrojs/starlight/virtual.d.ts`), so `user-config` is declared here too.
 */
declare module 'virtual:starlight/user-config' {
  const config: import('@astrojs/starlight/types').StarlightConfig;
  export default config;
}
declare module 'virtual:starlight/components/Search' {
  const Component: import('astro').AstroComponentFactory;
  export default Component;
}
declare module 'virtual:starlight/components/SiteTitle' {
  const Component: import('astro').AstroComponentFactory;
  export default Component;
}
declare module 'virtual:starlight/components/SocialIcons' {
  const Component: import('astro').AstroComponentFactory;
  export default Component;
}
declare module 'virtual:starlight/components/ThemeSelect' {
  const Component: import('astro').AstroComponentFactory;
  export default Component;
}
declare module 'virtual:starlight/user-images' {
  export const logos: Record<
    string,
    { src: string; alt?: string; width?: number; height?: number }
  >;
}

/* Starlight theme provider (injected by Starlight theme script) */
declare const StarlightThemeProvider: {
  updatePickers: (theme: string) => void;
};
