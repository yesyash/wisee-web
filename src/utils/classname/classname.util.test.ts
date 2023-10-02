import { cn } from "./classname.util";

describe("className util", () => {
  it("should concatenate class names", () => {
    const result = cn("foo", "bar", undefined, "baz");
    expect(result).toBe("foo bar baz");
  });

  it("should filter out falsy values", () => {
    const result = cn("foo", false, "bar", undefined, "baz", undefined);
    expect(result).toBe("foo bar baz");
  });

  it("should handle conditional class names", () => {
    const val = 2;
    const result = cn("foo", val > 1 ? "bar" : "baz");
    const result2 = cn("foo", val && "baz");

    expect(result).toBe("foo bar");
    expect(result2).toBe("foo baz");
  });
});
