import type { FetchEvent } from "@solidjs/start/server";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const createHydrogenContext = async (event: FetchEvent) => {
  if (event.locals.hydrogen) return;
  const env = event.locals.env;

  const storefront = createStorefrontApiClient({
    storeDomain: env.PUBLIC_STORE_DOMAIN,
    apiVersion: env.STOREFRONT_API_VERSION,
    publicAccessToken: env.PUBLIC_STOREFRONT_ACCESS_TOKEN,
    privateAccessToken: env.PRIVATE_STOREFRONT_ACCESS_TOKEN,
  });

  event.locals.hydrogen = {
    storefront,
  };
};

declare module "@solidjs/start/server" {
  interface RequestEventLocals {
    hydrogen: {
      storefront: ReturnType<typeof createStorefrontApiClient>;
    };
  }
}
