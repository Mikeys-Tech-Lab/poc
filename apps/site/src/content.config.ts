import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	beginner: defineCollection({
		loader: glob({ pattern: '**/*.mdx', base: './src/content/beginner' }),
		schema: z.object({
			title: z.string().optional(),
		}),
	}),
};
