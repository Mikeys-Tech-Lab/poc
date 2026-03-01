// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "Practice of Clarity",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/mikeys-tech/poc",
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
