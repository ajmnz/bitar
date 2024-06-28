import type { UnionToTuple } from "./types";

/**
 * Typesafe implementation of `Object.keys`.
 *
 * @param obj - The source object
 * @returns The typed object keys
 * @example
 * ```ts
 * const object = { first: "John", last: "Doe" };
 *
 * // for (const key of Object.keys(object)) {
 * //   const v = object[key]; // ❗️ Expression of type 'string' can't be used to index type...
 * // }
 *
 * for (const key of obj.keys(object)) {
 *   const v = object[key]; // key: ("first" | "last")[]
 * }
 * ```
 */
export const keys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};

/**
 * Typesafe implementation of `Object.fromEntries`.
 *
 * @param entries - Object entries
 * @returns Typed `Object.fromEntries`
 * @example
 * ```ts
 * obj.fromEntries([["a", 5], ["b", "hello"], ["c", false]]); // { a: 5; b: "hello"; c: false }
 * ```
 */
export const fromEntries = <
  const T extends ReadonlyArray<readonly [PropertyKey, unknown]>,
>(
  entries: T
): { [K in T[number] as K[0]]: K[1] } => {
  return Object.fromEntries(entries) as { [K in T[number] as K[0]]: K[1] };
};

/**
 * Typesafe implementation of `Object.entries`.
 *
 * @param obj - The source object
 * @param narrow - Narrow the value types as much as possible ("a": string → "a")
 * @returns Typed `Object.entries`
 * @example
 * ```ts
 * // (["x", number] | ["y", string] | ["z", boolean])[]
 * obj.entries({ x: 6, y: "apple", z: true });
 * // (["x", 6] | ["y", "apple"] | ["z", true])[]
 * obj.entries({ x: 6, y: "apple", z: true }, true);
 * ```
 */
export function entries<const T extends object>(
  obj: T,
  narrow: true
): { [K in keyof T]: [K, T[K]] }[keyof T][];
export function entries<T extends object>(
  obj: T
): { [K in keyof T]: [K, T[K]] }[keyof T][];
export function entries<T extends object>(
  obj: T,
  _?: true
): { [K in keyof T]: [K, T[K]] }[keyof T][] {
  return Object.entries(obj) as { [K in keyof T]: [K, T[K]] }[keyof T][];
}

/**
 * Pick properties from an object.
 *
 * @param obj - The object to pick from
 * @param k - The keys to pick from the object
 * @param narrow - Narrow the value types as much as possible ("a": string → "a")
 * @returns The picked obejct
 * @see https://stackoverflow.com/a/56593059/10831896
 * @example
 * ```ts
 * obj.pick({ x: 6, y: "apple", z: true }, ["y"]);        // { y: string }
 * obj.pick({ x: 6, y: "apple", z: true }, ["y"], true);  // { y: "apple" }
 * ```
 */
export function pick<const T, K extends keyof T>(
  obj: T,
  k: K[],
  narrow: true
): Pick<T, K>;
export function pick<T, K extends keyof T>(obj: T, k: K[]): Pick<T, K>;
export function pick<T, K extends keyof T>(obj: T, k: K[], _?: true): Pick<T, K> {
  // eslint-disable-next-line no-sequences
  return k.reduce((acum, key) => ((acum[key] = obj[key]), acum), {} as T);
}

/**
 * Omit properties from an object.
 *
 * @param obj - The object to omit from
 * @param k - The keys to omit from the object
 * @param narrow - Narrow the value types as much as possible ("a": string → "a")
 * @returns The omitted obejct
 * @example
 * ```ts
 * omit({ x: 6, y: "apple", z: true }, ["x", "z"]);       // { y: string }
 * omit({ x: 6, y: "apple", z: true }, ["x", "z"], true); // { y: "apple" }
 * ```
 */
export function omit<const T extends object, K extends keyof T>(
  obj: T,
  k: K[],
  narrow: true
): Omit<T, K>;
export function omit<T extends object, K extends keyof T>(obj: T, k: K[]): Omit<T, K>;
export function omit<T extends object, K extends keyof T>(
  obj: T,
  k: K[],
  _?: true
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([e]) => !k.includes(e as K))
  ) as Omit<T, K>;
}

/**
 * Filter object properties.
 *
 * @param obj - The object to filter
 * @param predicate - A function that accepts an object entry and the current index.
 * @returns The filtered object
 * @example
 * ```ts
 * obj.filter({ x: 6, y: "apple", z: true }, ([k,v]) => k !== "x");
 * ```
 */
export function filter<T extends object>(
  obj: T,
  predicate: <S extends { [K in keyof T]: [K, T[K]] }[keyof T]>(
    value: S,
    index: number
  ) => boolean
): T {
  return fromEntries(entries(obj).filter(predicate)) as T;
}

/**
 * Check if an object has a given key, and type cast that key
 * to be a keyof the object.
 *
 * @param obj - The object to check
 * @param key - The key to check
 * @returns If the object has the key
 * @example
 * ```ts
 * const key: any = "foo";
 * const object = { foo: "bar", bar: "baz" };
 * if (obj.hasKey(object, key)) {
 *   object[key]; // key is now keyof typeof object
 * }
 * ```
 */
export function hasKey<T extends object>(obj: T, key: any): key is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Map all values of an object to a single value.
 *
 * @param obj - The object to map
 * @param value - The value to assign
 * @param narrow - Narrow the value types as much as possible ("a": string → "a")
 * @returns The mapped object
 * @example
 * ```ts
 * obj.remap({ active: false, deleted: null }, true);       // { active: boolean, deleted: boolean }
 * obj.remap({ active: false, deleted: null }, true, true); // { active: true, deleted: true }
 * ```
 */
export function remap<T extends object, const V>(
  obj: T,
  value: V,
  narrow: true
): { [K in keyof T]: V };
export function remap<T extends object, V>(obj: T, value: V): { [K in keyof T]: V };
export function remap<T extends object, V>(
  obj: T,
  value: V,
  _?: true
): { [K in keyof T]: V } {
  return Object.fromEntries(keys(obj).map((k) => [k, value])) as { [K in keyof T]: V };
}

type Split<T, K> = K extends [...infer S]
  ? S[number] extends keyof T
    ? { [K1 in S[number]]: T[K1] }
    : never
  : never;

/**
 * Split an object into smaller defined groups.
 *
 * @param obj - The object to split
 * @param groups - The array of key groups
 * @returns The splitted object
 * @example
 * ```ts
 * obj.split({ a: 1, b: 2, c: 3 }, ["a", "b"], ["c"]) // [{ a: 1, b: 2 }, { c: 3 }]
 * ```
 */
// eslint-disable-next-line space-before-function-paren
export function split<T extends object, const K extends (keyof T)[]>(
  obj: T,
  ...groups: K[]
): UnionToTuple<Split<T, K>> {
  const result = [] as UnionToTuple<Split<T, K>>;

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    result[i] = Object.fromEntries(
      group.filter((key) => key in obj).map((key) => [key, obj[key]])
    );
  }

  return result;
}
