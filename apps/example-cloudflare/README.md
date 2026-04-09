# example-cloudflare

Cloudflare Worker example using Contentlayer3 with a remote HTTP source. Demonstrates the edge-safe core running in a Worker without any Node.js APIs.

## What this demonstrates

- `defineCollection` with `@contentlayer3/source-remote` (HTTP endpoint)
- Edge-safe: no `node:fs`, `node:path`, or other Node.js built-ins
- In-memory caching compatible with Cloudflare Worker runtime
- JSON response from a Worker using validated, typed collection data

## Run it

```bash
npm install
npm run dev   # wrangler dev
```

## Structure

```
apps/example-cloudflare/
├── src/
│   └── index.ts     # Worker fetch handler, calls getCollectionBase
├── wrangler.toml
└── package.json
```

## Key files

**[src/index.ts](./src/index.ts)** defines the collection and serves it from a Worker:

```ts
import { defineCollection, getCollectionBase } from 'contentlayer3'
import { remote } from '@contentlayer3/source-remote'
import { z } from 'zod'

const posts = defineCollection({
  name: 'cf-posts',
  source: remote({ endpoint: 'https://jsonplaceholder.typicode.com/posts' }),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    body: z.string(),
    userId: z.number(),
  }),
})

export default {
  async fetch(_request: Request): Promise<Response> {
    const items = await getCollectionBase(posts)
    return new Response(JSON.stringify(items), {
      headers: { 'Content-Type': 'application/json' },
    })
  },
}
```
