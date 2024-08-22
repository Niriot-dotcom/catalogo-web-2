<script lang="ts">
  import type { PageData } from "./$types";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs, type DatabasePage } from "$lib/constants/globalTypes";
  import EntradaInvierno from "$lib/templates/invierno/EntradaInvierno.svelte";
  import EdredonVoga from "$lib/templates/EdredonVoga.svelte";
  import JuegoDeEdredon from "$lib/templates/JuegoDeEdredon.svelte";
  import EdredonNovo from "$lib/templates/EdredonNovo.svelte";
  import EdredonNuut from "$lib/templates/EdredonNuut.svelte";
  import Cobertor from "$lib/templates/Cobertor.svelte";
  import AmbienteConMiniambiente from "$lib/templates/AmbienteConMiniambiente.svelte";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import CobertorBebe from "$lib/templates/CobertorBebe.svelte";
  import { EnumEntradaInvierno } from "$lib/constants/strings";
  import Sublinea from "$lib/templates/Sublinea.svelte";

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
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

<!-- ENTRADA -->
<EntradaInvierno
  titleSvg="/images/invierno/copys/ENTRADA-P17-BEBE-TITULO.svg"
  variant={EnumEntradaInvierno.SOLO_FOTO}
  titlePosition="bottom-0 right-0"
  storyPosition="top-1/2 left-0 transform -translate-y-1/2"
  bgImage="/images/invierno/portadillas/ENTRADA-P17-BEBE.webp"
  bgColor="#E3E3E6"
/>

<!-- render pages -->
{#each pages as page, i}
  {#if page.pageTemplate == "JuegoDeEdredon"}
    <JuegoDeEdredon bind:page {handleImageClick} />
  {:else if page.pageTemplate == "EdredonNovo"}
    <EdredonNovo bind:page {handleImageClick} />
  {:else if page.pageTemplate == "EdredonNuut"}
    <EdredonNuut bind:page {handleImageClick} />
  {:else if page.pageTemplate == "Cobertor"}
    <CobertorBebe bind:page {handleImageClick} />
    <!-- {:else if page.pageTemplate == "VariantesDeColor"}
    <VariantesDeColor bind:visibleIds groupPages={groups[group]} title={group} {handleImageClick} /> -->
  {:else if page.pageTemplate == "EdredonVoga"}
    <EdredonVoga bind:page {handleImageClick} />
  {:else if page.pageTemplate == "AmbienteConMiniambiente"}
    <AmbienteConMiniambiente bind:page {handleImageClick} />
  {/if}
{/each}

<!-- {#if Object.keys(groups).length > 0}
{#each groups as group, i}
<Sublinea
    groupPages={groups[Object.keys(groups)[0]]}
    title={Object.keys(groups)[0]}
    {handleImageClick}
  />
{/each}
{/if} -->
{#each Object.keys(groups) as group, i}
  {#if groups[group][0].pageTemplate == "Sublinea"}
    <Sublinea groupPages={groups[group]} title={group} {handleImageClick} />
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
