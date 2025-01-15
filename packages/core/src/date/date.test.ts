import { describe, expect, test } from "vitest";

import { Bitar } from "../bitar";

const { date } = new Bitar();

describe("date", () => {
  test("intl", () => {
    const d = new Date();
    expect(date.intl(d, { locale: "es-ES", dateStyle: "full" })).toEqual(
      Intl.DateTimeFormat("es-ES", { dateStyle: "full" }).format(d)
    );
  });
});
