import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        register: z.literal('practitioner').optional(),
      }),
    }),
  }),
  register: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/register' }),
    schema: z.object({
      title: z.string().optional(),
      register: z.enum(['everyday', 'orientation']).optional(),
    }),
  }),
  handouts: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/handouts' }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      seriesId: z.enum(['thinkfirst']),
      order: z.number().default(0),
      pagefind: z.literal(false).default(false),
    }),
  }),
};
