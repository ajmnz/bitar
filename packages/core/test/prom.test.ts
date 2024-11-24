import { describe, expect, test, vi } from "vitest";

import { prom } from "../src";

describe("prom", () => {
  test("wait", async () => {
    const spy = vi.spyOn(globalThis, "setTimeout");
    await prom.wait(1);
    expect(spy).toHaveBeenCalledOnce();
  });

  test("seq", async () => {
    expect(
      await prom.seq([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])
    ).toEqual([1, 2, 3]);

    expect(
      async () =>
        await prom.seq([
          Promise.resolve(1),
          Promise.reject(new Error("bad")),
          Promise.resolve(3),
        ])
    ).rejects.toThrowError("bad");
  });
});
