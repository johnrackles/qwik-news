import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import clsx from "clsx";
import Item from "~/components/Item";

import type { Story } from "~/types";

const PAGE_SIZE = 30;
const MAX_ITEMS = 500; // this is just a hn api constant

export const useStories = routeLoader$(async (requestEvent) => {
  const params = requestEvent.params.type;
  const storyIdsResponse = await fetch(
    `https://hacker-news.firebaseio.com/v0/${
      params?.split("/")[0] || "top"
    }stories.json`
  );
  /**
   * Try to get the page from the params. There are three scenarios:
   * params is null -> we use 1
   * params.split("/") is an array of length 1 -> we use 1
   * params.split("/") is an array of length 2 -> we use params.split("/")[1]
   */
  let pageAsNumber = 1;
  const possiblePagenumber = params?.split("/")[1];

  if (Number(possiblePagenumber)) {
    pageAsNumber = Number(possiblePagenumber);
  }

  const storyIds: number[] = await storyIdsResponse.json();
  return Promise.all(
    // get the current page of stories
    storyIds
      ?.slice((pageAsNumber - 1) * PAGE_SIZE, pageAsNumber * PAGE_SIZE)
      .map(async (id) => {
        const response = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );

        if (response.ok) {
          const item = await response.json();

          if (item) {
            return {
              id: item.id,
              title: item.title,
              url: item.url,
              by: item.by,
              time: item.time,
              score: item.score,
              descendants: item.descendants,
            } as Story;
          }
        }
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
        {signal.value.map((story, i) =>
          typeof story !== "undefined" ? (
            <li
              key={story.id}
              class="mb-2 last-of-type:mb-0 grid grid-cols-[auto,1fr]"
            >
              <Item story={story} i={i + (pageAsNumber - 1) * PAGE_SIZE} />
            </li>
          ) : null
        )}
      </ul>
      <div class="join grid grid-cols-2 max-w-xs mx-auto mb-4 lg:mb-8">
        <Link
          class={clsx(
            "join-item btn btn-outline",
            pageAsNumber === 1 && "btn-disabled"
          )}
          href={`${type ? `/${type}` : "/top"}${`/${pageAsNumber - 1}`}`}
        >
          Previous page
        </Link>
        <Link
          class={clsx(
            "join-item btn btn-outline",
            // the max amount of items is MAX_ITEMS * PAGE_SIZE
            pageAsNumber * PAGE_SIZE >= MAX_ITEMS * PAGE_SIZE && "btn-disabled"
          )}
          href={`${type ? `/${type}` : "/top"}${`/${pageAsNumber + 1}`}`}
        >
          Next
        </Link>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik News",
  meta: [
    {
      name: "description",
      content: "Qwik Hacker News clone",
    },
  ],
};
