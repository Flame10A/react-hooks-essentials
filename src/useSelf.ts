import { useRef, useEffect } from "react";

import useMethod from "./useMethod";

interface UseSelfResult {
    /**
     * Single-instance function which indicates whether the hook is mounted.
     */
    isMounted(): boolean
};

/**
 * Provides single-instance utility functions related to the component
 *     lifecycle.
 *
 * Currently only provides `isMounted()`.
 *
 * The returned **object is not single-instance**, so should not be included as
 *     a dependency in another hook. However, as its contents are
 *     single-instance, it does not need to be included as a dependency in order
 *     to work correctly.
 */
export default (): UseSelfResult => {
    const isMountedRef = useRef(true);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const isMounted = useMethod(() => isMountedRef.current);

    return { isMounted };
};