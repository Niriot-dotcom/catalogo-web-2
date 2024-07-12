<script lang="ts">
  import { onMount } from "svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { CATALOGS_ROUTES, COLORS, URLS } from "$lib/constants/strings";
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import OptimImg from "$lib/components/OptimImg.svelte";
  import { getCurrentCatalog } from "$lib/utils/navigation";

  export let handleImageClick: (sku: string, relatedProds: string[]) => void;
  export let page: DatabasePage;
  let bgColor =
    page.pageResources &&
    page.pageResources.length > 0 &&
    page.pageResources[0] !== "#"
      ? page.pageResources[0]
      : COLORS.beige;

  let currentCatalog: string;
  onMount(() => {
    if (window) {
      currentCatalog = getCurrentCatalog();
    }
    const script = document.createElement("script");
    script.src = "../js/customSlider.js";
    script.async = true;
    document.body.appendChild(script);
  });
</script>

<!-- data-visible-id="{page.SKU}, {page.complSheets[0]}, {page
  .complCurtains[0]}, {page.complPillowCovers[0]}, {page.complCushions[0]}" -->
<!-- MOBILE -->
<div
  style="background-color: {bgColor};"
  class="md:hidden pt-10 overflow-x-hidden"
>
  <!-- text header -->
  <div class="text-black px-5">
    <p class="chavos-5xl xs:chavos-6xl">{page.pageTitle}</p>
    <p class="chavos-base xs:chavos-lg">{page.pageSubtitle}</p>
  </div>

  <!-- images -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    data-visible-id={page.SKU}
    class="h-[70vh] w-full pt-2"
    on:click={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
  >
    <!-- main image (slider) -->
    <div
      udesly-before-after="50"
      slider-height="50vh"
      class="w-full flex-col justify-center items-center mb-0 mr-0 flex relative overflow-hidden max-w-none"
    >
      <ImageComponent
        classList="z-0 w-auto object-cover absolute scale-110"
        src={`${URLS.fotos}${page.SKU}.webp`}
        image="right"
      />
      <ImageComponent
        classList="z-[1] w-auto object-cover absolute scale-110"
        src={`${URLS.fotos}${page.SKU}-3.webp`}
        image="left"
      />
      <div before-after="handle" class="handle-bar">
        <div class="circle-wrapper"></div>
      </div>
    </div>

    <!-- texture image -->
    <div class="h-[20vh] w-full relative">
      <OptimImg
        imgClass="object-cover w-full h-full"
        source={`${URLS.fotos}${page.SKU}-2.webp`}
      />

      {#if page.pageCopys && page.pageCopys.length > 0 && page.pageCopys[0] !== ""}
        <p
          class="uppercase text-black chavos-sm bg-white px-3 py-1.5 w-fit rounded-2xl absolute bottom-0 left-1/2 translate-x-[-50%] mb-3 xs:chavos-base"
        >
          {page.pageCopys[0]}
        </p>
      {/if}
    </div>
  </div>

  <!-- complementos -->
  <div class="mt-3">
    <div class="h-[10vh] pl-[12%]">
      <img
        src="../images/copys/{currentCatalog === CATALOGS_ROUTES.VIANNEY
          ? 'CambiaElLookConEstosComplementos'
          : 'AgregaComplementosBlack'}.svg"
        loading="eager"
        alt=""
        class="h-full {currentCatalog === CATALOGS_ROUTES.VIANNEY
          ? 'scale-[0.8]'
          : 'scale-150'}"
      />
    </div>

    <div class="grid grid-cols-2 grid-rows-2 gap-x-1 gap-y-3 px-3 pb-2">
      <div
        data-visible-id={page.complSheets[0]}
        class="border-2 border-white"
        on:click={() => handleImageClick(page.complSheets[0], [])}
      >
        <OptimImg
          imgClass="object-cover w-full h-full"
          source={`${URLS.fotos}${page.complSheets[0]}.webp`}
        />
      </div>

      <div
        data-visible-id={page.complCurtains[0]}
        class="border-2 border-white"
        on:click={() => handleImageClick(page.complCurtains[0], [])}
      >
        <OptimImg
          imgClass="object-cover w-full h-full"
          source={`${URLS.fotos}${page.complCurtains[0]}.webp`}
        />
      </div>

      <div
        data-visible-id={page.complPillowCovers[0]}
        class="border-2 border-white"
        on:click={() => handleImageClick(page.complPillowCovers[0], [])}
      >
        <OptimImg
          imgClass="object-cover w-full h-full"
          source={`${URLS.fotos}${page.complPillowCovers[0]}.webp`}
        />
      </div>

      <div
        data-visible-id={page.complCushions[0]}
        class="border-2 border-white"
        on:click={() => handleImageClick(page.complCushions[0], [])}
      >
        <OptimImg
          imgClass="object-cover w-full h-full"
          source={`${URLS.fotos}${page.complCushions[0]}.webp`}
        />
      </div>
    </div>
  </div>
</div>

<!-- DESKTOP -->
<div
  style="background-color: {bgColor};"
  class="hidden md:block w-screen h-screen relative"
>
  <!-- product title -->
  <div
    style="background-color: {bgColor};"
    class="text-black mt-24 absolute left-1/2 translate-x-[-50%] flex flex-col text-center justify-center z-10 py-3 px-6"
  >
    <p class="chavos-4xl xs:chavos-5xl">{page.pageTitle}</p>
    <p class="chavos-sm xs:chavos-base">{page.pageSubtitle}</p>
  </div>

  <!-- content -->
  <div class="grid grid-rows-1 grid-cols-12 w-full h-full">
    <!-- primeros 2 complementos -->
    <div class="col-span-3 w-full h-full grid grid-cols-1 grid-rows-2 gap-3">
      <!-- cojin -->
      <div
        data-visible-id={page.complCushions[0]}
        class="w-full h-full border-2 border-white relative"
      >
        <OptimImg
          onClick={() => handleImageClick(page.complCushions[0], [])}
          imgClass="object-cover w-full h-full cursor-pointer"
          source={`${URLS.fotos}${page.complCushions[0]}.webp`}
        />

        <div
          style="background-color: {bgColor};"
          class="py-4 px-6 absolute bottom-0 right-0"
        >
          <p class="text-black chavos-xl">Cojín</p>
        </div>
      </div>

      <!-- sabanas -->
      <div
        data-visible-id={page.complSheets[0]}
        class="w-full h-full border-2 border-white relative"
      >
        <OptimImg
          onClick={() => handleImageClick(page.complSheets[0], [])}
          imgClass="object-cover w-full h-full cursor-pointer"
          source={`${URLS.fotos}${page.complSheets[0]}.webp`}
        />

        <div
          style="background-color: {bgColor};"
          class="py-4 px-6 absolute bottom-0 right-0"
        >
          <p class="text-black chavos-xl">Sábanas</p>
        </div>
      </div>
    </div>

    <!-- slider -->
    <div
      data-visible-id={page.SKU}
      udesly-before-after="50"
      slider-height="100vh"
      class="col-span-6 w-full flex-col justify-center items-center mb-0 mr-0 flex relative overflow-hidden max-w-none"
    >
      <ImageComponent
        classList="z-0 w-auto object-cover absolute scale-110"
        src={`${URLS.fotos}${page.SKU}.webp`}
        image="right"
      />
      <ImageComponent
        classList="z-[1] w-auto object-cover absolute scale-110"
        src={`${URLS.fotos}${page.SKU}-3.webp`}
        image="left"
      />
      <div before-after="handle" class="handle-bar">
        <div class="circle-wrapper"></div>
      </div>
    </div>

    <!-- ultimos 2 complementos -->
    <div class="col-span-3 w-full h-full grid grid-cols-1 grid-rows-2 gap-3">
      <!-- cortinas -->
      <div
        data-visible-id={page.complCurtains[0]}
        class="w-full h-full border-2 border-white relative"
      >
        <OptimImg
          onClick={() => handleImageClick(page.complCurtains[0], [])}
          imgClass="object-cover w-full h-full cursor-pointer"
          source={`${URLS.fotos}${page.complCurtains[0]}.webp`}
        />

        <div
          style="background-color: {bgColor};"
          class="py-4 px-6 absolute bottom-0 right-0"
        >
          <p class="text-black chavos-xl">Cortinas</p>
        </div>
      </div>

      <!-- decoracion -->
      <div
        data-visible-id={page.complPillowCovers[0]}
        class="w-full h-full border-2 border-white relative"
      >
        <OptimImg
          onClick={() => handleImageClick(page.complPillowCovers[0], [])}
          imgClass="object-cover w-full h-full cursor-pointer"
          source={`${URLS.fotos}${page.complPillowCovers[0]}.webp`}
        />

        <div
          style="background-color: {bgColor};"
          class="py-4 px-6 absolute bottom-0 right-0"
        >
          <p class="text-black chavos-xl">Funda de almohada</p>
        </div>
      </div>
    </div>
  </div>
</div>
