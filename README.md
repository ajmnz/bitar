<h1 align="center">🧩<br/><br/>Bitar</h1>
<p align="center">Everyday bits and pieces to make your life easier</p>
<div align="center">
  <a href="https://www.npmjs.com/package/bitar">npm</a>
</div>

<hr>

Bitar (pieces in Swedish) are a set of utility functions I keep carrying around from project to project, which I finally decided to make into a library. It's a mix of type-safe functions, common utilities and shortcuts.


### Install

```sh
yarn add bitar
npm install bitar
```

### Usage

#### Configuration

This is the configuration used by `bitar`

```ts
interface BitarConfig {
  /** Default locale across all Intl functions */
  locale: string | undefined;
  /** `num` specific config */
  num: {
    /** Currencies */
    currency: Omit<Intl.NumberFormatOptions, "style"> & { spaced?: boolean };
    /** Percentages */
    percent: Omit<Intl.NumberFormatOptions, "style"> & { spaced?: boolean };
  };
}
```

Each `bitar` instance uses the following defaults 

```ts
const config = {
  locale: undefined,
  num: {
    currency: { maximumFractionDigits: 2, minimumFractionDigits: 2 },
    percent: { maximumFractionDigits: 2, minimumFractionDigits: 2 },
  },
}
```

##### Global instance

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

Set global configuration

```ts
import { configure } from "bitar";

configure({
  // config options
})
```

##### Custom instances

Custom instances can be created with specific configuration

```ts
import bitar from "bitar";

const b = bitar({
  locale: "ca",
  num: {
    currency: { currency: "EUR" }
  }
});

b.date.intl(new Date(), { dateStyle: "long" }); // 15 de gener del 2025
```

---

### TypeScript

Typescript >=5.0 is required and `strict` mode is highly recommended.

### Docs

**`bitar`**
- [API Documentation](packages/core/README.md)

### Contributing

Feel free to open a PR.

### License

MIT
