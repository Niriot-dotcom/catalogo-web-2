<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import {
    CATALOGS_ROUTES,
    COLORS,
    EnumAmbienteConMiniambiente,
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
  let miniambienteConfig =
    page.pageResources &&
    page.pageResources.length > 1 &&
    page.pageResources[1] !== "" &&
    page.pageResources[1] !== "#"
      ? page.pageResources[1]
      : EnumAmbienteConMiniambiente.HORIZONTAL;
  let lastPartConfig =
    page.pageResources &&
    page.pageResources.length > 2 &&
    page.pageResources[2] !== "#"
      ? page.pageResources[2]
      : EnumAmbienteConMiniambiente.COMPLEMENTOS;

  let currentCatalog: string;
  onMount(() => {
    if (window) {
      currentCatalog = getCurrentCatalog();
    }
  });
</script>

<!-- MOBILE -->
<div
  data-visible-id={page.SKU}
  style="background-color: {bgColor};"
  class="md:hidden pt-10 overflow-x-hidden w-screen"
>
  <!-- text header -->
  <div class="text-black px-5 text-center">
    {#if page.pageSubtitle === "Protector Silla" || page.pageSubtitle === "Funda de Sillón" || page.pageSubtitle === "Protector de Sala"}
      <p class="chavos-base xs:chavos-lg italic">{page.pageSubtitle}</p>
      <p class="chavos-5xl xs:chavos-6xl">{page.pageTitle}</p>
    {:else}
      <p class="chavos-5xl xs:chavos-6xl">{page.pageTitle}</p>
      <p class="chavos-base xs:chavos-lg italic">{page.pageSubtitle}</p>
    {/if}
  </div>

  <!-- images -->
  <div
    style={miniambienteConfig === EnumAmbienteConMiniambiente.VERTICAL
      ? "height: 100vh"
      : "height: 85vh"}
    class="w-full pt-2 relative"
  >
    <!-- main image -->
    <div class="h-[70vh] w-full p-5">
      <OptimImg
        onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
        imgClass="w-full h-full {page.pageSubtitle === 'Protector Silla'
          ? 'object-contain scale-[1.15]'
          : 'object-cover'}"
        source={`${URLS.fotos}${page.SKU}.webp`}
      />
    </div>

    <!-- miniambiente -->
    {#if miniambienteConfig === EnumAmbienteConMiniambiente.DOBLE || miniambienteConfig === EnumAmbienteConMiniambiente.HORIZONTAL}
      <div class="w-full h-[28vh] bottom-0 absolute flex justify-center mb-5">
        <div class="w-5/6 flex space-x-1">
          {#if page.pageTitle !== "Veli Dammar"}
            <div
              style={miniambienteConfig === EnumAmbienteConMiniambiente.DOBLE
                ? "width: 50%"
                : "width: 100%"}
              class="h-full relative border-8 border-white"
            >
              <OptimImg
                onClick={() =>
                  handleImageClick(page.SKU, page.pageRelatedProducts)}
                imgClass="object-cover w-full h-full"
                source={page.productType === "Funda De Sillón Niza" ||
                page.productType === "Protectores De Sala" ||
                page.productType === "Protectores de Silla"
                  ? `${URLS.fotos}${page.SKU}-2.webp`
                  : page.complCurtains && page.complCurtains.length > 0
                    ? `${URLS.fotos}${page.complCurtains[0]}.webp`
                    : `${URLS.fotos}${page.SKU}-3.webp`}
              />
            </div>
          {/if}

          {#if miniambienteConfig === EnumAmbienteConMiniambiente.DOBLE}
            <div class="w-1/2 h-full relative border-8 border-white">
              <OptimImg
                onClick={() =>
                  handleImageClick(page.SKU, page.pageRelatedProducts)}
                imgClass="object-cover w-full h-full"
                source={`${URLS.fotos}${page.complDecoration[0]}.webp`}
              />
            </div>
          {/if}
        </div>
      </div>
    {:else if miniambienteConfig === EnumAmbienteConMiniambiente.VERTICAL}
      <div
        class="absolute w-4/6 left-[12%] border-2 border-white"
        style={page.pageTitle.toLowerCase().includes("duvet")
          ? `border-width: 0px; bottom: 10vh; transform: scale(1.5); height: 30vh;`
          : `bottom: 0px; height: 40vh;`}
      >
        <div class="w-full h-full relative border-8 border-white">
          <OptimImg
            onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
            imgClass={page.pageTitle.toLowerCase().includes("duvet")
              ? "object-contain w-full h-full"
              : "object-cover h-full"}
            source={page.pageTitle === "Térmica"
              ? `${URLS.fotos}${page.SKU}-2.webp`
              : `${URLS.fotos}${page.SKU}-3.webp`}
          />

          {#if page.pageCopys && page.pageCopys.length > 0 && page.pageCopys[0] !== ""}
            <p
              class="uppercase text-black chavos-sm bg-white px-3 py-1.5 w-fit rounded-2xl absolute top-0 left-0 ml-3 mt-2 xs:chavos-base"
            >
              {page.pageCopys[0]}
            </p>
          {/if}
        </div>
      </div>
    {/if}
  </div>

  <!-- other views -->
  {#if lastPartConfig === EnumAmbienteConMiniambiente.COMPLEMENTOS}
    <div class="">
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

      <div class="grid grid-cols-2 px-6 pb-2">
        <div class="border-2 border-white">
          <OptimImg
            onClick={() => handleImageClick(page.complSheets[0], [])}
            imgClass="object-cover w-full h-full cursor-pointer"
            source={`${URLS.fotos}${page.complSheets[0]}.webp`}
          />
        </div>

        <div class="border-2 border-white">
          <OptimImg
            onClick={() => handleImageClick(page.complCurtains[0], [])}
            imgClass="object-cover w-full h-full cursor-pointer"
            source={`${URLS.fotos}${page.complCurtains[0]}.webp`}
          />
        </div>
      </div>
    </div>
  {:else if lastPartConfig === EnumAmbienteConMiniambiente.VARIANTES}
    <div class="mt-5 mb-8 mx-5 h-[30vh]">
      <div
        class="grid grid-rows-2 grid-cols-6 w-full h-full gap-1 justify-items-center overflow-hidden"
      >
        <!-- first row, 2 elements -->
        <div class="col-span-2">
          <OptimImg
            onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
            imgClass={page.pageTitle.toLowerCase().includes("duvet")
              ? "object-contain w-full h-full"
              : "object-cover h-full scale-150"}
            source={`${URLS.fotos}${page.SKU}-3.webp`}
          />
        </div>
        <div class="col-span-4">
          <OptimImg
            onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
            imgClass={page.pageTitle.toLowerCase().includes("duvet")
              ? "object-contain w-full h-full"
              : "object-cover h-full scale-150"}
            source={`${URLS.fotos}${page.SKU}-4.webp`}
          />
        </div>

        <!-- second row, 1 element -->
        <div class="col-span-6">
          <OptimImg
            onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
            imgClass={page.pageTitle.toLowerCase().includes("duvet")
              ? "object-contain w-full h-full"
              : "object-cover h-full scale-[2]"}
            source={`${URLS.fotos}${page.SKU}-5.webp`}
          />
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- DESKTOP -->
<div
  data-visible-id={page.SKU}
  style="background-color: {bgColor};"
  class="hidden md:block w-screen h-screen overflow-hidden"
>
  <div class="w-full h-full flex space-x-1">
    <!-- details -->
    {#if lastPartConfig === EnumAmbienteConMiniambiente.VARIANTES}
      <div class="w-3/12 h-full text-black py-16">
        <div class="w-full h-full grid grid-rows-3 gap-y-3">
          <div class="w-full h-full px-5">
            <OptimImg
              onClick={() =>
                handleImageClick(page.SKU, page.pageRelatedProducts)}
              imgClass="object-cover w-full h-full cursor-pointer"
              source={`${URLS.fotos}${page.SKU}-3.webp`}
            />
          </div>
          <div class="w-full h-full px-5">
            <OptimImg
              onClick={() =>
                handleImageClick(page.SKU, page.pageRelatedProducts)}
              imgClass="object-cover w-full h-full cursor-pointer"
              source={`${URLS.fotos}${page.SKU}-4.webp`}
            />
          </div>
          <div class="w-full h-full px-5">
            <OptimImg
              onClick={() =>
                handleImageClick(page.SKU, page.pageRelatedProducts)}
              imgClass="object-cover w-full h-full cursor-pointer"
              source={`${URLS.fotos}${page.SKU}-5.webp`}
            />
          </div>
        </div>
      </div>
    {/if}

    <!-- main image -->
    <div
      style={lastPartConfig === EnumAmbienteConMiniambiente.VARIANTES
        ? "width: 75%"
        : "width: 100%"}
      class="h-full relative"
    >
      <div class="w-full h-full">
        <OptimImg
          onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
          imgClass="w-full h-full object-cover"
          source={`${URLS.fotos}${page.SKU}.webp`}
        />
      </div>

      <div class="absolute mt-32 mr-8 top-0 left-0 w-2/6">
        <div class="w-full h-full flex relative">
          <!-- text -->
          <div class="text-black w-full h-full text-center absolute">
            <p class="chavos-4xl xs:chavos-6xl">{page.pageTitle}</p>
            <p class="chavos-sm xs:chavos-base">{page.pageSubtitle}</p>
          </div>
        </div>
      </div>

      <!-- texture -->
      {#if miniambienteConfig === EnumAmbienteConMiniambiente.HORIZONTAL}
        <div
          class="absolute top-16 right-16 bg-beige w-[32rem] {page.productType ===
            'Protectores de Silla' &&
          page.pageTitle.toLowerCase().includes('niza')
            ? 'h-fit'
            : 'h-[30vh]'}"
        >
          <div class="w-full h-full flex relative">
            <OptimImg
              alt=""
              imgClass="w-full h-full object-cover object-bottom"
              source={page.productType === "Funda De Sillón Niza" ||
              page.productType === "Protectores De Sala" ||
              page.productType === "Protectores de Silla"
                ? `${URLS.fotos}${page.SKU}-2.webp`
                : page.complCurtains && page.complCurtains.length > 0
                  ? `${URLS.fotos}${page.complCurtains[0]}.webp`
                  : `${URLS.fotos}${page.SKU}-3.webp`}
              loading="eager"
            />
          </div>
        </div>
      {:else if miniambienteConfig === EnumAmbienteConMiniambiente.DOBLE}
        <div
          class="absolute top-0 right-16 bg-beige w-[32rem] grid grid-cols-1 {page.productType ===
            'Protectores de Silla' &&
          page.pageTitle.toLowerCase().includes('niza')
            ? 'h-fit'
            : 'h-5/6'}"
        >
          <div class="w-full h-full flex relative border-2 border-white">
            <OptimImg
              alt=""
              imgClass="w-full h-full object-cover object-bottom"
              source={page.productType === "Funda De Sillón Niza" ||
              page.productType === "Protectores De Sala" ||
              page.productType === "Protectores de Silla"
                ? `${URLS.fotos}${page.SKU}-2.webp`
                : page.complCurtains && page.complCurtains.length > 0
                  ? `${URLS.fotos}${page.complCurtains[0]}.webp`
                  : `${URLS.fotos}${page.SKU}-3.webp`}
              loading="eager"
            />
          </div>
          <div class="w-full h-full flex relative border-2 border-white">
            <OptimImg
              alt=""
              imgClass="w-full h-full object-cover object-bottom"
              source={page.productType === "Funda De Sillón Niza" ||
              page.productType === "Protectores De Sala" ||
              page.productType === "Protectores de Silla"
                ? `${URLS.fotos}${page.SKU}-2.webp`
                : page.complCurtains && page.complDecoration.length > 0
                  ? `${URLS.fotos}${page.complDecoration[0]}.webp`
                  : `${URLS.fotos}${page.SKU}-3.webp`}
              loading="eager"
            />
          </div>
        </div>
      {:else}
        <div class="absolute top-0 right-0 w-3/12 h-[50vh] mr-24">
          <div class="w-full h-full flex relative">
            <div
              style={`background-image: url('${URLS.fotos}${page.SKU}-2-1280.webp')`}
              class="w-full h-full rounded-b-full"
            />
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
