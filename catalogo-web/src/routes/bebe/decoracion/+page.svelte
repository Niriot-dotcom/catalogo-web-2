<script lang="ts">
  import type { PageData } from "./$types";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs, type DatabasePage } from "$lib/constants/globalTypes";
  import EntradaVianney from "$lib/templates/EntradaVianney.svelte";
  import Sublinea from "$lib/templates/Sublinea.svelte";
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

  const groups: Record<string, DatabasePage[]> = data.props.groupedPages;
</script>

<!-- entrada -->
<EntradaBebe
  backgroundVideo="../videos/bebe/Entrada-P5-Decoracion.mp4"
  backgroundImage="/images/bebe/copys/Entrada-P5-DecoracionFondo.svg"
  backgroundColor="#F4ECEE"
  textImage="/images/bebe/copys/Entrada-P5-Decoracion.svg"
  textColor="#DBC1C7"
  storyMainPhrase="Una nueva vida trae luz y amor"
  storyCopy="a cualquier rincón, y nos recuerda la belleza de los momentos cotidianos."
/>

<!-- render pages -->
{#each Object.keys(groups) as group, i}
  <Sublinea groupPages={groups[group]} title={group} {handleImageClick} />
{/each}

<NavigatorMenu
  catalog={Catalogs.BEBE}
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
