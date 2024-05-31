import { describe, expect, test } from "vitest";

import { obj } from "../src";

describe("obj", () => {
  test("keys", () => {
    const o = { a: 1, b: 2, c: 3 };
    expect(obj.keys(o)).toEqual(Object.keys(o));
  });

  test("fromEntries", () => {
    expect(
      obj.fromEntries([
        ["a", 5],
        ["b", "hello"],
        ["c", false],
      ])
    ).toEqual(
      Object.fromEntries([
        ["a", 5],
        ["b", "hello"],
        ["c", false],
      ])
    );
  });

  test("entries", () => {
    const o = { a: 1, b: 2, c: 3 };
    expect(obj.entries(o)).toEqual(Object.entries(o));
    expect(obj.entries(o, true)).toEqual(Object.entries(o));
  });

  test("pick", () => {
    const o = { a: 1, b: 2, c: 3 };
    expect(obj.pick(o, ["a", "c"])).toEqual({ a: 1, c: 3 });
    expect(obj.pick(o, ["a", "c"], true)).toEqual({ a: 1, c: 3 });
    expect(obj.pick(o, [])).toEqual({});
    expect(obj.pick({}, [])).toEqual({});
    expect(o).toEqual(o);
  });

  test("omit", () => {
    const o = { a: 1, b: 2, c: 3 };
    expect(obj.omit(o, ["a", "c"])).toEqual({ b: 2 });
    expect(obj.omit(o, ["a", "c"], true)).toEqual({ b: 2 });
    expect(obj.omit(o, [])).toEqual(o);
    expect(obj.omit({}, [])).toEqual({});
    expect(o).toEqual(o);
  });

  test("filter", () => {
    const o = { a: 1, b: 2, c: 3 };
    expect(obj.filter(o, ([k, v]) => k !== "a" && v !== 2)).toEqual({ c: 3 });
    expect(o).toEqual(o);
  });

  test("hasKey", () => {
    const o = { a: 1, b: 2, c: 3 };
    expect(obj.hasKey(o, ["a"])).toBe(true);
    expect(obj.hasKey(o, ["e"])).toBe(false);
  });

  test("remap", () => {
    expect(obj.remap({ active: false, deleted: null }, true)).toEqual({
      active: true,
      deleted: true,
    });
    expect(obj.remap({ active: false, deleted: null }, true, true)).toEqual({
      active: true,
      deleted: true,
    });
  });
});
