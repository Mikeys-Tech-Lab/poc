// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightCatppuccin from "@catppuccin/starlight";
import { REPO } from "./src/consts";

export default defineConfig({
  integrations: [
    starlight({
      plugins: [
        starlightCatppuccin({
          dark: { flavor: "frappe", accent: "flamingo" },
          light: { flavor: "latte", accent: "flamingo" },
        }),
      ],
      title: "Practice of Clarity",
      favicon: "/favicon.ico",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: REPO,
        },
      ],
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/png",
            sizes: "48x48",
            href: "/favicon-48x48.png",
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
            rel: "manifest",
            href: "/site.webmanifest",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "msapplication-TileImage",
            content: "/mstile-150x150.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "msapplication-TileColor",
            content: "#303446",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "theme-color",
            content: "#303446",
          },
        },
      ],
      components: {
        SocialIcons: "./src/components/SocialIcons.astro",
      },
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
        baseUrl: `${REPO}/edit/main/apps/site/`,
      },
      credits: true,
    }),
  ],
});
