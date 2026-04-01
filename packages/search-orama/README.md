# @cl3/search-orama

Full-text search plugin for CL3 collections using Orama.

## Install

```bash
pnpm add @cl3/search-orama @orama/orama
```

## Quick Start

```typescript
import { defineCollection } from '@cl3/core'
import { oramaIndexPlugin } from '@cl3/search-orama'
import { z } from 'zod'

const posts = defineCollection({
  name: 'posts',
  source: { /* ... */ },
  schema: z.object({
    title: z.string(),
    body: z.string(),
  }),
  plugins: [
    oramaIndexPlugin({
      schema: {
        title: 'string',
        body: 'string',
      },
    }),
  ],
})

// After collection loads, search is available
const results = await posts.search('typescript', { limit: 10 })
```

## API Reference

### `oramaIndexPlugin(options)`

Create an Orama search index plugin.

**Options:**
```typescript
{
  schema: Record<string, string>  // Field names and types
  language?: string               // Tokenizer language
  components?: any                // Custom components
}
```

**Returns:**
```typescript
{
  onIndexReady: (data: any[]) => void
  search: (query: string, opts?: SearchOpts) => Promise<SearchResult[]>
  getDb: () => Orama
}
```

## Types

- `SearchOptions` — `{ limit?: number; offset?: number; ... }`
- `SearchResult` — `{ id: string; score: number; [field]: any }`

## Features

- Real-time search indexing
- Configurable language tokenization
- Relevance scoring
- Pagination support

## Edge Compatibility

⚠️ Node.js only (uses in-memory database)

## License

MIT
