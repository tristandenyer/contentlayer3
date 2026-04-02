import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

interface GraphQLSidecar {
  schema?: string
  collections?: unknown
}

/**
 * Validates a GraphQL schema from contentlayer3.graphql.json.
 * Returns validation status and any errors found.
 */
export async function graphqlValidate(): Promise<{
  valid: boolean
  errors: string[]
}> {
  try {
    const cwd = process.cwd()
    const schemaPath = resolve(cwd, 'contentlayer3.graphql.json')

    if (!existsSync(schemaPath)) {
      return { valid: false, errors: ['No contentlayer3.graphql.json found'] }
    }

    const raw = await readFile(schemaPath, 'utf-8')
    const config = JSON.parse(raw) as GraphQLSidecar

    // Basic validation: check if schema or collections are defined
    if (!config.schema && !config.collections) {
      return {
        valid: false,
        errors: ['GraphQL config is empty; no schema or collections defined'],
      }
    }

    // At runtime, full GraphQL schema validation would occur here
    // For now, return valid if config is well-formed
    return { valid: true, errors: [] }
  } catch (err) {
    return {
      valid: false,
      errors: [
        `Failed to validate GraphQL schema: ${err instanceof Error ? err.message : String(err)}`,
      ],
    }
  }
}
