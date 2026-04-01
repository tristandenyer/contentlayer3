# Changelog

## 1.0.0-rc (2025-03-30)

### Overview

CL3 reaches release candidate status with all 89 tests passing, zero typecheck errors, and complete stabilization and documentation.

### Phases 0-9 Complete

- **Phase 0**: Project setup with monorepo structure, TypeScript, Zod, and Vitest
- **Phase 1**: `@cl3/core` with collection definitions, caching, and validation
- **Phase 2**: `@cl3/source-filesystem` for file-based content
- **Phase 3**: `@cl3/source-remote` for HTTP APIs (edge-safe)
- **Phase 4**: `@cl3/next` with `unstable_cache` and revalidation
- **Phase 5**: `@cl3/mdx` for MDX compilation
- **Phase 6**: `@cl3/search-orama` for full-text search
- **Phase 7**: `@cl3/search-pagefind` for static search
- **Phase 8**: `@cl3/devtools` CLI (validate, inspect, watch)
- **Phase 9**: Stabilization and Documentation

### Major Features

- **Runtime-first content layer** for Next.js with ISR support
- **Edge-safe core** (`@cl3/core`, `@cl3/source-remote`) with zero Node.js APIs
- **Zod-only schema system** for single source of truth
- **Multiple content sources** (filesystem, HTTP remote)
- **Search integration** (Orama, Pagefind)
- **Automatic validation** and type inference
- **Next.js integration** with `unstable_cache` and `revalidateTag`
- **Developer CLI** for validation, inspection, and watching

### Documentation

- Comprehensive README for every package
- Root README with feature comparison and 5-minute quickstart
- Example apps (App Router, Pages Router, Edge Runtime)
- API reference for all exported functions and types
- Edge compatibility status for each package

### Quality

- 89 passing tests across all packages
- Zero typecheck errors with TypeScript strict mode
- ESM-only (no CommonJS)
- Security audit: no eval(), no new Function() in CL3 source
- All errors as `CL3ValidationError` or `CL3SourceError`

### Package Versions

All packages at `1.0.0-rc`:
- `@cl3/core` - Runtime collection system
- `@cl3/next` - Next.js adapter
- `@cl3/mdx` - MDX compilation
- `@cl3/source-filesystem` - File-based content
- `@cl3/source-remote` - HTTP remote content
- `@cl3/search-orama` - Orama search integration
- `@cl3/search-pagefind` - Pagefind search integration
- `@cl3/devtools` - Developer CLI tools

### Known Limitations

- Edge-safe packages: `@cl3/core`, `@cl3/source-remote`, `@cl3/mdx` (JSX mode)
- Node.js required for: `@cl3/next`, `@cl3/source-filesystem`, search plugins, devtools
- ISR and on-demand revalidation require Next.js App Router or Pages Router ISR

### What's Next

- `@cl3/migrate` codemod for Contentlayer migration
- `@cl3/vue` for Vue.js support
- `@cl3/db` for database sources (PostgreSQL, MySQL, SQLite)
- Additional search plugins (Typesense, Meilisearch)
- Advanced caching strategies

### Migration from Contentlayer

CL3 is a modern replacement for Contentlayer, focusing on:
- Runtime execution over build-time bundling
- Edge compatibility for core functionality
- Next.js ISR and on-demand revalidation
- Modern Next.js patterns (App Router, Server Components)

See the README for migration guidelines and examples.
