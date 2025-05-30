import type arrType from "./arr";
import { Bitar } from "./bitar";
import type dateType from "./date";
import type numType from "./num";
import type objType from "./obj";
import type promType from "./prom";
import type strType from "./str";

// this is necessary to maintain comments, otherwise ts loses the source
// comments and strips them out
const b = new Bitar();
export const arr: ReturnType<typeof arrType> = b.arr;
export const prom: ReturnType<typeof promType> = b.prom;
export const str: ReturnType<typeof strType> = b.str;
export const date: ReturnType<typeof dateType> = b.date;
export const obj: ReturnType<typeof objType> = b.obj;
export const num: ReturnType<typeof numType> = b.num;
export const configure: Bitar["configure"] = b.configure;

export default function bitar(...args: ConstructorParameters<typeof Bitar>) {
  return new Bitar(...args);
}
