<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";

  let currentTemplates: string[] = [];
  const timeouts = new Map<string, any>(); // key: ID, value: timeout handle

  // Create a dispatcher to emit events
  const dispatch = createEventDispatcher();

  onMount(() => {
    const elements = document.querySelectorAll("[data-template-id]");

    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        const ids = entry.target.getAttribute("data-template-id");
        if (!ids) return;

        const elementIds = ids.split(",").map((id) => id.trim());

        elementIds.forEach((id) => {
          if (entry.isIntersecting) {
            if (timeouts.has(id)) {
              clearTimeout(timeouts.get(id));
              timeouts.delete(id);
            }
            if (!currentTemplates.includes(id)) {
              currentTemplates = [id];
            }

            dispatch("templateChange", currentTemplates);
          } else {
            if (!timeouts.has(id)) {
              const timeout = setTimeout(() => {
                const index = currentTemplates.indexOf(id);
                if (index > -1) {
                  currentTemplates.splice(index, 1);
                  dispatch("templateChange", currentTemplates);
                  timeouts.delete(id);
                }
              }, 3000); // 1 second tolerance
              timeouts.set(id, timeout);
            }
          }
        });
      });
    };

    const observer = new IntersectionObserver(callback);

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
