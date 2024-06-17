import { createMiddleware } from "@solidjs/start/middleware";
import { createServerContext } from "./middleware/context";
import { createLocaleContext } from "./middleware/locale";
import { createEnvContext } from "./middleware/env";

export default createMiddleware({
  onRequest: [createEnvContext, createLocaleContext, createServerContext],
});
