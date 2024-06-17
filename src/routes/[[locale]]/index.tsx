import { createAsync, RouteDefinition } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import storefront from "~/hydrogen/storefront";
import { Show } from "solid-js";

const getShopQuery = `#graphql
  query GetShop($language: LanguageCode!, $country: CountryCode!) @inContext(language: $language, country: $country){
    shop {
      id
      name
    }
  }
`;

export const route = {
  load: async (...args) => {
    try {
      return await storefront.query(getShopQuery);
    } catch (err) {
      console.log(err);
    }
  },
} satisfies RouteDefinition;

export default function Home() {
  const data = createAsync(async () => storefront.query(getShopQuery));
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <Show when={data()?.data}>
        <Title>Home Page | {data()?.data?.shop?.name}</Title>
      </Show>
    </main>
  );
}
