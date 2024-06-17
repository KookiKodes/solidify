import { A, createAsync, RouteDefinition } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import storefront from "~/storefront";
import getServerContext from "~/server/context";
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
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        {JSON.stringify(data()?.data)}
      </h1>
      <p class="mt-8">
        Visit{" "}
        <a
          href="https://solidjs.com"
          target="_blank"
          class="text-sky-600 hover:underline"
        >
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
      <p class="my-4">
        <span>Home</span>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>{" "}
      </p>
    </main>
  );
}
