<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { COLORS, URLS } from "$lib/constants/strings";
  import FullscreenImage from "$lib/components/FullscreenImage.svelte";
  import TitleIncluye6Piezas from "$lib/components/titles/TitleIncluye6Piezas.svelte";

  export let handleImageClick: (sku: string, relatedProds: string[]) => void;
  export let page: DatabasePage;

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
</script>

<!-- MOBILE -->
<div
  id={page.SKU}
  class="md:hidden overflow-x-hidden"
  style={`background-color: ${mainColor};`}
>
  <!-- text header -->
  <!-- con plasta -->
  <div
    class="px-12 pt-4 pb-4 mb-3 w-fit rounded-br-3xl"
    style="color: {mainColor}; background-color: {bgColor}"
  >
    <p class="chavos-5xl xs:chavos-6xl">{page.pageTitle}</p>
    <p class="chavos-base xs:chavos-lg">{page.pageSubtitle}</p>
  </div>

  <!-- sin plasta -->
  <!-- <div class="px-5 pt-10 mb-3" style="color: {bgColor};">
    <p class="chavos-5xl xs:chavos-6xl">{page.pageTitle}</p>
    <p class="chavos-base xs:chavos-lg">{page.pageSubtitle}</p>
  </div> -->

  <!-- images -->
  <div class="w-full pt-2 px-5 flex flex-col relative">
    <!-- main image -->
    <div class="h-[60vh] w-full rounded-2xl overflow-hidden">
      <OptimImg
        onClick={() => handleImageClick(page.SKU)}
        imgClass="object-cover w-full h-full cursor-pointer"
        source={`${URLS.fotos}${page.SKU}.webp`}
      />
    </div>

    <!-- copy -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- <div class="z-10 w-full absolute -top-1/3">
        <TitleIncluye6Piezas
          bgColor={page.pageResources[0]}
          text={page.pageResources[1]}
        />
      </div> -->

    <!-- full screen image -->
    <div
      class="mt-3 mb-24 h-[30vh] w-full relative rounded-2xl overflow-hidden"
    >
      <FullscreenImage
        id={page.SKU}
        src={`${URLS.fotos}${page.SKU}-3.webp`}
        {bgColor}
        colors={[bgColor, mainColor]}
      />
    </div>
  </div>
</div>

<!-- DESKTOP -->
<div
  id="{page.SKU}d"
  style="background-color: {bgColor};"
  class="hidden md:block w-screen h-screen overflow-hidden"
>
  <div class="grid grid-cols-12 grid-rows-1 gap-1 w-full h-full">
    <!-- complementos -->
    <div style="background-color: {bgColor};" class="w-full h-full col-span-5">
      <div class="w-full h-full flex flex-col items-center relative">
        <div class="absolute w-96 top-1/2 translate-y-[-50%] -right-1/3 z-10">
          <TitleIncluye6Piezas {bgColor} textColor={mainColor} />
        </div>

        <!-- copy -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="w-full h-full">
          <OptimImg
            onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
            imgClass="object-cover w-full h-full cursor-pointer"
            source={`${URLS.fotos}${page.SKU}-3.webp`}
          />
        </div>
      </div>
    </div>

    <!-- main img -->
    <div class="w-full h-full col-span-7">
      <!-- content -->
      <div class="relative w-full h-full">
        <!-- product title -->
        <div
          style="background-color: {bgColor}; color: {mainColor}"
          class="absolute left-1/2 translate-x-[-50%] flex flex-col text-center justify-center z-10 pt-14 pb-10 w-4/12 rounded-b-[50px]"
        >
          <p class="chavos-4xl xs:chavos-6xl">{page.pageTitle}</p>
          <p class="chavos-sm xs:chavos-lg">{page.pageSubtitle}</p>
        </div>

        <!-- main img -->
        <div class="w-full h-full">
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
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
