import { describe, expect, test } from "vitest";

import { num } from "../src";

describe("num", () => {
  test("intl", () => {
    expect(num.intl(30, "en-US", { maximumFractionDigits: 2 })).toEqual(
      Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(30)
    );
  });

  test("currency", () => {
    expect(num.currency(30, "en-US")).toEqual("$30.00");
    expect(num.currency(30, "es-ES", { spaced: false, currency: "EUR" })).toEqual(
      "30,00€"
    );
  });

  test("percent", () => {
    expect(num.percent(0.1312, "en-US")).toEqual("13.12%");
    expect(num.percent(0.1312, "es-ES", { spaced: false })).toEqual("13,12%");
  });

  test("signed", () => {
    expect(num.signed(1)).toEqual("+1");
    expect(num.signed(-1)).toEqual("-1");
    expect(num.signed(0)).toEqual("0");
    expect(num.signed(0, null, { zero: true })).toEqual("+0");
    expect(num.signed(1, null, { spaced: true })).toEqual("+ 1");
  });

  test("compact", () => {
    expect(num.compact(100000, "en-US")).toEqual("100K");
    expect(num.compact(100333, "en-US")).toEqual("100.3K");
  });

  test("clamp", () => {
    expect(num.clamp(31, [0, 30])).toEqual(30);
    expect(num.clamp(14, [15, 30])).toEqual(15);
    expect(num.clamp(20, [15, 30])).toEqual(20);
  });

  test("map", () => {
    expect(num.map(5, [0, 10], [0, 1])).toEqual(0.5);
  });

  test("inRange", () => {
    expect(num.inRange(10, [0, 100])).toBe(true);
    expect(num.inRange(10, [50, 100])).toBe(false);
    expect(num.inRange(10, [0, null])).toBe(true);
  });

  test("random", () => {
    expect(num.random(0, 10)).toBeGreaterThanOrEqual(0);
    expect(num.random(0, 10)).toBeLessThanOrEqual(10);
    expect(num.random(0, 10) % 1).toBe(0);
    expect(num.random(0, 10, null) % 1).not.toBe(0); // let's pray
  });

  test("nearest", () => {
    expect(num.nearest(17, 5)).toBe(15);
    expect(num.nearest(17.5, 5)).toBe(20);
    expect(num.nearest(17.5, 5, "floor")).toBe(15);
    expect(num.nearest(22, 10)).toBe(20);
    expect(num.nearest(-7, 3)).toBe(-6);
    expect(num.nearest(14, 4)).toBe(16);
  });
});
