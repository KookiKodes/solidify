/// <reference types="@solidjs/start/env" />

import type {
  LanguageCode,
  CountryCode,
} from "~/hydrogen/storefront/types/storefront.types";

declare global {
  interface Env {
    NODE_ENV: "development" | "production";
    SESSION_SECRET: string;
    SHOPIFY_STOREFRONT_API_VERSION: string;
    SHOPIFY_PUBLIC_STORE_DOMAIN: string;
    SHOPIFY_PUBLIC_STOREFRONT_ID: string;
    SHOPIFY_PUBLIC_STOREFRONT_ACCESS_TOKEN: string;
    SHOPIFY_PRIVATE_STOREFRONT_ACCESS_TOKEN: string;
  }

  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }

  type I18nLocale = {
    language: LanguageCode;
    country: CountryCode;
    pathPrefix: `/${Lowercase<LanguageCode>}-${CountryCode}` | "";
  };
}

declare module "virtual:shop-locales" {
  type Locale = {
    languageCode: string;
  };
  export const shopLocales: {
    defaultLocale: Locale;
    availableLocales: string[];
  };
}
