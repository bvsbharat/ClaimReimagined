
/**
 * In-memory cache for generated scene images.
 * Key: Claim ID
 * Value: Base64 Image String or URL
 */
export const imageCache = new Map<string, string>();

/**
 * In-memory cache for generated evidence images.
 * Key: Claim ID
 * Value: Array of Base64 Image Strings
 */
export const evidenceCache = new Map<string, string[]>();
