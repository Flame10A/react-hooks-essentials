import { renderHook } from "@testing-library/react-hooks";
import useMethod from "./useMethod";

describe("useMethod()", () => {
    it ("Returns a function which acts like the input function", () => {
        const joinFunc = (...args: any[]) => args.map(v => String(v)).join(" ");
        const sumFunc = (...args: any[]) => args.reduce((acc, v) => acc + v, 0);

        const args = [5, 3, 1];

        const joinSpecRes = joinFunc(...args);
        const sumSpecRes = sumFunc(...args);

        let inputFunction = joinFunc;
        const hook = renderHook(() => useMethod(inputFunction));

        const joinRes = hook.result.current(...args);

        inputFunction = sumFunc;
        hook.rerender();

        const sumRes = hook.result.current(...args);

        expect(joinRes).toBe(joinSpecRes);
        expect(sumRes).toBe(sumSpecRes);
    });

    it("Returns a single-instance function", () => {
        let inputFunction = () => 5;

        const hook = renderHook(() => useMethod(inputFunction));

        const res1 = hook.result.current;

        hook.rerender();

        const res2 = hook.result.current;

        inputFunction = () => 7;
        hook.rerender();

        const res3 = hook.result.current;

        expect(res1).toBe(res2);
        expect(res2).toBe(res3);
    });
});