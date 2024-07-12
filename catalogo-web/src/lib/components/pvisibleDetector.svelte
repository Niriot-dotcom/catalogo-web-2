<script lang="ts">
  import { onMount } from "svelte";

  export let visibleIds: (string | null)[] = [];
  const timeouts = new Map<string, any>();

  const fetchVisibleIds = async (entries: IntersectionObserverEntry[]) => {
    // 1. Filter all the visible ids
    const visibleEntries = entries.filter(
      (entry: IntersectionObserverEntry) => entry.isIntersecting,
    );
    const newVisibleIds = visibleEntries.map(
      (entry: IntersectionObserverEntry) =>
        entry.target.getAttribute("data-visible-id"),
    );
    visibleIds = [...new Set([...visibleIds, ...newVisibleIds])];
    // visibleIds = [...new Set([...newVisibleIds])];
  };

  onMount(() => {
    const elements = document.querySelectorAll("[data-visible-id]");

    const callback: IntersectionObserverCallback = async (
      entries,
      _observer,
    ) => {
      await fetchVisibleIds(entries);
    };

    const options = {
      // root: null, // viewport
      // rootMargin: "0px", // no margin
      // threshold: 0.5, // 50% of the element is visible
    };
    const observer = new IntersectionObserver(callback, options);
    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  });
</script>
