# @contentlayer3/mcp

MCP server for AI-assisted contentlayer3 governance. Exposes collections, schemas, Postman sync state, and GraphQL validation as [MCP](https://modelcontextprotocol.io) tools — letting AI assistants (Claude, Cursor, etc.) query and triage your content layer using natural language.

## Install

```bash
npm add -D @contentlayer3/mcp
```

## Quick Start

### 1. Create `contentlayer3.mcp.json`

Add a sidecar config in your project root:

```json
{
  "collections": [
    {
      "name": "posts",
      "fields": {
        "title": "string",
        "date": "string",
        "slug": "string",
        "excerpt": { "type": "string", "optional": true },
        "tags": { "type": "string[]", "optional": true }
      }
    }
  ]
}
```

### 2. Register with your MCP client

**Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "contentlayer3": {
      "command": "contentlayer3-mcp"
    }
  }
}
```

**Cursor** (`.cursor/mcp.json` in your project):

```json
{
  "mcpServers": {
    "contentlayer3": {
      "command": "contentlayer3-mcp"
    }
  }
}
```

The server must be run from your project root so it can find `contentlayer3.mcp.json`, `contentlayer3.lock`, and `contentlayer3.graphql.json`.

## Tools

### `get-collection`

Load a collection by name. Returns items and count.

**Input:** `{ "name": "posts" }`

**Output:**
```json
{
  "name": "posts",
  "items": [...],
  "count": 12
}
```

### `validate-collection`

Validate all items in a collection against its Zod schema. Returns per-item errors if any fail.

**Input:** `{ "name": "posts" }`

**Output:**
```json
{
  "name": "posts",
  "valid": true,
  "itemCount": 12,
  "errors": []
}
```

### `get-schema`

Return field names and types for a collection as defined in `contentlayer3.mcp.json`.

**Input:** `{ "name": "posts" }`

**Output:**
```json
{
  "name": "posts",
  "fields": ["title", "date", "slug", "excerpt", "tags"]
}
```

### `postman-status`

Read the current sync state for all governed sources from `contentlayer3.lock`. No Postman API call is made.

**Input:** _(none)_

**Output:**
```json
{
  "governed": {
    "my-api": {
      "postmanCollectionId": "abc123",
      "postmanCollectionName": "My API",
      "specHash": "sha256:...",
      "lastSyncedAt": "2025-01-15T10:30:00Z"
    }
  },
  "unregistered": [],
  "ignored": []
}
```

### `postman-diff`

Fetch the last-saved diff for a governed collection from `.contentlayer3/tmp/<name>.diff.json`. Only available after running `contentlayer3-postman pull <name>`.

**Input:** `{ "name": "my-api" }`

**Output:**
```json
{
  "name": "my-api",
  "available": true,
  "diff": { ... }
}
```

### `graphql-validate`

Validate the GraphQL schema from `contentlayer3.graphql.json`. Reports any structural errors.

**Input:** _(none)_

**Output:**
```json
{
  "valid": true,
  "errors": []
}
```

## Field Types

Supported field types in `contentlayer3.mcp.json`:

| Type | Example |
| --- | --- |
| `"string"` | `"title": "string"` |
| `"number"` | `"views": "number"` |
| `"boolean"` | `"published": "boolean"` |
| `"string[]"` | `"tags": "string[]"` |
| `"number[]"` | `"scores": "number[]"` |
| Optional field | `"excerpt": { "type": "string", "optional": true }` |

## Example Prompts

Once connected, you can ask your AI assistant:

- "Are any of my contentlayer3 collections out of sync with Postman?"
- "Show me the schema for my posts collection"
- "Validate the posts collection and tell me if anything is missing required fields"
- "Is my GraphQL schema valid?"
- "What fields does the products collection have?"

## Related

- [Postman Governance](../postman/README.md) — CLI for managing Postman sync
- [GraphQL Plugin](../graphql/README.md) — Expose collections as a GraphQL endpoint
- [Root README](../../README.md) — Full package overview
