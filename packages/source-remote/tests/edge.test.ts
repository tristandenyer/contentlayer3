import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

describe('source-remote edge safety', () => {
  it('source files contain no Node.js imports', () => {
    const src = readFileSync(join(__dirname, '../src/index.ts'), 'utf-8')
    expect(src).not.toContain('node:fs')
    expect(src).not.toContain('node:path')
    expect(src).not.toContain('node:crypto')
    expect(src).not.toContain("require(")
  })
})
