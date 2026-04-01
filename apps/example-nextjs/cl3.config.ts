import { defineCollection } from '@cl3/core'
import { filesystem } from '@cl3/source-filesystem'
import { z } from 'zod'

export const posts = defineCollection({
  name: 'posts',
  source: filesystem({
    contentDir: 'content/posts',
    pattern: '**/*.mdx',
  }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    published: z.boolean().default(true),
    _filePath: z.string().optional(),
  }),
})
