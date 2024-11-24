import { setConfig } from "./config";

export * as arr from "./array";
export * as prom from "./promise";
export { default as str } from "./string";
export * as date from "./date";
export * as obj from "./object";
export * as num from "./number";

export default {
  configure: setConfig,
};
