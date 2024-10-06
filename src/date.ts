import { resolveLocale } from "./config";

/**
 * Shortcut for formatting dates with `Intl.DateTimeFormat`.
 *
 * @param date - The date to format
 * @param locale - Target locale
 * @param options - Intl options
 * @returns The formatted date
 * @example
 * ```ts
 * // new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date());
 * date.intl(new Date(), "en-US", { dateStyle: "medium" });
 * ```
 */
export const intl = (
  date: Date | string,
  locale?: string | null,
  options?: Intl.DateTimeFormatOptions
) => Intl.DateTimeFormat(resolveLocale(locale), options).format(new Date(date));
