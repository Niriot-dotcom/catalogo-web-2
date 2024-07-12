<script lang="ts">
  import type { PageData } from "./$types";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs, type DatabasePage } from "$lib/constants/globalTypes";
  import Entrada from "$lib/templates/chavos/Entrada.svelte";
  import { getComponent } from "$lib/utils/getComponent";
  import Tutorial from "$lib/components/tutorial.svelte";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import JuegoDeEdredon from "$lib/templates/JuegoDeEdredon.svelte";
  import EdredonNovo from "$lib/templates/EdredonNovo.svelte";
  import EdredonNuut from "$lib/templates/EdredonNuut.svelte";

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

<!-- tutorial -->
<Tutorial showHorizontalHand />

<!-- tendencias favoritas -->
<div
  class="w-screen min-h-screen text-black bg-beige flex flex-col items-center"
>
  <!-- text -->
  <div class="pt-[15vh] w-10/12">
    <span class="chavos-xl xs:chavos-2xl">las</span>
    <span class="chavos-bold-2xl xs:chavos-bold-3xl">
      tendencias favoritas</span
    >

    <p class="chavos-xs leading-5 xs:chavos-base">
      Vianney mood,
      <span class="chavos-bold-xs xs:chavos-bold-base"
        >no es solo ropa de cama.</span
      >
      Transformamos tus espacios para que disfrutes del día a día, no importa si
      quieres pasarlo sin arreglarte en tu habitación o disfrutar con tus amigos
      un día de picnic en la playa.
    </p>
  </div>

  <!-- grid -->
  <div class="grid grid-cols-3 grid-rows-4 w-full h-[70%] py-7">
    {#each { length: 12 } as _, i}
      <div class="w-full h-full">
        <img
          src={`/images/chavos/GRID ${i + 1}.jpg`}
          loading="eager"
          alt=""
          class="w-full h-full object-cover"
        />
      </div>
    {/each}
  </div>
</div>

<!-- entrada -->
<Entrada
  backgroundVideo="../videos/chavos/ENTRADA P1-Recamara.mp4"
  textImage="/images/chavos/copys/Recamara.webp"
  plastaImage="/images/chavos/plastas/FORMA 01.webp"
  storyCopy="-Mi nombre es Valeria, y este verano, justo después de cumplir 17 años, viví una serie de aventuras que quedarán en mi corazón para siempre."
  backgroundColor="#f9f0dc"
/>

{#each pages as page, i}
  {#if page.pageTemplate == "JuegoDeEdredon"}
    <JuegoDeEdredon bind:page {handleImageClick} />
  {:else if page.pageTemplate == "EdredonNovo"}
    <EdredonNovo bind:page {handleImageClick} />
  {:else if page.pageTemplate == "EdredonNuut"}
    <EdredonNuut bind:page {handleImageClick} />
  {/if}
{/each}

<NavigatorMenu
  catalog={Catalogs.CHAVOS}
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
