import { redirect } from "@solidjs/router";
import { getLocale } from "~/server/context";

export const notFound = (statusText?: string) => {
  const locale = getLocale();
  return redirect(`${locale.pathPrefix}/notFound`, { status: 404, statusText });
};
