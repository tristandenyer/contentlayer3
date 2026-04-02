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
 * Returns the schema (field names and types) for a collection.
 */
export async function getSchema(
  input: { name: string }
): Promise<{
  name: string
  fields?: Array<{ name: string; type: string; optional: boolean }>
  error?: string
}> {
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

    const fields = Object.entries(collection.fields).map(([fieldName, fieldDef]) => {
      const isOptional = typeof fieldDef === 'object' && (fieldDef as Record<string, unknown>).optional === true
      const fieldType = typeof fieldDef === 'string' ? fieldDef : ((fieldDef as Record<string, unknown>).type as string)

      return {
        name: fieldName,
        type: fieldType,
        optional: isOptional,
      }
    })

    return { name: input.name, fields }
  } catch (err) {
    return {
      name: input.name,
      error: `Failed to load schema: ${err instanceof Error ? err.message : String(err)}`,
    }
  }
}
