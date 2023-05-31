import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
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

  return (
    <ul>
      {signal.value.map((story, i) => (
        <li
          key={story.id}
          class="mb-2 last-of-type:mb-0 grid grid-cols-[auto,1fr]"
        >
          <Item story={story} i={i} />
        </li>
      ))}
    </ul>
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
