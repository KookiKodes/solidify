import { defineConfig } from "@solidjs/start/config";
import codegen from "vite-plugin-graphql-codegen";
import generateShopifyShopLocales from "@solidifront/vite-plugin-shopify-locales";

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
