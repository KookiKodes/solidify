import type { FetchEvent } from "@solidjs/start/server";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { z } from "zod";

export const createServerContext = (event: FetchEvent) => {
  if (event.locals.context) return;
  const env = ENV.parse({
    SESSION_SECRET: process.env.SESSION_SECRET,
    PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN,
    STOREFRONT_API_VERSION: process.env.STOREFRONT_API_VERSION,
    PUBLIC_STOREFRONT_ACCESS_TOKEN: process.env.PUBLIC_STOREFRONT_ACCESS_TOKEN,
    PRIVATE_STOREFRONT_ACCESS_TOKEN:
      process.env.PRIVATE_STOREFRONT_ACCESS_TOKEN,
    PUBLIC_STOREFRONT_ID: process.env.PUBLIC_STOREFRONT_ID,
    NODE_ENV: process.env.NODE_ENV,
  });

  const locale = getLocaleFromRequest(event.request);
  const storefront = createStorefrontApiClient({
    storeDomain: env.PUBLIC_STORE_DOMAIN,
    apiVersion: env.STOREFRONT_API_VERSION,
    publicAccessToken: env.PUBLIC_STOREFRONT_ACCESS_TOKEN,
    privateAccessToken: env.PRIVATE_STOREFRONT_ACCESS_TOKEN,
  });

  event.locals = {
    ...event.locals,
    context: {
      storefront,
      locale,
      env,
    },
  };
};

const ENV = z.object({
  SESSION_SECRET: z.string(),
  PUBLIC_STORE_DOMAIN: z
    .string()
    .refine((val) => val.includes(".myshopify.com"), {
      message: "Invalid shopify store domain!",
    }),
  STOREFRONT_API_VERSION: z.enum(["2024-04"]),
  PUBLIC_STOREFRONT_ACCESS_TOKEN: z.string(),
  PRIVATE_STOREFRONT_ACCESS_TOKEN: z.string().optional(),
  PUBLIC_STOREFRONT_ID: z.string().optional(),
  NODE_ENV: z.enum(["development", "production"]),
});

function getLocaleFromRequest(request: Request): I18nLocale {
  const url = new URL(request.url);
  const firstPathPart = url.pathname.split("/")[1]?.toUpperCase() ?? "";

  type I18nFromUrl = [I18nLocale["language"], I18nLocale["country"]];

  let pathPrefix = "";
  let [language, country]: I18nFromUrl = ["EN", "US"] as I18nFromUrl;

  if (/^[A-Z]{2}-[A-Z]{2}$/i.test(firstPathPart)) {
    pathPrefix = "/" + firstPathPart;
    [language, country] = firstPathPart.split("-") as I18nFromUrl;
  }

  return { language, country, pathPrefix };
}

declare module "@solidjs/start/server" {
  interface RequestEventLocals {
    context: {
      locale: I18nLocale;
      storefront: ReturnType<typeof createStorefrontApiClient>;
      env: z.infer<typeof ENV>;
    };
  }
}
