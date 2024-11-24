/* eslint-disable @typescript-eslint/no-unused-vars */
import type * as types from "../src/string.types";

const TitleToCamel: types.ConvertCase<"title", "camel", "My example string"> =
  "myExampleString";
const TitleToPascal: types.ConvertCase<"title", "pascal", "My example string"> =
  "MyExampleString";
const TitleToSnake: types.ConvertCase<"title", "snake", "My example string"> =
  "my_example_string";
const TitleToKebab: types.ConvertCase<"title", "kebab", "My example string"> =
  "my-example-string";

const CamelToTitle: types.ConvertCase<"camel", "title", "myExampleString"> =
  "My Example String";
const CamelToPascal: types.ConvertCase<"camel", "pascal", "myExampleString"> =
  "MyExampleString";
const CamelToSnake: types.ConvertCase<"camel", "snake", "myExampleString"> =
  "my_example_string";
const CamelToKebab: types.ConvertCase<"camel", "kebab", "myExampleString"> =
  "my-example-string";

const PascalToTitle: types.ConvertCase<"pascal", "title", "MyExampleString"> =
  "My Example String";
const PascalToCamel: types.ConvertCase<"pascal", "camel", "MyExampleString"> =
  "myExampleString";
const PascalToSnake: types.ConvertCase<"pascal", "snake", "MyExampleString"> =
  "my_example_string";
const PascalToKebab: types.ConvertCase<"pascal", "kebab", "MyExampleString"> =
  "my-example-string";

const SnakeToTitle: types.ConvertCase<"snake", "title", "my_example_string"> =
  "My Example String";
const SnakeToCamel: types.ConvertCase<"snake", "camel", "my_example_string"> =
  "myExampleString";
const SnakeToPascal: types.ConvertCase<"snake", "pascal", "my_example_string"> =
  "MyExampleString";
const SnakeToKebab: types.ConvertCase<"snake", "kebab", "my_example_string"> =
  "my-example-string";

const KebabToTitle: types.ConvertCase<"kebab", "title", "my-example-string"> =
  "My Example String";
const KebabToCamel: types.ConvertCase<"kebab", "camel", "my-example-string"> =
  "myExampleString";
const KebabToPascal: types.ConvertCase<"kebab", "pascal", "my-example-string"> =
  "MyExampleString";
const KebabToSnake: types.ConvertCase<"kebab", "snake", "my-example-string"> =
  "my_example_string";
