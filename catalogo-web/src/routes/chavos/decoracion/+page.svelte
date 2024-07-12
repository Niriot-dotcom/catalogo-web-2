<script lang="ts">
  import type { PageData } from "./$types";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs, type DatabasePage } from "$lib/constants/globalTypes";
  import Entrada from "$lib/templates/chavos/Entrada.svelte";
  import Sublinea from "$lib/templates/Sublinea.svelte";

  let relatedProducts: string[] = [];
  import VisibleDetector from "$lib/components/visibleDetector.svelte";

  let visibleIds: string[] = [];
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

  const groups = data.props.groupedPages;
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

<!-- entrada -->
<Entrada
  backgroundVideo="../videos/chavos/ENTRADA P3-Recamara.mp4"
  textImage="/images/chavos/copys/Decoracion.webp"
  plastaImage="/images/chavos/plastas/FORMA 02.webp"
  storyCopy="-Finalmente, llegó el momento de hacer un resumen de este verano increíble en mi cuenta de Instagram. Subí un recap de todas las aventuras que viví en el verano, desde la increíble graduación, los atardeceres y las noches junto a la fogata, la pool party, el picnic en la playa y los divertidos momentos en familia."
  backgroundColor="#bdddce"
  leftSide
/>
<!-- storyCopy="-Uno de los momentos<br />más mágicos fue el viaje a<br />la playa que compartimos<br />juntos en familia." -->

<!-- pages -->
{#each Object.keys(groups) as group, i}
  <Sublinea groupPages={groups[group]} title={group} {handleImageClick} />
{/each}

<NavigatorMenu
  catalog={Catalogs.CHAVOS}
  bind:visibleIds
  bind:relatedProducts
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
