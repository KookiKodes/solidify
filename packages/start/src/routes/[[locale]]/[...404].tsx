import { cache, createAsync } from "@solidjs/router";
import { notFound } from "~/utils/notFound";

const redirectToNotFound = cache(async () => {
  "use server";
  throw notFound("Error 404: Page not found!");
}, "not-found");

export default function NotFound() {
  createAsync(() => redirectToNotFound());
  return null;
}
