<script lang="ts">
  import AddAll from "$lib/components/AddAll.svelte";
  import OptimImg from "$lib/components/OptimImg.svelte";
  import LegalLicenses from "$lib/components/communication/LegalLicenses.svelte";
  import ComplementosCopy from "$lib/components/resources/ComplementosCopy.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { COLORS, LEGALES_SVGS, URLS } from "$lib/constants/strings";
  import { getCurrentCatalog } from "$lib/utils/navigation";
  import { onMount } from "svelte";

  export let page: DatabasePage;
  let bgColor =
    page.pageResources &&
    page.pageResources.length > 0 &&
    page.pageResources[0] !== "#"
      ? page.pageResources[0]
      : COLORS.beige;
  export let textureIndex: number = 4;
  export let handleImageClick: (sku: string, relatedProds: string[]) => void;
  let isShowingTexture = false;

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

  function handleShowComplement(complement: string, isOpenComplement: boolean) {
    let complementCard = document.getElementById(complement);
    if (!complementCard) return;

    if (isOpenComplement) {
      complementCard.classList.add("z-10");
      complementCard.classList.add("-my-5");
    } else {
      complementCard.classList.remove("z-10");
      complementCard.classList.remove("-my-5");
    }
  }

  function handleAddAllProducts() {}

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
    <p class="chavos-5xl xs:chavos-6xl">{page.pageTitle}</p>
    <p class="chavos-base xs:chavos-lg">{page.pageSubtitle}</p>
  </div>

  <!-- images -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    data-visible-id={page.SKU}
    class="h-[70vh] w-full pt-2 mb-5"
    on:click={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
  >
    <!-- main image -->
    <div class="h-[50vh] w-full">
      {#if page.pageVideos?.length === 1 && page.pageVideos[0] !== ""}
        <video
          autoplay
          loop
          muted
          playsinline
          src={`${page.pageVideos[0]}`}
          class="w-full h-full object-cover"
        />
      {:else}
        <OptimImg
          onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
          imgClass="object-cover w-full h-full"
          source={`${URLS.fotos}${page.SKU}.webp`}
        />
      {/if}
    </div>

    <!-- texture image -->
    <div class="h-[20vh] w-full relative">
      {#if page.pageVideos?.length > 1 && page.pageVideos[1] === "TEXTURA"}
        <video
          autoplay
          loop
          muted
          playsinline
          src={`${page.pageVideos[0]}`}
          class="w-full h-full object-cover"
        />
      {:else}
        <OptimImg
          imgClass="object-cover w-full h-full"
          source={`${URLS.fotos}${page.SKU}-4.webp`}
        />
      {/if}

      {#if page.pageCopys && page.pageCopys.length > 0 && page.pageCopys[0] !== ""}
        <p
          class="uppercase text-black chavos-sm bg-white px-3 py-1.5 w-fit rounded-2xl absolute bottom-0 left-1/2 translate-x-[-50%] mb-3 xs:chavos-base"
        >
          {page.pageCopys[0]}
        </p>
      {/if}
    </div>
  </div>

  {#if !page.pageResources?.includes("NADA")}
    <!-- complementos -->
    <div class="mt-3">
      <div class="h-[10vh] pl-[12%] flex justify-between">
        <ComplementosCopy catalog={currentCatalog} />

        <AddAll skus={[page.SKU, page.complSheets[0], page.complCurtains[0]]} />
      </div>

      <div class="grid grid-cols-2 gap-x-1 gap-y-3 px-3 pb-2">
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

        <!-- <div
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
        </div> -->
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
  class="hidden md:block w-screen h-screen relative bg-beige bg-no-repeat bg-cover overflow-hidden"
  style={`background-image: url('${URLS.fotos}${page.SKU}-${textureIndex}-1280.webp')`}
>
  <!-- texture button -->
  <div
    class="mt-24 absolute w-full left-1/2 translate-x-[-50%] flex justify-center"
  >
    <button
      style="background-color: {bgColor};"
      class="bottom-3 px-4 py-1.5 text-black rounded-xl chavos-lg"
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
      <!-- complementos -->
      <div class="absolute w-full h-[30vh]">
        <div
          data-visible-id="{page.complSheets[0]}, {page.complCurtains[0]}, {page
            .complPillowCovers[0]}, {page.complCushions[0]}"
          class="grid grid-cols-4 grid-rows-1 gap-x-3 h-full mx-3"
        >
          <!-- cojines -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            id={`compl-cushion-${page.SKU}`}
            style="background-color: {bgColor};"
            class="cursor-pointer col-start-1 border-2 border-black w-full h-full flex flex-col items-center justify-center transition-all duration-200 ease-linear"
            on:mouseenter={() =>
              handleShowComplement(`compl-cushion-${page.SKU}`, true)}
            on:mouseleave={() =>
              handleShowComplement(`compl-cushion-${page.SKU}`, false)}
          >
            <p class="pt-5 pb-3 text-black chavos-lg h-[5vh]">Cojín</p>

            <div class="w-[92%] h-[25vh] mb-3 overflow-hidden">
              <OptimImg
                onClick={() => handleImageClick(page.complCushions[0], [])}
                imgClass="object-cover w-full h-full"
                source={`${URLS.fotos}${page.complCushions[0]}.webp`}
              />
            </div>
          </div>

          <!-- sabanas -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            id={`compl-sheets-${page.SKU}`}
            style="background-color: {bgColor};"
            class="cursor-pointer col-start-2 border-2 border-black w-full h-full flex flex-col items-center justify-center transition-all duration-200 ease-linear"
            on:mouseenter={() =>
              handleShowComplement(`compl-sheets-${page.SKU}`, true)}
            on:mouseleave={() =>
              handleShowComplement(`compl-sheets-${page.SKU}`, false)}
          >
            <p class="pt-5 pb-3 text-black chavos-lg h-[5vh]">Sábanas</p>

            <div class="w-[92%] h-[25vh] mb-3 overflow-hidden">
              <OptimImg
                onClick={() => handleImageClick(page.complSheets[0], [])}
                imgClass="object-cover w-full h-full"
                source={`${URLS.fotos}${page.complSheets[0]}.webp`}
              />
            </div>
          </div>

          <!-- cortinas -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            id={`compl-curtains-${page.SKU}`}
            style="background-color: {bgColor};"
            class="cursor-pointer col-start-3 border-2 border-black w-full h-full flex flex-col items-center justify-center transition-all duration-200 ease-linear"
            on:mouseenter={() =>
              handleShowComplement(`compl-curtains-${page.SKU}`, true)}
            on:mouseleave={() =>
              handleShowComplement(`compl-curtains-${page.SKU}`, false)}
          >
            <p class="pt-5 pb-3 text-black chavos-lg h-[5vh]">Cortinas</p>

            <div class="w-[92%] h-[25vh] mb-3 overflow-hidden">
              <OptimImg
                onClick={() => handleImageClick(page.complCurtains[0], [])}
                imgClass="object-cover w-full h-full"
                source={`${URLS.fotos}${page.complCurtains[0]}.webp`}
              />
            </div>
          </div>

          <!-- decoracion -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            id={`compl-decoration-${page.SKU}`}
            style="background-color: {bgColor};"
            class="cursor-pointer col-start-4 border-2 border-black w-full h-full flex flex-col items-center justify-center transition-all duration-200 ease-linear"
            on:mouseenter={() =>
              handleShowComplement(`compl-decoration-${page.SKU}`, true)}
            on:mouseleave={() =>
              handleShowComplement(`compl-decoration-${page.SKU}`, false)}
          >
            <p class="pt-5 pb-3 text-black chavos-lg h-[5vh]">
              Funda de almohada
            </p>

            <div class="w-[92%] h-[25vh] mb-3 overflow-hidden">
              <OptimImg
                onClick={() => handleImageClick(page.complPillowCovers[0], [])}
                imgClass="object-cover w-full h-full"
                source={`${URLS.fotos}${page.complPillowCovers[0]}.webp`}
              />
            </div>
          </div>
        </div>
      </div>

      <!-- product title -->
      <div
        style="background-color: {bgColor};"
        class="text-black mt-24 absolute bottom-1/4 flex flex-col text-center justify-center z-10 py-3 px-6"
      >
        <p class="chavos-4xl xs:chavos-5xl">{page.pageTitle}</p>
        <p class="chavos-sm xs:chavos-base">{page.pageSubtitle}</p>
      </div>

      <!-- main img -->
      <div
        data-visible-id={page.SKU}
        class="absolute w-full h-[90%] bottom-0 left-1/2 translate-x-[-50%]"
      >
        <div class="h-full border-2 border-white">
          {#if page.pageVideos?.length > 0 && page.pageVideos[0] !== ""}
            <video
              autoplay
              loop
              muted
              playsinline
              src={`${page.pageVideos[0]}`}
              class="w-full h-full object-cover"
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
    </div>
  </div>
</div>
