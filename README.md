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

Not at the moment, each function has detailed descriptions and examples.

### Contributing

Feel free to open a PR.

### License

MIT
