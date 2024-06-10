import { getConfig, resolveLocale } from "./config";

/**
 * Format a number.
 *
 * @param n - The number
 * @param locale - Target locale
 * @param options - Intl options
 * @returns The formatted number
 * @example
 * ```ts
 * // new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(30);
 * num.intl(30, "en-US", { maximumFractionDigits: 2 });
 * ```
 */
export const intl = (
  n: number,
  locale?: string | null,
  options: Intl.NumberFormatOptions = {}
) => {
  return new Intl.NumberFormat(resolveLocale(locale), options).format(n);
};

/**
 * Format a number to currency.
 *
 * @param n - The number
 * @param locale - Target locale
 * @param options - Intl options and the option to space out the symbol.
 * @returns The number in currency format
 * @example
 * ```ts
 * num.currency(13.12, "de-DE", { spaced: true });  // 13,12 €
 * num.currency(13.12, "de-DE", { spaced: false }); // 13,12€
 * ```
 */
export const currency = (
  n: number,
  locale?: string | null,
  options: Intl.NumberFormatOptions & { spaced?: boolean } = { spaced: true }
) => {
  let v = intl(n, locale, {
    ...getConfig().num.currency,
    ...options,
    style: "currency",
  });

  if (options.spaced === false) {
    v = v.replace(/\s+/g, "");
  }

  return v;
};

/**
 * Format a number to a percentage.
 *
 * @param n - The number
 * @param locale - Target locale
 * @param options - Intl options and the option to space out the symbol.
 * @returns The number in currency format
 * @example
 * ```ts
 * num.percent(0.1312, "en-US"); // 13.12%
 * ```
 */
export const percent = (
  n: number,
  locale?: string | null,
  options: Intl.NumberFormatOptions & { spaced?: boolean } = { spaced: true }
) => {
  let v = intl(n, locale, {
    ...getConfig().num.percent,
    ...options,
    style: "percent",
  });
  if (options.spaced === false) {
    v = v.replace(/\s+/g, "");
  }
  return v;
};

/**
 * Add `+` and `-` sign to a number.
 *
 * @param n - The number
 * @param locale - Target locale
 * @param options - Intl options
 * @returns The signed number
 * @example
 * ```ts
 * num.signed(34); // +34
 * ```
 */
export const signed = (
  n: number,
  locale?: string | null,
  options: Intl.NumberFormatOptions & { spaced?: boolean; zero?: boolean } = {
    spaced: false,
    zero: false,
  }
) => {
  let v = intl(n, locale, { ...options, signDisplay: "always" });
  if (options.spaced === true) {
    v = v.replace(/\s+/g, "").replace(/\+|-/g, (r) => r + " ");
  }
  if (n === 0 && options.zero === false) {
    v = v.replace(/\+|-/g, "");
  }

  return v;
};

/**
 * Compact a number to its reduced form (ie. `1.000 → 1K`)
 *
 * @param n - The number
 * @param locale - Target locale
 * @param options - Intl options
 * @returns The compact number
 * @example
 * ```ts
 * num.compact(100000, "en-US"); // 100K
 * ```
 */
export const compact = (
  n: number,
  locale?: string | null,
  options?: Intl.NumberFormatOptions
) =>
  intl(n, locale, {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
    ...options,
  });

/**
 * Clamp a number to a range. If it exceeds min or max, limits will be returned
 * instead.
 *
 * @param input - The number to clamp
 * @param range - Minimum-maximum clamp value
 * @returns The clamped number
 * @example
 * ```ts
 * num.clamp(31, [0, 30]);  // 30
 * num.clamp(14, [15, 30]); // 15
 * num.clamp(20, [15, 30]); // 20
 * ```
 */
export const clamp = (input: number, range: [number, number]): number =>
  input < range[0] ? range[0] : input > range[1] ? range[1] : input;

/**
 * Map a number from one range to a different one.
 *
 * @param current - Input number
 * @param inRange - Input min-max range
 * @param outRange - Target min-max value
 * @returns The mapped number within the new range
 * @example
 * ```ts
 * num.map(5, [0, 10], [0, 1]); // 0.5
 * ```
 */
export const map = (
  current: number,
  inRange: [number, number],
  outRange: [number, number]
): number =>
  clamp(
    ((current - inRange[0]) * (outRange[1] - outRange[0])) / (inRange[1] - inRange[0]) +
      outRange[0],
    outRange
  );

/**
 * Check if a number is between a given range.
 *
 * @param input - Input number
 * @param range - Min-max range
 * @returns Whether the number is in the provided range
 * @example
 * ```ts
 * num.inRange(10, [0, 100]);   // true
 * num.inRange(10, [50, 100]);  // false
 * num.inRange(10, [5, null]);  // true, range is 5 to ∞
 * ```
 */
export const inRange = (input: number, range: [number, number | null]): boolean =>
  input >= range[0] && (range[1] === null || input <= range[1]);

/**
 * Rounding function. `null` disables rounding.
 */
export type Rounding = "floor" | "ceil" | "round" | null;
const getRoundingAlg = (rounding: Rounding) =>
  (rounding && Math[rounding]) || ((n: number) => n);

/**
 * Get a random integer between a range (inclusive).
 *
 * @param min - The range min
 * @param max - The range max
 * @param rounding - The rounding to use (`ceil` by default)
 * @returns The random number
 * @example
 * ```ts
 * num.random(0, 10);       // 7
 * num.random(0, 1, null);  // 0.5701940
 * ```
 */
export const random = (min: number, max: number, rounding: Rounding = "ceil") => {
  const alg = getRoundingAlg(rounding);
  return clamp(alg(Math.random() * (max - min + 1) + min), [min, max]);
};

/**
 * Calculates the nearest multiple of `y` to `x`.
 *
 * @param x - The number to find the nearest multiple to.
 * @param y - The base multiple to use.
 * @param rounding - The rounding to use (`ceil` by default)
 * @returns The neareast multiple of `y` to `x`
 * @example
 * ```ts
 * num.nearest(17, 5);  // 15
 * num.nearest(22, 10); // 20
 * num.nearest(-7, 3);  // -6
 * num.nearest(14, 4);  // 16
 * ```
 */
export const nearest = (x: number, y: number, rounding: Rounding = "round") => {
  const alg = getRoundingAlg(rounding);
  return alg(x / y) * y;
};
