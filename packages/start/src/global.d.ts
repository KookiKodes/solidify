/// <reference types="@solidjs/start/env" />

import type { Locale } from "@solidifront/vite-plugin-shopify-locales/generated";

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

  type I18nLocale = Locale & {
    pathPrefix: `/${Lowercase<Locale["language"]>}-${Locale["country"]}` | "";
  };
}
