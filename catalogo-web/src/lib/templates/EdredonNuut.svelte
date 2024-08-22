<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { CATALOGS_ROUTES, COLORS, URLS } from "$lib/constants/strings";
  import { onMount } from "svelte";
  import TitleEdredonesNuut from "../components/titles/TitleEdredonesNuut.svelte";
  import { getCurrentCatalog } from "$lib/utils/navigation";

  export let handleImageClick: (sku: string, relatedProds: string[]) => void;
  export let page: DatabasePage;
  let isShowingTexture = false;
  let bgColor =
    page.pageResources &&
    page.pageResources.length > 0 &&
    page.pageResources[0] !== "#"
      ? page.pageResources[0]
      : COLORS.beige;
  let mainColor =
    page.pageResources &&
    page.pageResources.length > 0 &&
    page.pageResources[1] !== "#"
      ? page.pageResources[1]
      : COLORS.beige;

  function handleShowTexture() {
    isShowingTexture = !isShowingTexture;
    let divContent = document.getElementById("content-" + page.SKU);
    if (!divContent) return;
    divContent.style.transition = "all 0.2s linear";

    if (divContent.classList.contains("hidden")) {
      divContent.classList.remove("hidden");
      setTimeout(function () {
        divContent?.classList.remove("opacity-0");
      }, 20);
    } else {
      divContent.classList.add("opacity-0");
      divContent.addEventListener(
        "transitionend",
        function (e) {
          divContent?.classList.add("hidden");
        },
        { capture: false, once: true, passive: false },
      );
    }
  }

  let currentCatalog: string;
  onMount(() => {
    if (window) {
      currentCatalog = getCurrentCatalog();
    }
  });
</script>

<!-- MOBILE -->
<div
  id={page.SKU}
  class="md:hidden overflow-x-hidden"
  style={`background-color: ${bgColor};`}
>
  <div class="mx-6 pt-10" style={`background-color: ${mainColor};`}>
    <TitleEdredonesNuut
      edredonesColor={page.pageResources[2]}
      nuutColor={page.pageResources[3]}
    />
  </div>
</div>
<div
  class="md:hidden overflow-x-hidden"
  style={`background-color: ${bgColor};`}
>
  <div class="mx-6 pt-10" style={`background-color: ${mainColor};`}>
    <!-- text header -->
    <div class="text-white px-5">
      <p class="chavos-5xl xs:chavos-6xl">{page.pageTitle}</p>
      <p class="chavos-base xs:chavos-lg">{page.pageSubtitle}</p>
    </div>

    <!-- images -->
    <div class="w-full pt-2">
      <!-- main image -->
      <div data-visible-id={page.SKU} class="h-[60vh] w-full">
        <OptimImg
          onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
          imgClass="object-cover w-full h-full cursor-pointer"
          source={`${URLS.fotos}${page.SKU}.webp`}
        />
      </div>

      <!-- texture image -->
      <div data-visible-id={page.SKU} class="h-[30vh] w-full relative">
        <OptimImg
          onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
          imgClass="object-cover w-full h-full cursor-pointer"
          source={`${URLS.fotos}${page.SKU}-2.webp`}
        />

        {#if page.pageCopys && page.pageCopys.length > 0 && page.pageCopys[0] !== ""}
          <p
            class="uppercase text-black chavos-sm bg-white px-3 py-1.5 w-fit rounded-2xl absolute top-0 right-0 mt-3 mr-3 xs:chavos-base"
          >
            {page.pageCopys[0]}
          </p>
        {/if}
      </div>

      <!-- complementos -->
      <div class="">
        <div class="h-[10vh] ml-[12%]">
          <img
            src="/images/copys/{currentCatalog === CATALOGS_ROUTES.VIANNEY
              ? 'CambiaElLookConEstosComplementos'
              : 'AgregaComplementosWhite'}.svg"
            loading="eager"
            alt=""
            class="h-full {currentCatalog === CATALOGS_ROUTES.VIANNEY
              ? 'scale-[0.8]'
              : 'scale-150'}"
          />
        </div>

        <div class="grid grid-cols-2 gap-1 pb-5">
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
    </div>
  </div>
</div>

<!-- DESKTOP -->
<div
  id="{page.SKU}d"
  style={`background-color: ${bgColor}; border-color: ${bgColor};`}
  class="hidden md:block w-screen h-screen overflow-hidden border-[32px]"
>
  <div class="grid grid-cols-12 grid-rows-1 gap-3 w-full h-full">
    <!-- complementos -->
    <div
      style={`background-color: ${bgColor};`}
      class="w-full h-full col-span-3 relative grid grid-cols-1 grid-rows-6"
    >
      <div
        data-visible-id={page.complSheets[0]}
        class="w-full h-full row-span-3 border-2 border-white"
      >
        <OptimImg
          onClick={() => handleImageClick(page.complSheets[0], [])}
          imgClass="object-cover w-full h-full cursor-pointer"
          source={`${URLS.fotos}${page.complSheets[0]}.webp`}
        />
      </div>
      <div class="w-full h-full ml-[12%] row-span-1">
        <img
          src="/images/copys/AgregaComplementosWhite.svg"
          loading="eager"
          alt=""
          class="h-full scale-[1.4]"
        />
      </div>
      <div
        data-visible-id={page.complCurtains[0]}
        class="w-full h-full row-span-2 border-2 border-white"
      >
        <OptimImg
          onClick={() => handleImageClick(page.complCurtains[0], [])}
          imgClass="object-cover w-full h-full  cursor-pointer"
          source={`${URLS.fotos}${page.complCurtains[0]}.webp`}
        />
      </div>
    </div>

    <!-- main img -->
    <div
      data-visible-id={page.SKU}
      class="w-full h-full col-span-9 relative bg-beige bg-no-repeat bg-cover"
      style={`background-image: url('${URLS.fotos}${page.SKU}-2-1080.webp')`}
    >
      <!-- texture button -->
      <div
        class="mt-24 absolute w-full left-1/2 translate-x-[-50%] flex justify-center"
      >
        <button
          class="bottom-3 px-4 py-1.5 bg-beige text-black rounded-xl chavos-lg"
          on:click={handleShowTexture}
        >
          {isShowingTexture ? "Ver ambiente" : "Ver textura"}
        </button>
      </div>

      <!-- content -->
      <div
        id={"content-" + page.SKU}
        class="absolute w-8/12 md:w-9/12 h-[75%] mb-12 bottom-0 left-1/2 translate-x-[-50%]"
      >
        <div class="relative w-full h-full">
          <!-- product title -->
          <div
            class="text-black mt-24 absolute right-0 flex flex-col text-center justify-center bg-beige z-10 py-3 px-6"
          >
            <p class="chavos-4xl xs:chavos-5xl">{page.pageTitle}</p>
            <p class="chavos-sm xs:chavos-base">{page.pageSubtitle}</p>
          </div>

          <!-- main img -->
          <div
            class="absolute w-full h-[90%] bottom-0 left-1/2 translate-x-[-50%]"
          >
            <div class="h-full border-2 border-white">
              <OptimImg
                onClick={() => handleImageClick(page.SKU)}
                imgClass="object-cover w-full h-full cursor-pointer"
                source={`${URLS.fotos}${page.SKU}.webp`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
