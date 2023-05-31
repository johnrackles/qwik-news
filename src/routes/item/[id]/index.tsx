import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { CommentComponent } from "~/components/CommentComponent";
import Item from "~/components/Item";
import type { Comment, Story } from "~/types";

const resolveComments = async (id: number) => {
  const response = await fetch(`http://hn.algolia.com/api/v1/items/${id}`);
  const item = await response.json();
  return item;
};

export const useItem = routeLoader$(async (requestEvent) => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${requestEvent.params.id}.json`
  );
  const item: Story = await response.json();
  // recursively get comments
  const comments: Comment[] = await Promise.all(
    (item.kids || []).map((id) => resolveComments(id))
  );

  return { item, comments };
});

export default component$(() => {
  const signal = useItem();

  return (
    <div>
      <Item story={signal.value.item} />
      {signal.value.item.text ? (
        <div
          dangerouslySetInnerHTML={signal.value.item.text}
          class="text-grey"
        />
      ) : null}
      <div class="divider"></div>
      <ul class="comment">
        {signal.value.comments.map((comment, i) => (
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
