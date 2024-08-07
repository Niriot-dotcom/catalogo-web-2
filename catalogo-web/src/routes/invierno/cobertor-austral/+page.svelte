<script lang="ts">
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";
  import type { PageData } from "./$types";
  import { catalogSections } from "$lib/components/currentCatalogPage";
  import CategoriesFooter from "$lib/components/categoriesFooter.svelte";
  import EntradaInvierno from "$lib/templates/invierno/EntradaInvierno.svelte";
  import { EnumEntradaInvierno, URLS } from "$lib/constants/strings";
  import CobertorAustral from "$lib/templates/invierno/CobertorAustral.svelte";

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
  titleSvg="/images/invierno/copys/ENTRADA-P03-AUSTRAL-TITULO.svg"
  variant={EnumEntradaInvierno.FOTO_VIDEO}
  titlePosition="top-[32vh] right-0 w-5/6"
  storyPosition="top-1/2 left-0 transform -translate-y-1/2"
  bgImage="/images/invierno/portadillas/ENTRADA-P03-AUSTRAL.webp"
  bgVideo="/images/invierno/portadillas/ENTRADA-P03-AUSTRAL-VERTICAL.mp4"
/>

{#each pages as page, index}
  <CobertorAustral {page} />
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
