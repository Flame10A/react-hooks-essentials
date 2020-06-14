/**
 * Compares the "basic" type of two values, accounting for:
 * - `typeof` value
 * - `Array.isArray()` result
 * - Equality to `null` (as `typeof null` is `object`)
 */
export const matchesType = (a: unknown, b: unknown): boolean => {
    if (typeof a !== typeof b) {
        return false;
    }

    if (typeof a === "object") {
        return (
            (a === null) == (b === null)
            && Array.isArray(a) === Array.isArray(b)
        );
    }

    return true;
};