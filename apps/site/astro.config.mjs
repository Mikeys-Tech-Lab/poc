// @ts-check

import starlight from '@astrojs/starlight';
import starlightCatppuccin from '@catppuccin/starlight';
import { defineConfig } from 'astro/config';
import rehypeMermaid from 'rehype-mermaid';
import { buildRouteRedirects } from './src/lib/route-map.js';
export default defineConfig({
  site: process.env.SITE_URL || 'https://practiceofclarity.eu',
  redirects: {
    '/': '/en-us/',
    '/thinkfirst': '/en-us/shared/thinkfirst/',
    '/shared/thinkfirst': '/en-us/shared/thinkfirst/',
    ...buildRouteRedirects(),
  },
  devToolbar: {
    enabled: false,
  },
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
    rehypePlugins: [
      [
        rehypeMermaid,
        {
          strategy: 'inline-svg',
          mermaidConfig: {
            theme: 'base',
            themeVariables: {
              primaryColor: '#f5e0dc',
              primaryTextColor: '#303446',
              primaryBorderColor: '#e78284',
              lineColor: '#e78284',
              secondaryColor: '#eff1f5',
              tertiaryColor: '#f2d5cf',
              fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
              fontSize: '18px',
            },
          },
        },
      ],
    ],
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
        'en-us': { label: 'English (US)', lang: 'en-US' },
      },
      defaultLocale: 'en-us',
      disable404Route: true,
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
          collapsed: true,
          items: [
            { label: 'What This Work Is', slug: 'about/what-this-is' },
            { label: 'Registers', slug: 'about/registers' },
            { label: 'Architecture', slug: 'about/architecture' },
            {
              label: 'How to Inspect This Node',
              slug: 'about/how-to-inspect-this-node',
            },
            { label: 'Glossary', slug: 'about/glossary' },
            { label: 'About the Author', slug: 'about/about-the-author' },
          ],
        },
        {
          label: 'Core System',
          collapsed: true,
          items: [
            {
              label: 'Practice of Clarity',
              collapsed: true,
              items: [
                {
                  label: 'Act I: When Output Outpaces Understanding',
                  slug: 'core-system/practice-of-clarity/act-1-when-output-outpaces-understanding',
                },
                {
                  label: 'Act II: Practicing Decision Hygiene Under AI Speed',
                  slug: 'core-system/practice-of-clarity/act-2-practicing-decision-hygiene-under-ai-speed',
                },
                {
                  label: 'Act III: Nodes, Bridges, and Drift',
                  slug: 'core-system/practice-of-clarity/act-3-nodes-bridges-and-drift',
                },
                {
                  label: 'Act IV: A Public Node You Can Inspect',
                  slug: 'core-system/practice-of-clarity/act-4-a-public-node-you-can-inspect',
                },
              ],
            },
            {
              label: 'Seeds',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'core-system/seeds' },
                {
                  label: 'A Living Practice of Clarity',
                  slug: 'core-system/seeds/a-living-practice-of-clarity',
                },
                {
                  label: 'Practice Foundations',
                  slug: 'core-system/seeds/practice-foundations',
                },
                { label: "Beginner's Mind", slug: 'core-system/seeds/beginners-mind' },
                {
                  label: 'A Bridge Between Conflicting Nodes',
                  slug: 'core-system/seeds/bridge-between-conflicting-nodes',
                },
                {
                  label: 'Translation and Register Guidance',
                  slug: 'core-system/seeds/translation-and-register-guidance',
                },
                {
                  label: 'Voice of Guidance',
                  slug: 'core-system/seeds/voice-of-guidance',
                },
              ],
            },
            {
              label: 'Mandate Lenses',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'core-system/mandate-lenses' },
                {
                  label: 'Sensible Defaults',
                  slug: 'core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load',
                },
              ],
            },
          ],
        },
        {
          label: 'Signals',
          collapsed: false,
          items: [
            {
              label: 'Structural',
              collapsed: false,
              items: [
                {
                  label: 'Overview',
                  slug: 'signals/structural',
                },
                {
                  label: 'AI & Cognitive Amplification',
                  collapsed: false,
                  items: [
                    {
                      label: 'AI Is Not Magic. It Is a Cognitive Amplifier.',
                      slug: 'signals/structural/ai-is-not-magic-it-is-a-cognitive-amplifier',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Operational',
              collapsed: false,
              items: [
                {
                  label: 'Work & Delivery',
                  collapsed: false,
                  items: [
                    {
                      label: 'Overview',
                      slug: 'signals/operational/work-delivery',
                    },
                    {
                      label: 'Integration Lag',
                      collapsed: false,
                      items: [
                        {
                          label: 'Overview',
                          slug: 'signals/operational/work-delivery/integration-lag',
                        },
                        {
                          label: 'We Started Shipping Faster. We Also Started Understanding Less.',
                          slug: 'signals/operational/work-delivery/integration-lag/we-started-shipping-faster-understanding-less',
                        },
                        {
                          label: 'A Path Through Integration Lag',
                          slug: 'signals/operational/work-delivery/integration-lag/a-path-through-integration-lag',
                        },
                        {
                          label: 'The Verification Tax',
                          slug: 'signals/operational/work-delivery/integration-lag/the-verification-tax',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'License',
          collapsed: true,
          items: [{ label: 'CC BY 4.0', slug: 'licenses/cc-by-4-0' }],
        },
      ],
      credits: false,
    }),
  ],
});
