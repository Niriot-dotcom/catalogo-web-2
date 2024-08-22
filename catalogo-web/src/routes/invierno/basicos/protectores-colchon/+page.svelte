<script lang="ts">
  import type { PageData } from "./$types";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";
  import VariantesDeColor from "$lib/templates/VariantesDeColor.svelte";
  import Sublinea from "$lib/templates/Sublinea.svelte";
  import AmbienteConMiniambiente from "$lib/templates/AmbienteConMiniambiente.svelte";
  import EntradaInvierno from "$lib/templates/invierno/EntradaInvierno.svelte";
  import { EnumEntradaInvierno } from "$lib/constants/strings";
  import SectionMenu from "$lib/components/navigation/SectionMenu.svelte";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import { InviernoBasicosSubsections } from "$lib/constants/subSections";
  import ProtectoresDeColchon from "$lib/templates/ProtectoresDeColchon.svelte";

  let visibleIds: string[] = [];
  let showViewPrices = false;
  function handleVisibleChange(event: any) {
    visibleIds = event.detail;
    showViewPrices = visibleIds.length > 0;
  }
  let relatedProducts: string[] = [];
  let selectedProduct: null | string = null;
  let showPopup = false;
  let loadingSection: boolean;
  let currentPageRoute = "basicos";

  export let data: PageData;
  const handleImageClick = (sku: string, relatedProds: string[]) => {
    selectedProduct = sku;
    relatedProducts = relatedProds;
  };

  let groupedPagess: Record<string, []> = data.props.groupedPages;
  const { mattressProtectorsPages } = data.props;
  let activeTitle = InviernoBasicosSubsections[3].title;
  let activeLink = InviernoBasicosSubsections[3].link;
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

<!-- ENTRADA -->
<EntradaInvierno
  titleSvg="/images/invierno/copys/ENTRADA-P09-BASICOS-TITULO.svg"
  storySvg="/images/invierno/copys/ENTRADA-P09-BASICOS-COPY.svg"
  variant={EnumEntradaInvierno.SOLO_VIDEO}
  titlePosition="bottom-0 right-0"
  storyPosition="top-16 left-5"
  bgVideo="/images/invierno/portadillas/ENTRADA-P09-BASICOS-VERTICAL.mp4"
/>

<SectionMenu
  {currentPageRoute}
  sections={InviernoBasicosSubsections}
  breakLine={1}
  bind:activeTitle
  bind:activeLink
  bind:loadingSection
/>

{#if loadingSection}
  <div class="w-full h-screen bg-beige">
    <div class="loader"></div>
  </div>
{:else}
  <!-- render pages -->
  {#each Object.keys(groupedPagess) as group, i}
    {#if groupedPagess[group][0].pageTemplate == "AmbienteConMiniambiente"}
      {#each groupedPagess[group] as juego, i}
        <AmbienteConMiniambiente page={juego} {handleImageClick} />
      {/each}
    {:else if groupedPagess[group][0].pageTemplate == "Sublinea"}
      <Sublinea
        groupPages={groupedPagess[group]}
        title={group}
        {handleImageClick}
      />
    {:else if groupedPagess[group][0].pageTemplate == "VariantesDeColor"}
      <VariantesDeColor
        bind:visibleIds
        groupPages={groupedPagess[group]}
        title={group}
        {handleImageClick}
      />
    {/if}
  {/each}
{/if}

<ProtectoresDeColchon pages={mattressProtectorsPages} {handleImageClick} />

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
