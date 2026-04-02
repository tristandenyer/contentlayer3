import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

interface LockSource {
  name: string
  kind: string
  collectionName: string
  lastSyncedAt?: string
}

interface ContentlayerLock {
  sources?: LockSource[]
}

/**
 * Reads contentlayer3.lock and returns synchronization status.
 * Returns error if lock file does not exist.
 */
export async function postmanStatus(): Promise<{
  sources?: LockSource[]
  error?: string
}> {
  try {
    const cwd = process.cwd()
    const lockPath = resolve(cwd, 'contentlayer3.lock')

    if (!existsSync(lockPath)) {
      return { error: 'No contentlayer3.lock found' }
    }

    const raw = await readFile(lockPath, 'utf-8')
    const lock = JSON.parse(raw) as ContentlayerLock

    if (!Array.isArray(lock.sources)) {
      return { sources: [] }
    }

    return { sources: lock.sources }
  } catch (err) {
    return {
      error: `Failed to read lock file: ${err instanceof Error ? err.message : String(err)}`,
    }
  }
}
