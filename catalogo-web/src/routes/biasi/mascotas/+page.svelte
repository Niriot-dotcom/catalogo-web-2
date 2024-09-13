<script lang="ts">
  import PvisibleDetector from "$lib/components/pvisibleDetector.svelte";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import TemplateDetector from "$lib/components/templateDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import type { PageData } from "./$types";
  import MainAndElements from "$lib/templates/MainAndElements.svelte";
  import TwoSides from "$lib/templates/TwoSides.svelte";
  import ImagesAndGrid from "$lib/templates/ImagesAndGrid.svelte";
  import { Catalogs, type DatabasePage } from "$lib/constants/globalTypes";
  import EntradaBiasi from "$lib/templates/biasi/EntradaBiasi.svelte";
  import { URLS } from "$lib/constants/strings";

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

  const pages: DatabasePage[] = data.props.pages;
  const groups: Record<string, DatabasePage[]> = data.props.groupedPages;

  let initAnimates = Array(pages.length).fill(false);
  function handleTemplateChange(event: any) {
    if (!event.detail[0]) return;
    initAnimates[+event.detail[0].split("-")[1]] = true;
  }
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />
<PvisibleDetector bind:visibleIds />
<TemplateDetector on:templateChange={handleTemplateChange} />

<!-- ENTRADA -->
<EntradaBiasi
  bgVideo="{URLS.videos}ENTRADA-P11-MASCOTAS.gif"
  titleSvg="/images/biasi/portadillas/11-MASCOTAS.svg"
/>

{#each pages as page, i}
  {#if page.pageTemplate == "ImagesAndGrid"}
    <ImagesAndGrid
      templateId={`ImagesAndGrid-${i.toString()}`}
      initAnimate={initAnimates[i]}
      bind:selectedProduct
      bind:page
    />
  {:else if page.pageTemplate == "MainAndElements"}
    <MainAndElements
      templateId={`MainAndElements-${i.toString()}`}
      initAnimate={initAnimates[i]}
      {handleImageClick}
      bind:selectedProduct
      bind:page
    />
  {:else if page.pageTemplate == "TwoSides"}
    <TwoSides
      templateId={`TwoSides-${i.toString()}`}
      initAnimate={initAnimates[i]}
      bind:selectedProduct
      bind:page
    />
  {/if}
{/each}

<NavigatorMenu
  catalog={Catalogs.BIASI}
  bind:relatedProducts
  bind:visibleIds
  bind:showPopup
  bind:showViewPrices
  bind:selectedProduct
/>

<div>
  <script defer src="/js/webflowPage.js"></script>
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
  <script defer src="/js/animations.js" type="text/javascript"></script>
  <script defer src="/js/webflow.js" type="text/javascript"></script>
</div>
