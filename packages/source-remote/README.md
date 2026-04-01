# @cl3/source-remote

HTTP remote content source for CL3. Perfect for edge runtimes and distributed content APIs.

## Install

```bash
pnpm add @cl3/source-remote
```

## Quick Start

```typescript
import { defineCollection } from '@cl3/core'
import { remote } from '@cl3/source-remote'
import { z } from 'zod'

const posts = defineCollection({
  name: 'posts',
  source: remote({
    endpoint: 'https://api.example.com/posts',
    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
    },
  }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    body: z.string(),
  }),
})
```

## API Reference

### `remote(options)`

Create a remote HTTP content source.

**Options:**
```typescript
{
  endpoint: string                  // API URL
  headers?: Record<string, string> // Custom headers
  transform?: (data: any) => any   // Transform API response
  pagination?: {
    mode: 'offset' | 'cursor'      // Pagination strategy
    limit?: number                 // Items per page
    param?: string                 // Param name (default: 'offset' or 'cursor')
  }
  timeout?: number                 // Request timeout in ms (default: 30000)
}
```

## Features

- Edge-safe (runs on Cloudflare Workers, Vercel Edge Functions)
- Automatic pagination handling
- Custom header support
- Response transformation pipeline
- Configurable timeouts

## Edge Compatibility

✓ Edge-safe (zero Node.js APIs)

## License

MIT
