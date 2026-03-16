declare const __COMMIT_SHA__: string;

/* Starlight virtual modules (generated at build) */
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
