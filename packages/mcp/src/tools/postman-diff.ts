import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

/**
 * Reads a diff file for a specific collection if it exists.
 * Returns the diff object or indicates that no diff is available.
 */
export async function postmanDiff(
  input: { name: string }
): Promise<{
  name: string
  available: boolean
  diff?: unknown
}> {
  try {
    const cwd = process.cwd()
    const diffPath = resolve(cwd, `.contentlayer3/tmp/${input.name}.diff.json`)

    if (!existsSync(diffPath)) {
      return { name: input.name, available: false }
    }

    const raw = await readFile(diffPath, 'utf-8')
    const diff = JSON.parse(raw) as unknown

    return { name: input.name, available: true, diff }
  } catch (err) {
    return {
      name: input.name,
      available: false,
    }
  }
}
