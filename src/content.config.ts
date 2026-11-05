import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const kennisbank = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/kennisbank' }),
  schema: z.object({
    title: z.string().max(60), // <title>
    description: z.string().max(155),
    h1: z.string(),
    intro: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    dienst: z.string(), // related service slug for the CTA
    aanspreek: z.enum(['u', 'je']),
  }),
});

export const collections = { kennisbank };
