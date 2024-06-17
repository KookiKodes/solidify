import type { FetchEvent } from "@solidjs/start/server";
import { z } from "zod";

export const createEnvContext = (event: FetchEvent) => {
  if (event.locals.env) return;
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

  event.locals.env = env;
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

declare module "@solidjs/start/server" {
  interface RequestEventLocals {
    env: z.infer<typeof ENV>;
  }
}
