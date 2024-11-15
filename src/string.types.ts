export type FCapitalize<T extends string> = T extends `${infer F}${infer Rest}`
  ? `${Capitalize<F>}${Rest}`
  : T;

//
// Case conversions
//

export type StringCase = "title" | "camel" | "pascal" | "snake" | "kebab";

type RemoveSpaces<S extends string> = S extends `${infer A} ${infer B}`
  ? RemoveSpaces<`${A}${B}`>
  : S;

/**
 * Convert one string case to another
 */
export type ConvertCase<
  From extends StringCase,
  To extends StringCase,
  Input extends string,
> = From extends keyof ConvertMap<Input>
  ? To extends keyof ConvertMap<Input>[From]
    ? ConvertMap<Input>[From][To]
    : never
  : never;

type ConvertMap<S1 extends string, S2 extends RemoveSpaces<S1> = RemoveSpaces<S1>> = {
  title: {
    camel: TitleToCamel<S1>; // "Example String" -> "exampleString"
    pascal: TitleToPascal<S1>; // "Example String" -> "ExampleString"
    snake: TitleToSnake<S1>; // "Example String" -> "example_string"
    kebab: TitleToKebab<S1>; // "Example String" -> "example-string"
  };
  camel: {
    title: CamelToTitle<S2>; // "exampleString" -> "Example String"
    pascal: CamelToPascal<S2>; // "exampleString" -> "ExampleString"
    snake: CamelToSnake<S2>; // "exampleString" -> "example_string"
    kebab: CamelToKebab<S2>; // "exampleString" -> "example-string"
  };
  pascal: {
    title: PascalToTitle<S2>; // "ExampleString" -> "Example String"
    camel: PascalToCamel<S2>; // "ExampleString" -> "exampleString"
    snake: PascalToSnake<S2>; // "ExampleString" -> "example_string"
    kebab: PascalToKebab<S2>; // "ExampleString" -> "example-string"
  };
  snake: {
    title: SnakeToTitle<S2>; // "example_string" -> "Example String"
    camel: SnakeToCamel<S2>; // "example_string" -> "exampleString"
    pascal: SnakeToPascal<S2>; // "example_string" -> "ExampleString"
    kebab: SnakeToKebab<S2>; // "example_string" -> "example-string"
  };
  kebab: {
    title: KebabToTitle<S2>; // "example-string" -> "Example String"
    camel: KebabToCamel<S2>; // "example-string" -> "exampleString"
    pascal: KebabToPascal<S2>; // "example-string" -> "ExampleString"
    snake: KebabToSnake<S2>; // "example-string" -> "example_string"
  };
};

//
// Title helpers
//

type TitleToSnake<S extends string> = S extends `${infer T} ${infer U}`
  ? `${Lowercase<T>}_${TitleToSnake<U>}`
  : Lowercase<S>;
type TitleToKebab<S extends string> = S extends `${infer T} ${infer U}`
  ? `${Lowercase<T>}-${TitleToKebab<U>}`
  : Lowercase<S>;
type TitleToCamel<S extends string> =
  Capitalize<TitleToPascal<S>> extends infer R ? Uncapitalize<R & string> : S;
type TitleToPascal<S extends string> = S extends `${infer T} ${infer U}`
  ? `${Capitalize<Lowercase<T>>}${TitleToPascal<U>}`
  : Capitalize<Lowercase<S>>;

//
// Snake helpers
//

type SnakeToTitle<S extends string> = S extends `${infer T}_${infer U}`
  ? `${Capitalize<Lowercase<T>>}${SnakeToTitle<U> extends "" ? "" : ` ${SnakeToTitle<U>}`}`
  : Capitalize<Lowercase<S>>;

type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}`
  ? `${Lowercase<T>}${Capitalize<SnakeToCamel<U>>}`
  : S;

type SnakeToPascal<S extends string> = Capitalize<SnakeToCamel<S>>;
type SnakeToKebab<S extends string> = S extends `${infer T}_${infer U}`
  ? `${Lowercase<T>}-${SnakeToKebab<U>}`
  : Lowercase<S>;

//
// Kebab helpers
//

type KebabToTitle<S extends string> = S extends `${infer T}-${infer U}`
  ? `${Capitalize<Lowercase<T>>} ${KebabToTitle<U>}`
  : Capitalize<Lowercase<S>>;

type KebabToSnake<S extends string> = S extends `${infer T}-${infer U}`
  ? `${Lowercase<T>}_${KebabToSnake<U>}`
  : Lowercase<S>;

type KebabToCamel<S extends string> = S extends `${infer T}-${infer U}`
  ? `${Lowercase<T>}${Capitalize<KebabToCamel<U>>}`
  : S;

type KebabToPascal<S extends string> = Capitalize<KebabToCamel<S>>;

//
// Camel helpers
//

type CamelToSnake<S extends string> = S extends `${infer T}${infer U}`
  ? U extends ""
    ? Lowercase<T>
    : `${Lowercase<T>}${U extends Capitalize<U> ? "_" : ""}${CamelToSnake<U>}`
  : S;
type CamelToKebab<S extends string> = S extends `${infer T}${infer U}`
  ? `${Lowercase<T>}${U extends "" ? "" : U extends Capitalize<U> ? "-" : ""}${CamelToKebab<U>}`
  : S;
type CamelToPascal<S extends string> = Capitalize<S>;
type CamelToTitle<S extends string> =
  CamelToSnake<S> extends infer R ? SnakeToTitle<R & string> : S;

//
// Pascal helpers
//

type PascalToSnake<S extends string> = CamelToSnake<Uncapitalize<S>>;
type PascalToKebab<S extends string> = CamelToKebab<Uncapitalize<S>>;
type PascalToCamel<S extends string> = Uncapitalize<S>;
type PascalToTitle<S extends string> =
  PascalToSnake<S> extends infer R ? SnakeToTitle<R & string> : S;
