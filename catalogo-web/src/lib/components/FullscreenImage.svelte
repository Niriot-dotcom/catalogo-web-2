<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import OptimImg from "$lib/components/OptimImg.svelte";
  import TitleIncluye6Piezas from "$lib/components/titles/TitleIncluye6Piezas.svelte";

  export let id: string;
  export let src: string;
  export let bgColor: string;
  export let colors: string[];
  const dispatch = createEventDispatcher();

  let fullscreenOpen = false;

  function toggleFullscreen() {
    fullscreenOpen = !fullscreenOpen;
    dispatch(fullscreenOpen ? "open" : "close");
    if (fullscreenOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling when fullscreen image is open
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling when closing fullscreen image
    }

    let divContent = document.getElementById(`full-image-container-${id}`);
    if (!divContent) return;
    divContent.style.transition = "all 0.2s linear";

    if (divContent.classList.contains("hidden")) {
      divContent.classList.remove("hidden");
      setTimeout(function () {
        divContent?.classList.add("opacity-100");
      }, 20);
    } else {
      divContent.classList.remove("opacity-100");
      divContent.classList.add("opacity-0");
      divContent.addEventListener("transitionend", function (e) {
        if (!fullscreenOpen) {
          divContent?.classList.add("hidden");
        }
      });
    }
  }
</script>

<div class="w-full h-full relative">
  <!-- copy -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="z-10 w-full h-[35%] absolute top-0" on:click={toggleFullscreen}>
    <TitleIncluye6Piezas bgColor={colors[0]} textColor={colors[1]} />
  </div>

  <!-- container -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="w-full h-full relative overflow-hidden"
    on:click={toggleFullscreen}
  >
    <!-- image with button -->
    <div class="absolute w-full h-full flex justify-center z-[1]">
      <button
        style="background-color: {bgColor};"
        class="bottom-3 px-4 py-1.5 text-black rounded-xl chavos-lg absolute"
      >
        Abrir imagen
      </button>
    </div>

    <OptimImg
      source={src}
      alt=""
      imgClass="w-full h-full object-cover -rotate-90 scale-[1.5]"
    />
  </div>

  <!-- fullscreen image -->
  <!-- {#if fullscreenOpen} -->
  <div
    id="full-image-container-{id}"
    class="hidden w-full h-full fixed inset-0 bg-black bg-opacity-75 z-[801]"
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span
      style="background-color: {bgColor};"
      class="absolute top-0 right-0 m-8 cursor-pointer rounded-full p-1"
      on:click={toggleFullscreen}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-6 h-6 text-black"
      >
        <path
          d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
        />
      </svg>
    </span>
    <div class="w-screen h-screen overflow-hidden p-5">
      <OptimImg source={src} alt="" imgClass="w-full h-full object-cover" />
    </div>
  </div>
  <!-- {/if} -->
</div>
