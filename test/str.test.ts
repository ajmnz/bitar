import { describe, expect, test } from "vitest";

import { str } from "../src";

describe("str", () => {
  test("capitalize", () => {
    expect(str.capitalize("fix this string")).toEqual("Fix This String");
    expect(str.capitalize("javaSCrIPT")).toEqual("JavaSCrIPT");
    expect(str.capitalize("javaSCrIPT", true)).toEqual("Javascript");
  });

  test("fcapitalize", () => {
    expect(str.fcapitalize("foo bar")).toEqual("Foo bar");
    expect(str.fcapitalize("foo")).toEqual("Foo");
    expect(str.fcapitalize("foO Bar")).toEqual("FoO Bar");
    expect(str.fcapitalize("foO Bar", true)).toEqual("Foo bar");
  });

  test("uri", () => {
    expect(str.uri("Nike Air Force 1 '07")).toEqual("nike-air-force-1-07");
  });

  test("random", () => {
    const rand = str.random(10);
    const randSimple = str.random(10, false);
    expect(rand).toHaveLength(10);
    expect(rand).toMatch(/[!@#$%^&*()-_+=<>?]/);
    expect(str.random(0)).toEqual("");
    expect(randSimple).toMatch(/^[A-Za-z0-9]+$/);
  });

  test("in", () => {
    // @ts-expect-error test
    expect(str.in("foo", ["foo", "bar", "baz"])).toBe(true);
    // @ts-expect-error test
    expect(str.in("fo", ["foo", "bar", "baz"])).toBe(false);
  });

  test("ellipsis", () => {
    expect(str.ellipsis("Good morning", 6)).toBe("Good m...");
    expect(str.ellipsis("Hello", 10)).toBe("Hello");
  });

  test("join", () => {
    expect(str.join(["John", null, undefined, "Doe"], " ")).toBe("John Doe");
    expect(str.join(["a", "b", "c"], "-")).toBe("a-b-c");
    expect(str.join([null, undefined, "only"], " ")).toBe("only");
    expect(str.join(["1", null, "2", "", undefined, "3"], ",")).toBe("1,2,3");
    expect(str.join([], ",")).toBe("");
  });
});
