<script lang="ts">
  import type { PageData } from "./$types";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs, type DatabasePage } from "$lib/constants/globalTypes";
  import JuegoDeCuna from "$lib/templates/JuegoDeCuna.svelte";
  import JuegoDeEdredon from "$lib/templates/JuegoDeEdredon.svelte";
  import EdredonNovo from "$lib/templates/EdredonNovo.svelte";
  import EdredonNuut from "$lib/templates/EdredonNuut.svelte";
  import Cobertor from "$lib/templates/Cobertor.svelte";
  import AmbienteConMiniambiente from "$lib/templates/AmbienteConMiniambiente.svelte";
  import Tutorial from "$lib/components/tutorial.svelte";
  import EdredonVogaBebe from "$lib/templates/EdredonVogaBebe.svelte";
  import EntradaBebe from "$lib/templates/EntradaBebe.svelte";

  let visibleIds: string[] = [];
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

<!-- tutorial -->
<Tutorial showHorizontalHand />

<!-- entrada -->
<EntradaBebe
  backgroundVideo="../videos/bebe/Entrada-P1-Edredones.mp4"
  backgroundImage="/images/bebe/copys/Entrada-P1-EdredonesFondo.svg"
  backgroundColor="#E7ECF2"
  textImage="/images/bebe/copys/Entrada-P1-Edredones.svg"
  textColor="#afc2d3"
  storyMainPhrase="Encuentra un entorno lleno de color, alegría y ternura"
  storyCopy="que acompañarán el entorno de los bebés."
/>

<!-- render pages -->
{#each pages as page, i}
  {#if page.pageTemplate == "JuegoDeEdredon"}
    <JuegoDeEdredon bind:page {handleImageClick} />
  {:else if page.pageTemplate == "JuegoDeCuna"}
    <JuegoDeCuna bind:page {handleImageClick} />
  {:else if page.pageTemplate == "EdredonNovo"}
    <EdredonNovo bind:page {handleImageClick} />
  {:else if page.pageTemplate == "EdredonNuut"}
    <EdredonNuut bind:page {handleImageClick} />
  {:else if page.pageTemplate == "Cobertor"}
    <Cobertor bind:page {handleImageClick} />
    <!-- {:else if page.pageTemplate == "Sublinea"}
    <Sublinea groupPages={groups[group]} title={group} {handleImageClick} />
  {:else if page.pageTemplate == "VariantesDeColor"}
    <VariantesDeColor bind:visibleIds groupPages={groups[group]} title={group} {handleImageClick} /> -->
  {:else if page.pageTemplate == "EdredonVoga"}
    <EdredonVogaBebe bind:page {handleImageClick} />
  {:else if page.pageTemplate == "AmbienteConMiniambiente"}
    <AmbienteConMiniambiente bind:page {handleImageClick} />
  {/if}
{/each}

<NavigatorMenu
  catalog={Catalogs.BEBE}
  bind:relatedProducts
  bind:visibleIds
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
