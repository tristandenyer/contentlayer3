export function createMemoryCache() {
    const store = new Map();
    const DEFAULT_TTL = 60_000;
    return {
        get(key) {
            const entry = store.get(key);
            if (!entry)
                return undefined;
            if (Date.now() > entry.expiresAt) {
                store.delete(key);
                return undefined;
            }
            return entry.value;
        },
        set(key, value, ttl = DEFAULT_TTL) {
            store.set(key, { value, expiresAt: Date.now() + ttl });
        },
        invalidate(key) {
            store.delete(key);
        },
    };
}
//# sourceMappingURL=cache.js.map