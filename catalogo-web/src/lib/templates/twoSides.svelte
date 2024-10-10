<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import Copy from "$lib/components/Copy.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { COLORS, URLS } from "$lib/constants/strings";
  import OptimVideo from "$lib/components/elements/OptimVideo.svelte";

  export let pairPage: (DatabasePage | null)[];
  export let initAnimate = false;
  export let templateId: string;
  export let handleImageClick: (sku: string, relatedProds: string[]) => void;

  let textColor = "#8f8b8b";
  let showSide = [false, false];
  let showSquares = [false, false];
  const executeAnimation = () => {
    setTimeout(() => {
      showSide[0] = true;
      setTimeout(() => {
        showSquares[0] = true;
        setTimeout(() => {
          showSide[1] = true;
          setTimeout(() => {
            showSquares[1] = true;
          }, 500);
        }, 300);
      }, 500);
    }, 100);

    initAnimate = false;
  };

  $: {
    if (initAnimate) {
      executeAnimation();
    }
  }
</script>

<div class=" top-0 z-10" data-template-id={templateId}>
  <main id="smooth-content" class="">
    <div class="h-fit">
      <!-- <div class="track">
        <div class="track-flex">
          <div class="thanks-panel_wrap">
            <div class="w-screen justify-center items-center relative"> -->
      <div class="w-full grid grid-cols-1 lg:grid-cols-2 h-full">
        {#each pairPage as page, i}
          {#if page !== null}
            <div
              id={page.SKU}
              class="w-full h-screen pb-16 lg:pb-3 flex flex-col space-y-4 justify-between inset-0 transform translate-y-full transition-transform duration-500 ease-out"
              class:animate-up={showSide[i]}
              style={`background-color: ${
                page.pageResources &&
                page.pageResources.length > 0 &&
                page.pageResources[0] !== "#" &&
                page.pageResources[0] !== ""
                  ? page.pageResources[0]
                  : COLORS.beige
              };
                        color: ${textColor};`}
            >
              <!-- HEADER TEXT -->
              <div
                class="mx-auto w-5/6 text-center pt-10 lg:pt-0 pb-1 font-helvetica"
                style={`color: ${textColor}`}
              >
                <p class="font-bold text-4xl lg:text-5xl">
                  {@html page.pageTitle || ""}
                </p>
                <div
                  class="border mx-[13vw] my-2"
                  style={`border-color: ${textColor};`}
                />
                <!-- <Copy
                  className="text-xl"
                  text={page.pageCopys[0]}
                  customColor={page.pageResources[0]}
                /> -->

                <!-- ICONS -->
                <!-- <div class="w-full relative flex items-center">
                  <div
                    class="absolute w-full h-full flex items-start justify-center p-1"
                  >
                    <div
                      class="w-full flex items-start justify-center space-x-5"
                    >
                      {#each { length: 2 } as _, iconIndex}
                        {#if page.pageIcons && page.pageIcons.length > 0}
                          <img
                            src={page.pageIcons[iconIndex]}
                            loading="eager"
                            alt=""
                            class="w-full max-w-[10%] object-contain z-10"
                          />
                        {/if}
                      {/each}
                    </div>
                  </div>
                </div> -->
              </div>

              <!-- MAIN IMAGE -->
              <button
                class="relative w-full h-full mx-auto max-w-[91.6%] overflow-hidden"
                data-visible-id={page.SKU}
                on:click|preventDefault={(e) =>
                  handleImageClick(page.SKU, page.pageRelatedProducts)}
              >
                <!-- video or foto -->
                {#if page.pageVideos.length === 1 && page.pageVideos[0] !== ""}
                  <OptimVideo
                    path="{URLS.videos}{page.pageVideos[0]}"
                    class="w-full h-full object-cover"
                    style={page.pageResources &&
                    page.pageResources.length > 1 &&
                    page.pageResources[1] === "CONTAIN"
                      ? "object-fit: contain;"
                      : "object-fit: cover;"}
                  />
                  <!-- path="/videos/biasi/productos/{page.pageVideos[0]}" -->
                  <!-- path="{URLS.videos}{page.pageVideos[0]}" -->
                {:else}
                  <OptimImg
                    imgClass="w-full h-full"
                    source="{URLS.fotos}{page.SKU}{page.pageResources &&
                    page.pageResources.length > 2 &&
                    page.pageResources[2] !== ''
                      ? page.pageResources[2]
                      : ''}.webp"
                    style={page.pageResources &&
                    page.pageResources.length > 1 &&
                    page.pageResources[1] === "CONTAIN"
                      ? "object-fit: contain;"
                      : "object-fit: cover;"}
                  />
                {/if}
              </button>

              <!-- SQUARES -->
              <div
                class="self-center w-11/12 mx-auto space-x-4 h-[25vh] mb-3 flex justify-center items-center transform translate-y-full transition-transform duration-500 ease-out"
                class:animate-squares={showSquares[i]}
              >
                {#each [2, 3] as imgIndex, _}
                  <div class="inline-block h-full align-middle">
                    <div class="h-full relative">
                      <!-- <Copy
                        className="max-w-[80%] flex absolute pt-3 text-xl"
                        text={page.pageCopys[0]}
                      /> -->
                      <OptimImg
                        imgClass="h-full object-cover shadow-lg"
                        source="{URLS.fotos}{page.SKU}-{imgIndex}.webp"
                      />
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </main>
</div>
