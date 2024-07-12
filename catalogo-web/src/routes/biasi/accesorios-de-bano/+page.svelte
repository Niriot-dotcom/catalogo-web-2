<script lang="ts">
  import PvisibleDetector from "$lib/components/pvisibleDetector.svelte";
  import TemplateDetector from "$lib/components/templateDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import CategoriesFooter from "$lib/components/categoriesFooter.svelte";
  import { catalogSections } from "$lib/components/currentCatalogPage";
  import { BiasiFooterHeader } from "$lib/constants/FooterHeaders";
  import type { PageData } from "./$types";
  import VideoAndGrid from "$lib/templates/videoAndGrid.svelte";
  import MainAndElements from "$lib/templates/mainAndElements.svelte";
  import Portadilla from "$lib/templates/portadilla.svelte";
  import TwoSides from "$lib/templates/twoSides.svelte";
  import ImagesAndGrid from "$lib/templates/imagesAndGrid.svelte";
  import FloatingImages from "$lib/templates/floatingImages.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";

  let visibleIds: string[] = [];
  let selectedProduct: null | string = null;
  let showPopup = false;
  function handleVisibleChange(event) {
    visibleIds = event.detail;
  }
  function show() {
    showPopup = true;
  }

  export let data: PageData;
  const pages = data.props.pages;

  let initAnimates = Array(pages.length).fill(false);
  function handleTemplateChange(event) {
    if (!event.detail[0]) return;

    initAnimates[+event.detail[0].split("-")[1]] = true;
  }
</script>

<!-- <VisibleDetector on:visibleChange={handleVisibleChange} /> -->
<PvisibleDetector bind:visibleIds />
<TemplateDetector on:templateChange={handleTemplateChange} />

{#each pages as page, i}
  {#if page.pageTemplate == "portadilla"}
    <Portadilla
      templateId={`portadilla-${i.toString()}`}
      initAnimate={initAnimates[i]}
      bind:page
    />
  {:else if page.pageTemplate == "floatingImages"}
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
