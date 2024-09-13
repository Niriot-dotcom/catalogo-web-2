<script lang="ts">
  import HorizontalScroll from "$lib/components/HorizontalScroll.svelte";
  import OptimImg from "$lib/components/OptimImg.svelte";
  import LegalLicenses from "$lib/components/communication/LegalLicenses.svelte";
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import {
    COLORS,
    EnumSublinea,
    LEGALES_SVGS,
    URLS,
  } from "$lib/constants/strings";
  import { onMount } from "svelte";

  export let title: string;
  export let groupPages: DatabasePage[];
  let bgColor = COLORS.beige;

  export let handleImageClick: (sku: string, relatedProds: string[]) => void;

  function handleShowZoom(index: number, isHovered: boolean) {
    let circle = document.getElementById(`zoom-circle-${title}-${index}`);
    if (!circle) return;

    let mainImg = document.getElementById(`main-img-${groupPages[index].SKU}`);
    if (!mainImg) return;

    if (
      groupPages[index].pageResources?.length > 1 &&
      groupPages[index].pageResources[1] === "REEMPLAZAR"
    ) {
      isHovered
        ? (mainImg.src = `${URLS.fotos}${groupPages[index].SKU}-2-1280.webp`)
        : (mainImg.src = `${URLS.fotos}${groupPages[index].SKU}-1280.webp`);
      return;
    }

    if (isHovered) {
      circle.classList.remove("opacity-0");
      circle.classList.add("opacity-100");
    } else {
      circle.classList.remove("opacity-100");
      circle.classList.add("opacity-0");
    }
  }

  function getGridColsConfig(numPages: number, i: number) {
    let gridColsConfig: Record<number, string[]> = {
      2: [6, 6].map((x, i) => `col-span-${x}`),
      3: [4, 4, 4].map((x, i) => `col-span-${x}`),
      4: [3, 3, 3, 3].map((x, i) => `col-span-${x}`),
      5: [4, 4, 4, 6, 6].map((x, i) => `col-span-${x}`),
      6: [4, 4, 4, 4, 4, 4].map((x, i) => `col-span-${x}`),
      7: [4, 4, 4, 3, 3, 3, 3].map((x, i) => `col-span-${x}`),
      8: [3, 3, 3, 3, 3, 3, 3, 3].map((x, i) => `col-span-${x}`),
      9: [4, 4, 4, 4, 4, 4, 4, 4, 4].map((x, i) => `col-span-${x}`),
      16: Array(16).fill("col-span-3"),
    };

    if (!(numPages in Object.keys(gridColsConfig))) {
      return "col-span-3";
    }
    return gridColsConfig[numPages][i];
  }

  onMount(() => {
    const script = document.createElement("script");
    script.src = "/js/customSlider.js";
    script.async = true;
    document.body.appendChild(script);
  });
</script>

<!-- MOBILE -->
<div
  style="background-color: {bgColor};"
  class="md:hidden py-0 overflow-x-hidden"
>
  <!-- text header -->
  <div class="text-black px-5 mt-5">
    <!-- LOGO -->
    {#if groupPages[0].pageResources[0] === EnumSublinea.CAROUSEL_HORIZONTAL}
      <!-- if HAY UNA IMAGEN EN PAGE RESOURCES, else SE PONE EL TITULO-->
      {#if groupPages[0].pageResources.length > 1 && groupPages[0].pageResources[1] !== ""}
        <div class="w-full h-[10vh] my-3">
          <img
            alt={title}
            src={groupPages[0].pageResources[1]}
            class="w-full h-full"
          />
        </div>
      {:else}
        <p class="chavos-3xl xs:chavos-4xl pb-5">{title}</p>
      {/if}
    {:else}
      <p class="chavos-3xl xs:chavos-4xl">{title}</p>
    {/if}
  </div>

  {#if groupPages[0].pageResources[0] === EnumSublinea.CAROUSEL_HORIZONTAL}
    <div
      class="md:hidden relative flex space-x-1 overflow-x-scroll hidden-scroll"
    >
      {#each groupPages as page, i}
        <div
          id={page.SKU}
          class="flex flex-col"
          data-visible-id={page.SKU}
          on:click={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
        >
          <p class="text-black chavos-base pl-5 xs:chavos-xl">
            {page.pageTitle}
          </p>
          <div
            data-visible-id={page.SKU}
            class="min-w-[60vw] max-w-[60vw] h-full"
          >
            <OptimImg
              imgClass="object-{title.toLowerCase() === 'rellenos de cojín'
                ? 'contain'
                : 'cover'} w-full h-full"
              source={`${URLS.fotos}${page.SKU}.webp`}
            />
          </div>
        </div>
      {/each}

      <div class="absolute -bottom-0 w-1/2 h-12 min-h-12 flex right-0">
        <HorizontalScroll />
      </div>
    </div>
  {:else}
    <!-- images -->
    {#each groupPages as page, i}
      <div
        id="section-{title}"
        class="w-full h-full min-h-fit {groupPages.length > 1
          ? 'pt-5'
          : 'pt-1'}"
      >
        {#if groupPages.length > 1}
          <p class="text-black chavos-base pl-5 xs:chavos-xl">
            {page.pageTitle}
          </p>
        {/if}

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          id={page.SKU}
          data-visible-id={page.SKU}
          class="w-full grid grid-cols-8 gap-1 overflow-hidden px-3 relative"
          style={`height: ${
            page.pageResources &&
            page.pageResources.length > 0 &&
            (page.pageResources[0] === EnumSublinea.INDIVIDUAL ||
              page.pageResources[0] === EnumSublinea.DOBLE)
              ? "20vh;"
              : page.pageResources[0] === EnumSublinea.FULLSCREEN
                ? "80vh"
                : "30vh;"
          }`}
          on:click={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
        >
          {#if page.pageResources && page.pageResources.length > 0 && (page.pageResources[0] === EnumSublinea.INDIVIDUAL || page.pageResources[0] === EnumSublinea.FULLSCREEN)}
            <!-- main image -->
            <div
              data-visible-id={page.SKU}
              class="col-span-8 w-full overflow-hidden"
            >
              <OptimImg
                imgClass="{page.pageResources[0] === EnumSublinea.FULLSCREEN
                  ? 'object-cover'
                  : 'object-contain'} w-full h-full"
                source={`${URLS.fotos}${page.SKU}.webp`}
                style={page.pageTitle === "Tropical"
                  ? "transform: scale(2)"
                  : ""}
              />
            </div>
          {:else if page.pageResources && page.pageResources.length > 0 && page.pageResources[0] === EnumSublinea.DOBLE}
            <div
              data-visible-id={page.SKU}
              class="col-span-4 w-full h-full overflow-hidden"
            >
              <OptimImg
                imgClass="object-contain w-full h-full"
                source={`${URLS.fotos}${page.SKU}.webp`}
              />
            </div>

            <!-- environment image -->
            <div class="col-span-4 w-full h-full overflow-hidden">
              <OptimImg
                imgClass="object-contain w-full h-full"
                source={`${URLS.fotos}${page.SKU}-${
                  page.pageResources?.length > 1 && page.pageResources[1] !== ""
                    ? page.pageResources[1]
                    : "2"
                }.webp`}
              />
            </div>
          {:else if page.pageResources && page.pageResources.length > 0 && page.pageResources[0] === EnumSublinea.CUATRO}
            {#each { length: 4 } as _, i}
              <div
                data-visible-id={page.SKU}
                class="col-span-4 h-full overflow-hidden"
              >
                <OptimImg
                  imgClass="object-cover w-full h-full"
                  source={`${URLS.fotos}${page.SKU}${i === 0 ? "" : `-${i + 1}`}.webp`}
                />
              </div>
            {/each}
          {:else if page.pageResources && page.pageResources.length > 0 && page.pageResources[0] === EnumSublinea.DOBLE_VERTICAL}
            <div
              data-visible-id={page.SKU}
              class="h-full w-full col-span-8 overflow-hidden flex flex-col space-y-1"
            >
              <div class="w-full h-full overflow-hidden">
                <OptimImg
                  imgClass="w-full h-full object-contain"
                  source={`${URLS.fotos}${page.SKU}.webp`}
                />
              </div>

              <div class="w-full h-full overflow-hidden">
                <OptimImg
                  imgClass="w-full h-full object-contain"
                  source={`${URLS.fotos}${page.SKU}-${
                    page.pageResources?.length > 1 &&
                    page.pageResources[1] !== ""
                      ? page.pageResources[1]
                      : "2"
                  }.webp`}
                />
              </div>
            </div>
          {:else if page.pageResources && page.pageResources.length > 0 && page.pageResources[0] === EnumSublinea.DOBLE_SLIDER}
            <div
              data-visible-id={page.SKU}
              udesly-before-after="50"
              slider-height="30vh"
              class="col-span-8 px-5 w-full h-full flex-col justify-center items-center mb-0 mr-0 flex relative overflow-hidden max-w-none"
            >
              <ImageComponent
                classList="z-0 h-full object-cover absolute"
                src={`${URLS.fotos}${page.SKU}.webp`}
                image="right"
              />
              <ImageComponent
                classList="z-[1] h-full object-cover absolute"
                src={`${URLS.fotos}${page.SKU}-${
                  page.pageResources?.length > 1 && page.pageResources[1] !== ""
                    ? page.pageResources[1]
                    : "2"
                }.webp`}
                image="left"
              />
              <div before-after="handle" class="handle-bar">
                <div class="circle-wrapper"></div>
              </div>
            </div>
          {:else}
            <!-- acercamiento -->
            <!-- {#if page.productType === "Par de Sabanitas Pol"}
            <div
              style="background-color: {bgColor};"
              class="rounded-full w-[18vh] h-[18vh] border-2 border-white text-black absolute flex flex-col z-10 -top-[2vh] left-0 ml-5"
            >
              <OptimImg
                imgClass="rounded-[50%] object-cover w-full h-full"
                source={`${URLS.fotos}${page.SKU}-3.webp`}
              />
            </div>
          {/if} -->

            <!-- main image -->
            <div data-visible-id={page.SKU} class="col-span-5 h-full">
              <OptimImg
                imgClass="{title.toLowerCase() === 'cojín' ||
                title.toLowerCase() === 'cojínes' ||
                title.toLowerCase() === 'cojines' ||
                title.toLowerCase() === 'cojínes everest' ||
                title.toLowerCase() === 'cojines everest' ||
                title.toLowerCase() === 'cojínes xl' ||
                title.toLowerCase() === 'cojines xl' ||
                title.toLowerCase() === 'fundas de cojín' ||
                title.toLowerCase() === 'funda de cojín' ||
                title.toLowerCase() === 'fundas de almohada' ||
                title.toLowerCase() === 'funda de almohada' ||
                (page.pageResources?.length > 2 &&
                  page.pageResources[2] === 'CONTAIN')
                  ? 'object-contain'
                  : 'object-cover'} w-full h-full"
                source={`${URLS.fotos}${page.SKU}.webp`}
              />
            </div>

            <!-- environment image -->
            <div class="col-span-3 h-full">
              <OptimImg
                imgClass="object-cover w-full h-full"
                source={`${URLS.fotos}${page.SKU}-${
                  page.pageResources?.length > 1 && page.pageResources[1] !== ""
                    ? page.pageResources[1]
                    : "2"
                }.webp`}
              />
            </div>
          {/if}
        </div>

        <!-- licenses -->
        {#if LEGALES_SVGS.hasOwnProperty(page.pageTitle
            .replaceAll(" ", "")
            .toUpperCase())}
          <div class="w-full h-[8vh]">
            <LegalLicenses
              license={page.pageTitle.replaceAll(" ", "").toUpperCase()}
            />
          </div>
        {/if}
      </div>
    {/each}
  {/if}
</div>

<!-- DESKTOP -->
<div style="background-color: {bgColor};" class="hidden md:block w-screen p-5">
  <!-- products -->
  {#if groupPages.length === 1}
    <div class="w-full h-full flex space-x-1">
      <!-- main image -->
      <div id="{groupPages[0].SKU}d" class="w-full h-full relative">
        <div class="w-full h-full">
          <OptimImg
            onClick={() =>
              handleImageClick(
                groupPages[0].SKU,
                groupPages[0].pageRelatedProducts,
              )}
            imgClass="w-full h-full object-cover"
            source={`${URLS.fotos}${groupPages[0].SKU}.webp`}
          />
        </div>

        <div class="absolute mt-32 mr-8 top-0 left-0 w-2/6">
          <div class="w-full h-full flex relative">
            <!-- text -->
            <div class="w-full h-full text-center absolute">
              <p class="chavos-4xl xs:chavos-6xl">{groupPages[0].pageTitle}</p>
              <p class="chavos-sm xs:chavos-base">
                {groupPages[0].pageSubtitle}
              </p>
            </div>
          </div>
        </div>

        <!-- texture -->
        <!-- {#if miniambienteConfig === EnumAmbienteConMiniambiente.HORIZONTAL}
        <div class="absolute top-16 right-16 w-[32rem] h-[30vh]">
          <div class="w-full h-full flex relative">
            <div
              style={`background-image: url('${URLS.fotos}${page.SKU}-2-1280.webp')`}
              class="w-full h-full"
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
      {/if} -->
      </div>
    </div>
  {:else}
    <!-- text header -->
    <div
      style="background-color: {bgColor};"
      class="text-black mt-24 absolute left-1/2 translate-x-[-50%] flex flex-col text-center justify-center z-10 py-3 px-6"
    >
      {#if groupPages[0].pageResources.length > 1 && groupPages[0].pageResources[1] !== ""}
        <div class="w-full h-[10vh] my-3">
          <img
            alt={title}
            src={groupPages[0].pageResources[1]}
            class="w-full h-full"
          />
        </div>
      {:else}
        <!-- <p class="chavos-3xl xs:chavos-4xl pb-5">{title}</p> -->
        <p class="chavos-4xl xs:chavos-5xl">{title}</p>
        {#if groupPages[0].pageCopys && groupPages[0].pageCopys.length > 0 && groupPages[0].pageCopys[0] !== ""}
          <p class="chavos-sm xs:chavos-base"></p>
        {/if}
      {/if}
    </div>

    <div class="w-full grid grid-cols-12">
      {#each groupPages as page, i}
        <button
          id="{page.SKU}d"
          data-visible-id={page.SKU}
          class="w-full h-full relative cursor-pointer {getGridColsConfig(
            groupPages.length,
            i,
          )}"
          on:click={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
          on:mouseenter={() => handleShowZoom(i, true)}
          on:mouseleave={() => handleShowZoom(i, false)}
        >
          <div
            id={`zoom-circle-${title}-${i}`}
            class="w-full h-full absolute -left-[12%] opacity-0 transition-all duration-200 ease-linear"
          >
            <div class="lg:scale-[0.6] scale-[0.8] rounded-[50%]">
              <OptimImg
                imgClass="object-cover rounded-[50%]"
                source={`${URLS.fotos}${page.SKU}-2.webp`}
              />
            </div>
          </div>

          <img
            alt=""
            id={`main-img-${page.SKU}`}
            class="object-cover w-full h-full"
            src={`${URLS.fotos}${page.SKU}-1280.webp`}
          />

          <div
            style="background-color: {bgColor};"
            class="py-4 px-6 absolute bottom-0 right-0"
          >
            <p class="text-black chavos-xl">{page.pageTitle}</p>
          </div>
        </button>
      {/each}
    </div>
  {/if}
</div>

<!-- TEMPLATE PARA 6 -->
<!-- <div class="hidden md:block bg-white w-screen h-screen relative">
  <div class="grid grid-cols-3 grid-rows-2 w-full h-full gap-1">
    {#each { length: 6 } as _, i}
      {#if i === 1}
        <div class="bg-[#fff7f2] w-full h-full relative overflow-hidden">
          <div
            class="z-10 py-4 px-4 w-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          >
            <p class="text-center text-black chavos-4xl lg:chavos-5xl">
              {title}
            </p>

            // TODO copys
            <div class="text-center w-full mt-5">
              <p class="text-black chavos-2xl lg:chavos-3xl">
                llena de luz y color tu
              </p>
              <p class="text-black chavos-bold-2xl lg:chavos-bold-3xl">
                LUGAR FAVORITO
              </p>
            </div>
          </div>

          // plasta
          <img
            src="/images/chavos/plastas/FORMA 09.webp"
            loading="eager"
            alt=""
            class="absolute z-0 h-full right-0 -bottom-1/4"
          />
        </div>
      {:else}
        <div
          class="w-full h-full relative cursor-pointer"
          on:mouseenter={() => handleShowZoom(i, true)}
          on:mouseleave={() => handleShowZoom(i, false)}
        >
            // TODO hover show this image and low opacity of main image
            <div
            id={`zoom-circle-${title}-${i}`}
            class="w-full h-full absolute -top-[15%] -left-[12%] opacity-0 transition-all duration-200 ease-linear"
          >
            <div
              class="lg:scale-[0.6] scale-[0.8] rounded-[50%] border-2 border-white"
            >
              <OptimImg
                imgClass="object-cover rounded-[50%]"
                source={`${URLS.fotos}${gridPages[i].SKU}-2.webp`}
              />
            </div>
          </div>

          // main
          <OptimImg
            imgClass="object-cover w-full h-full"
            source={`${URLS.fotos}${gridPages[i].SKU}.webp`}
          />

          <div class="bg-[#fff7f2] py-4 px-6 absolute bottom-0 right-0">
            // <p class="text-black chavos-base pl-5 xs:chavos-xl">{gridPages[i].pageTitle}</p>
            <p class="text-black chavos-xl">{gridPages[i].pageTitle}</p>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div> -->

<!-- texto en medio de toda la pantalla -->
<!-- <div
    class="bg-[#fff7f2] py-4 px-6 rounded-xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
  >
    <p class="text-black chavos-3xl">{title}</p>
  </div> -->
