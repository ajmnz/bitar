import { Bitar } from "./bitar";

export const { arr, prom, str, date, obj, num, configure } = new Bitar();

export default function bitar(...args: ConstructorParameters<typeof Bitar>) {
  return new Bitar(...args);
}
