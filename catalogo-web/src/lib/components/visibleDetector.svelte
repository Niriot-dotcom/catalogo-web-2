<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
  
    let currentVisibleIds: string[] = [];
    const timeouts = new Map<string, any>(); // key: ID, value: timeout handle
  
    // Create a dispatcher to emit events
    const dispatch = createEventDispatcher();
  
    onMount(() => {
        const elements = document.querySelectorAll('[data-visible-id]');
  
        const callback: IntersectionObserverCallback = (entries, observer) => {
            entries.forEach(entry => {
                const ids = entry.target.getAttribute('data-visible-id');
                if (!ids) return;
  
                const elementIds = ids.split(',').map(id => id.trim());
  
                elementIds.forEach(id => {
                    if (entry.isIntersecting) {
                        if (timeouts.has(id)) {
                            clearTimeout(timeouts.get(id));
                            timeouts.delete(id);
                        }
                        if (!currentVisibleIds.includes(id)) {
                            currentVisibleIds.push(id);
                            dispatch('visibleChange', currentVisibleIds);
                        }
                    } else {
                        if (!timeouts.has(id)) {
                            const timeout = setTimeout(() => {
                                // const index = currentVisibleIds.indexOf(id);
                                // if (index > -1) {
                                //     currentVisibleIds.splice(index, 1);
                                //     dispatch('visibleChange', currentVisibleIds);
                                //     timeouts.delete(id);
                                // }
                                if (currentVisibleIds.length > 4) {
                                    currentVisibleIds.splice(0, 1);
                                    dispatch('visibleChange', currentVisibleIds);
                                    timeouts.delete(id);
                                }
                            }, 400); // 1 second tolerance
                            timeouts.set(id, timeout);
                        }
                    }
                });
            });
        };
  
        const observer = new IntersectionObserver(callback);
  
        elements.forEach(element => {
            observer.observe(element);
        });
  
        // Emit visibleChange event after starting the observation
        dispatch('visibleChange', currentVisibleIds);
  
        return () => {
            elements.forEach(element => {
                observer.unobserve(element);
            });
            timeouts.forEach(timeout => clearTimeout(timeout));
        };
    });
  </script>
  