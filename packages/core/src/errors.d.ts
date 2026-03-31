export declare class CL3ValidationError extends Error {
    readonly collectionName: string;
    readonly filePath: string;
    readonly fieldPath: string;
    readonly issue: string;
    constructor(collectionName: string, filePath: string, fieldPath: string, issue: string);
}
export declare class CL3SourceError extends Error {
    readonly collectionName: string;
    constructor(collectionName: string, cause: Error);
}
//# sourceMappingURL=errors.d.ts.map