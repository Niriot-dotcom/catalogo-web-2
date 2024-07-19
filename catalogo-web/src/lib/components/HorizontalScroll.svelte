<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  let isUp = false;

  function animate() {
    isUp = !isUp;

    setTimeout(
      () => {
        animate();
      },
      isUp ? 400 : 700,
    );
  }

  onMount(() => {
    animate();
  });
</script>

<div class="w-full h-full" style="transition: all 0.5 linear;">
  <!-- horizontal -->
  <div class="w-full h-full">
    <img
      src="../images/icons/hand-scroll-black.svg"
      loading="eager"
      alt=""
      class="w-full h-full"
      style={isUp
        ? "transition: transform 0.2s ease-out; transform: translateX(-50px);"
        : "transition: transform 0.2s ease-out; transform: translateX(0);"}
    />
  </div>
</div>
