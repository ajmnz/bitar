import type { FixedLengthArray, NumberedIndexes, UnionToTuple } from "../types";

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
function keys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

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
function entries<const T extends object>(
  obj: T,
  narrow: true
): { [K in keyof T]: [K, T[K]] }[keyof T][];
function entries<T extends object>(obj: T): { [K in keyof T]: [K, T[K]] }[keyof T][];
function entries<T extends object>(
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
function pick<const T, K extends keyof T>(obj: T, k: K[], narrow: true): Pick<T, K>;
function pick<T, K extends keyof T>(obj: T, k: K[]): Pick<T, K>;
function pick<T, K extends keyof T>(obj: T, k: K[], _?: true): Pick<T, K> {
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
function omit<const T extends object, K extends keyof T>(
  obj: T,
  k: K[],
  narrow: true
): Omit<T, K>;
function omit<T extends object, K extends keyof T>(obj: T, k: K[]): Omit<T, K>;
function omit<T extends object, K extends keyof T>(obj: T, k: K[], _?: true): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([e]) => !k.includes(e as K))
  ) as Omit<T, K>;
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
function remap<T extends object, const V>(
  obj: T,
  value: V,
  narrow: true
): { [K in keyof T]: V };
function remap<T extends object, V>(obj: T, value: V): { [K in keyof T]: V };
function remap<T extends object, V>(obj: T, value: V, _?: true): { [K in keyof T]: V } {
  return Object.fromEntries(keys(obj).map((k) => [k, value])) as { [K in keyof T]: V };
}

type Split<T, K> = K extends [...infer S]
  ? S[number] extends keyof T
    ? { [K1 in S[number]]: T[K1] }
    : never
  : never;

type ToPaths<T, P extends string = ""> =
  T extends Record<string | number, unknown>
    ? {
        [K in keyof T]: ToPaths<T[K], `${P}${P extends "" ? "" : "."}${K & string}`>;
      }[keyof T]
    : T extends FixedLengthArray<any, infer L>
      ? { [K in NumberedIndexes<L>]: ToPaths<T[K], `${P}[${K}]`> }[NumberedIndexes<L>]
      : T extends Array<infer U>
        ? { [K in number]: ToPaths<U, `${P}[${K}]`> }[number]
        : { path: P extends `${infer P1}` ? P1 : never; type: T };

type FromPaths<T extends { path: string; type: unknown }> = {
  [P in T["path"]]: Extract<T, { path: P }>["type"];
};

export type Flatten<T> = FromPaths<ToPaths<T>>;

export default () => ({
  keys,

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
  fromEntries<const T extends ReadonlyArray<readonly [PropertyKey, unknown]>>(
    entr: T
  ): { [K in T[number] as K[0]]: K[1] } {
    return Object.fromEntries(entr) as { [K in T[number] as K[0]]: K[1] };
  },

  entries,
  pick,
  omit,

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
  filter<T extends object>(
    obj: T,
    predicate: <S extends { [K in keyof T]: [K, T[K]] }[keyof T]>(
      value: S,
      index: number
    ) => boolean
  ): T {
    return this.fromEntries(entries(obj).filter(predicate)) as T;
  },

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
  hasKey<T extends object>(obj: T, key: any): key is keyof T {
    return Object.prototype.hasOwnProperty.call(obj, key);
  },

  remap,

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
  split<T extends object, const K extends (keyof T)[]>(
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
  },

  /**
   * Flatten a nested object into a single-level object with dot notation keys.
   *
   * @param obj - The object to flatten
   * @param prefix - The prefix for nested keys (default is an empty string)
   * @returns A new object with flattened keys
   * @example
   * ```ts
   * flatten({ a: { b: 1 }, c: { d: 2, e: [3, 4] } }) // { "a.b": 1, "c.d": 2, "c.e[0]": 3, "c.e[1]": 4 }
   * ```
   */
  flatten<T extends object>(obj: T, prefix = ""): Flatten<T> {
    const delimiter = ".";
    const result = {} as Flatten<T>;

    if (prefix && typeof obj !== "object") {
      return { [prefix]: obj } as unknown as Flatten<T>;
    }

    for (const [key, value] of entries(obj)) {
      const newKey = prefix ? `${prefix}${delimiter}${key.toString()}` : key.toString();
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          Object.assign(result, (this.flatten as any)(item, `${newKey}[${index}]`));
        });
      } else if (
        value !== null &&
        Object.prototype.toString.call(value) === "[object Object]"
      ) {
        Object.assign(result, (this.flatten as any)(value as any, newKey));
      } else {
        (result as any)[newKey] = value;
      }
    }

    return result;
  },
});
