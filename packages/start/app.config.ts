import { defineConfig } from "@solidjs/start/config";
import codegen from "vite-plugin-graphql-codegen";
import generateShopifyShopLocales from "vite-plugin-generate-shopify-shop-locales";

export default defineConfig({
  server: {
    preset: "vercel",
    routeRules: {},
  },
  vite: {
    plugins: [codegen(), generateShopifyShopLocales()],
  },
  middleware: "./src/server/index.ts",
});
