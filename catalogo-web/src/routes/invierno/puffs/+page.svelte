<script lang="ts">
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";
  import type { PageData } from "./$types";
  import { catalogSections } from "$lib/components/currentCatalogPage";
  import CategoriesFooter from "$lib/components/categoriesFooter.svelte";

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

{#each products as product, index}
  <section id={product.pageTitle} class="introducci-n">
    <div class="div-block">
      <div class="sticky-container primary-container" style="height: 75vh;">
        <div class="sticky-parent primary-sticky" style="height: 75vh;">
          <div class="card-parent pillows-background">
            <section
              class="hero-image-left pillows-hero"
              style="background-image: url({product.pageMainImage.replace(
                '.webp',
                '-1280.webp',
              )}) ;     background-position: center;     justify-content: flex-end; align-items: flex-start; display: flex;"
            >
              <section id="page1" class="div-block-3 primary-copy-box">
                <div class="div-block-48">
                  <div class="page-title-box">
                    <h2
                      text-split=""
                      words-slide-from-right=""
                      class="heading-4"
                    >
                      {product.pageTitle}
                    </h2>
                    <p
                      text-split=""
                      words-slide-from-right=""
                      class="paragraph product-detail-subtitle alternate"
                    >
                      Pelo Largo y Suaves
                    </p>
                  </div>
                </div>
              </section>
            </section>
          </div>
        </div>
      </div>
      <section id="page3" class="section-text">
        <div
          text-split=""
          words-slide-from-right=""
          class="text-block-5 subtitle-intro"
        >
          <span class="text-span-5"></span><span class="text-span-2"
            >bonitos y esponjosos</span
          ><span class="text-span-6"></span>
        </div>
        <div
          words-slide-from-right=""
          text-split=""
          class="text-block-4 secondary intro"
          style="margin-top: 24px;"
        >
          {product.pageDescriptions.join(", ")}
        </div>
        <div class="div-block-5">
          {#each product.pageProductsImages.slice(0, 3) as item}
            <div
              class="div-block-6 everest-ideal rounded-xl"
              data-visible-id={item}
              on:click={show}
            >
              <img
                src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{item}.jpg"
                class="rounded-xl my-16"
                loading="eager"
                alt=""
                style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; cursor: pointer;"
              />
            </div>
          {/each}

          <div class="div-block-5">
            {#each product.pageProductsImages.slice(3) as item}
              <div
                class="div-block-6 everest-ideal rounded-xl"
                data-visible-id={item}
                on:click={show}
              >
                <img
                  src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{item}.jpg"
                  class="rounded-xl my-16"
                  loading="eager"
                  alt=""
                  style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; cursor: pointer"
                />
              </div>
            {/each}
          </div>
        </div>
      </section>
    </div>
  </section>
{/each}

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
