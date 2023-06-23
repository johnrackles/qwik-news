import { component$, useSignal } from "@builder.io/qwik";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { SlideDown } from "~/integrations/react/SlideDown";
import type { AlgoliaItem } from "~/types";

type Props = { comment: AlgoliaItem["children"][number]; indent: number };

dayjs.extend(relativeTime);

export const CommentComponent = component$(({ comment, indent }: Props) => {
  const hidden = useSignal(false);

  if (!comment.text) return null;

  return (
    <li class="mb-4 lg:mb-8 ml-4">
      <div class="text-sm mb-2">
        {comment.author} {dayjs(comment.created_at).fromNow()} |
        <button
          class="ml-2"
          onClick$={() => {
            hidden.value = !hidden.value;
          }}
        >
          [{hidden.value ? `${comment.children?.length} more` : " - "}]
        </button>
      </div>
      <SlideDown hidden={hidden.value} client:signal={hidden}>
        <div
          dangerouslySetInnerHTML={comment.text}
          class="pl-2 mb-4 lg:mb-8 prose text-primary-content"
        />
        <div class="divider" />
        {comment.children?.length ? (
          <ul class="ml-4 mb-4 lg:mb-8">
            {comment.children.map((comment, i) => (
              <CommentComponent
                key={comment.id}
                comment={comment}
                indent={indent + i}
              />
            ))}
          </ul>
        ) : null}
      </SlideDown>
    </li>
  );
});
