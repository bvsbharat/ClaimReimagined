
/**
 * In-memory cache for generated scene images.
 * Key: Claim ID
 * Value: Base64 Image String or URL
 */
export const imageCache = new Map<string, string>();
