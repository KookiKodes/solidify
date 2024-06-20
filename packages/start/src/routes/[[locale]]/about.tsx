import { Title } from "@solidjs/meta";
import { A } from "~/components/LocaleContext";

export default function About() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <Title>About|</Title>
      <A href="/" class="text-blue-500 font-bold">
        Home
      </A>
      <A href="/about">About</A>
    </main>
  );
}
