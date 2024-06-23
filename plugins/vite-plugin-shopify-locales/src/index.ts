import type { Plugin } from 'vite';
import { getStorefrontEnv } from './utils/env';
import {
  getShopLocalization,
  type ShopLocalizationResult,
} from './utils/getShopLocalization';
import { debugLog } from './utils/debugLog';

function buildShopLocales(
  defaultLocale: IsoCode,
  localization: ShopLocalizationResult,
): Localizations {
  //@ts-expect-error
  return localization.availableCountries.reduce(
    (localizations: Localizations, localization) => {
      localization.availableLanguages.forEach((language) => {
        const isoCode =
          `${language.isoCode.toLowerCase()}-${localization.isoCode}` as IsoCode;
        const data: Locale = {
          country: localization.isoCode,
          currency: localization.currency.isoCode,
          isoCode,
          label: `${language.name} (${localization.currency.isoCode} ${
            localization.currency.symbol
          })`,
          language: language.isoCode,
          languageLabel: language.endonymName,
          market: {
            id: localization.market.id,
            handle: localization.market.handle,
          },
        };
        if (isoCode === defaultLocale) localizations.default = data;
        else localizations[`/${isoCode}`] = data;
      });
      return localizations;
    },
    {},
  );
}

export type Options = {
  /**
   * The fallback locale to use if no other locale is found.
   *
   * @defaultValue `{ languageCode: 'EN', countryCode: 'US' }`
   */
  defaultLocale?: IsoCode;
  /**
   * Log various steps to aid in tracking down bugs.
   *
   * @defaultValue `false`
   */
  debug?: boolean;
};

const DEFAULT_LOCALE: IsoCode = 'en-US';

function generateShopifyShopLocales(options?: Options): Plugin {
  const { debug = false, defaultLocale = DEFAULT_LOCALE } = options ?? {
    defaultLocale: DEFAULT_LOCALE,
  };

  const virtualModuleId = '@solidifront/vite-plugin-shopify-locales/generated';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  const log = (...args: unknown[]) => {
    if (!debug) return;
    debugLog(...args);
  };

  if (options) log('Plugin initialized with options:', options);

  let countries: Localizations;

  return {
    name: 'vite-plugin-shopify-locales',
    async buildStart() {
      const env = getStorefrontEnv.call(this);
      log('Fetching shop locales...');
      const localization = await getShopLocalization(env);
      log('Building shop locales');
      countries = buildShopLocales(defaultLocale, localization);
    },
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `
          export const countries = JSON.parse(\`${JSON.stringify(countries)}\`);
        `;
      }
    },
  };
}

export default generateShopifyShopLocales;
