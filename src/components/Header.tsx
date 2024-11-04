import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const loc = useLocation();
  const isRoot = loc.url.pathname === "/";

  return (
    <header class="bg-[#ff6600] text-black pl-[2px]">
      <nav>
        <ul class="flex flex-row items-center">
          <li>
            <Link href={isRoot ? undefined : "/"} reload={isRoot}>
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
            <Link class="font-bold text-sm leading-none " href="/">
              Qwik News
            </Link>
          </li>
          <li class="mr-2">
            <Link class="text-sm leading-none" href="/new">
              new
            </Link>
          </li>
          <li>
            <Link class="text-sm leading-none" href="/best">
              best
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
});
