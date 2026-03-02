// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "Practice of Clarity",
      favicon: "/favicon-32x32.png",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/mikeys-tech/poc",
        },
      ],
      head: [
        {
          tag: "link",
          attrs: {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/apple-touch-icon.png",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon-32x32.png",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/favicon-16x16.png",
          },
        },
      ],
      customCss: ["./src/styles/custom.css"],
      sidebar: [
        { label: "Home", slug: "" },
        {
          label: "About",
          items: [
            { label: "What this is", slug: "about/what-this-is" },
            { label: "How to use this repo", slug: "about/how-to-use" },
          ],
        },
        {
          label: "Guides",
          items: [
            {
              label: "Sensible Defaults",
              slug: "guides/sensible-defaults",
            },
          ],
        },
      ],
      editLink: {
        baseUrl: "https://github.com/mikeys-tech/poc/edit/main/apps/site/",
      },
      credits: true,
    }),
  ],
});
