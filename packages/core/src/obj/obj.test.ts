import { describe, expect, test } from "vitest";

import { Bitar } from "../bitar";

const { obj } = new Bitar();

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

  test("split", () => {
    const o = { a: 1, b: 2, c: 3 };
    expect(obj.split(o, ["a", "b"], ["c"])).toEqual([{ a: 1, b: 2 }, { c: 3 }]);
    expect(obj.split(o, ["a", "d"] as any, ["b", "e"])).toEqual([{ a: 1 }, { b: 2 }]);
    expect(obj.split(o, ["x"] as any, ["y"])).toEqual([{}, {}]);
    expect(obj.split({}, ["a"] as any, ["b"])).toEqual([{}, {}]);
    expect(obj.split(obj)).toEqual([]);
  });

  test("flatten", () => {
    expect(obj.flatten({ a: { b: 1 }, c: { d: 2, e: [3, 4] } })).toEqual({
      "a.b": 1,
      "c.d": 2,
      "c.e[0]": 3,
      "c.e[1]": 4,
    });
    expect(obj.flatten({ a: [{ b: 1 }, { c: 2 }], d: 3 })).toEqual({
      "a[0].b": 1,
      "a[1].c": 2,
      d: 3,
    });
    expect(obj.flatten({})).toEqual({});
    expect(obj.flatten({ a: { b: { c: 1 } }, d: 2 })).toEqual({ "a.b.c": 1, d: 2 });
    expect(obj.flatten({ x: 42 })).toEqual({ x: 42 });

    const nestedDate = {
      event: { name: "New Year", date: new Date("2024-01-01T00:00:00Z") },
    };
    expect(obj.flatten(nestedDate)).toEqual({
      "event.name": "New Year",
      "event.date": nestedDate.event.date.toString(),
    });
  });
});
