import arr from "./arr";
import date from "./date";
import num from "./num";
import obj from "./obj";
import prom from "./prom";
import str from "./str";
import type { DeepPartial, DeepReadonly } from "./types";

export interface BitarConfig {
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

export class Bitar {
  /**
   * The instance config
   */
  public config: DeepReadonly<BitarConfig> = {
    locale: undefined,
    num: {
      currency: { maximumFractionDigits: 2, minimumFractionDigits: 2 },
      percent: { maximumFractionDigits: 2, minimumFractionDigits: 2 },
    },
  };

  constructor(config?: DeepPartial<BitarConfig>) {
    this.configure = this.configure.bind(this);
    if (config) {
      this.configure(config);
    }
  }

  /**
   * Set configuration options for the instance
   */
  public configure(config: DeepPartial<BitarConfig>) {
    this.config = this.deepFreeze({
      ...this.config,
      ...config,
      num: {
        ...this.config.num,
        ...config.num,
      },
    });

    return this;
  }

  /**
   * Freeze all properties of an object to prevent them from being modified
   */
  private deepFreeze<T extends object>(o: T): DeepReadonly<T> {
    this.obj.keys(o).forEach((k) => {
      if (typeof o[k] === "object" && o[k] !== null && !Object.isFrozen(o[k])) {
        this.deepFreeze(o[k]);
      }
    });

    return Object.freeze(o) as DeepReadonly<T>;
  }

  /**
   * Resolve the locale value for Intl methods.
   *
   * `null` = use system locale
   * `undefined` = use bitar locale
   * `any value` = use that
   */
  public resolveLocale(locale: string | undefined | null): string | undefined {
    return locale === null ? undefined : locale || this.config.locale;
  }

  //
  // Extensions
  //

  /** #### 🧩 Array */
  public arr = arr();
  /** #### 🧩 Date */
  public date = date(this);
  /** #### 🧩 Number */
  public num = num(this);
  /** #### 🧩 Object */
  public obj = obj();
  /** #### 🧩 Promise */
  public prom = prom();
  /** #### 🧩 String */
  public str = str(this);
}
