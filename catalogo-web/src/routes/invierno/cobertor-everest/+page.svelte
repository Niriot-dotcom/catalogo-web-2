<script lang="ts">
  import type { PageData } from "./$types";
  import DiferenciasDeCobertores from "$lib/components/communication/DiferenciasDeCobertores.svelte";
  import CobertorEverest from "$lib/templates/invierno/CobertorEverest.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs, type DatabasePage } from "$lib/constants/globalTypes";
  import EntradaInvierno from "$lib/templates/invierno/EntradaInvierno.svelte";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import { EnumEntradaInvierno } from "$lib/constants/strings";
  import InicioInvierno from "$lib/custom-pages/InicioInvierno.svelte";

  let visibleIds: string[] = [];
  function handleVisibleChange(event: any) {
    visibleIds = event.detail;
  }
  let relatedProducts: string[] = [];
  let selectedProduct: null | string = null;
  let showPopup = false;

  export let data: PageData;
  const handleImageClick = (sku: string, relatedProds: string[]) => {
    selectedProduct = sku;
    relatedProducts = relatedProds;
  };

  const pages: DatabasePage[] = data.props.pages;
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

<!-- ENTRADA DEL CATALOGO -->
<InicioInvierno />

<!-- [COMUNICACION] Diferencias de Cobertores -->
<DiferenciasDeCobertores />

<!-- ENTRADA -->
<EntradaInvierno
  titleSvg="/images/invierno/copys/ENTRADA-P01-EVEREST-TITULO.svg"
  variant={EnumEntradaInvierno.FOTO_VIDEO}
  titleSize="w-5/6"
  titlePosition="top-[60vh] left-0"
  storyPosition="top-1/2 left-0 transform -translate-y-1/2"
  bgImage="/images/invierno/portadillas/ENTRADA-P01-EVEREST.webp"
  bgVideo="/images/invierno/portadillas/ENTRADA-P01-EVEREST-VERTICAL.mp4"
/>

{#each pages as page, index}
  <CobertorEverest {page} inversa={index % 2 !== 0} />
{/each}

<NavigatorMenu
  catalog={Catalogs.INVIERNO}
  bind:relatedProducts
  bind:visibleIds
  bind:showPopup
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
  <script defer src="../js/animations.js" type="text/javascript"></script>
  <script defer src="../js/webflow.js" type="text/javascript"></script>
</div>
