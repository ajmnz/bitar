import { describe, expect, test } from "vitest";

import { getConfig, setConfig } from "../src/config";

describe("config", () => {
  test("setter", () => {
    const c = getConfig();
    setConfig({ locale: "es-ES" });
    expect(getConfig()).toEqual({ ...c, locale: "es-ES" });
  });
});
