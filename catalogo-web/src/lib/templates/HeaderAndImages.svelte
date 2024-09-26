<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { URLS } from "$lib/constants/strings";

  export let handleImageClick: (sku: string, relatedProds: string[]) => void;
  export let groupPages: DatabasePage[];
  export let title: string;
</script>

<div style="overflow-x: hidden;" class="bg-[#d9d1b8]">
  <div class="text-white container">
    {#if title.split(" ").length > 1}
      <p class="chavos-bold-2xl xs:chavos-bold-3xl">{title.split(" ")[0]}</p>
      <p class="chavos-4xl xs:chavos-5xl">
        {title.replace(title.split(" ")[0], "")}
      </p>
    {:else}
      <p class="chavos-4xl xs:chavos-5xl">
        {title.split(" ")[0]}
      </p>
    {/if}
  </div>

  <div class="div-block-54 pb-12" style="overflow-x: hidden;">
    <div class="div-block-55 to-bottom">
      {#each groupPages as product, i}
        <button
          data-visible-id={product}
          class="div-block-57 rounded-lg relative"
          on:click|preventDefault={(e) =>
            handleImageClick(product.SKU, product.pageRelatedProducts)}
          style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
        >
          {#if product.pageIcons[i] !== ""}
            <div class="flex absolute z-50 top-0 ml-2 mt-2">
              <img
                src={product.pageIcons[i]}
                loading="eager"
                alt=""
                class="lg:pricing-image-two sm:w-1/3 w-1/3"
              />
            </div>
          {/if}
          <OptimImg
            source="{URLS.fotos}{product.SKU}.webp"
            imgClass="image-41"
          />
        </button>
      {/each}
    </div>
  </div>
</div>
