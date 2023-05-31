import { component$ } from "@builder.io/qwik";
import dayjs from "dayjs";
import type { Comment } from "~/types";

type Props = { comment: Comment; indent: number };

export const CommentComponent = component$(({ comment, indent }: Props) => {
  if (!comment.text) return null;

  return (
    <li class="mb-4 lg:mb-8 ml-4">
      <div class="text-sm text-grey mb-2">
        {comment.author} {dayjs(comment.created_at).fromNow()}
      </div>
      <div dangerouslySetInnerHTML={comment.text} class="pl-2" />
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
    </li>
  );
});
