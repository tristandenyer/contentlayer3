export class CL3ValidationError extends Error {
    collectionName;
    filePath;
    fieldPath;
    issue;
    constructor(collectionName, filePath, fieldPath, issue) {
        super(`[CL3] Validation error in '${collectionName}' at ${filePath}: ${fieldPath} — ${issue}`);
        this.collectionName = collectionName;
        this.filePath = filePath;
        this.fieldPath = fieldPath;
        this.issue = issue;
        this.name = 'CL3ValidationError';
    }
}
export class CL3SourceError extends Error {
    collectionName;
    constructor(collectionName, cause) {
        super(`[CL3] Source error in '${collectionName}': ${cause.message}`, { cause });
        this.collectionName = collectionName;
        this.name = 'CL3SourceError';
    }
}
//# sourceMappingURL=errors.js.map