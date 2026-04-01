# CL3: Runtime-First Content Layer for Next.js

A modern content management system for Next.js applications that prioritizes runtime composition over build-time generation.

## Why CL3?

**Contentlayer** is unmaintained. **Velite** and **content-collections** are build-time only, blocking on full builds. **CL3** runs at request time with Next.js ISR and `revalidateTag`, giving you:

- **Runtime-first**: Fetch and validate content on every request (with intelligent caching)
- **Edge-safe core**: `@cl3/core` and `@cl3/source-remote` run on Cloudflare Workers and Vercel Edge Functions
- **Zod-only**: Single schema system, no competing frameworks
- **Remote sources**: Pull content from any HTTP API
- **Search plugins**: Orama and Pagefind integration out-of-the-box
- **Actively maintained**: New phases ship regularly

## 5-Minute Quickstart

### 1. Install

```bash
pnpm add @cl3/core @cl3/next @cl3/source-filesystem zod
```

### 2. Create `cl3.config.ts`

```typescript
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
    _filePath: z.string().optional(),
  }),
})
```

### 3. Add content

Create `content/posts/hello.mdx`:

```markdown
---
title: Hello World
date: 2025-01-01
excerpt: My first post
---

This is my first post!
```

### 4. Use in a page

```typescript
import { getCollection } from '@cl3/next'
import { posts } from '../cl3.config'

export default async function Blog() {
  const allPosts = await getCollection(posts)
  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {allPosts.map(post => (
          <li key={post._filePath}>{post.title}</li>
        ))}
      </ul>
    </main>
  )
}
```

### 5. Revalidate on demand

Create `app/api/revalidate/route.ts`:

```typescript
import { revalidateCollection } from '@cl3/next'
import { posts } from '../../../cl3.config'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const token = request.headers.get('x-revalidate-token')
  if (token !== process.env.REVALIDATE_TOKEN) {
    return new Response('Unauthorized', { status: 401 })
  }
  revalidateCollection(posts)
  return new Response('Revalidated', { status: 200 })
}
```

## Package Map

| Package | Purpose | Edge-Safe |
|---------|---------|-----------|
| `@cl3/core` | Collection definition and validation | ✓ |
| `@cl3/next` | Next.js integration with `unstable_cache` | ✗ |
| `@cl3/mdx` | MDX compilation to JSX | ✓ |
| `@cl3/source-filesystem` | Filesystem content source | ✗ |
| `@cl3/source-remote` | HTTP remote content source | ✓ |
| `@cl3/search-orama` | Full-text search with Orama | ✗ |
| `@cl3/search-pagefind` | Static search indexing with Pagefind | ✗ |
| `@cl3/devtools` | CLI tools (validate, inspect, watch) | ✗ |

## Feature Comparison

| Feature | CL3 | Velite | content-collections | contentlayer2 |
|---------|-----|--------|--------------------|-|
| Runtime-first | ✓ | ✗ | ✗ | ✗ |
| Zod schemas | ✓ | ✓ | ✓ | ✗ |
| revalidateTag integration | ✓ | ✗ | ✗ | ✗ |
| Turbopack compatible | ✓ | ⚠️ | ✓ | ⚠️ |
| Remote sources | ✓ | ✗ | ✗ | ✗ |
| Edge-safe core | ✓ | ✗ | ✗ | ✗ |
| Search hooks | ✓ | ✗ | ✗ | ✗ |
| Actively maintained | ✓ | ✓ | ✓ | ✓ |

## Documentation

- [Core API](./packages/core/README.md)
- [Next.js Integration](./packages/next/README.md)
- [MDX Compilation](./packages/mdx/README.md)
- [Filesystem Source](./packages/source-filesystem/README.md)
- [Remote Source](./packages/source-remote/README.md)
- [Orama Search](./packages/search-orama/README.md)
- [Pagefind Search](./packages/search-pagefind/README.md)
- [Developer Tools](./packages/devtools/README.md)

## Migration from Contentlayer

Coming soon: `@cl3/migrate` codemod to automatically upgrade Contentlayer projects.

## Examples

- [Next.js App Router](./apps/example-nextjs)
- [Pages Router](./apps/example-pages)
- [Edge Runtime](./apps/example-cloudflare)

## License

MIT
