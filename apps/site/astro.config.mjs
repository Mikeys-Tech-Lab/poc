// @ts-check

import starlight from '@astrojs/starlight';
import starlightCatppuccin from '@catppuccin/starlight';
import { defineConfig } from 'astro/config';
export default defineConfig({
  site: process.env.SITE_URL || 'https://practiceofclarity.eu',
  devToolbar: {
    enabled: false,
  },
  integrations: [
    starlight({
      plugins: [
        starlightCatppuccin({
          dark: { flavor: 'frappe', accent: 'flamingo' },
          light: { flavor: 'latte', accent: 'flamingo' },
        }),
      ],
      title: 'Practice of Clarity',
      favicon: '/favicon.ico',
      locales: {
        root: { label: 'English (US)', lang: 'en-US' },
        'en-gb': { label: 'English (UK)', lang: 'en-GB' },
        'de-de': { label: 'Deutsch', lang: 'de-DE' },
      },
      defaultLocale: 'root',
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/svg+xml',
            href: '/favicon.svg',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/png',
            sizes: '48x48',
            href: '/favicon-48x48.png',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon-32x32.png',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicon-16x16.png',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'manifest',
            href: '/site.webmanifest',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'msapplication-TileImage',
            content: '/mstile-150x150.png',
          },
        },
        // Frappé base: #303446 — update if dark flavor changes (see astro-starlight skill)
        {
          tag: 'meta',
          attrs: {
            name: 'msapplication-TileColor',
            content: '#303446',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'theme-color',
            content: '#303446',
          },
        },
      ],
      components: {
        SiteTitle: './src/components/SiteTitle.astro',
        SocialIcons: './src/components/SocialIcons.astro',
        ThemeProvider: './src/components/ThemeProvider.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
        Pagination: './src/components/LicensePanel.astro',
        Header: './src/components/Header.astro',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Home', slug: '' },
        {
          label: 'About',
          items: [
            { label: 'What this is', slug: 'about/what-this-is' },
            { label: 'Publication arc', slug: 'about/publication-arc' },
          ],
        },
        {
          label: 'Articles',
          items: [{ label: 'Placeholder article', slug: 'articles/placeholder' }],
        },
        {
          label: 'Licenses',
          items: [
            { label: 'CC BY 4.0', slug: 'licenses/cc-by-4-0' },
            { label: 'MIT', slug: 'licenses/mit' },
          ],
        },
      ],
      credits: false,
    }),
  ],
});
