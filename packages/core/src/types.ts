/**
 * Transform a union type into an intersection
 * type.
 *
 * @example
 * ```
 * // { foo: string } & { bar: string }
 * type Foo = UnionToIntersectionHelper<{ foo: string } | { bar: string }>
 * ```
 *
 * @see https://stackoverflow.com/a/63542565/10831896
 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

/**
 * Transform a union into a tuple.
 */
export type UnionToTuple<T> =
  UnionToIntersection<T extends never ? never : (t: T) => T> extends (_: never) => infer W
    ? [...UnionToTuple<Exclude<T, W>>, W]
    : [];

/**
 * An array with fixed length
 */
export interface FixedLengthArray<T, L extends number> extends Array<T> {
  0: T;
  length: L;
}

/**
 * From a number `n`, return all numbers starting from 0 up until `n-1`
 */
export type NumberedIndexes<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N ? Acc[number] : NumberedIndexes<N, [...Acc, Acc["length"]]>;

/**
 * Inject a locale property to an object
 */
export type WithLocale<T, L = string | null | undefined> = Omit<T, "locale"> & {
  locale?: L;
};

export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export type DeepReadonly<T> = T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : Readonly<T>;
