# @cl3/source-filesystem

Filesystem-based content source for CL3.

## Install

```bash
pnpm add @cl3/source-filesystem
```

## Quick Start

```typescript
import { defineCollection } from '@cl3/core'
import { filesystem } from '@cl3/source-filesystem'
import { z } from 'zod'

const posts = defineCollection({
  name: 'posts',
  source: filesystem({
    contentDir: 'content/posts',
    pattern: '**/*.mdx',
  }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    body: z.string(),
  }),
})
```

## API Reference

### `filesystem(options)`

Create a filesystem content source.

**Options:**
```typescript
{
  contentDir: string        // Base content directory
  pattern: string          // Glob pattern (e.g., '**/*.mdx')
  extensions?: string[]    // File extensions to match
}
```

## Features

- Glob pattern matching
- MDX, Markdown, and custom formats
- File path metadata (`_filePath`)
- Auto-discovery with patterns

## Node.js Only

This package uses Node.js `fs` APIs and **cannot run on edge runtimes** (Cloudflare Workers, Vercel Edge Functions, etc.).

### For Edge Runtimes

Use `@cl3/source-remote` instead, which fetches content from HTTP endpoints:

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

## Edge Compatibility

✗ Node.js only (uses `fs` APIs)

## License

MIT
