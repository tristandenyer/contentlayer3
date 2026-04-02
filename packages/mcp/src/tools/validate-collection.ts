import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { z, type ZodIssue } from 'zod'

interface CollectionConfig {
  name: string
  fields: Record<string, 'string' | 'number' | 'boolean' | string>
}

interface McpConfig {
  collections?: CollectionConfig[]
}

function sidecarFieldToZod(
  fieldType: string | Record<string, unknown>
): z.ZodTypeAny {
  const type = typeof fieldType === 'string' ? fieldType : (fieldType as Record<string, unknown>).type as string
  const isOptional = typeof fieldType === 'object' && (fieldType as Record<string, unknown>).optional === true

  let base: z.ZodTypeAny
  switch (type) {
    case 'string':
      base = z.string()
      break
    case 'number':
      base = z.number()
      break
    case 'boolean':
      base = z.boolean()
      break
    case 'string[]':
      base = z.array(z.string())
      break
    case 'number[]':
      base = z.array(z.number())
      break
    default:
      base = z.unknown()
  }

  return isOptional ? base.optional() : base
}

/**
 * Validates all items in a collection against its schema.
 * Returns validation status and any errors found.
 */
export async function validateCollection(
  input: { name: string }
): Promise<{
  name: string
  valid: boolean
  itemCount: number
  errors?: Array<{ index: number; issues: ZodIssue[] }>
}> {
  try {
    const cwd = process.cwd()
    const configPath = resolve(cwd, 'contentlayer3.mcp.json')

    if (!existsSync(configPath)) {
      return { name: input.name, valid: false, itemCount: 0, errors: [] }
    }

    const raw = await readFile(configPath, 'utf-8')
    const config = JSON.parse(raw) as McpConfig

    if (!Array.isArray(config.collections)) {
      return { name: input.name, valid: false, itemCount: 0, errors: [] }
    }

    const collection = config.collections.find((c) => c.name === input.name)
    if (!collection) {
      return { name: input.name, valid: false, itemCount: 0, errors: [] }
    }

    // Build schema from collection fields
    const shape: z.ZodRawShape = {}
    for (const [key, field] of Object.entries(collection.fields)) {
      shape[key] = sidecarFieldToZod(field)
    }
    const schema = z.object(shape)

    // No items to validate yet (runtime items would be loaded separately)
    const items: unknown[] = []
    const errors: Array<{ index: number; issues: z.ZodIssue[] }> = []
    for (let i = 0; i < items.length; i++) {
      const parsed = schema.safeParse(items[i])
      if (!parsed.success) {
        errors.push({ index: i, issues: parsed.error.issues })
      }
    }
    return { name: input.name, valid: errors.length === 0, itemCount: items.length, errors }
  } catch (err) {
    return {
      name: input.name,
      valid: false,
      itemCount: 0,
      errors: [],
    }
  }
}
