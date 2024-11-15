import { fromEntries } from "./object";
import type { ConvertCase, FCapitalize, StringCase } from "./string.types";

const cases = ["title", "camel", "pascal", "snake", "kebab"] as const;

interface CaseTransformer<
  C1 extends StringCase,
  C2 extends StringCase,
  S extends string,
> {
  (): string;
  (narrow: true): ConvertCase<C1, C2, S>;
}

type CaseFunction<C extends StringCase> = <S extends string>(
  str: S
) => {
  [K in Exclude<StringCase, C> as `to${FCapitalize<K>}`]: CaseTransformer<C, K, S>;
};

type CaseShape = {
  [K in StringCase as `from${FCapitalize<K>}`]: CaseFunction<K>;
};

const exp = {
  /**
   * Capitalizes first letters of words in a string.
   *
   * @param str - String to be modified
   * @param lower - Whether all other letters should be lowercased
   * @see https://stackoverflow.com/a/7592235
   * @example
   * ```ts
   * capitalize("fix this string");     // "Fix This String"
   * capitalize("javaSCrIPT");          // "JavaSCrIPT"
   * capitalize("javaSCrIPT", true);    // "Javascript"
   * ```
   */
  capitalize<T extends string, R extends string = Capitalize<T>>(
    str: T,
    lower = false
  ): R {
    return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
    ) as R;
  },

  /**
   * Capitalize only the first letter of a string.
   *
   * @param str - String to capitalize
   * @param lower - Wether all other letters should be lowercased
   * @example
   * ```ts
   * fcapitalize("foo bar");        // "Foo bar"
   * fcapitalize("foo");            // "Foo"
   * fcapitalize("foO Bar");        // "FoO Bar"
   * fcapitalize("foO Bar", true);  // "Foo bar"
   * ```
   */
  fcapitalize<T extends string, R extends string = FCapitalize<T>>(
    str: T,
    lower = false
  ): R {
    const v = lower ? str.toLowerCase() : str;
    return (v.charAt(0).toUpperCase() + v.slice(1)) as R;
  },

  /**
   * Transform a string into an URI-like version. Strips all accents and
   * non-alphanumeric characters and replaces them with a dash.
   *
   * @param str - Input string
   * @param replacePattern - Regex expression to use when replacing characters
   * @param replaceCharacter - Character to replace matches in `replacePattern`
   * (`-` by default)
   * @param removePattern - Regex expression to use when removing characters
   * (start and end `-` characters by default)
   * @returns The URI
   * @example
   * ```ts
   * uri("Nike Air Force 1 '07"); // "nike-air-force-1-07"
   * ```
   */
  uri(
    str: string,
    replacePattern = /[^a-z0-9_]+/gi,
    replaceCharacter = "-",
    removePattern = /^-|-$/g
  ) {
    return str
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(replacePattern, replaceCharacter)
      .replace(removePattern, "")
      .toLowerCase();
  },

  /**
   * Generate a random string of arbitrary length containing random letters,
   * numbers and symbols.
   *
   * @param length - The string length
   * @param allowSymbols - If symbols are allowed (default: true)
   * @returns The random string
   * @example
   * ```ts
   * random(10);        // "Z$M8%cA^2l"
   * random(10, false); // "QmecJy2Mbt"
   * ```
   */
  random(length: number, allowSymbols = true): string {
    const alphanumericChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const symbols = allowSymbols ? "!@#$%^&*()-_+=<>?" : "";
    const allChars = alphanumericChars + symbols;
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      result += allChars.charAt(randomIndex);
    }
    return result;
  },

  /**
   * Check if a string is contained in an array of strings. Similar to
   * `Array.includes(str)`, but the resulting string is type guarded to the
   * elements in `target`.
   *
   * @param str - The target string
   * @param targets - The different options to check against
   * @returns If the string is contained in the targets
   * @example
   * ```ts
   * str.in("foo", ["foo", "bar", "baz"]);
   * ```
   */
  in<T extends string, T1 extends T[]>(str: T, targets: T1): str is T1[number] {
    return targets.includes(str);
  },

  /**
   * Add an ellipsis artificially to a string when it reaches a maximum length.
   *
   * @param str - The target string
   * @param length - The maximum length
   * @returns The ellipsed string
   * @example
   * ```ts
   * str.ellipsis("Good morning", 6); // "Good m...";
   * ```
   */
  ellipsis(str: string, length: number) {
    if (str.length <= length) {
      return str;
    }

    return str.slice(0, length) + "...";
  },

  /**
   * Join multiple strings into one while filtering out any nullable items.
   *
   * @param str - The strings, nullable
   * @param delimiter - The delimiter to use when joining
   * @returns The joined string
   * @example
   * ```ts
   * str.join(["John", null, undefined, "Doe"], " "); // "John Doe"
   * ```
   */
  join(str: (string | undefined | null)[], delimiter: string) {
    return str.filter(Boolean).join(delimiter);
  },

  /**
   * Inserts the given character `spacer` into a string every `every` characters.
   *
   * @param str - The input string
   * @param every - The interval at which to insert `spacer`
   * @param spacer - The character to insert every `every` characters.
   * @param options - Divide options
   * @returns The formatted string with the character inserted at every `every`
   * characters.
   *
   * @example
   * ```ts
   * str.divide('1234567890', 3, ' ', { align: "start" }); // "123 456 789 0"
   * str.divide('1234567890', 3, ' ', { align: "end" }); // "1 234 567 890"
   * ```
   */
  divide(
    str: string,
    every: number,
    spacer: string,
    options?: {
      /** Align the chunks when the division is uneven. @default "start" */
      align?: "start" | "end";
    }
  ) {
    const { align = "start" } = options ?? {};
    return (
      str
        .match(
          new RegExp(
            `.{1,${Math.max(1, every)}}${align === "end" ? `(?=(.{${Math.max(1, every)}})*$)` : ""}`,
            "g"
          )
        )
        ?.join(spacer) || str
    );
  },
  /**
   * Case transformers
   */
  case: fromEntries(
    cases.map((c): [`from${FCapitalize<typeof c>}`, CaseFunction<typeof c>] => {
      return [
        `from${(c.charAt(0).toUpperCase() + c.slice(1)) as FCapitalize<typeof c>}`,
        (str) =>
          fromEntries(
            cases
              .filter((c1) => c !== c1)
              .map((c1) => [
                `to${(c1.charAt(0).toUpperCase() + c1.slice(1)) as FCapitalize<typeof c1>}`,
                () => {
                  let words: string[] = [];
                  switch (c) {
                    case "title":
                    case "pascal":
                      words = str.match(/[A-Z][a-z]+|[a-z]+/g) || [];
                      break;
                    case "camel":
                      words = str.match(/[A-Z][a-z]*|[a-z]+/g) || [];
                      break;
                    case "snake":
                      words = str.split("_");
                      break;
                    case "kebab":
                      words = str.split("-");
                      break;
                  }

                  if (c !== "title") {
                    words = words.map((s) => s.replace(/\s*/g, ""));
                  }

                  switch (c1) {
                    case "title":
                      return words
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                        .join(" ");
                    case "pascal":
                      return words
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                        .join("");
                    case "camel":
                      return words
                        .map((w, i) =>
                          i === 0
                            ? w.toLowerCase()
                            : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
                        )
                        .join("");
                    case "snake":
                      return words.map((w) => w.toLowerCase()).join("_");
                    case "kebab":
                      return words.map((w) => w.toLowerCase()).join("-");
                  }
                },
              ])
          ),
      ];
    })
  ) as CaseShape,
};

export default exp;
