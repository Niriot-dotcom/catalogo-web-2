<script lang="ts">
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import OptimImg from "$lib/components/OptimImg.svelte";
  import CategoriesFooter from "$lib/components/categoriesFooter.svelte";
  import { catalogSections } from "$lib/components/currentCatalogPage";
  import { BiasiFooterHeader } from "$lib/constants/FooterHeaders";
  import { Catalogs } from "$lib/constants/globalTypes";
  import { page } from "$app/stores";

  onMount(() => {
    const script = document.createElement("script");
    script.src = "../js/nordicSlider.js";
    script.async = true;
    document.body.appendChild(script);
  });

  let visibleIds: string[] = [];
  let selectedProduct: null | string = null;

  function handleVisibleChange(event: any) {
    visibleIds = event.detail;
  }

  let showPopup = false;

  function show() {
    showPopup = true;
  }

  export let data: PageData;
  const products = data.props.pages; // guarda el objeto product en una variable

  function removeSpecialChars(str) {
    return str.replace(/["\[\]]/g, "");
  }

  const handleImageClick = (sku: string) => {
    selectedProduct = sku;
  };
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

{#each products as product, index}
  {#if index % 2 === 0}
    <div
      id={product.pageTitle}
      class="plantilla-nordico"
      data-visible-id="{product.pageProducts}, {product
        .pageProductsImages[0]}, {product.pageProductsImages[1]}"
    >
      <div class="div-block-46">
        <div class="handle-container">
          <div class="div-block-45">
            <OptimImg
              source={product.pageImages[1]}
              loading="lazy"
              alt=""
              imgClass="image-28"
            />
            <div
              class="div-block-43 ligero cursor-pointer"
              on:click={() => handleImageClick(product.pageProducts[0])}
            >
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
                    Edredón Novo
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
                class="lg:px-3 px-5"
                style={product.pageResources[1]
                  ? `color: ${product.pageResources[1]}`
                  : "mix-blend-mode: difference"}
              >
                <p
                  class="font-kepler lg:text-7xl md:text-6xl sm:text-4xl text-4xl"
                >
                  1 Novo
                </p>
                <p
                  class="font-kepler italic lg:text-6xl md:text-5xl sm:text-3xl text-3xl"
                >
                  2 diseños
                </p>
                <p
                  class="font-helvetica lg:text-2xl md:text-xl sm:text-lg text-lg"
                >
                  Aprovecha su doble vista, cambia los complementos y ¡dale otro
                  look!
                </p>
              </div>
            </div>
          </div>
          <div udesly-before-after="50" class="handle-wrapper">
            <OptimImg
              imgClass="image-right"
              source={product.pageMainImage}
              alt=""
              image="right"
            />
            <OptimImg
              imgClass="image-left"
              source={product.pageImages[0]}
              alt=""
              image="left"
            />
            <div before-after="handle" class="handle-bar">
              <div class="circle-wrapper"></div>
            </div>
            <div image="left-label" class="before">
              <h1 class="handle">1er vista</h1>
            </div>
            <div image="right-label" class="after">
              <h1 class="handle">2da vista</h1>
            </div>
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
        <div class="link-block-10 centered w-inline-block">
          <img
            src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
              .pageProductsImages[0]}.jpg"
            loading="lazy"
            alt=""
            class="image-18 horizontal cursor-pointer"
            on:click={() => handleImageClick(product.pageProductsImages[0])}
          />
        </div>
        <div class="link-block-10 centered w-inline-block">
          <img
            src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
              .pageProductsImages[1]}.jpg"
            loading="lazy"
            alt=""
            class="image-18 horizontal cursor-pointer"
            on:click={() => handleImageClick(product.pageProductsImages[1])}
          />
        </div>
      </div>
    </div>
  {:else}
    <div
      id={product.pageTitle}
      class="plantilla-nordico"
      data-visible-id="{product.pageProducts}, {product
        .pageProductsImages[0]}, {product.pageProductsImages[1]}"
    >
      <div>
        <div class="handle-container inverse">
          <div udesly-before-after="50" class="handle-wrapper">
            <OptimImg
              imgClass="image-right"
              source={product.pageMainImage}
              alt=""
              image="right"
            />
            <OptimImg
              imgClass="image-left"
              source={product.pageImages[0]}
              alt=""
              image="left"
            />
            <div before-after="handle" class="handle-bar">
              <div class="circle-wrapper"></div>
            </div>
            <div image="left-label" class="before">
              <h1 class="handle">1er vista</h1>
            </div>
            <div image="right-label" class="after">
              <h1 class="handle">2da vista</h1>
            </div>
          </div>
          <div class="div-block-45 left">
            <OptimImg
              source={product.pageImages[1]}
              loading="lazy"
              alt=""
              imgClass="image-28"
            />
            <div
              class="div-block-43 ligero cursor-pointer"
              on:click={() => handleImageClick(product.pageProducts[0])}
            >
              <div class="div-block-48">
                <div
                  class="page-title-box"
                  style={product.pageResources[0]
                    ? `color: ${product.pageResources[0]}`
                    : "mix-blend-mode: difference"}
                >
                  <h2
                    text-split=""
                    words-slide-from-right=""
                    class="heading-4 mix-blend-difference"
                  >
                    {product.pageTitle}
                  </h2>
                  <p
                    text-split=""
                    words-slide-from-right=""
                    class="paragraph product-detail-subtitle alternate"
                  >
                    Edredón Novo
                  </p>
                </div>
                {#each product.pageIcons as icon}
                  <OptimImg
                    source={icon}
                    loading="lazy"
                    alt=""
                    imgClass="icon-image"
                  />
                {/each}
              </div>
              <div
                class="lg:px-3 px-5"
                style={product.pageResources[1]
                  ? `color: ${product.pageResources[1]}`
                  : "mix-blend-mode: difference"}
              >
                <p
                  class="font-kepler lg:text-7xl md:text-6xl sm:text-4xl text-4xl"
                >
                  1 Novo
                </p>
                <p
                  class="font-kepler italic lg:text-6xl md:text-5xl sm:text-3xl text-3xl"
                >
                  2 diseños
                </p>
                <p
                  class="font-helvetica lg:text-2xl md:text-xl sm:text-lg text-lg"
                >
                  Aprovecha su doble vista, cambia los complementos y ¡dale otro
                  look!
                </p>
              </div>
            </div>
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
        <a
          href="#"
          data-sveltekit-preload-data="tap"
          data-sveltekit-reload
          class="link-block-10 centered w-inline-block"
          ><img
            src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
              .pageProductsImages[0]}.jpg"
            loading="lazy"
            alt=""
            class="image-18 horizontal cursor-pointer"
            on:click={() => handleImageClick(product.pageProductsImages[0])}
          />
        </a>
        <a
          href="#"
          data-sveltekit-preload-data="tap"
          data-sveltekit-reload
          class="link-block-10 centered w-inline-block"
          ><img
            src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
              .pageProductsImages[1]}.jpg"
            loading="lazy"
            alt=""
            class="image-18 horizontal cursor-pointer"
            on:click={() => handleImageClick(product.pageProductsImages[1])}
          />
        </a>
      </div>
    </div>
  {/if}
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
  <script defer src="../js/webflow.js" type="text/javascript"></script>
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
</div>
