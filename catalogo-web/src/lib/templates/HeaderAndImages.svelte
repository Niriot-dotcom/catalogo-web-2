<!-- TODO bug with the first element of the group -->
<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { COLORS, URLS } from "$lib/constants/strings";
  import { getCurrentCatalog } from "$lib/utils/navigation";
  import { onMount } from "svelte";

  export let visibleIds: string[];
  export let groupPages: DatabasePage[];
  export let title: string;
  export let handleImageClick: (sku: string, relatedProds: string[]) => void;
  let currentCatalog: string;
  let selectedColorIndex = 0;
  let selectedProductSku = groupPages[selectedColorIndex].SKU;
  let bgColor =
    groupPages[selectedColorIndex].pageResources &&
    groupPages[selectedColorIndex].pageResources?.length > 0 &&
    groupPages[selectedColorIndex].pageResources[0] !== "" &&
    groupPages[selectedColorIndex].pageResources[0] !== "#"
      ? groupPages[selectedColorIndex].pageResources[0]
      : COLORS.beige;
  let config =
    groupPages[selectedColorIndex].pageResources &&
    groupPages[selectedColorIndex].pageResources?.length > 2 &&
    groupPages[selectedColorIndex].pageResources[2] !== "" &&
    groupPages[selectedColorIndex].pageResources[2] !== "#"
      ? groupPages[selectedColorIndex].pageResources[2]
      : "";

  const handleChangeColor = (colorIndex: number) => {
    selectedColorIndex = colorIndex;
    selectedProductSku = groupPages[selectedColorIndex].SKU;
    visibleIds = [selectedProductSku];
  };

  onMount(() => {
    if (window) {
      currentCatalog = getCurrentCatalog();
    }
  });
</script>

<div style="overflow-x: hidden;">
  <div style="overflow-x: hidden; background-color: {bgColor};">
    <div class="text-white container">
      <p text-split="" words-slide-from-right="" class="text-5xl md:text-6xl">
        {title}
      </p>
    </div>

    <div class="div-block-54 pb-12" style="overflow-x: hidden;">
      <div class="div-block-55 to-bottom">
        {#each groupPages as page, i}
          <button
            data-visible-id={page.SKU}
            class="div-block-57 rounded-lg relative"
            on:click|preventDefault={(e) =>
              handleImageClick(page.SKU, page.pageRelatedProducts)}
            style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
          >
            <!-- {#if page.pageIcons[i] !== ""}
                <div class="flex absolute z-50 top-0 ml-2 mt-2">
                  <img
                    src={page.pageIcons[i]}
                    loading="eager"
                    alt=""
                    class="lg:pricing-image-two sm:w-1/3 w-1/3"
                  />
                </div>
              {/if} -->
            <OptimImg
              source="{URLS.fotos}{page.SKU}.webp"
              alt=""
              imgClass="image-41"
            />
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>
