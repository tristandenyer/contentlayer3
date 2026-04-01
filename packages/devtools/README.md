# @cl3/devtools

Developer tools and CLI for CL3.

## Install

```bash
pnpm add -D @cl3/devtools
```

## CLI Commands

```bash
# Validate all collections against their schemas
cl3 validate

# Inspect collection structure and metadata
cl3 inspect [collection-name]

# Watch collections for changes and rebuild
cl3 watch
```

## Quick Start

```bash
# Create cl3.config.ts in your project root
# Then run:
pnpm cl3 inspect posts
```

## API Reference

### `loadCL3Config(path?)`

Load and parse the `cl3.config.ts` file.

```typescript
const config = await loadCL3Config()
const { posts } = config
```

### `runValidate(collections?)`

Validate collections against their schemas.

```typescript
import { runValidate } from '@cl3/devtools'

const errors = await runValidate()
if (errors.length > 0) {
  console.error('Validation failed:', errors)
}
```

### `runInspect(collectionName?)`

Inspect collection structure and show metadata.

```typescript
import { runInspect } from '@cl3/devtools'

await runInspect('posts')
```

### `runWatch()`

Watch collections for changes and rebuild.

```typescript
import { runWatch } from '@cl3/devtools'

await runWatch()
```

## Edge Compatibility

✗ Node.js only (development tool)

## License

MIT
