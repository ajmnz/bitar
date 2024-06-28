import { prom } from ".";

/**
 * Remove duplicates from an array without using Set or mutating the provided
 * array.
 *
 * @param arr - The input array
 * @param compare - A function that decides if the item is duplicated or not
 * @returns A new array without duplicates
 * @example
 * ```ts
 * arr.dedup([1, 2, 3, 3, 4, 5, 5]); // [1, 2, 3, 4, 5]
 * ```
 */
export const dedup = <T>(arr: T[], compare?: (a: T[], b: T) => boolean): T[] =>
  arr.reduce(
    (a: T[], b) => ((compare ? compare(a, b) : a.includes(b)) ? a : [...a, b]),
    []
  );

/**
 * Like `Array.map`, but async and awaited sequentially using `prom.seq`.
 *
 * @param arr - The target array
 * @param cb - Map callback
 * @returns The result
 * @example
 * ```ts
 * const [e1, e2, e3] = arr.mapAsync(["foo", "bar", "baz"], async (e) => await myFn(e));
 * ```
 */
export async function mapAsync<T, U>(
  arr: T[],
  cb: (value: T, index: number, array: T[]) => Promise<U>
): Promise<U[]> {
  return await prom.seq(arr.map(cb));
}

/**
 * Try to get the first value from an array.
 *
 * @param v - The array to get the first value from
 * @returns The first value of the array or null if not accessible
 * @example
 * ```ts
 * arr.first(["foo", "bar"]); // "foo"
 * arr.first([]);             // null
 * ```
 */
export const first = <T>(v: T[]): T | null => {
  return v?.length ? v[0] : null;
};

/**
 * Try to get the last value from an array.
 *
 * @param v - The array to get the last value from
 * @returns The last value of the array or null if not accessible
 * @example
 * ```ts
 * arr.last(["foo", "bar"]);  // "bar"
 * arr.last([]);              // null
 * ```
 */
export const last = <T>(v: T[]): T | null => {
  return v?.length ? v[v.length - 1] : null;
};

/**
 * Chunk an array into multiple equal-sized pieces.
 *
 * @param array - Array to chunk
 * @param chunkSize - The size of each chunk
 * @returns The chunked array
 * @example
 * ```ts
 * arr.chunk(["a", "b", "c", "d"], 2); // [["a", "b"], ["c", "d"]]
 * arr.chunk(["a", "b", "c", "d"], 3); // uneven, [["a", "b", "c"], ["d"]]
 * ```
 */
export const chunk = <T>(array: T[], chunkSize: number): T[][] => {
  const result = [];
  for (let i = 0, len = array.length; i < len; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

/**
 * Chunk an array and loop over each piece.
 *
 * @param array - The array to chunk and iterate over
 * @param chunkSize - The size of each chunk
 * @param cb - The function that will handle each loop, which can return a
 * function that receives the total number of processed items.
 * @returns A promise that resolves when all pieces have been iterated over.
 * @example
 * ```ts
 * await arr.eachChunk(["a", "b", "c", "d"], 2, (e, i) => {
 *   console.log(e); // ["a", "b"] | ["c", "d"]
 *   return (count) => console.log(`Processed ${count} items (chunk no.${i + 1})`);
 * })
 * ```
 */
export const eachChunk = async <T>(
  array: T[],
  chunkSize: number,
  cb: (
    a: T[],
    i: number
  ) => ((c: number) => void) | Promise<(c: number) => void> | void | Promise<void>
): Promise<void> => {
  const chunked = chunk(array, chunkSize);
  let c = 0;
  let i = 0;
  for (const ch of chunked) {
    const log = await cb(ch, i);
    c += ch.length;
    if (log) log(c);
    i++;
  }
};

/**
 * Move an array item to a different position.
 *
 * @param arr - The input array
 * @param from - The index the item currently is in
 * @param to - The desired index of the item
 * @returns A new array with the item moved to the new position
 * @see https://github.com/clauderic/dnd-kit/blob/master/packages/sortable/src/utilities/arrayMove.ts
 * @example
 * ```ts
 * arr.move(["a", "b", "c"], 0, 1); // ["b", "a", "c"]
 * ```
 */
export const move = <T>(arr: T[], from: number, to: number): T[] => {
  if (!arr.length) return [];
  const cc = arr.slice();
  cc.splice(to < 0 ? cc.length + to : to, 0, cc.splice(from, 1)[0]);
  return cc;
};

/**
 * Find an item within an array or throw if not found. Identical to
 * `Array.find`, but throws on not found.
 *
 * @param arr - The target array
 * @param predicate - Identical to `Array.find`
 * @param error - The error to throw
 * @returns The found value
 * @throws If predicate does not find anything
 * @example
 * ```ts
 * arr.findOrThrow([1, 2, 3], (v) => v === 2); // 2
 * arr.findOrThrow([1, 2, 3], (v) => v > 3); // NotFoundError: findOrThrow yielded no results
 * ```
 */
export const findOrThrow = <T extends unknown[]>(
  arr: T,
  predicate: (v: T[number], i: number, obj: T) => boolean,
  error = new Error(`NotFoundError: findOrThrow yielded no results`)
): T[number] => {
  // `Array.find` returns `undefined` when there's no match, but what if the
  // provided array contains `undefined` values? We wouldn't be able to identify
  // if the `undefined` result was from an array match or from `Array.find`
  let match: T[number] | undefined = undefined;
  let i = 0;
  for (const el of arr) {
    if (predicate(el, i, arr)) {
      match = el;
      break;
    }
    i++;
  }
  if (!match) {
    throw error;
  }
  return match;
};

/**
 * Shuffle items inside an array.
 *
 * @param array - The array to shuffle
 * @returns A new array with the items shuffled
 * @example
 * ```ts
 * arr.shuffle([1, 2, 3, 4]); // [3, 1, 2, 4]
 * ```
 */
export const shuffle = <T extends any[]>(array: T): T => {
  const shuffled = [...array] as T;
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};
