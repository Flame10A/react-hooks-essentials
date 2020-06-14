import { useRef } from "react";

/**
 * Provides a single-instance version of the input function.
 *
 * The returned function retains a single instance, but acts identically
 *     to the latest version of the input function.
 *
 * This hook does not use a dependency array.
 */
export default <T extends (...args: any[]) => any>(func: T): (...args: Parameters<T>) => ReturnType<T> => {
    const inputRef = useRef<T>();
    inputRef.current = func;

    const wrapperRef = useRef<(...args: Parameters<T>) => ReturnType<T>>();
    if (!wrapperRef.current) {
        wrapperRef.current = (...args: Parameters<T>) => {
            return (inputRef.current as T)(...args);
        };
    }

    return wrapperRef.current;
};