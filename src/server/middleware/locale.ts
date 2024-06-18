import type { FetchEvent } from "@solidjs/start/server";
import { setCookie } from "vinxi/http";

export async function createLocaleContext(event: FetchEvent) {
  if (event.request.url.includes("/_server")) return;
  const locale = getLocaleFromRequest(event.request);
  event.locals.locale = locale;
  setCookie("locale", JSON.stringify(locale));
}

declare module "@solidjs/start/server" {
  interface RequestEventLocals {
    locale: I18nLocale;
  }
}

function getLocaleFromRequest(request: Request): I18nLocale {
  const url = new URL(request.url);
  const firstPathPart = url.pathname.split("/")[1]?.toUpperCase() ?? "";

  type I18nFromUrl = [I18nLocale["language"], I18nLocale["country"]];

  let pathPrefix = "";
  let [language, country]: I18nFromUrl = ["EN", "US"] as I18nFromUrl;

  if (/^[A-Z]{2}-[A-Z]{2}$/i.test(firstPathPart)) {
    pathPrefix = `/${firstPathPart
      .substring(0, 2)
      .toLowerCase()}-${firstPathPart.substring(3, 5)}`;
    [language, country] = firstPathPart.split("-") as I18nFromUrl;
  }

  return { language, country, pathPrefix };
}
