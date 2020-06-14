import { useRef } from "react";

/**
 * Provides a single-instance function, which returns the given value.
 *
 * The returned function doesn't need to be included in dependency arrays,
 *     and will always return the latest version of the given value.
 */
export default <T>(value: T): (() => T) => {
    const valueHolder = useRef<T>(value);
    valueHolder.current = value;

    const getterHolder = useRef<() => T>();
    if (!getterHolder.current) {
        getterHolder.current = () => valueHolder.current;
    }

    return getterHolder.current;
};