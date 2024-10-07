<script lang="ts">
  export let path: string;
  export let style: string = "";
</script>

<!-- MOBILE -->
<video
  autoplay
  loop
  muted
  playsinline
  preload="none"
  poster="{path}-VERTICAL.jpg"
  class="md:hidden block {$$props.class}"
  {style}
>
  <source src="{path}-VERTICAL.mp4" type="video/mp4" />
  <source src="{path}-VERTICAL.webm" type="video/webm" />
</video>

<!-- DESKTOP -->
<video
  autoplay
  loop
  muted
  playsinline
  preload="none"
  poster="{path}-HORIZONTAL.jpg"
  class="hidden md:block {$$props.class}"
  {style}
>
  <source src="{path}-HORIZONTAL.mp4" type="video/mp4" />
  <source src="{path}-HORIZONTAL.webm" type="video/webm" />
</video>
