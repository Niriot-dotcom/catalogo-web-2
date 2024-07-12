<script lang="ts">
  export let id = "";
  export let source = "";
  export let imgClass = "";
  export let alt = "";
  export let style = "";
  export let image = "";
  export let loading: any = "";
  export let onClick: null | ((e?) => void) = null;

  source = source.replace(".png", ".webp");
  const resolutions = [500, 800, 896, 1080, 1280];
  let set = "";
  for (const resolution of resolutions) {
    set += `${source.replace(
      ".webp",
      "-" + resolution + ".webp",
    )} ${resolution}w, `;
  }
  set = set.slice(0, -2);

  if (!source.split("/")[source.split("/").length - 1].includes("-1280.webp")) {
    source = source.replace(".webp", "-1280.webp");
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<img
  {id}
  class={imgClass}
  src={source}
  srcset={set}
  {loading}
  {alt}
  {image}
  {style}
  on:click={onClick}
/>
