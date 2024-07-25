<script lang="ts">
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";
  import type { PageData } from "./$types";
  import { EnumEntradaInvierno, URLS } from "$lib/constants/strings";
  import EntradaInvierno from "$lib/templates/invierno/EntradaInvierno.svelte";

  let visibleIds = [];

  function handleVisibleChange(event) {
    visibleIds = event.detail;
  }

  let showPopup = false;

  function show() {
    showPopup = true;
  }

  let isLoaded = false;
  export let data: PageData;
  const pages = data.props.pages; // guarda el objeto product en una variable
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

<!-- ENTRADA -->
<EntradaInvierno
  titleSvg="/images/invierno/copys/ENTRADA-P04-INVERNAL-TITULO.svg"
  storySvg="/images/invierno/copys/ENTRADA-P04-INVERNAL-COPY.svg"
  variant={EnumEntradaInvierno.FOTO_VIDEO}
  titleSize="h-[25vh]"
  titlePosition="bottom-0 right-0"
  storyPosition="top-1/2 left-0 transform -translate-y-1/2"
  bgImage="/images/invierno/portadillas/ENTRADA-P04-INVERNAL.webp"
  bgVideo="/images/invierno/portadillas/ENTRADA-P04-INVERNAL-VERTICAL.mp4"
/>

<div>
  {#each pages as page, index}
    {#if index % 2 === 0}
      <div id={page.pageTitle}>
        <div
          data-visible-id={page.SKU}
          data-w-id="26494cac-c879-c70d-1939-3984a45c1663"
          class="div-block-40 column-container"
        >
          <div
            style="overflow-x: hidden; max-width: 100vw;"
            class="columna-invernal-1"
          >
            <div class="div-block-43 sm:hidden block">
              <div class="page-title-box">
                <div>
                  <h2 class="heading-4">{page.pageTitle}</h2>
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
            <ImageComponent
              src={`${URLS.fotos}${page.SKU}.webp`}
              loading="eager"
              alt=""
              classList="image-26"
            />
          </div>
          <div class="columna-invernal-2 austral">
            <ImageComponent
              src={page.pageMainImage}
              loading="eager"
              alt=""
              classList="image-26"
            />
            <div class="div-block-43 sm:block hidden">
              <div class="page-title-box">
                <div>
                  <h2 class="heading-4">{page.pageTitle}</h2>
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
          <div class="columna-invernal-3">
            <ImageComponent
              src={`${URLS.fotos}${page.SKU}-2.webp`}
              loading="eager"
              alt=""
              classList="image-26"
            />
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
          <div
            on:click={show}
            href="#"
            class="link-block-10 centered w-inline-block"
          >
            <img
              src={`${URLS.fotos}${page.complCurtains[0]}.webp`}
              loading="eager"
              alt=""
              class="image-18 horizontal"
            />
            <div class="text-block-22 centered">
              agrega estas<br />‍<strong class="bold-text-2"> sábanas</strong>
            </div>
          </div>
          <div href="#" class="link-block-10 centered w-inline-block">
            <img
              src={`${URLS.fotos}${page.complSheets[0]}.webp`}
              loading="eager"
              alt=""
              class="image-18 horizontal"
            />
            <div on:click={show} class="text-block-22 centered">
              combina con estas<br />
              <strong class="bold-text-3"> cortinas</strong>
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div id={page.pageTitle}>
        <div
          data-visible-id={page.SKU}
          data-w-id="922ca861-0457-4a76-f593-9ea2a0016e98"
          class="div-block-40 column-container"
        >
          <div
            style="overflow-x: hidden; max-width: 100vw;"
            class="columna-invernal-3"
          >
            <div class="div-block-43 sm:hidden block">
              <div class="page-title-box">
                <div>
                  <h2 class="heading-4">{page.pageTitle}</h2>
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
            <ImageComponent
              src={`${URLS.fotos}${page.SKU}.webp`}
              loading="eager"
              alt=""
              classList="image-26"
            />
          </div>
          <div class="columna-invernal-2 austral">
            <ImageComponent src={page.pageMainImage} classList="image-26" />
            <div class="div-block-43 sm:block hidden">
              <div class="page-title-box">
                <div>
                  <h2 class="heading-4">{page.pageTitle}</h2>
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
          <div class="columna-invernal-1">
            <ImageComponent
              src={`${URLS.fotos}${page.SKU}-2.webp`}
              loading="eager"
              alt=""
              classList="image-26"
            />
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
          <a href="#" class="link-block-10 centered w-inline-block">
            <img
              src={`${URLS.fotos}${page.complCurtains[0]}.webp`}
              loading="eager"
              class="image-18 horizontal"
            />
            <div class="text-block-22 centered">
              agrega estas<br />‍<strong class="bold-text-2"> sábanas</strong>
            </div>
          </a>
          <a href="#" class="link-block-10 centered w-inline-block">
            <img
              src={`${URLS.fotos}${page.complSheets[0]}.webp`}
              loading="eager"
              alt=""
              class="image-18 horizontal"
            />
            <div class="text-block-22 centered">
              combina con estas <br />
              <strong class="bold-text-3"> cortinas</strong>
            </div>
          </a>
        </div>
      </div>
    {/if}
  {/each}
</div>

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
  <script defer src="../js/animations.js"></script>
  <script defer src="../js/webflow.js" type="text/javascript"></script>
</div>

<style>
  .div-block-43 {
    align-items: initial !important;
    justify-content: initial !important;
  }
</style>
