import { createMiddleware } from "@solidjs/start/middleware";
import { createServerContext } from "./middleware/context";

export default createMiddleware({
  onRequest: [createServerContext],
});
