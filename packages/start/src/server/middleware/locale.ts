import type { FetchEvent } from "@solidjs/start/server";
import { getCookie, getHeader, setCookie } from "vinxi/http";
import { resolveAcceptLanguage } from "resolve-accept-language";
// import locale from "locale";
import {
  countries,
  type Locale,
} from "@solidifront/vite-plugin-shopify-locales/generated";

type LowerLanguage = Lowercase<Locale["language"]>;

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
  defaultLocale: typeof countries.default,
  locale: Locale
): I18nLocale["pathPrefix"] {
  if (defaultLocale.isoCode === locale.isoCode) return "";
  return `/${locale.isoCode}`;
}

function getLocaleFromRequest(): I18nLocale {
  type I18nFromUrl = [LowerLanguage, Locale["country"]];

  let [language, country]: I18nFromUrl = [
    countries.default.language.toLowerCase() as LowerLanguage,
    countries.default.country,
  ];

  // If local cookie is present, use it. Will use this later to allow the user to change the locale.
  const cookie = getCookie("locale");
  if (cookie) return JSON.parse(cookie) as I18nLocale;

  const userLanguages = getHeader("accept-language");
  if (!userLanguages)
    return {
      ...countries.default,
      pathPrefix: "",
    };

  const locale = resolveAcceptLanguage(
    userLanguages,
    Object.values(countries).map((locale) => locale.isoCode),
    countries.default.isoCode,
    {
      matchCountry: true,
    }
  );

  if (locale === countries.default.isoCode)
    return {
      pathPrefix: "",
      ...countries.default,
    };

  const matchingLocale = countries[`/${locale}`];

  return {
    pathPrefix: getPathPrefix(countries.default, matchingLocale),
    ...matchingLocale,
  };
}
