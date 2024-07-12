<script lang="ts">
  import {
    navigateToNextPage,
    navigateToPreviousPage,
  } from "$lib/utils/navigation";

  export let showBg: boolean = false;
  let touchStartX = 0;
  let touchEndX = 0;

  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  }

  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;

    // prev page (izquierda)
    if (deltaX > 0) {
      navigateToPreviousPage();
    } else if (deltaX < 0) {
      navigateToNextPage();
    }
  }
</script>

<!-- left -->
<button
  class="h-full w-12 fixed top-0"
  style={showBg ? `background-color: #5d85ca85` : ""}
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
  on:touchcancel={handleTouchEnd}
  on:click={navigateToPreviousPage}
></button>

<!-- right -->
<button
  class="h-full w-12 fixed top-0 right-0"
  style={showBg ? `background-color: #5dca8385` : ""}
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
  on:touchcancel={handleTouchEnd}
  on:click={navigateToNextPage}
></button>
