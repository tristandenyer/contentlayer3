import type { z } from 'zod';
import type { CollectionConfig, Collection } from './types.js';
export declare function defineCollection<TSchema extends z.ZodObject<z.ZodRawShape>>(config: CollectionConfig<TSchema>): Collection<TSchema>;
//# sourceMappingURL=collection.d.ts.map