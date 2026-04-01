# @cl3/source-filesystem

Filesystem-based content source for CL3.

## Node.js Only

This package uses Node.js `fs` APIs and **cannot run on edge runtimes** (Cloudflare Workers, Vercel Edge Functions, etc.).

### For Edge Runtimes

Use `@cl3/source-remote` instead, which fetches content from HTTP endpoints and is compatible with all edge runtimes.

```typescript
import { remote } from '@cl3/source-remote'

const posts = defineCollection({
  name: 'posts',
  source: remote({
    endpoint: 'https://api.example.com/posts',
  }),
  // ...
})
```

## Usage

```typescript
import { filesystem } from '@cl3/source-filesystem'
import { defineCollection } from '@cl3/core'
import { z } from 'zod'

const posts = defineCollection({
  name: 'posts',
  source: filesystem({ baseDir: './content/posts' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    body: z.string(),
  }),
})
```

## License

MIT
