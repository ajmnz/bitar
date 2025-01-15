import { describe, expect, test } from "vitest";

import { Bitar } from "../bitar";

const { num } = new Bitar({ num: { currency: { currency: "USD" } } });

describe("num", () => {
  test("intl", () => {
    expect(num.intl(30, { locale: "en-US", maximumFractionDigits: 2 })).toEqual(
      Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(30)
    );
  });

  test("currency", () => {
    expect(num.currency(30, { locale: "en-US" })).toEqual("$30.00");
    expect(num.currency(30, { locale: "es-ES", spaced: false, currency: "EUR" })).toEqual(
      "30,00€"
    );
  });

  test("percent", () => {
    expect(num.percent(0.1312, { locale: "en-US" })).toEqual("13.12%");
    expect(num.percent(0.1312, { locale: "es-ES", spaced: false })).toEqual("13,12%");
  });

  test("signed", () => {
    expect(num.signed(1)).toEqual("+1");
    expect(num.signed(-1)).toEqual("-1");
    expect(num.signed(0)).toEqual("0");
    expect(num.signed(0, { locale: null, zero: true })).toEqual("+0");
    expect(num.signed(1, { locale: null, spaced: true })).toEqual("+ 1");
  });

  test("compact", () => {
    expect(num.compact(100000, { locale: "en-US" })).toEqual("100K");
    expect(num.compact(100333, { locale: "en-US" })).toEqual("100.3K");
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
  });

  test("nearest", () => {
    expect(num.nearest(17, 5)).toBe(15);
    expect(num.nearest(17.5, 5)).toBe(20);
    expect(num.nearest(17.5, 5, "floor")).toBe(15);
    expect(num.nearest(22, 10)).toBe(20);
    expect(num.nearest(-7, 3)).toBe(-6);
    expect(num.nearest(14, 4)).toBe(16);
    expect(num.nearest(1 / 3, 0.1)).toBe(0.3);
  });

  test("places", () => {
    expect(num.places(1.234567, 2)).toBe(1.23);
    expect(num.places(1.234567, 3)).toBe(1.235);
    expect(num.places(1.234567, 0)).toBe(1);
    expect(num.places(1.5, 0)).toBe(2);
    expect(num.places(123.456, -1)).toBe(120);
  });

  test("distribute", () => {
    expect(num.distribute(10, 5)).toEqual([2, 2, 2, 2, 2]);
    expect(num.distribute(11, 6)).toEqual([1.85, 1.83, 1.83, 1.83, 1.83, 1.83]);
    expect(num.distribute(11, 6, { remainder: "last" })).toEqual([
      1.83, 1.83, 1.83, 1.83, 1.83, 1.85,
    ]);
    expect(num.distribute(10, 3, { decimals: 1 })).toEqual([3.4, 3.3, 3.3]);
    expect(num.distribute(10, 3, { decimals: 2 })).toEqual([3.34, 3.33, 3.33]);
    expect(num.distribute(10, 3, { decimals: Infinity })).toEqual([
      10 / 3,
      10 / 3,
      10 / 3,
    ]);
    expect(num.distribute(1000, 3, { decimals: 0, remainder: "last" })).toEqual([
      333, 333, 334,
    ]);
    expect(num.distribute(0.01, 2, { decimals: 2 })).toEqual([0.01, 0]);
    expect(num.distribute(0.02, 3, { decimals: 2 })).toEqual([0.02, 0, 0]);
  });
});
