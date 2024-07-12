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
      <div id={product.pageTitle} style="overflow-x: hidden;">
        <div class="div-block-52">
          <div class="div-block-53">
            <img
              src={product.pageMainImage}
              loading="eager"
              alt=""
              class="image-40"
            />
            <div class="div-block-43 align-bottom accesorios">
              <div class="page-title-box align-left">
                <h2
                  text-split=""
                  words-slide-up=""
                  class="heading-4 accesorios"
                  style="font-size: 3.5rem; max-width: 350px;"
                >
                  {product.pageSubtitle}
                </h2>
                <p
                  text-split=""
                  words-slide-up=""
                  class="paragraph product-detail-subtitle alternate hidden"
                  style="max-width: 350px; text-align:left;"
                >
                  {product.pageCopys[0]}
                </p>
              </div>
            </div>
          </div>
          <div class="div-block-54" style="background-color: white;">
            <div class="div-block-55 to-bottom">
              {#each product.pageProductsImages.slice(0, 2) as item}
                <div
                  data-visible-id={item}
                  class="div-block-57 rounded-lg"
                  on:click={show}
                  style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
                >
                  <img
                    src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{item}.jpg"
                    loading="eager"
                    alt=""
                    class="image-41"
                  />
                </div>
              {/each}
            </div>
            {#if product.pageProductsImages.length > 6}
              <div class="div-block-55 to-top">
                {#each product.pageProductsImages.slice(2, 4) as item}
                  <div
                    data-visible-id={item}
                    class="div-block-57 rounded-lg"
                    on:click={show}
                    style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
                  >
                    <img
                      src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{item}.jpg"
                      loading="eager"
                      alt=""
                      class="image-41"
                    />
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        </div>
        <div class="div-block-54 _3-column" style="overflow-x: hidden;">
          <div class="div-block-55 to-bottom">
            {#each product.pageProductsImages.slice(product.pageProductsImages.length > 6 ? 4 : 2) as item}
              <div
                data-visible-id={item}
                class="div-block-57 rounded-lg"
                on:click={show}
                style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
              >
                <img
                  src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{item}.jpg"
                  loading="eager"
                  alt=""
                  class="image-41"
                />
              </div>
            {/each}
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
