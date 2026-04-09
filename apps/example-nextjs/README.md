# example-nextjs

Next.js App Router example using Contentlayer3 with a local filesystem source.

## What this demonstrates

- `defineCollection` with a filesystem source (MDX files)
- Zod schema validation with `z.coerce.string()` for date fields
- `getCollection` in a Next.js App Router page with ISR via `revalidateTag`
- Draft filtering with `published: z.boolean().default(true)`

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
apps/example-nextjs/
├── app/
│   ├── page.tsx          # post listing, calls getCollection
│   └── posts/[slug]/
│       └── page.tsx      # individual post page
├── content/
│   └── posts/            # MDX source files
├── cl3.config.ts         # collection definitions
└── next.config.ts
```

## Key files

**[cl3.config.ts](./cl3.config.ts)** defines the `posts` collection:

```ts
export const posts = defineCollection({
  name: 'posts',
  source: filesystem({ contentDir: 'content/posts', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.string(),
    excerpt: z.string(),
    published: z.boolean().default(true),
    _filePath: z.string().optional(),
  }),
})
```
