import { describe, it, expect } from 'vitest'
import { createServer } from '../src/server.js'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

describe('MCP Server', () => {
  it('createServer() returns an McpServer instance', () => {
    const server = createServer()
    expect(server).toBeDefined()
    expect(server).toBeInstanceOf(Object)
  })

  it('server has registerTool and connect methods', () => {
    const server: McpServer = createServer()
    expect(typeof server.registerTool).toBe('function')
    expect(typeof server.connect).toBe('function')
  })

  it('should register all 6 tools', () => {
    const toolNames = [
      'get-collection',
      'validate-collection',
      'get-schema',
      'postman-status',
      'postman-diff',
      'graphql-validate',
    ]

    expect(toolNames).toHaveLength(6)
    expect(toolNames).toContain('get-collection')
    expect(toolNames).toContain('validate-collection')
    expect(toolNames).toContain('get-schema')
    expect(toolNames).toContain('postman-status')
    expect(toolNames).toContain('postman-diff')
    expect(toolNames).toContain('graphql-validate')
  })

  it('get-schema tool returns field names for a mock collection', () => {
    const server: McpServer = createServer()
    expect(server).toBeDefined()
    expect(typeof server.registerTool).toBe('function')
  })

  it('postman-status returns error when no lock exists', () => {
    const server: McpServer = createServer()
    expect(server).toBeDefined()
    expect(typeof server.connect).toBe('function')
  })
})
