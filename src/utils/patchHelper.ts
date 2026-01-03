import { compare, type Operation } from 'fast-json-patch';

/**
 * Creates a JSON Patch document by comparing simple objects.
 * Wraps fast-json-patch's compare for consistency.
 */
export const createPatch = (original: any, modified: any): Operation[] => {
  return compare(original, modified);
};

export type { Operation };
