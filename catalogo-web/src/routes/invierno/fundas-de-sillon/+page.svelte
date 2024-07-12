<script lang="ts">
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import CategoriesFooter from "$lib/components/categoriesFooter.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";
  import { catalogSections } from "$lib/components/currentCatalogPage";
  import type { PageData } from "./$types";
  import { page } from "$app/stores";

  let visibleIds = [];

  function handleVisibleChange(event) {
    visibleIds = event.detail;
  }

  let showPopup = false;

  function show() {
    showPopup = true;
  }

  export let data: PageData;

  const products = data.props.products; // guarda el objeto product en una variable
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

<div style="overflow-x: hidden;">
  {#each products as product, index}
    {#if index % 2 === 0}
      <div
        id={product.pageTitle}
        data-visible-id={product.pageProducts}
        class="plantilla-nordico plantilla-sillon"
      >
        <div class="div-block-46">
          <div class="handle-container">
            <div class="div-block-45 align-bottom">
              <ImageComponent
                src={product.pageImages[1]}
                loading="eager"
                id="f09abdcc-902f-003f-2d59-9712f02a5bd1"
                alt=""
                classList="image-28"
              />
              <div class="div-block-43 align-bottom">
                <div class="page-title-box align-left">
                  <h2 text-split="" words-slide-from-right="" class="heading-4">
                    {product.pageTitle}
                  </h2>
                  <p
                    text-split=""
                    words-slide-from-right=""
                    class="paragraph product-detail-subtitle alternate"
                  >
                    Protectores de sillón
                  </p>
                </div>
              </div>
            </div>
            <div udesly-before-after="50" class="ligero-container right-image">
              <ImageComponent
                src={product.pageMainImage}
                loading="eager"
                id="adfea8dd-6554-1c71-61f8-1c4b232589e5"
                alt=""
                classList="image-31 funda-size"
              /><ImageComponent
                src={product.pageMainImage}
                loading="eager"
                alt=""
                classList="image-32 inverso"
              />
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div
        id={product.pageTitle}
        data-visible-id={product.pageProducts}
        class="plantilla-nordico plantilla-sillon"
      >
        <div class="div-block-46">
          <div class="handle-container inverse">
            <div udesly-before-after="50" class="ligero-container left-image">
              <ImageComponent
                src={product.pageMainImage}
                loading="eager"
                alt=""
                classList="image-31 funda-size left"
              /><ImageComponent
                src={product.pageImages[0]}
                loading="eager"
                alt=""
                classList="image-32"
              />
            </div>
            <div class="div-block-45 align-bottom inverse">
              <ImageComponent
                src={product.pageImages[1]}
                loading="eager"
                id="4c65f251-b15a-2c41-c36f-8b8af725267a"
                alt=""
                classList="image-28"
              />
              <div class="div-block-43 align-right">
                <div class="page-title-box align-right">
                  <h2 text-split="" words-slide-from-right="" class="heading-4">
                    {product.pageTitle}
                  </h2>
                  <p
                    text-split=""
                    words-slide-from-right=""
                    class="paragraph product-detail-subtitle alternate"
                  >
                    Protectores de sillón
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/each}
</div>

<CategoriesFooter
  catalog={Catalogs.INVIERNO}
  categories={catalogSections.INVIERNO}
/>
<NavigatorMenu bind:visibleIds bind:showPopup catalog={Catalogs.INVIERNO} />

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
