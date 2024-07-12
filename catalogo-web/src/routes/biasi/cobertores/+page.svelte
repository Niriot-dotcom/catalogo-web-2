<script lang="ts">
  import type { PageData } from "./$types";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import CategoriesFooter from "$lib/components/categoriesFooter.svelte";
  import { catalogSections } from "$lib/components/currentCatalogPage";
  import { BiasiFooterHeader } from "$lib/constants/FooterHeaders";
  import OptimImg from "$lib/components/OptimImg.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";

  let visibleIds: string[] = [];
  let selectedProduct: null | string = null;
  let showPopup = false;
  function handleVisibleChange(event) {
    visibleIds = event.detail;
  }

  export let data: PageData;
  const pages = data.props.pages;

  let initAnimates = Array(pages.length).fill(false);
  function handleTemplateChange(event) {
    if (!event.detail[0]) return;
    initAnimates[+event.detail[0].split("-")[1]] = true;
  }

  const handleImageClick = (sku: string) => {
    selectedProduct = sku;
  };
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

{#each pages as product, index}
  <div
    data-visible-id="{product.pageProducts}, {product
      .pageProductsImages[0]}, {product.pageProductsImages[1]}"
  >
    <div class="plantilla-nordico">
      <div class="div-block-46">
        <div class="handle-container">
          <div class="div-block-45">
            <OptimImg
              source={product.pageImages[1]}
              loading="lazy"
              alt=""
              imgClass="image-28"
            />
            <div class="div-block-43 ligero">
              <div class="div-block-48">
                <div
                  class="page-title-box"
                  style={product.pageResources[0]
                    ? `color: ${product.pageResources[0]}`
                    : "mix-blend-mode: difference"}
                >
                  <h2 text-split="" words-slide-from-right="" class="heading-4">
                    {product.pageTitle}
                  </h2>
                  <p
                    text-split=""
                    words-slide-from-right=""
                    class="paragraph product-detail-subtitle alternate"
                  >
                    Cobertor Ligero
                  </p>
                </div>
                {#each product.pageIcons as icon}
                  <div>
                    <OptimImg
                      source={icon}
                      loading="lazy"
                      alt=""
                      imgClass="icon-image"
                    />
                  </div>
                {/each}
              </div>
              <div
                class="copy-box-everest right ligero"
                style={product.pageResources[1]
                  ? `color: ${product.pageResources[1]}`
                  : "mix-blend-mode: difference"}
              >
                <div class="text-block-26">
                  <span class="text-span-8">{product.pageCopys[0]}</span>
                </div>
                <div class="text-block-27">
                  {product.pageCopys[1]}
                </div>
                <img
                  src="../images/Flechas.svg"
                  loading="lazy"
                  alt=""
                  class="arrow-image"
                />
              </div>
            </div>
          </div>
          <div udesly-before-after="50" class="ligero-container">
            <OptimImg
              source={product.pageMainImage}
              loading="lazy"
              id="adfea8dd-6554-1c71-61f8-1c4b232589e5"
              imgClass="image-31 cursor-pointer"
              onClick={() => handleImageClick(product.pageProducts)}
            />
          </div>
        </div>
      </div>
      <div class="related-products horizontal">
        <div
          text-split=""
          words-slide-from-right=""
          class="text-block-23 look-book"
        >
          Completa<br /><strong class="bold-text">el Look</strong>
        </div>
        <a href="#" class="link-block-10 centered w-inline-block"
          ><img
            src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
              .pageProductsImages[0]}.jpg"
            loading="lazy"
            alt=""
            class="image-18 horizontal"
            on:click={() => handleImageClick(product.pageProductsImages[0])}
          />
        </a>
        <a href="#" class="link-block-10 centered w-inline-block"
          ><img
            src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
              .pageProductsImages[1]}.jpg"
            loading="lazy"
            alt=""
            class="image-18 horizontal"
            on:click={() => handleImageClick(product.pageProductsImages[1])}
          />
        </a>
      </div>
    </div>
  </div>
{/each}

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
