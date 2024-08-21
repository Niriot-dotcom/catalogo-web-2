<script lang="ts">
  import type { PageData } from "./$types";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs, type DatabasePage } from "$lib/constants/globalTypes";
  import Entrada from "$lib/templates/chavos/Entrada.svelte";
  import Almohadas from "$lib/templates/Almohadas.svelte";
  import ProtectoresDeColchon from "$lib/templates/ProtectoresDeColchon.svelte";
  import Sublinea from "$lib/templates/Sublinea.svelte";

  import JuegoDeEdredon from "$lib/templates/JuegoDeEdredon.svelte";
  import EdredonNovo from "$lib/templates/EdredonNovo.svelte";
  import EdredonNuut from "$lib/templates/EdredonNuut.svelte";
  import Cobertor from "$lib/templates/Cobertor.svelte";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";

  let visibleIds: string[] = [];
  let relatedProducts: string[] = [];
  function handleVisibleChange(event: any) {
    visibleIds = event.detail;
  }
  let selectedProduct: null | string = null;
  let showPopup = false;

  export let data: PageData;
  const handleImageClick = (sku: string, relatedProds: string[]) => {
    selectedProduct = sku;
    relatedProducts = relatedProds;
  };

  const pages: DatabasePage[] = data.props.pages;
  const { pillowsPages, huggablePillowsPages, mattressProtectorsPages } =
    data.props;
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

<!-- entrada -->
<Entrada
  backgroundVideo="../videos/chavos/ENTRADA P4-Recamara.mp4"
  textImage="/images/chavos/copys/Recamara.webp"
  plastaImage="/images/chavos/plastas/FORMA 04.webp"
  storyCopy="-Durante el verano realizamos actividades cotidianas que se volvieron muy especiales"
  backgroundColor="#dbd6f8"
/>

{#each pages as page, i}
  {#if page.pageTemplate == "JuegoDeEdredon"}
    <JuegoDeEdredon bind:page {handleImageClick} />
  {:else if page.pageTemplate == "EdredonNovo"}
    <EdredonNovo bind:page {handleImageClick} />
  {:else if page.pageTemplate == "EdredonNuut"}
    <EdredonNuut bind:page {handleImageClick} />
  {:else if page.pageTemplate == "Cobertor"}
    <Cobertor bind:page {handleImageClick} />
  {/if}
{/each}

<Almohadas pages={pillowsPages} {handleImageClick} />
<ProtectoresDeColchon pages={mattressProtectorsPages} {handleImageClick} />
<Sublinea
  groupPages={huggablePillowsPages}
  title={"Almohadas Abrazables"}
  {handleImageClick}
/>

<NavigatorMenu
  catalog={Catalogs.CHAVOS}
  bind:visibleIds
  bind:relatedProducts
  bind:showPopup
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
