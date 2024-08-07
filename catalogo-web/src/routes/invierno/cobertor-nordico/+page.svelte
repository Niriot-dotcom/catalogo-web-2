<script lang="ts">
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import EntradaInvierno from "$lib/templates/invierno/EntradaInvierno.svelte";
  import { EnumEntradaInvierno, URLS } from "$lib/constants/strings";
  import CobertorNordico from "$lib/templates/invierno/CobertorNordico.svelte";

  onMount(() => {
    const script = document.createElement("script");
    script.src = "../js/nordicSlider.js";
    script.async = true;
    document.body.appendChild(script);
  });

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
  const pages = data.props.pages;
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

<!-- ENTRADA -->
<EntradaInvierno
  titleSvg="/images/invierno/copys/ENTRADA-P05-NORDICO-TITULO.svg"
  storySvg="/images/invierno/copys/ENTRADA-P05-NORDICO-COPY.svg"
  variant={EnumEntradaInvierno.FOTO_VIDEO}
  titlePosition="top-[30vh] left-5"
  storyPosition="top-[70vh] left-0 transform -translate-y-1/2"
  bgImage="/images/invierno/portadillas/ENTRADA-P05-NORDICO.webp"
  bgVideo="/images/invierno/portadillas/ENTRADA-P05-NORDICO-VERTICAL.mp4"
/>

{#each pages as page, index}
  {#if page.pageTitle === "Bariloche"}
    <div data-visible-id={page.SKU}>
      <div class="plantilla-nordico">
        <div class="div-block-46">
          <div class="handle-container">
            <div class="div-block-45">
              <ImageComponent
                src={`${URLS.fotos}${page.SKU}-2.webp`}
                loading="eager"
                id="f09abdcc-902f-003f-2d59-9712f02a5bd1"
                alt=""
                classList="image-28"
              />
              <div class="div-block-43 ligero">
                <div class="div-block-48">
                  <div class="page-title-box">
                    <h2
                      text-split=""
                      words-slide-from-right=""
                      class="heading-4"
                    >
                      {page.pageTitle}
                    </h2>
                    <p
                      text-split=""
                      words-slide-from-right=""
                      class="paragraph product-detail-subtitle alternate"
                    >
                      Cobertor Ligero
                    </p>
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

                <!-- TODO -->
                <!-- <div class="copy-box-everest right ligero">
                  <div class="text-block-26">
                    <span class="text-span-8">
                      TODO
                      page.pageDescriptions[0]
                    </span>
                  </div>
                  <div class="text-block-27">
                    TODO
                    page.pageDescriptions[1], page.pageDescriptions[2]
                  </div>
                  <img
                    src="../images/Flechas.svg"
                    loading="eager"
                    alt=""
                    class="arrow-image"
                  />
                </div> -->
              </div>
            </div>
            <div udesly-before-after="50" class="ligero-container">
              <ImageComponent
                src={`${URLS.fotos}${page.SKU}.webp`}
                loading="eager"
                id="adfea8dd-6554-1c71-61f8-1c4b232589e5"
                classList="image-31"
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
              src={`${URLS.fotos}${page.SKU}.webp`}
              loading="eager"
              alt=""
              class="image-18 horizontal"
            />
            <div class="text-block-22 centered">
              agrega estas<br />‍<strong class="bold-text-2"> sábanas</strong>
            </div>
          </a>
          <a href="#" class="link-block-10 centered w-inline-block"
            ><img
              src={`${URLS.fotos}${page.SKU}-2.webp`}
              loading="eager"
              alt=""
              class="image-18 horizontal"
            />
            <div class="text-block-22 centered">
              combina con estas<br />
              <strong class="bold-text-3"> cortinas</strong>
            </div>
          </a>
        </div>
      </div>
    </div>
  {:else}
    <CobertorNordico {page} inversa={index % 2 !== 0} />
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
