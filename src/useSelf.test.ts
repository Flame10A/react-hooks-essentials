import { renderHook } from "@testing-library/react-hooks";
import useSelf from "./useSelf";

describe("useSelf()", () => {
    describe(".isMounted()", () => {
        it("Indicates whether the hook is mounted", () => {
            const hook = renderHook(() => useSelf());

            const { isMounted } = hook.result.current;

            expect(isMounted()).toBe(true);

            hook.unmount();

            expect(isMounted()).toBe(false);
        });
    });
});