import type {
  CountryCode,
  CurrencyCode,
  LanguageCode,
} from '@shopify/hydrogen/storefront-api-types';

declare global {
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
    market: { id: string; handle: string };
  };

  export type Localizations = Record<`/${string}` | 'default', Locale>;
}
