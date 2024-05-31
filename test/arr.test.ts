import { describe, expect, test } from "vitest";

import { arr } from "../src";

describe("arr", () => {
  test("dedup", () => {
    expect(arr.dedup([1, 2, 3, 3, 4, 5, 1, 2, 5])).toEqual([1, 2, 3, 4, 5]);
    const a = [{ v: 1 }, { v: 2 }, { v: 1 }];
    expect(arr.dedup(a)).toEqual(a);
    expect(arr.dedup(a, (v1, v2) => v1.some((v) => v.v === v2.v))).toEqual([
      { v: 1 },
      { v: 2 },
    ]);
  });

  test("mapAsync", async () => {
    const e = [1, 2, 3, 4];
    expect(await arr.mapAsync(e, (v) => Promise.resolve(v + 1))).toEqual([2, 3, 4, 5]);
  });

  test("first", () => {
    expect(arr.first([1, 2, 3])).toEqual(1);
    expect(arr.first([1])).toEqual(1);
    expect(arr.first([undefined])).toEqual(undefined);
    expect(arr.first([null])).toEqual(null);
    expect(arr.first([0])).toEqual(0);
    expect(arr.first([])).toEqual(null);
  });

  test("last", () => {
    expect(arr.last([1, 2, 3])).toEqual(3);
    expect(arr.last([1])).toEqual(1);
    expect(arr.last([undefined])).toEqual(undefined);
    expect(arr.last([null])).toEqual(null);
    expect(arr.last([0])).toEqual(0);
    expect(arr.last([])).toEqual(null);
  });

  test("chunk", () => {
    expect(arr.chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(arr.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(arr.chunk([], 2)).toEqual([]);
    expect(arr.chunk([], 0)).toEqual([]);
  });

  test("eachChunk", async () => {
    const as: number[][] = [];
    const is: number[] = [];
    const cbs: number[] = [];
    await arr.eachChunk([1, 2, 3, 4], 2, (a, i) => {
      as.push(a);
      is.push(i);
      return (c) => cbs.push(c);
    });
    expect(as).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(is).toEqual([0, 1]);
    expect(cbs).toEqual([2, 4]);
  });

  test("move", () => {
    const e = [1, 2, 3, 4];
    arr.move(e, 1, 2);
    expect(e).toEqual(e);
    expect(arr.move([1, 2, 3, 4], 0, 3)).toEqual([2, 3, 4, 1]);
    expect(arr.move([1, 2, 3, 4], 0, 30)).toEqual([2, 3, 4, 1]);
    expect(arr.move([1, 2, 3, 4], 2, 2)).toEqual([1, 2, 3, 4]);
    expect(arr.move([1, 2, 3, 4], 3, 2)).toEqual([1, 2, 4, 3]);
    expect(arr.move([], 3, 2)).toEqual([]);
  });
});
