import { describe, expect, test } from "vitest";

import { date } from "../src";

describe("date", () => {
  test("intl", () => {
    const d = new Date();
    expect(date.intl(d, "es-ES", { dateStyle: "full" })).toEqual(
      Intl.DateTimeFormat("es-ES", { dateStyle: "full" }).format(d)
    );
  });
});
