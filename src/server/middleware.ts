import { createMiddleware } from "@solidjs/start/middleware";
import { createHydrogenContext } from "./middleware/hydrogen";
import { createLocaleContext } from "./middleware/locale";
import { createEnvContext } from "./middleware/env";

export default createMiddleware({
  onRequest: [createEnvContext, createLocaleContext, createHydrogenContext],
});
