import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <header class="bg-primary mt-2 flex flex-row items-center pl-[2px]">
      <Link href="/">
        <img
          src="/y18.svg"
          alt="Y"
          width={18}
          height={18}
          class="border border-white mr-2"
        />
      </Link>
      <div>
        <Link class="font-bold text-sm leading-none" href="/news">
          Hacker News
        </Link>
      </div>
    </header>
  );
});
