<script lang="ts">
  import PvisibleDetector from "$lib/components/pvisibleDetector.svelte";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import TemplateDetector from "$lib/components/templateDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import type { PageData } from "./$types";
  import VideoAndGrid from "$lib/templates/videoAndGrid.svelte";
  import MainAndElements from "$lib/templates/mainAndElements.svelte";
  import TwoSides from "$lib/templates/twoSides.svelte";
  import ImagesAndGrid from "$lib/templates/imagesAndGrid.svelte";
  import FloatingImages from "$lib/templates/floatingImages.svelte";
  import { Catalogs, type DatabasePage } from "$lib/constants/globalTypes";
  import EntradaBiasi from "$lib/templates/biasi/EntradaBiasi.svelte";

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
  titleSvg="/images/biasi/portadillas/11-MASCOTAS.svg"
  titleClasses="bottom-0 right-0"
  circlePosition=""
  bgVideo="/images/biasi/portadillas/11-MASCOTAS.gif"
/>

{#each pages as page, i}
  {#if page.pageTemplate == "floatingImages"}
    <FloatingImages
      templateId={`floatingImages-${i.toString()}`}
      initAnimate={initAnimates[i]}
      bind:selectedProduct
      bind:page
    />
  {:else if page.pageTemplate == "imagesAndGrid"}
    <ImagesAndGrid
      templateId={`imagesAndGrid-${i.toString()}`}
      initAnimate={initAnimates[i]}
      bind:selectedProduct
      bind:page
    />
  {:else if page.pageTemplate == "mainAndElements"}
    <MainAndElements
      templateId={`mainAndElements-${i.toString()}`}
      initAnimate={initAnimates[i]}
      bind:selectedProduct
      bind:page
    />
  {:else if page.pageTemplate == "twoSides"}
    <TwoSides
      templateId={`twoSides-${i.toString()}`}
      initAnimate={initAnimates[i]}
      bind:selectedProduct
      bind:page
    />
  {:else if page.pageTemplate == "videoAndGrid"}
    <VideoAndGrid
      templateId={`videoAndGrid-${i.toString()}`}
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
