# @cl3/search-pagefind

Pagefind search integration for CL3 collections.

## Install

```bash
pnpm add @cl3/search-pagefind pagefind
```

## Quick Start

```typescript
import { defineCollection } from '@cl3/core'
import { pagefindPlugin } from '@cl3/search-pagefind'
import { z } from 'zod'

const posts = defineCollection({
  name: 'posts',
  source: { /* ... */ },
  schema: z.object({
    title: z.string(),
    body: z.string(),
    slug: z.string(),
  }),
  plugins: [
    pagefindPlugin({
      outputPath: '.pagefind',
      fields: ['title', 'body'],
      urlField: 'slug',
    }),
  ],
})
```

## API Reference

### `pagefindPlugin(options)`

Create a Pagefind search plugin for static site generation.

**Options:**
```typescript
{
  outputPath: string        // Directory to write index
  fields: string[]          // Fields to index
  urlField?: string         // Field to use for URLs
  language?: string         // Tokenizer language
}
```

**Returns:**
```typescript
{
  onIndexReady: () => void
}
```

## Features

- Blazing-fast search index generation
- Compact binary format
- Multi-language support
- Perfect for static sites and SSG

## Edge Compatibility

⚠️ Node.js only (generates index files)

## License

MIT
