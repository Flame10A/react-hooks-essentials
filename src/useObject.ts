import { useRef } from "react";
import { matchesType } from "./utils";

type MergeFunction<T extends {}> = (target: T, input: T) => void;

const removeExtras = <T extends {}>(target: T, input: T) => {
    if (Array.isArray(target) && Array.isArray(input)) {
        while (target.length > input.length) {
            target.pop();
        }
    }
    else {
        for (const property in target) if (!(property in input)) {
            delete target[property];
        }
    }

};

const shallowMerger = <T extends {}>(target: T, input: T) => {
    removeExtras(target, input);

    Object.assign(target, input);
};

const deepMerger = <T extends {} | []>(target: T, input: T) => {
    removeExtras(target, input);

    for (const property in input) {
        const propertyInput = input[property];

        if (typeof propertyInput === "object") {
            if (!(property in target) || !matchesType(propertyInput, target[property])) {
                Object.assign(target, {
                    [property]: Array.isArray(propertyInput) ? [] : {}
                });
            }

            deepMerger(target[property], propertyInput);
        }
        else {
            Object.assign(target, {
                [property]: propertyInput
            })
        }
    }
};

/**
 * Provides a single-instance object, which is constantly updated with the
 *     contents of the `input` object.
 *
 * By default, performs shallow merging.
 *
 * Custom merge functions should always return the same `target` object, never
 *     creating a new root object.
 *
 * @param input
 * @param merge The type of merge to perform.
 *     Allowed values are "shallow", "deep", or a custom function.
 *     Default is "shallow".
 */
export default <T extends {}>(
    input: T,
    merge: "shallow" | "deep" | MergeFunction<T> = shallowMerger
): T => {
    const objRef = useRef({} as T);

    if (typeof merge === "string") {
        merge = merge === "deep" ? deepMerger : shallowMerger;
    }

    merge(objRef.current, input);

    return objRef.current;
};