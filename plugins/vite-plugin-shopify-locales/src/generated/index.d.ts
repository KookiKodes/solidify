import type {
  CountryCode,
  CurrencyCode,
  LanguageCode,
} from '@shopify/hydrogen/storefront-api-types';

declare module '@solidifront/vite-plugin-shopify-locales/generated' {
  export type IsoCode = `${Lowercase<LanguageCode>}-${CountryCode}`;

  export type Locale = {
    country: CountryCode;
    currency: CurrencyCode;
    isoCode: IsoCode;
    label:
      | `${string} (${CurrencyCode} ${string})`
      | `${string} - ${string} (${CurrencyCode} ${string})`;
    language: LanguageCode;
    languageLabel: string;
  };

  export type Localizations = Record<`/${string}` | 'default', Locale>;
  export const countries: Localizations;
}
