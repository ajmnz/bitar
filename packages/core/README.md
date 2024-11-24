<h1 align="center">🧩<br/><br/>Bitar</h1>
<p align="center">Everyday bits and pieces to make your life easier</p>
<div align="center">
  <a href="https://www.npmjs.com/package/bitar">npm</a>
</div>

<hr>

### Install

```sh
yarn add bitar
npm install bitar
```

### Usage

Import any of the following

```ts
import { arr, prom, str, date, obj, num } from "bitar";
```

Use them

```ts
arr.dedup([1, 2, 3, 3, 4, 5, 5]); // [1, 2, 3, 4, 5]

await prom.wait(3000); // waited 3s

str.join(["John", null, undefined, "Doe"], " "); // "John Doe"

date.intl(new Date(), "en-US", { dateStyle: "medium" });

obj.pick({ x: 6, y: "apple", z: true }, ["y"]); // { y: string }

num.map(5, [0, 10], [0, 1]); // 0.5
```

---

### TypeScript

Typescript >=5.0 is required and `strict` mode is highly recommended.


### Docs

<!-- TSDOC_START -->

### :toolbox: `arr`

- [arr.dedup](#gear-arr.dedup)
- [arr.dupes](#gear-arr.dupes)
- [arr.first](#gear-arr.first)
- [arr.last](#gear-arr.last)
- [arr.chunk](#gear-arr.chunk)
- [arr.eachChunk](#gear-arr.eachchunk)
- [arr.move](#gear-arr.move)
- [arr.findOrThrow](#gear-arr.findorthrow)
- [arr.shuffle](#gear-arr.shuffle)

#### :gear: arr.dedup

Remove duplicates from an array without using Set or mutating the provided
array.

| Function | Type |
| ---------- | ---------- |
| `arr.dedup` | `<T>(arr: T[], compare?: ((a: T[], b: T) => boolean) or undefined) => T[]` |

Parameters:

* `arr`: The input array
* `compare`: A function that decides if the item is duplicated or not


Examples:

```ts
arr.dedup([1, 2, 3, 3, 4, 5, 5]); // [1, 2, 3, 4, 5]
```


#### :gear: arr.dupes

Finds duplicates in an array and returns a new array with the duplicate
items.

Note that it uses `indexOf` to find the element inside the array. For more
complex data structures, use the `extract` function to get an `indexOf`able
value.

| Function | Type |
| ---------- | ---------- |
| `arr.dupes` | `<T>(arr: T[], extract?: ((value: T, index: number, array: T[]) => any) or undefined) => T[]` |

Parameters:

* `arr`: The array to find duplicates in.
* `extract`: A function to extract an `indexOf`able value out of the
array elements.


Examples:

```ts
arr.dupes([1, 2, 3, 3, 4, 5, 5]); // [3, 5]
```


#### :gear: arr.first

Try to get the first value from an array.

| Function | Type |
| ---------- | ---------- |
| `arr.first` | `<T>(v: T[]) => T or null` |

Parameters:

* `v`: The array to get the first value from


Examples:

```ts
arr.first(["foo", "bar"]); // "foo"
arr.first([]);             // null
```


#### :gear: arr.last

Try to get the last value from an array.

| Function | Type |
| ---------- | ---------- |
| `arr.last` | `<T>(v: T[]) => T or null` |

Parameters:

* `v`: The array to get the last value from


Examples:

```ts
arr.last(["foo", "bar"]);  // "bar"
arr.last([]);              // null
```


#### :gear: arr.chunk

Chunk an array into multiple equal-sized pieces.

| Function | Type |
| ---------- | ---------- |
| `arr.chunk` | `<T>(array: T[], chunkSize: number) => T[][]` |

Parameters:

* `array`: Array to chunk
* `chunkSize`: The size of each chunk


Examples:

```ts
arr.chunk(["a", "b", "c", "d"], 2); // [["a", "b"], ["c", "d"]]
arr.chunk(["a", "b", "c", "d"], 3); // uneven, [["a", "b", "c"], ["d"]]
```


#### :gear: arr.eachChunk

Chunk an array and loop over each piece.

| Function | Type |
| ---------- | ---------- |
| `arr.eachChunk` | `<T>(array: T[], chunkSize: number, cb: (a: T[], i: number) => void or Promise<(c: number) => void> or Promise<void> or ((c: number) => void)) => Promise<void>` |

Parameters:

* `array`: The array to chunk and iterate over
* `chunkSize`: The size of each chunk
* `cb`: The function that will handle each loop, which can return a
function that receives the total number of processed items.


Examples:

```ts
await arr.eachChunk(["a", "b", "c", "d"], 2, (e, i) => {
  console.log(e); // ["a", "b"] | ["c", "d"]
  return (count) => console.log(`Processed ${count} items (chunk no.${i + 1})`);
})
```


#### :gear: arr.move

Move an array item to a different position.

| Function | Type |
| ---------- | ---------- |
| `arr.move` | `<T>(arr: T[], from: number, to: number) => T[]` |

Parameters:

* `arr`: The input array
* `from`: The index the item currently is in
* `to`: The desired index of the item


Examples:

```ts
arr.move(["a", "b", "c"], 0, 1); // ["b", "a", "c"]
```


#### :gear: arr.findOrThrow

Find an item within an array or throw if not found. Identical to
`Array.find`, but throws on not found.

| Function | Type |
| ---------- | ---------- |
| `arr.findOrThrow` | `<T extends unknown[]>(arr: T, predicate: (v: T[number], i: number, obj: T) => boolean, error?: Error) => T[number]` |

Parameters:

* `arr`: The target array
* `predicate`: Identical to `Array.find`
* `error`: The error to throw


Examples:

```ts
arr.findOrThrow([1, 2, 3], (v) => v === 2); // 2
arr.findOrThrow([1, 2, 3], (v) => v > 3); // NotFoundError: findOrThrow yielded no results
```


#### :gear: arr.shuffle

Shuffle items inside an array.

| Function | Type |
| ---------- | ---------- |
| `arr.shuffle` | `<T extends any[]>(array: T) => T` |

Parameters:

* `array`: The array to shuffle


Examples:

```ts
arr.shuffle([1, 2, 3, 4]); // [3, 1, 2, 4]
```



### :wrench: Constants

- [arr.async](#gear-arr.async)

#### :gear: arr.async

Collection of native Array methods with asynchronous support

| Constant | Type |
| ---------- | ---------- |
| `arr.async` | `{ map<T extends any[], U>(arr: T, cb: (value: T[number], index: number, array: T[number][]) => U): Promise<Awaited<U>[]>; flatMap<T extends any[], U>(arr: T, cb: (value: T[number], index: number, array: T[number][]) => Promise<...>): Promise<...>; filter<T>(arr: T[], cb: (value: T, index: number, array: T[]) => Prom...` |




### :toolbox: `date`

- [date.intl](#gear-date.intl)

#### :gear: date.intl

Shortcut for formatting dates with `Intl.DateTimeFormat`.

| Function | Type |
| ---------- | ---------- |
| `date.intl` | `(date: string or Date, locale?: string or null or undefined, options?: DateTimeFormatOptions or undefined) => string` |

Parameters:

* `date`: The date to format
* `locale`: Target locale
* `options`: Intl options


Examples:

```ts
// new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date());
date.intl(new Date(), "en-US", { dateStyle: "medium" });
```





### :toolbox: `num`

- [num.intl](#gear-num.intl)
- [num.currency](#gear-num.currency)
- [num.percent](#gear-num.percent)
- [num.signed](#gear-num.signed)
- [num.compact](#gear-num.compact)
- [num.clamp](#gear-num.clamp)
- [num.map](#gear-num.map)
- [num.inRange](#gear-num.inrange)
- [num.random](#gear-num.random)
- [num.nearest](#gear-num.nearest)
- [num.places](#gear-num.places)
- [num.distribute](#gear-num.distribute)

#### :gear: num.intl

Format a number.

| Function | Type |
| ---------- | ---------- |
| `num.intl` | `(n: number, locale?: string or null or undefined, options?: NumberFormatOptions) => string` |

Parameters:

* `n`: The number
* `locale`: Target locale
* `options`: Intl options


Examples:

```ts
// new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(30);
num.intl(30, "en-US", { maximumFractionDigits: 2 });
```


#### :gear: num.currency

Format a number to currency.

| Function | Type |
| ---------- | ---------- |
| `num.currency` | `(n: number, locale?: string or null or undefined, options?: NumberFormatOptions and { spaced?: boolean or undefined; }) => string` |

Parameters:

* `n`: The number
* `locale`: Target locale
* `options`: Intl options and the option to space out the symbol.


Examples:

```ts
num.currency(13.12, "de-DE", { spaced: true });  // 13,12 €
num.currency(13.12, "de-DE", { spaced: false }); // 13,12€
```


#### :gear: num.percent

Format a number to a percentage.

| Function | Type |
| ---------- | ---------- |
| `num.percent` | `(n: number, locale?: string or null or undefined, options?: NumberFormatOptions and { spaced?: boolean or undefined; }) => string` |

Parameters:

* `n`: The number
* `locale`: Target locale
* `options`: Intl options and the option to space out the symbol.


Examples:

```ts
num.percent(0.1312, "en-US"); // 13.12%
```


#### :gear: num.signed

Add `+` and `-` sign to a number.

| Function | Type |
| ---------- | ---------- |
| `num.signed` | `(n: number, locale?: string or null or undefined, options?: NumberFormatOptions and { spaced?: boolean or undefined; zero?: boolean or undefined; }) => string` |

Parameters:

* `n`: The number
* `locale`: Target locale
* `options`: Intl options


Examples:

```ts
num.signed(34); // +34
```


#### :gear: num.compact

Compact a number to its reduced form (ie. `1.000 → 1K`)

| Function | Type |
| ---------- | ---------- |
| `num.compact` | `(n: number, locale?: string or null or undefined, options?: NumberFormatOptions or undefined) => string` |

Parameters:

* `n`: The number
* `locale`: Target locale
* `options`: Intl options


Examples:

```ts
num.compact(100000, "en-US"); // 100K
```


#### :gear: num.clamp

Clamp a number to a range. If it exceeds min or max, limits will be returned
instead.

| Function | Type |
| ---------- | ---------- |
| `num.clamp` | `(input: number, range: [number, number]) => number` |

Parameters:

* `input`: The number to clamp
* `range`: Minimum-maximum clamp value


Examples:

```ts
num.clamp(31, [0, 30]);  // 30
num.clamp(14, [15, 30]); // 15
num.clamp(20, [15, 30]); // 20
```


#### :gear: num.map

Map a number from one range to a different one.

| Function | Type |
| ---------- | ---------- |
| `num.map` | `(current: number, inRange: [number, number], outRange: [number, number]) => number` |

Parameters:

* `current`: Input number
* `inRange`: Input min-max range
* `outRange`: Target min-max value


Examples:

```ts
num.map(5, [0, 10], [0, 1]); // 0.5
```


#### :gear: num.inRange

Check if a number is between a given range.

| Function | Type |
| ---------- | ---------- |
| `num.inRange` | `(input: number, range: [number, number or null]) => boolean` |

Parameters:

* `input`: Input number
* `range`: Min-max range


Examples:

```ts
num.inRange(10, [0, 100]);   // true
num.inRange(10, [50, 100]);  // false
num.inRange(10, [5, null]);  // true, range is 5 to ∞
```


#### :gear: num.random

Get a random integer between a range (inclusive).

| Function | Type |
| ---------- | ---------- |
| `num.random` | `(min: number, max: number, rounding?: Rounding) => number` |

Parameters:

* `min`: The range min
* `max`: The range max
* `rounding`: The rounding to use (`ceil` by default)


Examples:

```ts
num.random(0, 10);       // 7
num.random(0, 1, null);  // 0.5701940
```


#### :gear: num.nearest

Calculates the nearest multiple of `y` to `x`.

| Function | Type |
| ---------- | ---------- |
| `num.nearest` | `(x: number, y: number, rounding?: Rounding) => number` |

Parameters:

* `x`: The number to find the nearest multiple to.
* `y`: The base multiple to use.
* `rounding`: The rounding to use (`round` by default)


Examples:

```ts
num.nearest(17, 5);  // 15
num.nearest(22, 10); // 20
num.nearest(-7, 3);  // -6
num.nearest(14, 4);  // 16
```


#### :gear: num.places

Rounds a number to a specified number of decimal places.

| Function | Type |
| ---------- | ---------- |
| `num.places` | `(n: number, p: number, rounding?: Rounding) => number` |

Parameters:

* `n`: The number to round.
* `p`: The number of decimal places to round to.
* `rounding`: The rounding to use (`round` by default)


Examples:

```ts
num.places(1.234567, 2); // 1.23
num.places(1.234567, 3); // 1.235
num.places(1.234567, 0); // 1
num.places(1.5, 0);      // 2
num.places(123.456, -1); // 120
```


#### :gear: num.distribute

Distribute (or divide) a number evenly into the specified number of groups.

| Function | Type |
| ---------- | ---------- |
| `num.distribute` | `<N extends number, G extends number>(n: N, groups: G, options?: { decimals?: number or undefined; remainder?: "first" or "last" or undefined; } or undefined) => number[]` |

Parameters:

* `n`: The number to distribute
* `groups`: The number of groups to create
* `options`: Distribution options





### :toolbox: `obj`

- [obj.keys](#gear-obj.keys)
- [obj.fromEntries](#gear-obj.fromentries)
- [obj.entries](#gear-obj.entries)
- [obj.pick](#gear-obj.pick)
- [obj.omit](#gear-obj.omit)
- [obj.filter](#gear-obj.filter)
- [obj.hasKey](#gear-obj.haskey)
- [obj.remap](#gear-obj.remap)
- [obj.split](#gear-obj.split)
- [obj.flatten](#gear-obj.flatten)

#### :gear: obj.keys

Typesafe implementation of `Object.keys`.

| Function | Type |
| ---------- | ---------- |
| `obj.keys` | `<T extends object>(obj: T) => (keyof T)[]` |

Parameters:

* `obj`: The source object


Examples:

```ts
const object = { first: "John", last: "Doe" };

// for (const key of Object.keys(object)) {
//   const v = object[key]; // ❗️ Expression of type 'string' can't be used to index type...
// }

for (const key of obj.keys(object)) {
  const v = object[key]; // key: ("first" | "last")[]
}
```


#### :gear: obj.fromEntries

Typesafe implementation of `Object.fromEntries`.

| Function | Type |
| ---------- | ---------- |
| `obj.fromEntries` | `<const T extends readonly (readonly [PropertyKey, unknown])[]>(entries: T) => { [K in T[number] as K[0]]: K[1]; }` |

Parameters:

* `entries`: Object entries


Examples:

```ts
obj.fromEntries([["a", 5], ["b", "hello"], ["c", false]]); // { a: 5; b: "hello"; c: false }
```


#### :gear: obj.entries

Typesafe implementation of `Object.entries`.

| Function | Type |
| ---------- | ---------- |
| `obj.entries` | `{ <const T extends object>(obj: T, narrow: true): { [K in keyof T]: [K, T[K]]; }[keyof T][]; <T extends object>(obj: T): { [K in keyof T]: [K, T[K]]; }[keyof T][]; }` |

Parameters:

* `obj`: The source object
* `narrow`: Narrow the value types as much as possible ("a": string → "a")


Examples:

```ts
// (["x", number] | ["y", string] | ["z", boolean])[]
obj.entries({ x: 6, y: "apple", z: true });
// (["x", 6] | ["y", "apple"] | ["z", true])[]
obj.entries({ x: 6, y: "apple", z: true }, true);
```


#### :gear: obj.pick

Pick properties from an object.

| Function | Type |
| ---------- | ---------- |
| `obj.pick` | `{ <const T, K extends keyof T>(obj: T, k: K[], narrow: true): Pick<T, K>; <T, K extends keyof T>(obj: T, k: K[]): Pick<T, K>; }` |

Parameters:

* `obj`: The object to pick from
* `k`: The keys to pick from the object
* `narrow`: Narrow the value types as much as possible ("a": string → "a")


Examples:

```ts
obj.pick({ x: 6, y: "apple", z: true }, ["y"]);        // { y: string }
obj.pick({ x: 6, y: "apple", z: true }, ["y"], true);  // { y: "apple" }
```


#### :gear: obj.omit

Omit properties from an object.

| Function | Type |
| ---------- | ---------- |
| `obj.omit` | `{ <const T extends object, K extends keyof T>(obj: T, k: K[], narrow: true): Omit<T, K>; <T extends object, K extends keyof T>(obj: T, k: K[]): Omit<T, K>; }` |

Parameters:

* `obj`: The object to omit from
* `k`: The keys to omit from the object
* `narrow`: Narrow the value types as much as possible ("a": string → "a")


Examples:

```ts
omit({ x: 6, y: "apple", z: true }, ["x", "z"]);       // { y: string }
omit({ x: 6, y: "apple", z: true }, ["x", "z"], true); // { y: "apple" }
```


#### :gear: obj.filter

Filter object properties.

| Function | Type |
| ---------- | ---------- |
| `obj.filter` | `<T extends object>(obj: T, predicate: <S extends { [K in keyof T]: [K, T[K]]; }[keyof T]>(value: S, index: number) => boolean) => T` |

Parameters:

* `obj`: The object to filter
* `predicate`: A function that accepts an object entry and the current index.


Examples:

```ts
obj.filter({ x: 6, y: "apple", z: true }, ([k,v]) => k !== "x");
```


#### :gear: obj.hasKey

Check if an object has a given key, and type cast that key
to be a keyof the object.

| Function | Type |
| ---------- | ---------- |
| `obj.hasKey` | `<T extends object>(obj: T, key: any) => key is keyof T` |

Parameters:

* `obj`: The object to check
* `key`: The key to check


Examples:

```ts
const key: any = "foo";
const object = { foo: "bar", bar: "baz" };
if (obj.hasKey(object, key)) {
  object[key]; // key is now keyof typeof object
}
```


#### :gear: obj.remap

Map all values of an object to a single value.

| Function | Type |
| ---------- | ---------- |
| `obj.remap` | `{ <T extends object, const V>(obj: T, value: V, narrow: true): { [K in keyof T]: V; }; <T extends object, V>(obj: T, value: V): { [K in keyof T]: V; }; }` |

Parameters:

* `obj`: The object to map
* `value`: The value to assign
* `narrow`: Narrow the value types as much as possible ("a": string → "a")


Examples:

```ts
obj.remap({ active: false, deleted: null }, true);       // { active: boolean, deleted: boolean }
obj.remap({ active: false, deleted: null }, true, true); // { active: true, deleted: true }
```


#### :gear: obj.split

Split an object into smaller defined groups.

| Function | Type |
| ---------- | ---------- |
| `obj.split` | `<T extends object, const K extends (keyof T)[]>(obj: T, ...groups: K[]) => UnionToTuple<Split<T, K>>` |

Parameters:

* `obj`: The object to split
* `groups`: The array of key groups


Examples:

```ts
obj.split({ a: 1, b: 2, c: 3 }, ["a", "b"], ["c"]) // [{ a: 1, b: 2 }, { c: 3 }]
```


#### :gear: obj.flatten

Flatten a nested object into a single-level object with dot notation keys.

| Function | Type |
| ---------- | ---------- |
| `obj.flatten` | `<T extends object>(obj: T, prefix?: string) => Flatten<T>` |

Parameters:

* `obj`: The object to flatten
* `prefix`: The prefix for nested keys (default is an empty string)


Examples:

```ts
flatten({ a: { b: 1 }, c: { d: 2, e: [3, 4] } }) // { "a.b": 1, "c.d": 2, "c.e[0]": 3, "c.e[1]": 4 }
```





### :toolbox: `prom`

- [prom.wait](#gear-prom.wait)
- [prom.seq](#gear-prom.seq)

#### :gear: prom.wait

Wait x ms before resolving a promise.

| Function | Type |
| ---------- | ---------- |
| `prom.wait` | `(ms: number) => Promise<unknown>` |

Parameters:

* `ms`: The milliseconds to wait


Examples:

```ts
console.log("Waiting...");
await prom.wait(3000);
console.log("Waited for 3s");
```


#### :gear: prom.seq

Like `Promise.all`, but awaits all promises sequentially and returns the
results in the same order. If any of the promises fail, the whole promise is
rejected.

| Function | Type |
| ---------- | ---------- |
| `prom.seq` | `<T extends Promise<unknown>>(promises: T[]) => Promise<Awaited<T>[]>` |

Parameters:

* `promises`: Promises to resolve


Examples:

```ts
const [r1, r2, r3] = await prom.seq([p1, p2, p3]);
```




<!-- TSDOC_END -->

### License

MIT
