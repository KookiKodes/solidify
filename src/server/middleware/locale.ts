import type { FetchEvent } from "@solidjs/start/server";
import { getCookie, getHeader, setCookie, setResponseStatus } from "vinxi/http";
import { resolveAcceptLanguage } from "resolve-accept-language";
// import locale from "locale";
import shopLocales from "vite-plugin-generate-shopify-shop-locales/locales";

export async function createLocaleContext(event: FetchEvent) {
  if (event.request.url.includes("/_server")) return;
  const locale = getLocaleFromRequest();
  event.locals.locale = locale;
  setCookie("locale", JSON.stringify(locale));
}

declare module "@solidjs/start/server" {
  interface RequestEventLocals {
    locale: I18nLocale;
  }
}

function getPathPrefix(
  defaultLocale: typeof shopLocales.defaultLocale,
  locale: Pick<I18nLocale, "country" | "language">
): I18nLocale["pathPrefix"] {
  if (
    defaultLocale.countryCode === locale.country &&
    defaultLocale.languageCode === locale.language.toUpperCase()
  )
    return "";
  return `/${
    locale.language.toLowerCase() as Lowercase<I18nLocale["language"]>
  }-${locale.country}`;
}

function getLocaleFromRequest(): I18nLocale {
  type I18nFromUrl = [I18nLocale["language"], I18nLocale["country"]];

  let pathPrefix: "" = "";
  let [language, country]: I18nFromUrl = [
    shopLocales.defaultLocale.languageCode,
    shopLocales.defaultLocale.countryCode,
  ] as I18nFromUrl;

  // If local cookie is present, use it. Will use this later to allow the user to change the locale.
  const cookie = getCookie("locale");
  if (cookie) return JSON.parse(cookie) as I18nLocale;

  const userLanguages = getHeader("accept-language");
  if (!userLanguages)
    return {
      language,
      country,
      pathPrefix,
    };

  const locale = resolveAcceptLanguage(
    userLanguages,
    shopLocales.availableLocales,
    `${shopLocales.defaultLocale.languageCode}-${shopLocales.defaultLocale.countryCode}`,
    {
      matchCountry: true,
    }
  );

  [language, country] = locale.split("-") as I18nFromUrl;

  // If no accept-language header is present, use the default locale.

  return {
    language: language.toUpperCase() as I18nLocale["language"],
    country,
    pathPrefix: getPathPrefix(shopLocales.defaultLocale, {
      language,
      country,
    }),
  };
}
