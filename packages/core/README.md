# @cl3/core

Runtime-first content layer for Next.js. Define, validate, and fetch collections at request time.

## Install

```bash
pnpm add @cl3/core zod
```

## Quick Start

```typescript
import { defineCollection, getCollection } from '@cl3/core'
import { z } from 'zod'

// Define a collection
export const posts = defineCollection({
  name: 'posts',
  source: { /* source plugin */ },
  schema: z.object({
    title: z.string(),
    date: z.string(),
    body: z.string(),
  }),
})

// Fetch in a server component
const allPosts = await getCollection(posts)
```

## API Reference

### `defineCollection(config)`

Define a content collection with validation and source.

```typescript
interface CollectionConfig {
  name: string
  source: CollectionSource
  schema: z.ZodSchema
  cache?: { ttl?: number }
  plugins?: Plugin[]
}
```

### `getCollection(collection, options?)`

Fetch all items from a collection. Optional `select` returns only specified fields.

```typescript
const posts = await getCollection(posts)
const titles = await getCollection(posts, { 
  select: ['title', 'date'] 
})
```

**Options:**
- `fresh?: boolean` — Skip cache and fetch fresh data
- `select?: string[]` — Return only these fields

### `getCollectionItem(collection, id, options?)`

Fetch a single item by ID.

```typescript
const post = await getCollectionItem(posts, 'hello-world')
```

### Types

- `Collection` — Runtime collection definition
- `CollectionConfig` — Configuration object
- `CollectionSource` — Plugin interface for content sources
- `CL3Cache` — Cache configuration

### Errors

- `CL3ValidationError` — Schema validation failed
- `CL3SourceError` — Source fetch/parse failed

## Edge Compatibility

✓ Edge-safe (zero Node.js APIs)

## License

MIT
