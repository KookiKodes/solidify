/// <reference types="@solidjs/start/env" />

import type {
  LanguageCode,
  CountryCode,
} from "~/hydrogen/storefront/types/storefront.types";

declare global {
  interface Env {
    NODE_ENV: "development" | "production";
    SESSION_SECRET: string;
    STOREFRONT_API_VERSION: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_ID: string;
    PUBLIC_STOREFRONT_ACCESS_TOKEN: string;
    PRIVATE_STOREFRONT_ACCESS_TOKEN: string;
  }

  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }

  type I18nLocale = {
    language: LanguageCode;
    country: CountryCode;
    pathPrefix: string;
  };
}
