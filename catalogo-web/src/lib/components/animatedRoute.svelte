<script>
  import { fly, fade } from "svelte/transition";
  import { page } from "$app/stores";
</script>

{#key $page.url}
  <div in:fade={{ x: "-100%", duration: 500 }}>
    <slot />
  </div>
{/key}
