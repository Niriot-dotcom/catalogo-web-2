<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import Copy from "$lib/components/Copy.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { COLORS, URLS } from "$lib/constants/strings";

  export let pairPage: (DatabasePage | null)[];
  export let initAnimate = false;
  export let templateId: string;
  export let handleImageClick: (sku: string, relatedProds: string[]) => void;

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

<!-- DESKTOP -->
<div class="div-block-19 sticky top-0 z-10" data-template-id={templateId}>
  <main id="smooth-content" class="">
    <div class="section-height">
      <div class="sticky-element">
        <div class="track">
          <div class="track-flex">
            <div class="thanks-panel_wrap">
              <div class="w-screen justify-center items-center relative">
                <div class="w-full grid grid-cols-1 lg:grid-cols-2 grid-rows-1">
                  {#each pairPage as page, i}
                    {#if page !== null}
                      <div
                        id={page.SKU}
                        class="w-full h-screen pb-16 lg:pb-3 flex flex-col justify-between inset-0 transform translate-y-full transition-transform duration-500 ease-out"
                        style={`background-color: ${
                          page.pageResources &&
                          page.pageResources.length > 0 &&
                          page.pageResources[0] !== "#" &&
                          page.pageResources[0] !== ""
                            ? page.pageResources[0]
                            : COLORS.beige
                        };
                        color: #8f8b8b;`}
                        class:animate-up={showSide[i]}
                      >
                        <!-- HEADER TEXT -->
                        <div
                          class="mx-auto w-5/6 text-center pt-20 lg:pt-0 pb-3"
                          style={`color: ${page.pageResources[0]}`}
                        >
                          <div class="font-helvetica">
                            <p class="text-xl">
                              {page.pageSubtitle[i] || ""}
                            </p>
                          </div>
                          <div class="font-helvetica">
                            <p
                              class="font-bold font-kepler text-5xl lg:text-6xl"
                            >
                              {page.pageTitle || ""}
                            </p>
                          </div>
                          <div
                            class="border mx-[13vw] my-3"
                            style={`border-color: #8f8b8b;`}
                          />
                          <div class="font-helvetica">
                            <Copy
                              className="text-xl"
                              text={page.pageCopys[0]}
                              customColor={page.pageResources[0]}
                            />
                          </div>

                          <!-- ICONS -->
                          <div class="w-full relative flex items-center">
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
                          </div>
                        </div>

                        <!-- MAIN IMAGE -->
                        <button
                          class="relative w-full h-full mx-auto max-w-[70%] overflow-hidden border-4 border-red-400"
                          data-visible-id={page.SKU}
                          on:click|preventDefault={(e) =>
                            handleImageClick(
                              page.SKU,
                              page.pageRelatedProducts,
                            )}
                        >
                          <OptimImg
                            imgClass="w-full h-full object-contain"
                            source="{URLS.fotos}{page.SKU}.webp"
                          />
                        </button>

                        <!-- SQUARES -->
                        <div
                          class="self-center w-11/12 mx-auto space-x-4 h-[30vh] mb-5 flex justify-center items-center transform translate-y-full transition-transform duration-500 ease-out"
                          class:animate-squares={showSquares[i]}
                        >
                          {#each [2, 3] as imgIndex, i}
                            <div class="inline-block h-full align-middle">
                              <div class="h-full relative">
                                <Copy
                                  className="max-w-[80%] flex absolute pt-3 text-xl"
                                  text={page.pageCopys[0]}
                                />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
