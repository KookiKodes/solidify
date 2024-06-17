import { defineConfig } from "@solidjs/start/config";
import codegen from "vite-plugin-graphql-codegen";

export default defineConfig({
  server: {
    preset: "vercel",
  },
  vite: {
    plugins: [codegen()],
  },
  middleware: "./src/server/index.ts",
});
