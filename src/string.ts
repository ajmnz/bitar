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
const capitalize = <T extends string, R extends string = Capitalize<T>>(
  str: T,
  lower = false
): R => {
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  ) as R;
};

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
const uri = (
  str: string,
  replacePattern = /[^a-z0-9_]+/gi,
  replaceCharacter = "-",
  removePattern = /^-|-$/g
) =>
  str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(replacePattern, replaceCharacter)
    .replace(removePattern, "")
    .toLowerCase();

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
const random = (length: number, allowSymbols = true): string => {
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
};

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
const _in = <T extends string, T1 extends T[]>(str: T, targets: T1): str is T1[number] =>
  targets.includes(str);

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
const ellipsis = (str: string, length: number) => {
  if (str.length <= length) {
    return str;
  }

  return str.slice(0, length) + "...";
};

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
const join = (str: (string | undefined | null)[], delimiter: string) =>
  str.filter(Boolean).join(delimiter);

export default {
  capitalize,
  uri,
  random,
  in: _in,
  ellipsis,
  join,
};
