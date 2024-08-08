<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import LegalLicenses from "$lib/components/communication/LegalLicenses.svelte";
  import ComplementosCopy from "$lib/components/resources/ComplementosCopy.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import {
    CATALOGS_NAMES,
    CATALOGS_ROUTES,
    COLORS,
    LEGALES_SVGS,
    URLS,
  } from "$lib/constants/strings";
  import { getCurrentCatalog } from "$lib/utils/navigation";
  import { onMount } from "svelte";

  export let page: DatabasePage;
  export let handleImageClick: (sku: string, relatedProds: string[]) => void;
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
  });
</script>

<!-- MOBILE -->
<div
  style="background-color: {bgColor};"
  class="md:hidden pt-10 overflow-x-hidden"
>
  <!-- text header -->
  <div class="text-black px-5">
    {#if page.pageTitle.replaceAll(" ", "").toUpperCase() === "HARRYPOTTER"}
      <div class="w-full h-full">
        <img src="/images/legales/LEGALES_24_HP.svg" alt="" class="" />
      </div>
    {:else}
      <p class="chavos-5xl xs:chavos-6xl">{page.pageTitle}</p>
    {/if}
    <p class="chavos-base xs:chavos-lg">{page.pageSubtitle}</p>
  </div>

  <!-- images -->
  <div data-visible-id={page.SKU} class="h-[100vh] w-full pt-2 relative">
    <!-- main image -->
    <div class="h-[70vh] w-full">
      {#if page.pageTitle === "Neón"}
        <video
          autoplay
          loop
          muted
          playsinline
          src={page.pageVideos[0]}
          class="object-cover h-full"
        />
      {:else}
        <OptimImg
          onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
          imgClass="object-cover w-full h-full"
          source={`${URLS.fotos}${page.SKU}.webp`}
        />
      {/if}
    </div>

    <!-- 2nd view image -->
    <div
      class="absolute w-4/6 left-[12%] border-2 border-white {page.pageResources?.includes(
        'NADA',
      )
        ? ' mb-9'
        : ''}"
      style={page.pageTitle.toLowerCase().includes("duvet") &&
      currentCatalog !== CATALOGS_ROUTES.INVIERNO
        ? `border-width: 0px; bottom: 10vh; transform: scale(1.5); height: 30vh;`
        : `bottom: 0px; height: 40vh;`}
    >
      <div class="w-full h-full relative">
        {#if ["Bernal", "Coba", "Taxco", "Cataluña", "Castilla", "Blossom", "Salvia"].includes(page.pageTitle)}
          <video
            autoplay
            loop
            muted
            playsinline
            src={page.pageVideos[0]}
            class="object-cover w-full h-full"
          />
        {:else}
          <OptimImg
            onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
            imgClass={page.pageTitle.toLowerCase().includes("duvet") &&
            currentCatalog !== CATALOGS_ROUTES.INVIERNO
              ? "object-contain w-full h-full"
              : "object-cover w-full h-full"}
            source={`${URLS.fotos}${page.SKU}-3.webp`}
          />
        {/if}

        {#if page.pageCopys && page.pageCopys.length > 0 && page.pageCopys[0] !== ""}
          <p
            class="uppercase text-black chavos-sm bg-white px-3 py-1.5 w-fit rounded-2xl absolute top-0 left-0 ml-3 mt-2 xs:chavos-base"
          >
            {page.pageCopys[0]}
          </p>
        {/if}
      </div>
    </div>

    <!-- zoom img only for Sorrento -->
    {#if page.pageTitle === "Sorrento"}
      <div
        style="background-color: {bgColor};"
        class="rounded-[50%] w-[20vh] h-[20vh] border-2 border-white text-black absolute flex flex-col z-10 -top-[2vh] right-0 mr-3"
      >
        <video
          autoplay
          loop
          muted
          playsinline
          src={page.pageVideos[0]}
          class="rounded-[50%] object-cover w-full h-full"
        />
      </div>
    {/if}
  </div>

  {#if !page.pageResources?.includes("NADA")}
    <!-- complementos -->
    <div class="">
      <div class="h-[10vh] pl-[12%]">
        <ComplementosCopy catalog={currentCatalog} />
      </div>

      <div class="grid grid-cols-2 px-6 pb-2">
        <div
          data-visible-id={page.complSheets[0]}
          class="border-2 border-white"
        >
          <OptimImg
            onClick={() => handleImageClick(page.complSheets[0], [])}
            imgClass="object-cover w-full h-full cursor-pointer"
            source={`${URLS.fotos}${page.complSheets[0]}.webp`}
          />
        </div>

        <div
          data-visible-id={page.complCurtains[0]}
          class="border-2 border-white"
        >
          <OptimImg
            onClick={() => handleImageClick(page.complCurtains[0], [])}
            imgClass="object-cover w-full h-full cursor-pointer"
            source={`${URLS.fotos}${page.complCurtains[0]}.webp`}
          />
        </div>
      </div>
    </div>
  {/if}

  <!-- licenses -->
  {#if LEGALES_SVGS.hasOwnProperty(page.pageTitle
      .replaceAll(" ", "")
      .toUpperCase())}
    <div>
      <LegalLicenses
        license={page.pageTitle.replaceAll(" ", "").toUpperCase()}
      />
    </div>
  {/if}
</div>

<!-- DESKTOP -->
<div
  style="background-color: {bgColor};"
  class="hidden md:block w-screen h-screen overflow-hidden"
>
  <div class="grid grid-cols-12 grid-rows-1 gap-1 w-full h-full">
    <div class="w-full h-full col-span-7">
      <!-- content -->
      <div class="relative w-full h-full">
        <!-- product title -->
        <div
          style="background-color: {bgColor};"
          class="text-black mt-24 absolute left-1/2 translate-x-[-50%] flex flex-col text-center justify-center z-10 py-3 px-6"
        >
          <p class="chavos-4xl xs:chavos-5xl">{page.pageTitle}</p>
          <p class="chavos-sm xs:chavos-base">{page.pageSubtitle}</p>
        </div>

        <!-- main img -->
        <div data-visible-id={page.SKU} class="w-full h-full">
          <div class="h-full border-2 border-white">
            {#if page.pageVideos?.length > 0 && page.pageTitle === "Neón"}
              <video
                autoplay
                loop
                muted
                playsinline
                src={page.pageVideos[0]}
                class="object-cover h-full"
              />
            {:else}
              <OptimImg
                onClick={() =>
                  handleImageClick(page.SKU, page.pageRelatedProducts)}
                imgClass="object-cover w-full h-full cursor-pointer"
                source={`${URLS.fotos}${page.SKU}.webp`}
              />
            {/if}
          </div>
        </div>

        <!-- zoom img only for Sorrento -->
        {#if page.pageTitle === "Sorrento"}
          <div
            style="background-color: {bgColor};"
            class="rounded-[50%] w-[14vw] h-[14vw] border-2 border-white text-black absolute flex flex-col z-10 bottom-0 left-0 ml-12 mb-5"
          >
            <video
              autoplay
              loop
              muted
              playsinline
              src={page.pageVideos[0]}
              class="rounded-[50%] object-cover w-full h-full"
            />
            <!-- onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)} -->
          </div>
        {/if}
      </div>
    </div>

    <!-- complementos -->
    <div
      style="background-color: {bgColor};"
      class="w-full h-full col-span-5 relative grid grid-cols-1 grid-rows-16 gap-1"
    >
      <div
        style="grid-row: span 10 / span 10;"
        class="w-full h-full flex flex-col items-center"
      >
        <div class="w-10/12 h-full">
          {#if ["Bernal", "Coba", "Taxco", "Cataluña", "Castilla", "Blossom", "Salvia"].includes(page.pageTitle)}
            <video
              autoplay
              loop
              muted
              playsinline
              src={page.pageVideos[0]}
              class="object-cover w-full h-full cursor-pointer"
            />
          {:else}
            <OptimImg
              onClick={() =>
                handleImageClick(page.SKU, page.pageRelatedProducts)}
              imgClass="object-cover w-full h-full cursor-pointer"
              source={`${URLS.fotos}${page.SKU}-3.webp`}
            />
          {/if}
        </div>
      </div>

      <!-- complementos -->
      <div
        style="grid-row: span 6 / span 6;"
        class="w-full h-full flex flex-col items-center"
      >
        <!-- agrega estos complementos copy -->
        <div class="h-2/6 -ml-[20%]">
          <img
            src="../images/copys/AgregaComplementosBlack.svg"
            loading="eager"
            alt=""
            class="h-full scale-150"
          />
        </div>

        <div class="grid grid-cols-2 grid-rows-1 gap-3 w-10/12 h-4/6">
          <div
            data-visible-id={page.complSheets[0]}
            class="w-full h-full row-span-2 border-2 border-white"
          >
            <OptimImg
              onClick={() => handleImageClick(page.complSheets[0], [])}
              imgClass="object-cover w-full h-full cursor-pointer"
              source={`${URLS.fotos}${page.complSheets[0]}.webp`}
            />
          </div>

          <div
            data-visible-id={page.complCurtains[0]}
            class="w-full h-full row-span-2 border-2 border-white"
          >
            <OptimImg
              onClick={() => handleImageClick(page.complCurtains[0], [])}
              imgClass="object-cover w-full h-full cursor-pointer"
              source={`${URLS.fotos}${page.complCurtains[0]}.webp`}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
