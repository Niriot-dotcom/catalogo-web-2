<script lang="ts">
  import { onMount } from "svelte";
  import ScrollDownArrows from "../animations/ScrollDownArrows.svelte";
  import { goto, pushState } from "$app/navigation";
  import { getCurrentCatalog } from "$lib/utils/navigation";

  export let currentPageRoute: string;
  export let sections: { title: string; link: string }[];
  export let paddingTop: string = "5";
  export let activeTitle: string;
  export let activeLink: string;
  export let breakLine: number;
  export let loadingSection: boolean = true;
  let currentCatalog: string;

  onMount(() => {
    loadingSection = false;
    currentCatalog = getCurrentCatalog() || "";
  });

  function setActiveTitle(newSection: { title: string; link: string }) {
    activeTitle = newSection.title;
    activeLink = newSection.link;
    toggleLoadingSection();
  }

  function toggleLoadingSection() {
    loadingSection = true;
    setTimeout(() => {
      loadingSection = false;
    }, 100);
  }
</script>

<div
  class="bg-beige w-full items-center justify-center pt-{paddingTop} px-0 pb-0 flex space-x-8 flex-wrap flex-row md:pt-32 md:pb-10 md:space-x-16 md:top-0 md:z-50 md:start-0"
>
  {#each sections as section, i}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      href={"/" + currentCatalog + "/" + currentPageRoute + "/" + activeLink}
      on:click={() => setActiveTitle(section)}
      class="w-fit cursor-pointer"
      data-sveltekit-noscroll
    >
      <p class="text-nowrap text-black chavos-sm md:chavos-2xl">
        {section.title}
      </p>
      {#if activeTitle === section.title}
        <div class="border-t border-black mx-1.5"></div>
      {/if}
    </a>

    {#if i === breakLine}
      <div class="w-full mt-5"></div>
    {/if}
  {/each}
</div>

<ScrollDownArrows />
