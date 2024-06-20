import type { FetchEvent } from "@solidjs/start/server";
import { z } from "zod";

export const createEnvContext = async (event: FetchEvent) => {
  if (event.locals.env) return;
  const env = ENV.parse({
    SESSION_SECRET: process.env.SESSION_SECRET,
    SHOPIFY_PUBLIC_STORE_DOMAIN: process.env.SHOPIFY_PUBLIC_STORE_DOMAIN,
    SHOPIFY_STOREFRONT_API_VERSION: process.env.SHOPIFY_STOREFRONT_API_VERSION,
    SHOPIFY_PUBLIC_STOREFRONT_ACCESS_TOKEN:
      process.env.SHOPIFY_PUBLIC_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_PRIVATE_STOREFRONT_ACCESS_TOKEN:
      process.env.SHOPIFY_PRIVATE_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_PUBLIC_STOREFRONT_ID: process.env.SHOPIFY_PUBLIC_STOREFRONT_ID,
    NODE_ENV: process.env.NODE_ENV,
  });

  event.locals.env = env;
};

const ENV = z.object({
  SESSION_SECRET: z.string(),
  SHOPIFY_PUBLIC_STORE_DOMAIN: z
    .string()
    .refine((val) => val.includes(".myshopify.com"), {
      message: "Invalid shopify store domain!",
    }),
  SHOPIFY_STOREFRONT_API_VERSION: z.enum(["2024-04"]),
  SHOPIFY_PUBLIC_STOREFRONT_ACCESS_TOKEN: z.string(),
  SHOPIFY_PRIVATE_STOREFRONT_ACCESS_TOKEN: z.string().optional(),
  SHOPIFY_PUBLIC_STOREFRONT_ID: z.string().optional(),
  NODE_ENV: z.enum(["development", "production"]),
});

declare module "@solidjs/start/server" {
  interface RequestEventLocals {
    env: z.infer<typeof ENV>;
  }
}
