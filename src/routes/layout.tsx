import { component$, Slot } from "@builder.io/qwik";
import Header from "~/components/Header";

export default component$(() => {
  return (
    <div class="container mx-auto bg-secondary font-sans">
      <Header />
      <div class="p-4">
        <Slot />
      </div>
      <footer></footer>
    </div>
  );
});
