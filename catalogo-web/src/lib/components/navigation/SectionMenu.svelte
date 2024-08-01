<script lang="ts">
  import DiferenciasDeSabanas from "$lib/components/communication/DiferenciasDeSabanas.svelte";

  export let sections: {}[];
  export let paddingTop: string = "5";
  export let activeTitle: string;
  export let breakLine: number;
  export let constPages: Record<string, []>;
  export let groupedPagess: Record<string, []>;

  function setActiveTitle(title) {
    activeTitle = title;
    groupedPagess = filterBySections(
      title,
      sections.filter((s) => s.title == title)[0].productTypes,
    );

    console.log("groupedPagess: ", groupedPagess);
  }

  function filterBySections(title: string, productTypes: string[]) {
    let filteredPages = {};
    productTypes.forEach((pt) => (filteredPages[pt] = constPages[pt]));

    return filteredPages;
  }
</script>

<div
  class="bg-beige w-full items-center justify-center pt-{paddingTop} px-0 pb-5 flex space-x-8 flex-wrap flex-row"
>
  {#each sections as section, i}
    <button
      on:click={() => setActiveTitle(section.title)}
      class="w-fit cursor-pointer"
    >
      <p class="text-nowrap text-black chavos-sm xs:chavos-xl">
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

<!-- [COMUNICACION] Diferencias de Cobertores -->
{#if activeTitle === "Sábanas"}
  <DiferenciasDeSabanas />
{/if}
