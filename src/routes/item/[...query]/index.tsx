import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { CommentComponent } from "~/components/CommentComponent";
import Item from "~/components/Item";
import type { AlgoliaItem, Story } from "~/types";

export const useItem = routeLoader$(async (requestEvent) => {
  const pageSize = 10;
  const [id, page] = requestEvent.params.query.split("/");
  const [item, comments] = await Promise.all<
    [Promise<Story>, Promise<AlgoliaItem>]
  >([
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then((res) => res.json())
      .then((data) => data),
    fetch(`http://hn.algolia.com/api/v1/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      }),
  ]);

  const pageAsNumber = page ? Number(page) : 1;

  return {
    item,
    comments: comments.children.slice(
      pageSize * (pageAsNumber - 1),
      pageSize * pageAsNumber
    ) as AlgoliaItem["children"],
    meta: {
      count: comments.children.length,
      page: pageAsNumber,
      pages: Math.ceil(comments.children.length / pageSize),
    },
  };
});

export default component$(() => {
  const signal = useItem();
  const loc = useLocation();
  const [id, page] = loc.params.query.split("/");
  const pageAsNumber = page ? Number(page) : 1;

  return (
    <div>
      <Item story={signal.value.item} />
      {signal.value.item.text ? (
        <div class="prose" dangerouslySetInnerHTML={signal.value.item.text} />
      ) : null}
      <div class="divider"></div>
      <ul class="comment">
        {signal.value.comments?.map((comment, i) => (
          <CommentComponent key={comment.id} comment={comment} indent={i} />
        ))}
      </ul>
      {signal.value.meta.pages > 1 &&
      pageAsNumber + 1 <= signal.value.meta.pages ? (
        <Link href={`/item/${id}/${pageAsNumber + 1}`} class="link">
          Next Page
        </Link>
      ) : null}
      {pageAsNumber > 1 ? (
        <Link href={`/item/${id}/${pageAsNumber - 1}`}>Previous Page</Link>
      ) : null}
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const story = resolveValue(useItem);

  return { title: `${story.item.title} | Hacker News` };
};
