<script lang="ts">
  import PvisibleDetector from "$lib/components/pvisibleDetector.svelte";
  import TemplateDetector from "$lib/components/templateDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import CategoriesFooter from "$lib/components/categoriesFooter.svelte";
  import { catalogSections } from "$lib/components/currentCatalogPage";
  import { BiasiFooterHeader } from "$lib/constants/FooterHeaders";
  import type { PageData } from "./$types";
  import VideoAndGrid from "$lib/templates/videoAndGrid.svelte";
  import MainAndElements from "$lib/templates/mainAndElements.svelte";
  import Portadilla from "$lib/templates/portadilla.svelte";
  import TwoSides from "$lib/templates/twoSides.svelte";
  import ImagesAndGrid from "$lib/templates/imagesAndGrid.svelte";
  import FloatingImages from "$lib/templates/floatingImages.svelte";
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";

  let visibleIds: string[] = [];
  let selectedProduct: null | string = null;
  let showPopup = false;
  function handleVisibleChange(event) {
    visibleIds = event.detail;
  }
  function show() {
    showPopup = true;
  }

  export let data: PageData;
  const pages = data.props.pages;

  let initAnimates = Array(pages.length).fill(false);
  function handleTemplateChange(event) {
    if (!event.detail[0]) return;
    initAnimates[+event.detail[0].split("-")[1]] = true;
  }

  const handleImageClick = (sku) => {
    selectedProduct = sku;
  };
</script>

<div style="overflow-x: hidden;">
  {#each pages as product, index}
    <div style="overflow-x: hidden;" class="bg-[#d9d1b8]">
      <div class="text-white container">
        <p text-split="" words-slide-from-right="" class="text-5xl md:text-6xl">
          {product.pageTitle}<br />{product.pageSubtitle}
        </p>
        <p text-split="" words-slide-from-right="" class="text-xl">
          {@html product.pageCopys[0]}
        </p>
      </div>

      <div class="div-block-54 pb-12" style="overflow-x: hidden;">
        <div class="div-block-55 to-bottom">
          {#each product.pageProductsImages as item, i}
            <div
              data-visible-id={item}
              class="div-block-57 rounded-lg relative"
              on:click|preventDefault={(e) => handleImageClick(item)}
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
              <img
                src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{item}.jpg"
                loading="lazy"
                alt=""
                class="image-41"
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>

<CategoriesFooter
  catalog={Catalogs.BIASI}
  categories={catalogSections.BIASI}
  HeaderComponent={BiasiFooterHeader()}
/>

<NavigatorMenu
  bind:visibleIds
  bind:showPopup
  bind:selectedProduct
  catalog={Catalogs.BIASI}
/>

<div>
  <script defer src="../js/webflowPage.js"></script>
  <script
    defer
    src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=643738a971c1d64a8bd7a90a"
    type="text/javascript"
    integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
    crossorigin="anonymous"
  ></script>
  <script defer src="https://unpkg.com/split-type"></script>
  <script
    defer
    src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"
  ></script>
  <script
    defer
    src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js"
  ></script>
  <script defer src="../js/animations.js" type="text/javascript"></script>
  <script defer src="../js/webflow.js" type="text/javascript"></script>
</div>
