import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import clsx from "clsx";
import Item from "~/components/Item";

import type { Story } from "~/types";

export const useStories = routeLoader$(async (requestEvent) => {
  const storyIdsResponse = await fetch(
    `https://hacker-news.firebaseio.com/v0/${
      requestEvent.query.get("type") ?? "top"
    }stories.json`
  );
  const storyIds: number[] = await storyIdsResponse.json();

  return Promise.all(
    storyIds?.slice(0, 30).map(async (id) => {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      const item = await response.json();

      return {
        id: item.id,
        title: item.title,
        url: item.url,
        by: item.by,
        time: item.time,
        score: item.score,
        descendants: item.descendants,
      } as Story;
    })
  );
});

export default component$(() => {
  const signal = useStories();
  const loc = useLocation();
  const [type, page] = loc.params.type.split("/");
  const pageAsNumber = page ? Number(page) : 1;

  return (
    <>
      <ul class="mb-4 lg:mb-8">
        {signal.value.map((story, i) => (
          <li
            key={story.id}
            class="mb-2 last-of-type:mb-0 grid grid-cols-[auto,1fr]"
          >
            <Item story={story} i={i} />
          </li>
        ))}
      </ul>
      <div class="join grid grid-cols-2 max-w-xs mx-auto">
        <Link
          class={clsx(
            "join-item btn btn-outline",
            pageAsNumber === 1 && "btn-disabled"
          )}
          href={`${type ? `/${type}` : ""}${`/${pageAsNumber - 1}`}`}
        >
          Previous page
        </Link>
        <Link
          class="join-item btn btn-outline"
          href={`${type ? `/${type}` : ""}${`/${pageAsNumber + 1}`}`}
        >
          Next
        </Link>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Hacker News",
  meta: [
    {
      name: "description",
      content: "Qwik Hacker News clone",
    },
  ],
};
