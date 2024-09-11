<script lang="ts">
  import ScrollDownArrows from "$lib/components/animations/ScrollDownArrows.svelte";
  import SectionsPaginationArrows from "$lib/components/navigation/SectionsPaginationArrows.svelte";
  import { COLORS } from "$lib/constants/strings";

  export let bgVideo: string;
  export let titleSvg: string = "";
  export let withSectionMenu: boolean = false;
  export let bgColor: string = COLORS.beige;
</script>

<div style="background-color: {bgColor};" class="w-screen">
  <SectionsPaginationArrows />

  <div class="flex flex-col space-y-1 min-h-fit">
    <div class="relative w-full {withSectionMenu ? 'h-[80vh]' : 'h-[100dvh]'}">
      <img
        class="w-full h-full object-cover {bgVideo.includes('PRECIOS')
          ? 'sp-offset'
          : ''}"
        src={bgVideo}
        alt=""
      />

      {#if !bgVideo.includes("PRECIOS")}
        <div
          class="z-20 w-full h-5/6 absolute p-0 bottom-0 right-0 flex items-end justify-end"
        >
          <img class="w-fit max-h-full" src={titleSvg} alt="" />
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .sp-offset {
    object-position: bottom 0px right -15vw;
  }

  @media (min-width: 640px) {
    .sp-offset {
      object-position: 50% 50%;
    }
  }
</style>
