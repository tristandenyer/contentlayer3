import type { z } from 'zod';
import type { Collection } from './types.js';
export declare function getCollection<TSchema extends z.ZodObject<z.ZodRawShape>>(collection: Collection<TSchema>, options?: {
    fresh?: boolean;
}): Promise<z.infer<TSchema>[]>;
export declare function getCollectionItem<TSchema extends z.ZodObject<z.ZodRawShape>>(collection: Collection<TSchema>, predicate: (item: z.infer<TSchema>) => boolean): Promise<z.infer<TSchema> | undefined>;
//# sourceMappingURL=get-collection.d.ts.map