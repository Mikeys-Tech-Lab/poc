import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const socialImagePath = z
  .string()
  .regex(
    /^\/social\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/)*[a-z0-9]+(?:-[a-z0-9]+)*\.(?:png|jpe?g|webp|gif)$/,
    'Social images must use a root-relative, kebab-case path under /social/.',
  );

const docsExtension = z
  .object({
    register: z.literal('practitioner').optional(),
    socialImage: socialImagePath.optional(),
    socialImageAlt: z.string().trim().min(1).optional(),
    structuredDataType: z.enum(['Article', 'CollectionPage']).optional(),
  })
  .superRefine((data, context) => {
    if (data.socialImage && !data.socialImageAlt) {
      context.addIssue({
        code: 'custom',
        message: 'socialImageAlt is required when socialImage is set.',
        path: ['socialImageAlt'],
      });
    }
    if (data.socialImageAlt && !data.socialImage) {
      context.addIssue({
        code: 'custom',
        message: 'socialImage is required when socialImageAlt is set.',
        path: ['socialImage'],
      });
    }
  });

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: docsExtension,
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
