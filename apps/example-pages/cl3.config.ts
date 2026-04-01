import { defineCollection } from '@cl3/core'
import { filesystem } from '@cl3/source-filesystem'
import { z } from 'zod'

export const posts = defineCollection({
  name: 'pages-posts',
  source: filesystem({
    contentDir: '../example-nextjs/content/posts',
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
