import { component$ } from "@builder.io/qwik";
import ThemeSelect from "./ThemeSelect";

export default component$(() => {
  return (
    <footer class="footer footer-center p-10 bg-base-300 text-base-content rounded">
      <div class="grid grid-flow-col gap-4">
        <a
          class="link link-hover"
          href="https://github.com/johnrackles/qwik-news"
        >
          GitHub
        </a>
      </div>
      <ThemeSelect />
      <div>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by{" "}
          <a href="https://github.com/johnrackles">john</a>
        </p>
      </div>
    </footer>
  );
});
