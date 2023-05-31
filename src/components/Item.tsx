import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { Story } from "~/types";

dayjs.extend(relativeTime);

export default component$(({ story, i }: { story: Story; i?: number }) => {
  return (
    <div class="mb-2 last-of-type:mb-0 grid grid-cols-[auto,1fr]">
      {typeof i !== "undefined" ? (
        <span class="text-grey mr-2">{i + 1}.</span>
      ) : null}
      <a href={story.url}>{story.title}</a>
      <div
        class={clsx(
          "text-grey text-xs row-start-2",
          typeof i !== "undefined" && "col-start-2"
        )}
      >
        {story.score} points by {story.by}{" "}
        {dayjs(dayjs.unix(story.time)).fromNow()} |{" "}
        <Link href={`/item/${story.id}`} class="link-hover">
          {story.descendants} comments
        </Link>
      </div>
    </div>
  );
});
