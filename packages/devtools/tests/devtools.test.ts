import { describe, it, expect, vi, beforeEach } from 'vitest'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { writeFile, mkdir } from 'node:fs/promises'
import { z } from 'zod'
import { loadCL3Config } from '../src/loader.js'
import { runInspect } from '../src/commands/inspect.js'
import { runValidate } from '../src/commands/validate.js'

// Helper to make a mock collection
function makeCollection(name: string, items: unknown[]) {
  return {
    name,
    source: { load: async () => items },
    schema: z.object({ title: z.string() }),
    config: {
      name,
      source: { load: async () => items },
      schema: z.object({ title: z.string() }),
    },
  }
}

describe('loadCL3Config', () => {
  it('loads config and returns collection map', async () => {
    const dir = join(tmpdir(), `cl3-devtools-${Date.now()}`)
    await mkdir(dir, { recursive: true })
    const configPath = join(dir, 'cl3.config.js')
    await writeFile(configPath, `
      export const posts = {
        name: 'posts',
        source: { load: async () => [] },
        schema: { parse: (x) => x, safeParse: (x) => ({ success: true, data: x }), shape: {} },
        config: { name: 'posts', source: { load: async () => [] }, schema: {} },
      }
    `)
    const { collections } = await loadCL3Config(configPath)
    expect(Object.keys(collections)).toContain('posts')
  })
})

describe('runInspect', () => {
  it('prints collection name and item count', async () => {
    const logs: string[] = []
    vi.spyOn(console, 'log').mockImplementation((...args) => logs.push(args.join(' ')))

    const col = makeCollection('articles', [{ title: 'A' }, { title: 'B' }])
    await runInspect({ articles: col as any })

    const output = logs.join('\n')
    expect(output).toContain('articles')
    vi.restoreAllMocks()
  })

  it('shows helpful error for unknown collection name', async () => {
    const errors: string[] = []
    const exits: number[] = []
    vi.spyOn(console, 'error').mockImplementation((...args) => errors.push(args.join(' ')))
    vi.spyOn(process, 'exit').mockImplementation((code) => {
      exits.push(code as number)
      throw new Error('exit')
    })

    const col = makeCollection('posts', [])
    await expect(runInspect({ posts: col as any }, 'unknown')).rejects.toThrow('exit')

    expect(errors.some(e => e.includes('"unknown"'))).toBe(true)
    vi.restoreAllMocks()
  })
})

describe('runValidate', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('passes with valid content (returns false = no errors)', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    const col = makeCollection('posts', [{ title: 'Hello' }])
    const hasErrors = await runValidate({ posts: col as any })
    expect(hasErrors).toBe(false)
    vi.restoreAllMocks()
  })

  it('fails with invalid content (returns true = has errors)', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const col = {
      name: 'broken',
      source: { load: async () => [{ title: 123 }] }, // wrong type
      schema: z.object({ title: z.string() }),
      config: {
        name: 'broken',
        source: { load: async () => [{ title: 123 }] },
        schema: z.object({ title: z.string() }),
      },
    }
    const hasErrors = await runValidate({ broken: col as any })
    expect(hasErrors).toBe(true)
    vi.restoreAllMocks()
  })

  it('validate output includes error details', async () => {
    const errors: string[] = []
    vi.spyOn(console, 'error').mockImplementation((...args) => errors.push(args.join(' ')))
    const col = {
      name: 'errcol',
      source: { load: async () => [{ title: 999 }] },
      schema: z.object({ title: z.string() }),
      config: {
        name: 'errcol',
        source: { load: async () => [{ title: 999 }] },
        schema: z.object({ title: z.string() }),
      },
    }
    await runValidate({ errcol: col as any })
    expect(errors.some(e => e.includes('errcol'))).toBe(true)
    vi.restoreAllMocks()
  })
})

describe('CLI --help', () => {
  it('cli.ts exports are importable', async () => {
    const { loadCL3Config } = await import('../src/loader.js')
    expect(typeof loadCL3Config).toBe('function')
  })
})
