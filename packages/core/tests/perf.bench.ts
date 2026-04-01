import { bench, describe } from 'vitest'
import { defineCollection, getCollection } from '../src/index.js'
import { z } from 'zod'

const schema = z.object({
  title: z.string(),
  slug: z.string(),
  body: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
})

const largeItems = Array.from({ length: 1000 }, (_, i) => ({
  title: `Post ${i}`,
  slug: `post-${i}`,
  body: 'Lorem ipsum '.repeat(50),
  date: '2024-01-01',
  tags: ['tag1', 'tag2'],
}))

const largeCollection = defineCollection({
  name: `perf-bench-${Date.now()}`,
  source: { load: async () => largeItems },
  schema,
})

describe('getCollection performance', () => {
  bench('1000 documents — cold load', async () => {
    await getCollection(largeCollection, { fresh: true })
  })

  bench('1000 documents — warm cache hit', async () => {
    await getCollection(largeCollection)
  })
})
