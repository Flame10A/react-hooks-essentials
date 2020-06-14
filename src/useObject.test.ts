import { renderHook } from "@testing-library/react-hooks";
import useObject from "./useObject";

describe("useObject()", () => {
    it ("Returns a single-instance object", () => {
        const obj1 = { a: 5 };
        const obj2 = { b: 7 };

        let input: {} = obj1;

        const hook = renderHook(() => useObject(input));

        const res1 = hook.result.current;

        hook.rerender();

        const res2 = hook.result.current;

        input = obj2;
        hook.rerender();

        const res3 = hook.result.current;

        expect(res1).toBe(res2);
        expect(res2).toBe(res2);
    });

    it("Returns an object updated to equal the input (shallow)", () => {
        const obj1 = { a: 5 };
        const obj2 = { a: 7 };
        const obj3 = { str: "Hello" };

        let input: {} = obj1;

        const hook = renderHook(() => useObject(input));

        const res1 = { ...hook.result.current };

        input = obj2;
        hook.rerender();

        const res2 = { ...hook.result.current };

        input = obj3;
        hook.rerender();

        const res3 = { ...hook.result.current };

        expect(res1).toEqual(obj1);
        expect(res2).toEqual(obj2);
        expect(res3).toEqual(obj3);
    });

    it("Doesn't mutate its inputs (shallow)", () => {
        const obj1 = { a: 5 };
        const obj2 = { b: 7 };

        const spec1 = { ...obj1 };

        let input: {} = obj1;

        const hook = renderHook(() => useObject(input));

        input = obj2;
        hook.rerender();

        expect(obj1).toEqual(spec1);
    });

    it("Returns an object updated to equal the input (deep)", () => {
        const obj1 = { a: 1, b: { c: 2 } };
        const obj2 = { a: 3, b: { c: 4 } };
        const obj3 = { d: 5, e: { f: 6 } };

        let input: {} = obj1;

        const hook = renderHook(() => useObject(input, "deep"));

        expect(hook.result.current).toEqual(obj1);
        expect(obj1).not.toBe(hook.result.current);

        input = obj2;
        hook.rerender();

        expect(hook.result.current).toEqual(obj2);
        expect(obj2).not.toBe(hook.result.current);

        input = obj3;
        hook.rerender();

        expect(hook.result.current).toEqual(obj3);
        expect(obj3).not.toBe(hook.result.current);
    });

    it("Doesn't mutate its inputs (deep)", () => {
        const obj1 = { a: 1, b: { c: 3 } };
        const obj2 = { b: 3, c: { a: 1 } };

        const spec1 = { a: 1, b: { c: 3 } };

        let input: {} = obj1;

        const hook = renderHook(() => useObject(input, "deep"));

        input = obj2;
        hook.rerender();

        expect(obj1).toEqual(spec1);
    });

    it("Can handle nested arrays (deep only)", () => {
        const obj1 = { a: 1 };
        const obj2 = { a: [1] };
        const obj3 = { a: [1, 2] };
        const obj4 = { a: [2] };
        const obj5 = { a: 2 };

        let input: { a: number | number[]} = obj1;
        const hook = renderHook(() => useObject(input, "deep"));

        input = obj2;
        hook.rerender();

        expect(hook.result.current).toEqual(obj2);
        expect(hook.result.current.a).toEqual(obj2.a);
        expect(hook.result.current.a).not.toBe(obj2.a);

        input = obj3;
        hook.rerender();

        expect(hook.result.current).toEqual(obj3);
        expect(hook.result.current.a).toEqual(obj3.a);

        input = obj4;
        hook.rerender();

        expect(hook.result.current).toEqual(obj4);
        expect(hook.result.current.a).toEqual(obj4.a);

        input = obj5;
        hook.rerender();

        expect(hook.result.current).toEqual(obj5);
    });

    it("Can use custom merge functions", () => {
        const obj1 = { a: 1 };
        const obj2 = { b: 2 };

        const retainShallow = <T extends {}>(a: T, b: T) => void Object.assign(a, b);

        let input: {} = obj1;

        const hook = renderHook(() => useObject(input, retainShallow));

        expect(hook.result.current).toEqual(obj1);

        input = obj2;
        hook.rerender();

        expect(hook.result.current).toEqual({ ...obj1, ...obj2 });
    });

    it("Correctly defaults to 'shallow' merging", () => {
        const deepObj = { d: 11 };
        const obj1 = { a: 5 };
        const obj2 = { b: 7, c: deepObj };

        let input: { a?: number, b?: number, c?: { d: number } } = obj1;

        const hookA = renderHook(() => useObject(input));
        const hookB = renderHook(() => useObject(input, "shallow"));

        expect(hookA.result.current).toEqual(hookB.result.current);

        input = obj2;
        hookA.rerender();
        hookB.rerender();

        expect(hookA.result.current).toEqual(hookB.result.current);
        expect(hookA.result.current.c).toBe(deepObj);
        expect(hookB.result.current.c).toBe(deepObj);
    });
});