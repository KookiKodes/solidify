import type { StorefrontQueries } from "@shopify/storefront-api-client";

import { cache } from "@solidjs/router";
import getServerContext from "~/server/context";

function withLocaleVariables<Query extends keyof StorefrontQueries>(
  locale: I18nLocale,
  variables?: Omit<
    StorefrontQueries[Query]["variables"],
    "language" | "country"
  >
) {
  return {
    ...variables,
    country: locale.country,
    language: locale.language,
  };
}

const storefront = {
  query: <Query extends keyof StorefrontQueries>(
    queryString: Query,
    variables?: Omit<
      StorefrontQueries[Query]["variables"],
      "language" | "country"
    >
  ) => {
    return cache(
      async (
        queryString: Query,
        variables?: Omit<
          StorefrontQueries[Query]["variables"],
          "language" | "country"
        >
      ) => {
        "use server";
        const context = getServerContext();
        // @ts-expect-error
        return context.storefront.request(queryString, {
          variables: withLocaleVariables(context.locale, variables),
        });
      },
      queryString.toString()
    )(queryString, variables);
  },
};

export default storefront;
