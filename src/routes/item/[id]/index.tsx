import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { CommentComponent } from "~/components/CommentComponent";
import Item from "~/components/Item";
import type { AlgoliaItem, Story } from "~/types";

export const useItem = routeLoader$(async (requestEvent) => {
  const { id } = requestEvent.params;
  const [item, comments] = await Promise.all([
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then((res) => res.json())
      .then((data) => data),
    fetch(`http://hn.algolia.com/api/v1/items/${id}`)
      .then((res) => res.json())
      .then((data) => data.children),
  ]);

  return { item, comments } as {
    item: Story;
    comments: AlgoliaItem["children"];
  };
});

export default component$(() => {
  const signal = useItem();

  return (
    <div>
      <Item story={signal.value.item} />
      {signal.value.item.text ? (
        <div dangerouslySetInnerHTML={signal.value.item.text} />
      ) : null}
      <div class="divider"></div>
      <ul class="comment">
        {signal.value.comments?.map((comment, i) => (
          <CommentComponent key={comment.id} comment={comment} indent={i} />
        ))}
      </ul>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const story = resolveValue(useItem);

  return { title: `${story.item.title} | Hacker News` };
};
