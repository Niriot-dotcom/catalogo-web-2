<script lang="ts">
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import BiasiMacetas from "$lib/custom-pages/biasiMacetas.svelte";
  import BiasiUtensilios from "$lib/custom-pages/biasiUtensilios.svelte";

  export let page: DatabasePage;
  export let templateId: string;
  export let initAnimate = false;
  export let selectedProduct: null | string;

  const handleImageClick = (sku: string) => {
    selectedProduct = sku;
  };
</script>

{#if page.pageTitle === "Macetas"}
  <BiasiMacetas {page} {templateId} {handleImageClick} {initAnimate} />
{:else if page.pageTitle === "Utensilios"}
  <BiasiUtensilios {page} {templateId} {handleImageClick} {initAnimate} />
{/if}
