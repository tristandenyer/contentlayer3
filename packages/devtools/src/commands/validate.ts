import pc from 'picocolors'
import { getCollectionBase } from 'contentlayer3'
import type { Collection } from 'contentlayer3'

export async function runValidate(
  collections: Record<string, Collection<any>>,
  opts?: { json?: boolean }
): Promise<boolean> {
  let hasErrors = false
  const results: Array<{
    name: string
    status: 'ok' | 'error'
    itemCount: number
    error?: string
  }> = []

  for (const [, collection] of Object.entries(collections)) {
    try {
      const items = await getCollectionBase(collection, { fresh: true })
      if (!opts?.json) {
        console.log(pc.green(`✓ ${collection.name}`) + ` — ${items.length} items, 0 errors`)
      }
      results.push({
        name: collection.name,
        status: 'ok',
        itemCount: items.length,
      })
    } catch (err) {
      hasErrors = true
      const msg = err instanceof Error ? err.message : String(err)
      if (!opts?.json) {
        console.error(pc.red(`✗ ${collection.name}`) + ` — ${msg}`)
      }
      results.push({
        name: collection.name,
        status: 'error',
        itemCount: 0,
        error: msg,
      })
    }
  }

  if (opts?.json) {
    console.log(JSON.stringify({ collections: results }))
  }

  return hasErrors
}
