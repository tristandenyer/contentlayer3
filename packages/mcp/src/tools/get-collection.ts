import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
interface CollectionConfig {
  name: string
  fields: Record<string, unknown>
}

interface McpConfig {
  collections?: CollectionConfig[]
}

/**
 * Loads a collection by name from contentlayer3.mcp.json sidecar config.
 * Returns items and count, or error message if collection not found.
 */
export async function getCollection(
  input: { name: string }
): Promise<{ name: string; items?: unknown[]; count?: number; error?: string }> {
  try {
    const cwd = process.cwd()
    const configPath = resolve(cwd, 'contentlayer3.mcp.json')

    if (!existsSync(configPath)) {
      return { name: input.name, error: 'contentlayer3.mcp.json not found' }
    }

    const raw = await readFile(configPath, 'utf-8')
    const config = JSON.parse(raw) as McpConfig

    if (!Array.isArray(config.collections)) {
      return { name: input.name, error: 'No collections defined in config' }
    }

    const collection = config.collections.find((c) => c.name === input.name)
    if (!collection) {
      return { name: input.name, error: `Collection "${input.name}" not found` }
    }

    // At runtime, items would be loaded from the actual collection
    // For now, return empty array since this is schema-driven
    const items: unknown[] = []
    return { name: input.name, items, count: items.length }
  } catch (err) {
    return {
      name: input.name,
      error: `Failed to load collection: ${err instanceof Error ? err.message : String(err)}`,
    }
  }
}
