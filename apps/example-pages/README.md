# example-pages

Next.js Pages Router example using Contentlayer3 with a local filesystem source.

## What this demonstrates

- `defineCollection` with a filesystem source shared across apps
- `getCollection` in `getStaticProps` for static generation
- `getCollectionItem` in `getStaticPaths` for individual post pages

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

## Structure

```
apps/example-pages/
├── pages/
│   ├── index.tsx         # post listing, uses getStaticProps
│   └── posts/
│       └── [slug].tsx    # individual post page
├── cl3.config.ts         # collection definitions
└── next.config.ts
```

## Key files

**[cl3.config.ts](./cl3.config.ts)** reuses the content directory from `example-nextjs`:

```ts
export const posts = defineCollection({
  name: 'pages-posts',
  source: filesystem({
    contentDir: '../example-nextjs/content/posts',
    pattern: '**/*.mdx',
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.string(),
    excerpt: z.string(),
    published: z.boolean().default(true),
    _filePath: z.string().optional(),
  }),
})
```
