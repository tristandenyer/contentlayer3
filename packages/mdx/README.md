# @cl3/mdx

MDX compilation for CL3 collections.

## Install

```bash
pnpm add @cl3/mdx
```

## Quick Start

```typescript
import { compileMDX } from '@cl3/mdx'

const result = await compileMDX(`
# Hello World

This is a paragraph.
`)

console.log(result.code) // Serialized React component
console.log(result.toc)  // Table of contents
console.log(result.readingTime) // { minutes, words }
```

## API Reference

### `compileMDX(content, options?)`

Compile MDX content to React-compatible JSX.

**Returns:**
```typescript
{
  code: string              // Serialized component function
  toc: TocEntry[]          // Heading hierarchy
  readingTime: {
    minutes: number
    words: number
  }
}
```

**Options:**
```typescript
interface CompileMDXOptions {
  jsx?: boolean            // Return JSX (default: false)
  development?: boolean    // Development mode
  components?: Record<string, any>  // Custom component overrides
}
```

## Types

- `CompileMDXOptions` — Compiler options
- `TocEntry` — `{ title: string; level: number; id: string }`
- `ReadingTime` — `{ minutes: number; words: number }`

## Edge Compatibility

✓ Edge-safe with serverless deployment

## License

MIT
