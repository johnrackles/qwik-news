import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <header class="bg-[#ff6600] text-black mt-2 pl-[2px]">
      <nav>
        <ul class="flex flex-row items-center">
          <li>
            <Link href="/">
              <img
                src="/y18.svg"
                alt="Y"
                width={18}
                height={18}
                class="border border-white mr-2"
              />
            </Link>
          </li>
          <li class="mr-2">
            <Link class="font-bold text-sm leading-none " href="/news">
              Hacker News
            </Link>
          </li>
          <li>
            <Link class="text-sm leading-none" href="/newest">
              new
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
});
