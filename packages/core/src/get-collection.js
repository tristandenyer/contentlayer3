import { createMemoryCache } from './cache.js';
import { CL3ValidationError, CL3SourceError } from './errors.js';
const globalCache = createMemoryCache();
export async function getCollection(collection, options) {
    const cacheKey = `cl3:${collection.name}`;
    if (!options?.fresh) {
        const cached = globalCache.get(cacheKey);
        if (cached !== undefined)
            return cached;
    }
    let rawItems;
    try {
        rawItems = await collection.source.load();
    }
    catch (err) {
        throw new CL3SourceError(collection.name, err instanceof Error ? err : new Error(String(err)));
    }
    const results = [];
    for (const raw of rawItems) {
        const parsed = collection.schema.safeParse(raw);
        if (!parsed.success) {
            const issue = parsed.error.issues[0];
            const fieldPath = issue?.path.join('.') ?? '(unknown)';
            const filePath = raw._filePath ?? '(unknown)';
            throw new CL3ValidationError(collection.name, filePath, fieldPath, issue?.message ?? 'Unknown error');
        }
        results.push(parsed.data);
    }
    globalCache.set(cacheKey, results);
    return results;
}
export async function getCollectionItem(collection, predicate) {
    const items = await getCollection(collection);
    return items.find(predicate);
}
//# sourceMappingURL=get-collection.js.map