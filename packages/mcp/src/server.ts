import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { getCollection } from './tools/get-collection.js'
import { validateCollection } from './tools/validate-collection.js'
import { getSchema } from './tools/get-schema.js'
import { postmanStatus } from './tools/postman-status.js'
import { postmanDiff } from './tools/postman-diff.js'
import { graphqlValidate } from './tools/graphql-validate.js'

/**
 * Creates and configures the MCP server with all tools registered.
 */
export function createServer(): McpServer {
  const server = new McpServer({
    name: 'contentlayer3-mcp',
    version: '1.0.0',
  })

  server.registerTool(
    'get-collection',
    {
      description: 'Load a collection by name from contentlayer3.mcp.json',
      inputSchema: { name: z.string().describe('Name of the collection') },
    },
    async ({ name }) => {
      const result = await getCollection({ name })
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
    }
  )

  server.registerTool(
    'validate-collection',
    {
      description: 'Validate all items in a collection against its schema',
      inputSchema: { name: z.string().describe('Name of the collection') },
    },
    async ({ name }) => {
      const result = await validateCollection({ name })
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
    }
  )

  server.registerTool(
    'get-schema',
    {
      description: 'Get the schema (fields) for a collection',
      inputSchema: { name: z.string().describe('Name of the collection') },
    },
    async ({ name }) => {
      const result = await getSchema({ name })
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
    }
  )

  server.registerTool(
    'postman-status',
    {
      description: 'Get synchronization status from contentlayer3.lock',
    },
    async () => {
      const result = await postmanStatus()
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
    }
  )

  server.registerTool(
    'postman-diff',
    {
      description: 'Get diff for a specific collection if available',
      inputSchema: { name: z.string().describe('Name of the collection') },
    },
    async ({ name }) => {
      const result = await postmanDiff({ name })
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
    }
  )

  server.registerTool(
    'graphql-validate',
    {
      description: 'Validate GraphQL schema from contentlayer3.graphql.json',
    },
    async () => {
      const result = await graphqlValidate()
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
    }
  )

  return server
}
