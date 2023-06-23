import { component$, Slot, useTask$ } from "@builder.io/qwik";
import { useLocation, type RequestHandler } from "@builder.io/qwik-city";
import NProgress from "nprogress";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import "~/nprogress.css";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    // Always serve a cached response by default, up to a day stale
    staleWhileRevalidate: 60 * 60 * 24,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  const loc = useLocation();

  useTask$(({ track }) => {
    track(() => loc.isNavigating);

    if (loc.isNavigating) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  });

  return (
    <div class="container bg-neutral text-neutral-content mx-auto font-sans max-w-5xl">
      <Header />
      <div class="p-4">
        <Slot />
      </div>
      <Footer />
    </div>
  );
});
