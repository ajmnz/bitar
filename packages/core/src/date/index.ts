import type { Bitar } from "../bitar";
import type { WithLocale } from "../types";

export default (bitar: Bitar) => ({
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
  intl(
    date: Date | string,
    { locale, ...options }: WithLocale<Intl.DateTimeFormatOptions> = {}
  ) {
    return Intl.DateTimeFormat(bitar.resolveLocale(locale), options).format(
      new Date(date)
    );
  },
});
