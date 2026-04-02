import pc from 'picocolors'
import { buildGraphQLSchema } from '../lib/schema-builder.js'
import { loadCollections } from '../lib/collection-loader.js'
import { validateSchema } from 'graphql'

/**
 * Validate the generated GraphQL schema for structural errors.
 * Exits 1 if the schema is invalid.
 */
export async function runValidate(opts: { json?: boolean } = {}): Promise<void> {
  if (!opts.json) {
    process.stdout.write('Loading collections...  ')
  }
  const collections = await loadCollections()

  if (collections.length === 0) {
    if (opts.json) {
      console.log(JSON.stringify({ valid: false, errors: ['No collections found in contentlayer3.config.ts.'] }))
    } else {
      console.error(pc.red('No collections found in contentlayer3.config.ts.'))
    }
    process.exit(1)
  }
  if (!opts.json) {
    console.log(pc.green('✓'))
  }

  if (!opts.json) {
    process.stdout.write('Building schema...  ')
  }
  const schema = buildGraphQLSchema(collections)
  if (!opts.json) {
    console.log(pc.green('✓'))
  }

  if (!opts.json) {
    process.stdout.write('Validating schema...  ')
  }
  const errors = validateSchema(schema)

  if (errors.length > 0) {
    const errorMessages = errors.map((err) => err.message)
    if (opts.json) {
      console.log(JSON.stringify({ valid: false, errors: errorMessages }))
    } else {
      console.log(pc.red('✗'))
      console.error(pc.red(`\nSchema validation failed (${errors.length} error(s)):\n`))
      for (const err of errors) {
        console.error(`  ${pc.red('•')} ${err.message}`)
      }
    }
    process.exit(1)
  }

  if (opts.json) {
    console.log(JSON.stringify({ valid: true, errors: [] }))
  } else {
    console.log(pc.green('✓'))
    console.log(pc.green('\nSchema is valid.'))
  }
}
