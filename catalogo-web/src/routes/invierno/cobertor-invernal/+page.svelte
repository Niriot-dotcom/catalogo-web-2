<!-- <script lang="ts">
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";
  import type { PageData } from "./$types";
  import { EnumEntradaInvierno, URLS } from "$lib/constants/strings";
  import EntradaInvierno from "$lib/templates/invierno/EntradaInvierno.svelte";
  import CobertorInvernal from "$lib/templates/invierno/CobertorInvernal.svelte";

  let visibleIds: string[] = [];
  let showViewPrices = false;
  function handleVisibleChange(event: any) {
    visibleIds = event.detail;
    showViewPrices = visibleIds.length > 0;
  }
  let relatedProducts: string[] = [];
  let selectedProduct: null | string = null;
  let showPopup = false;

  export let data: PageData;
  const handleImageClick = (sku: string, relatedProds: string[]) => {
    selectedProduct = sku;
    relatedProducts = relatedProds;
  };
  const pages = data.props.pages;
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

<EntradaInvierno
  titleSvg="/images/invierno/copys/ENTRADA-P04-INVERNAL-TITULO.svg"
  variant={EnumEntradaInvierno.FOTO_VIDEO}
  titleSize="h-[35vh]"
  titlePosition="top-[25vh] left-0"
  storyPosition="top-1/2 left-0 transform -translate-y-1/2"
  bgImage="/images/invierno/portadillas/ENTRADA-P04-INVERNAL.webp"
  bgVideo="/images/invierno/portadillas/ENTRADA-P04-INVERNAL-VERTICAL.mp4"
/>

{#each pages as page, index}
  <CobertorInvernal {page} inversa={index % 2 !== 0} />
{/each}

<NavigatorMenu
  catalog={Catalogs.INVIERNO}
  bind:relatedProducts
  bind:visibleIds
  bind:showPopup
  bind:showViewPrices
  bind:selectedProduct
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
  <script defer src="../js/animations.js"></script>
  <script defer src="../js/webflow.js" type="text/javascript"></script>
</div> -->

<script lang="ts">
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";
  import type { PageData } from "./$types";
  import { EnumEntradaInvierno, URLS } from "$lib/constants/strings";
  import EntradaInvierno from "$lib/templates/invierno/EntradaInvierno.svelte";
  import OptimImg from "$lib/components/OptimImg.svelte";

  let visibleIds: string[] = [];
  let showViewPrices = false;
  function handleVisibleChange(event: any) {
    visibleIds = event.detail;
    showViewPrices = visibleIds.length > 0;
  }
  let relatedProducts: string[] = [];
  let selectedProduct: null | string = null;
  let showPopup = false;

  export let data: PageData;
  const handleImageClick = (sku: string, relatedProds: string[]) => {
    selectedProduct = sku;
    relatedProducts = relatedProds;
  };
  const pages = data.props.pages;
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

<!-- ENTRADA -->
<EntradaInvierno
  titleSvg="/images/invierno/copys/ENTRADA-P04-INVERNAL-TITULO.svg"
  variant={EnumEntradaInvierno.FOTO_VIDEO}
  titleSize="h-[35vh] md:h-2/3"
  titlePosition="top-[25vh] left-0 md:top-[15vh]"
  storyPosition="top-1/2 left-0 transform -translate-y-1/2"
  bgImage="/images/invierno/portadillas/ENTRADA-P04-INVERNAL.webp"
  bgVideo="/images/invierno/portadillas/ENTRADA-P04-INVERNAL-VERTICAL.mp4"
/>

{#each pages as page, index}
  {#if index % 2 === 0}
    <div id={page.pageTitle}>
      <div
        data-visible-id="{page.SKU}, {page.complSheets[0]}, {page
          .complCurtains[0]}"
        data-w-id="26494cac-c879-c70d-1939-3984a45c1663"
        class="div-block-40 column-container"
      >
        <div
          style="overflow-x: hidden; max-width: 100vw;"
          class="columna-invernal-1"
        >
          <div class="div-block-43 xs:hidden block">
            <div class="page-title-box">
              <div>
                <h2 class="heading-4 mt-12">{page.pageTitle}</h2>
                <p class="paragraph product-detail-subtitle alternate">
                  Cobertor Invernal
                </p>
              </div>
            </div>
            {#each page.pageIcons as icon}
              <ImageComponent
                src={icon}
                loading="eager"
                alt=""
                classList="icon-image"
              />
            {/each}
          </div>
          <OptimImg
            onClick={() =>
              handleImageClick(page.SKU, [
                page.complSheets[0],
                page.complCurtains[0],
              ])}
            source={`${URLS.fotos}${page.SKU}.webp`}
            imgClass="image-26"
          />
        </div>
        <div class="columna-invernal-2 austral">
          <OptimImg
            onClick={() =>
              handleImageClick(page.SKU, [
                page.complSheets[0],
                page.complCurtains[0],
              ])}
            source={`${URLS.fotos}${page.SKU}-2.webp`}
            imgClass="image-26"
          />
          {#if page.pageCopys && page.pageCopys.length >= 1 && page.pageCopys[0] !== ""}
            <div class="copy-box-everest w-full text-center mt-32">
              <div class="text-block-25" style="text-transform: lowercase;">
                {page.pageCopys[0]}
              </div>
              <div class="text-block-27 mt-4 leading-none">
                {page.pageCopys[1] || ""}
              </div>
              <img
                src="../images/Flechas-1.svg"
                loading="eager"
                alt=""
                class="arrow-image mt-0 ml-20"
              />
            </div>
          {/if}
          <div class="div-block-43 xs:block hidden">
            <div class="page-title-box">
              <div>
                <h2 class="heading-4 mt-12">{page.pageTitle}</h2>
                <p class="paragraph product-detail-subtitle alternate">
                  Cobertor Invernal
                </p>
              </div>
            </div>
            {#each page.pageIcons as icon}
              <ImageComponent
                src={icon}
                loading="eager"
                alt=""
                classList="icon-image"
              />
            {/each}
          </div>
        </div>
        <div class="columna-invernal-3 relative">
          <OptimImg
            onClick={() =>
              handleImageClick(page.SKU, [
                page.complSheets[0],
                page.complCurtains[0],
              ])}
            source={`${URLS.fotos}${page.SKU}-3.webp`}
            imgClass="image-26"
          />
          {#if page.pageCopys && page.pageCopys.length >= 3 && page.pageCopys[2] !== ""}
            <div
              class="copy-box-everest absolute top-0 w-full text-center mt-32"
            >
              <div class="text-block-25" style="text-transform: lowercase;">
                {page.pageCopys[2]}
              </div>
              <div class="text-block-27 mt-4 leading-none">
                {page.pageCopys[3] || ""}
              </div>
              <img
                src="../images/Flechas-1.svg"
                loading="eager"
                alt=""
                class="arrow-image mt-0 ml-20"
              />
            </div>
          {/if}
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
          <OptimImg
            onClick={() => handleImageClick(page.complSheets[0], [])}
            source={`${URLS.fotos}${page.complSheets[0]}.webp`}
            imgClass="image-18 horizontal"
          />
          <div class="text-block-22 centered">
            agrega estas<br />‍<strong class="bold-text-2"> sábanas</strong>
          </div>
        </div>
        <div class="link-block-10 centered w-inline-block">
          <OptimImg
            onClick={() => handleImageClick(page.complCurtains[0], [])}
            source={`${URLS.fotos}${page.complCurtains[0]}.webp`}
            imgClass="image-18 horizontal"
          />
          <div class="text-block-22 centered">
            combina con estas<br />
            <strong class="bold-text-3"> cortinas</strong>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div id={page.pageTitle}>
      <div
        data-visible-id="{page.SKU}, {page.complSheets[0]}, {page
          .complCurtains[0]}"
        data-w-id="922ca861-0457-4a76-f593-9ea2a0016e98"
        class="div-block-40 column-container"
      >
        <div
          style="overflow-x: hidden; max-width: 100vw;"
          class="columna-invernal-3"
        >
          <div class="div-block-43 xs:hidden block">
            <div class="page-title-box">
              <div>
                <h2 class="heading-4 mt-12">{page.pageTitle}</h2>
                <p class="paragraph product-detail-subtitle alternate">
                  Cobertor Invernal
                </p>
              </div>
            </div>
            {#each page.pageIcons as icon}
              <div>
                <ImageComponent
                  src={icon}
                  loading="eager"
                  alt=""
                  classList="icon-image"
                />
              </div>
            {/each}
          </div>
          <OptimImg
            onClick={() =>
              handleImageClick(page.SKU, [
                page.complSheets[0],
                page.complCurtains[0],
              ])}
            source={`${URLS.fotos}${page.SKU}.webp`}
            imgClass="image-26"
          />
        </div>
        <div class="columna-invernal-2 austral">
          <OptimImg
            onClick={() =>
              handleImageClick(page.SKU, [
                page.complSheets[0],
                page.complCurtains[0],
              ])}
            source={`${URLS.fotos}${page.SKU}-2.webp`}
            imgClass="image-26"
          />
          {#if page.pageCopys && page.pageCopys.length >= 1 && page.pageCopys[0] !== ""}
            <div class="copy-box-everest w-full text-center mt-32">
              <div class="text-block-25" style="text-transform: lowercase;">
                {page.pageCopys[0]}
              </div>
              <div class="text-block-27 mt-4 leading-none">
                {page.pageCopys[1] || ""}
              </div>
              <img
                src="../images/Flechas-1.svg"
                loading="eager"
                alt=""
                class="arrow-image mt-0 ml-20"
              />
            </div>
          {/if}
          <div class="div-block-43 xs:block hidden">
            <div class="page-title-box">
              <div>
                <h2 class="heading-4 mt-12">{page.pageTitle}</h2>
                <p class="paragraph product-detail-subtitle alternate">
                  Cobertor Invernal
                </p>
              </div>
            </div>
            {#each page.pageIcons as icon}
              <div>
                <ImageComponent
                  src={icon}
                  loading="eager"
                  alt=""
                  classList="icon-image"
                />
              </div>
            {/each}
          </div>
        </div>
        <div class="columna-invernal-1 relative">
          <OptimImg
            onClick={() =>
              handleImageClick(page.SKU, [
                page.complSheets[0],
                page.complCurtains[0],
              ])}
            source={`${URLS.fotos}${page.SKU}-3.webp`}
            imgClass="image-26"
          />
          {#if page.pageCopys && page.pageCopys.length >= 3 && page.pageCopys[2] !== ""}
            <div
              class="copy-box-everest absolute top-0 w-full text-center mt-32"
            >
              <div class="text-block-25" style="text-transform: lowercase;">
                {page.pageCopys[2]}
              </div>
              <div class="text-block-27 mt-4 leading-none">
                {page.pageCopys[3] || ""}
              </div>
              <img
                src="../images/Flechas-1.svg"
                loading="eager"
                alt=""
                class="arrow-image mt-0 ml-20"
              />
            </div>
          {/if}
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
          <OptimImg
            onClick={() => handleImageClick(page.complSheets[0], [])}
            source={`${URLS.fotos}${page.complSheets[0]}.webp`}
            imgClass="image-18 horizontal"
          />
          <div class="text-block-22 centered">
            agrega estas<br />‍<strong class="bold-text-2"> sábanas</strong>
          </div>
        </div>
        <div class="link-block-10 centered w-inline-block">
          <OptimImg
            onClick={() => handleImageClick(page.complCurtains[0], [])}
            source={`${URLS.fotos}${page.complCurtains[0]}.webp`}
            imgClass="image-18 horizontal"
          />
          <div class="text-block-22 centered">
            combina con estas <br />
            <strong class="bold-text-3"> cortinas</strong>
          </div>
        </div>
      </div>
    </div>
  {/if}
{/each}

<NavigatorMenu
  catalog={Catalogs.INVIERNO}
  bind:relatedProducts
  bind:visibleIds
  bind:showPopup
  bind:showViewPrices
  bind:selectedProduct
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
  <script defer src="../js/animations.js"></script>
  <script defer src="../js/webflow.js" type="text/javascript"></script>
</div>

<style>
  .div-block-43 {
    align-items: initial !important;
    justify-content: initial !important;
  }
</style>
