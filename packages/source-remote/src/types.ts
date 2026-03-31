export interface RemoteSourceOptions {
  endpoint: string
  headers?: Record<string, string>
  transform?: (raw: unknown) => unknown[]
  pagination?: {
    strategy: 'offset' | 'cursor' | 'none'
    pageSize?: number
    offsetParam?: string
    limitParam?: string
    cursorParam?: string
    cursorResponseKey?: string
  }
  timeout?: number
}

export class CL3SourceError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number
  ) {
    super(message)
    this.name = 'CL3SourceError'
  }
}
