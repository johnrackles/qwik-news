import {
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

export const THEME_KEY = "theme";

const options = [
  { value: "system", label: "System" },
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
];

export default component$(() => {
  const theme = useSignal<string | undefined>();

  // on render, set the theme to the value in localStorage
  useVisibleTask$(() => {
    theme.value = localStorage.getItem(THEME_KEY) || undefined;
  });

  useTask$(({ track }) => {
    const change = track(() => theme.value);

    if (isServer) {
      return; // Server guard
    }

    if (!change) return;

    if (change === "system") {
      localStorage.removeItem(THEME_KEY);
      document.documentElement.dataset.theme = "";
      return;
    }

    localStorage.setItem(THEME_KEY, change);
    document.documentElement.dataset.theme = change;
  });

  return (
    <div class="form-control">
      <label for="theme-change" class="label">
        <span class="label-text">Pick theme</span>
      </label>
      <select
        class="select w-full max-w-xs"
        id="theme-change"
        name="theme-change"
        onInput$={(_event, element) => {
          theme.value = element.value;
        }}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={option.value === theme.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});
