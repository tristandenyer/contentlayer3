# @cl3/next

Next.js adapter for CL3. Use `unstable_cache` for automatic caching and revalidation.

## Install

```bash
pnpm add @cl3/next
```

## Quick Start

```typescript
import { getCollection } from '@cl3/next'
import { posts } from '../cl3.config'

export default async function PostsPage() {
  const allPosts = await getCollection(posts)
  return (
    <ul>
      {allPosts.map(post => (
        <li key={post.slug}>{post.title}</li>
      ))}
    </ul>
  )
}
```

## API Reference

### `getCollection(collection, options?)`

Fetch collection with Next.js `unstable_cache` integration.

**Options:**
```typescript
{
  fresh?: boolean           // Skip cache
  select?: string[]         // Return only these fields
}
```

### `revalidateCollection(collection)`

Manually trigger cache revalidation.

```typescript
import { revalidateCollection } from '@cl3/next'

export async function POST() {
  revalidateCollection(posts)
  return Response.json({ revalidated: true })
}
```

## Webhook Revalidation

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

## Pages Router

Import from `@cl3/next/pages` for Pages Router support:

```typescript
import { getCollection } from '@cl3/next/pages'

export const getStaticProps = async () => {
  const posts = await getCollection(posts)
  return { props: { posts }, revalidate: 60 }
}
```

## Edge Compatibility

✗ Node.js only (uses Next.js `unstable_cache`)

## License

MIT
