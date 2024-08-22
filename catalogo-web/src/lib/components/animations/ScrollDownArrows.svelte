<script lang="ts">
  import { COLORS } from "$lib/constants/strings";
  import { onMount } from "svelte";

  export let backgroundColor: string = COLORS.beige;

  onMount(() => {
    const script = document.createElement("script");
    script.src = "/js/webflow.js";
    script.type = "text/javascript";
    script.defer = true;
    document.head.appendChild(script);
  });
</script>

<div
  style="background-color: {backgroundColor};"
  class="md:hidden relative w-screen h-[10vh] flex justify-center"
>
  <div
    class="lottie-animation"
    data-w-id="e37d71ea-2f7e-d30b-df49-c890c74b5ee0"
    data-animation-type="lottie"
    data-src="/documents/9261-scroll-down.json"
    data-loop="1"
    data-direction="1"
    data-autoplay="1"
    data-is-ix2-target="0"
    data-renderer="svg"
    data-duration="1"
  ></div>
</div>
