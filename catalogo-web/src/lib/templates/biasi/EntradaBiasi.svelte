<script lang="ts">
  import ScrollDownArrows from "$lib/components/animations/ScrollDownArrows.svelte";
  import SectionsPaginationArrows from "$lib/components/navigation/SectionsPaginationArrows.svelte";
  import { COLORS, EnumEntradaInvierno } from "$lib/constants/strings";

  export let titleSvg: string;
  export let bgVideo: string;
  export let withSectionMenu: boolean = false;
  export let bgColor: string = COLORS.beige;
</script>

<!-- MOBILE -->
<div style="background-color: {bgColor};" class="relative w-screen">
  <SectionsPaginationArrows />

  <div class="flex flex-col space-y-1 min-h-fit relative">
    <div class="w-full {withSectionMenu ? 'h-[80vh]' : 'h-screen'}">
      <img class="w-full h-full object-cover" src={bgVideo} alt="" />

      <div class="z-20 h-5/6 absolute p-3 bottom-0 right-0">
        <img class="w-full h-full" src={titleSvg} alt="" />
      </div>
    </div>
  </div>
</div>
