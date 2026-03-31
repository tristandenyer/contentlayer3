import type { MDXOptions, MDXResult } from './types.js'
import { compileMDX } from './compile.js'

export function withMDX(options?: MDXOptions) {
  return async function mdxTransform<T extends { _content: string }>(
    item: T
  ): Promise<T & { mdx: MDXResult }> {
    const result = await compileMDX(item._content, options)
    return { ...item, mdx: result }
  }
}
