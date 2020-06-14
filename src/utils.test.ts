import { matchesType } from "./utils";

describe("matchesType()", () => {
    it("Returns true when two values' types match", () => {
        expect(matchesType(1, 2)).toBe(true);
        expect(matchesType("a", "b")).toBe(true);
        expect(matchesType({}, {})).toBe(true);
        expect(matchesType([], [])).toBe(true);
        expect(matchesType(() => 1, () => "a")).toBe(true);
        expect(matchesType(null, null)).toBe(true);
        expect(matchesType(undefined, undefined)).toBe(true);
    });

    it("Returns false when two values' types do not match", () => {
        expect(matchesType(1, "a")).toBe(false);
        expect(matchesType(1, {})).toBe(false);
        expect(matchesType({}, [])).toBe(false);
        expect(matchesType({}, null)).toBe(false);
        expect(matchesType(null, undefined)).toBe(false);
    });
});