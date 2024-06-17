import { FetchEvent } from "@solidjs/start/server";

export function createLocaleContext(event: FetchEvent) {
  if (event.locals.locale) return;
  event.locals.locale = getLocaleFromRequest(event.request);
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
    pathPrefix = "/" + firstPathPart;
    [language, country] = firstPathPart.split("-") as I18nFromUrl;
  }

  return { language, country, pathPrefix };
}
