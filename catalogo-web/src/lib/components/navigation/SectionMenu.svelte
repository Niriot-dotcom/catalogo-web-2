<script lang="ts">
  import DiferenciasDeSabanas from "$lib/components/communication/DiferenciasDeSabanas.svelte";
  import { onMount } from "svelte";
  import ScrollDownArrows from "../animations/ScrollDownArrows.svelte";
  import VisibleDetector from "../visibleDetector.svelte";

  export let sections: {}[];
  export let paddingTop: string = "5";
  export let activeTitle: string;
  export let breakLine: number;
  export let constPages: Record<string, []>;
  export let groupedPagess: Record<string, []>;
  export let loadingSection: boolean = true;
  export let visibleIds: string[] = [];
  export let handleVisibleChange: (event: any) => void;

  onMount(() => {
    loadingSection = false;
  });

  function setActiveTitle(title: string) {
    activeTitle = title;
    toggleLoadingSection();
    // visibleIds = [groupedPagess[title][0].SKU];
  }

  function toggleLoadingSection() {
    loadingSection = true;
    setTimeout(() => {
      loadingSection = false;
    }, 100);
  }

  function filterBySections(title: string, productTypes: string[]) {
    let filteredPages = {};
    productTypes.forEach((pt) => {
      if (constPages[pt] && constPages[pt].length > 0) {
        filteredPages[pt] = constPages[pt];
      }
    });
    return filteredPages;
  }

  function updateGroupsOfPages() {
    groupedPagess = filterBySections(
      activeTitle,
      sections.filter(
        (s) => s.title.toLowerCase() == activeTitle.toLowerCase(),
      )[0].productTypes,
    );
  }

  $: activeTitle && updateGroupsOfPages();
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

<div
  class="bg-beige w-full items-center justify-center pt-{paddingTop} px-0 pb-0 flex space-x-8 flex-wrap flex-row md:pt-32 md:pb-10 md:space-x-16 md:top-0 md:z-50 md:start-0"
>
  {#each sections as section, i}
    <button
      on:click={() => setActiveTitle(section.title)}
      class="w-fit cursor-pointer"
    >
      <p class="text-nowrap text-black chavos-sm md:chavos-2xl">
        {section.title}
      </p>
      {#if activeTitle === section.title}
        <div class="border-t border-black mx-1.5"></div>
      {/if}
    </button>

    {#if i === breakLine}
      <div class="w-full mt-5"></div>
    {/if}
  {/each}
</div>

<ScrollDownArrows />
