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

  test("str.divide", () => {
    expect(str.divide("1234567890", 3, " ", { align: "start" })).toBe("123 456 789 0");
    expect(str.divide("1234567890", 3, " ", { align: "end" })).toBe("1 234 567 890");
    expect(str.divide("1234567890", 4, "-")).toBe("1234-5678-90");
    expect(str.divide("abcdefghij", 2, ":")).toBe("ab:cd:ef:gh:ij");
    expect(str.divide("abcdefghij", 3, " ", { align: "start" })).toBe("abc def ghi j");
    expect(str.divide("12345", 10, "-")).toBe("12345");
    expect(str.divide("abcdefgh", 1, ",")).toBe("a,b,c,d,e,f,g,h");
    expect(str.divide("", 3, "-")).toBe("");
  });

  test("str.case.*", () => {
    expect(str.case.fromSnake("my_example_string").toCamel()).toBe("myExampleString");
    expect(str.case.fromSnake("my_example_string").toPascal()).toBe("MyExampleString");
    expect(str.case.fromSnake("my_example_string").toKebab()).toBe("my-example-string");
    expect(str.case.fromSnake("my_example_string").toTitle()).toBe("My Example String");

    expect(str.case.fromKebab("my-example-string").toCamel()).toBe("myExampleString");
    expect(str.case.fromKebab("my-example-string").toPascal()).toBe("MyExampleString");
    expect(str.case.fromKebab("my-example-string").toSnake()).toBe("my_example_string");
    expect(str.case.fromKebab("my-example-string").toTitle()).toBe("My Example String");

    expect(str.case.fromCamel("myExampleString").toSnake()).toBe("my_example_string");
    expect(str.case.fromCamel("myExampleString").toPascal()).toBe("MyExampleString");
    expect(str.case.fromCamel("myExampleString").toKebab()).toBe("my-example-string");
    expect(str.case.fromCamel("myExampleString").toTitle()).toBe("My Example String");

    expect(str.case.fromPascal("MyExampleString").toCamel()).toBe("myExampleString");
    expect(str.case.fromPascal("MyExampleString").toSnake()).toBe("my_example_string");
    expect(str.case.fromPascal("MyExampleString").toKebab()).toBe("my-example-string");
    expect(str.case.fromPascal("MyExampleString").toTitle()).toBe("My Example String");

    expect(str.case.fromTitle("My Example String").toCamel()).toBe("myExampleString");
    expect(str.case.fromTitle("My Example String").toSnake()).toBe("my_example_string");
    expect(str.case.fromTitle("My Example String").toPascal()).toBe("MyExampleString");
    expect(str.case.fromTitle("My Example String").toKebab()).toBe("my-example-string");

    // @ts-expect-error test
    expect(str.case.fromTitle("My Example String").toTitle).toBeUndefined();
  });
});
