import { renderHook } from "@testing-library/react-hooks";
import useGetter from "./useGetter";

describe("useGetter()", () => {
    it("Returns a function which returns the input value as of the most recent render.", () => {
        const value1 = 5
        const value2 = "Hello";

        let input: number | string = value1;

        const hook = renderHook(() => useGetter(input));

        const res1 = hook.result.current();

        input = value2;
        hook.rerender();

        const res2 = hook.result.current();

        expect(res1).toBe(value1);
        expect(res2).toBe(value2);
    });

    it("Returns a single-instance function.", () => {
        let input = {};

        const hook = renderHook(() => useGetter(input));

        const res1 = hook.result.current;

        input = {};
        hook.rerender();

        const res2 = hook.result.current;

        expect(res1).toBe(res2);
    });
});