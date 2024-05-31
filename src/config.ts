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

const defaultConfig: BitarConfig = {
  locale: undefined,
  num: {
    currency: { currency: "USD", maximumFractionDigits: 2, minimumFractionDigits: 2 },
    percent: { maximumFractionDigits: 2, minimumFractionDigits: 2 },
  },
};

let overrideConfig = defaultConfig;

export function getConfig() {
  return overrideConfig;
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export function setConfig(config: DeepPartial<BitarConfig>) {
  overrideConfig = {
    ...defaultConfig,
    ...config,
    num: {
      ...defaultConfig.num,
      ...config.num,
    },
  };
}

export function resolveLocale(locale: string | undefined | null) {
  return locale === null ? undefined : locale || getConfig().locale;
}
