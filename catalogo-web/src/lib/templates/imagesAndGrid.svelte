<script lang="ts">
  import Copy from "$lib/components/Copy.svelte";
  import OptimImg from "$lib/components/OptimImg.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { URLS } from "$lib/constants/strings";
  import { toTitleCase } from "$lib/utils/strings";

  export let initAnimate = false;
  export let templateId: string;
  export let handleImageClick: (sku: string, relatedProds: string[]) => void;
  export let title: string;
  export let groupPages: DatabasePage[];

  let textColor = "#8f8b8b";
  let hoverIndex = 0;
  let numProducts = groupPages.length || 0;

  let showImages = Array(numProducts).fill(false);
  const executeAnimation = async () => {
    for (const [i, _] of groupPages.entries()) {
      showImages[i] = true;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };
  $: {
    if (initAnimate) {
      executeAnimation();
    }
  }

  // let hoverCopys: string[] = [
  //   groupPages[hoverIndex].pageCopys[hoverIndex * 2],
  //   groupPages[hoverIndex].pageCopys[hoverIndex * 2 + 1],
  // ];
  let hoverImages: string[] = [
    `${URLS.fotos}${groupPages[hoverIndex].SKU}-2.webp`,
    `${URLS.fotos}${groupPages[hoverIndex].SKU}-3.webp`,
  ];
  const handleMouseHover = (e, index: number) => {
    if (index === hoverIndex) {
      return;
    }
    hoverIndex = index;

    let imgSrc0 = `${URLS.fotos}${groupPages[index].SKU}-2.webp`;
    let imgSrc1 = `${URLS.fotos}${groupPages[index].SKU}-3.webp`;
    hoverImages = [imgSrc0, imgSrc1];

    // hoverCopys = [
    //   groupPages[index].pageCopys,
    // ];
  };

  const CLASSES_BY_ELEMENTS: Record<
    number | string,
    { grid: string; gridHeight?: string }
  > = {
    3: { grid: "mt-0 grid grid-cols-3 grid-rows-1 gap-3 h-full" },
    4: { grid: "mt-0 grid grid-cols-2 grid-rows-2 gap-3 max-h-[75vh]" },
    5: { grid: "mt-0 grid grid-cols-3 grid-rows-2 gap-3 h-full" },
    6: { grid: "mt-0 grid grid-cols-3 grid-rows-2 gap-3 h-full" },

    mobile3: {
      grid: "mt-0 grid grid-cols-1 grid-rows-3 gap-3 h-full w-full bg-white",
      gridHeight: "21vh",
    },
    mobile4: {
      grid: "mt-0 grid grid-cols-2 grid-rows-2 gap-3 h-full w-full bg-white",
      gridHeight: "35vh",
    },
    mobile5: {
      grid: "mt-0 grid grid-cols-2 grid-rows-3 gap-3 h-full w-full bg-white",
      gridHeight: "100%",
    },
    mobile6: {
      grid: "mt-0 grid grid-cols-2 grid-rows-3 gap-3 h-full w-full bg-white",
      gridHeight: "100%",
    },
  };
</script>

<!-- DESKTOP -->
<div
  class="hidden lg:block sticky top-0 z-10"
  data-template-id={templateId}
  style="overflow-x: hidden; width: 100vw;"
>
  <main id="smooth-content" class="main-wrapper-2]">
    <div class="section-height">
      <div class="sticky-element">
        <div class="track">
          <div class="track-flex">
            <div class="thanks-panel_wrap">
              <div
                class="bg-center w-screen h-screen bg-cover justify-center items-center block relative"
              >
                <div
                  class="grid grid-flow-row-dense grid-cols-5 grid-rows-1 bg-white"
                >
                  <div
                    class="h-screen flex flex-col col-span-2 border-r-4"
                    style={`border-color: ${textColor};`}
                  >
                    <div class="flex flex-col w-full pr-10">
                      <div class="">
                        <!-- <Copy
                          className="font-helvetica flex absolute ml-3 mt-0 text-[1.6vw]"
                          text={hoverCopys[0]}
                        /> -->
                        <img
                          alt="product image"
                          src={hoverImages[0]}
                          class="h-[50vh] w-full object-bottom font-semibold"
                          style={"object-fit: contain"}
                        />
                      </div>
                      <div>
                        <!-- <Copy
                          className="font-helvetica flex absolute ml-3 mt-0 text-[1.6vw]"
                          text={hoverCopys[1]}
                        /> -->
                        <img
                          alt="product image"
                          src={hoverImages[1]}
                          class="h-[50vh] w-full object-bottom"
                          style={"object-fit: contain"}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="px-8 py-5 h-screen flex flex-col col-span-3">
                    <div class="flex flex-col" style={`color: ${textColor};`}>
                      <!-- <span
                        text-split=""
                        words-slide-from-right=""
                        class="font-helvetica text-base lg:text-3xl md:text-2xl sm:text-xl -mb-0"
                        >{groupPages[hoverIndex].pageSubtitle}</span
                      > -->
                      <span
                        text-split=""
                        words-slide-from-right=""
                        class="font-bold text-5xl lg:text-8xl md:text-8xl sm:text-7xl font-kepler"
                      >
                        {toTitleCase(title)}
                      </span>
                      <!-- <span
                        text-split=""
                        words-slide-from-right=""
                        class="font-helvetica text-xs lg:text-xl md:text-lg sm:text-base"
                      >
                        {groupPages[hoverIndex].pageCopys}
                      </span> -->
                    </div>

                    <!-- GRID -->
                    <div
                      class={numProducts in CLASSES_BY_ELEMENTS
                        ? CLASSES_BY_ELEMENTS[numProducts].grid
                        : "mt-0 grid grid-cols-3 gap-3 w-full h-full"}
                    >
                      {#each groupPages as product, i}
                        <button
                          class="w-full h-full flex items-center justify-center overflow-hidden hover:cursor-pointer opacity-0 transform transition-transform ease-out"
                          class:fade-enter-active={showImages[i]}
                          draggable="true"
                          data-visible-id={product.SKU}
                          on:click|preventDefault={(e) =>
                            handleImageClick(
                              product.SKU,
                              product.pageRelatedProducts,
                            )}
                          on:mouseover|preventDefault={(e) =>
                            handleMouseHover(e, i)}
                          on:focus
                        >
                          <div class="relative w-full h-full">
                            {#if product.pageIcons && product.pageIcons.length > 0 && product.pageIcons[0] !== ""}
                              <div class="flex absolute right-0 pr-1 pt-3">
                                <img
                                  src={URLS.iconos + product.pageIcons[0]}
                                  loading="eager"
                                  alt=""
                                  class="pricing-image-two shadow-two"
                                />
                              </div>
                            {/if}

                            <!-- video or foto -->
                            {#if product.pageVideos.length === 1 && product.pageVideos[0] !== ""}
                              <video
                                autoplay
                                loop
                                muted
                                playsinline
                                src="{URLS.videos}{product.pageVideos[0]}"
                                class="w-full h-full object-cover"
                              />
                            {:else}
                              <OptimImg
                                imgClass="w-full h-full object-cover"
                                style={numProducts === 4
                                  ? "object-position: bottom;"
                                  : ""}
                                source="{URLS.fotos}{product.SKU}.webp"
                              />
                            {/if}
                          </div>
                        </button>
                      {/each}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<!-- MOBILE -->
<div class="lg:hidden z-10 bg-white pt-1 sticky" data-template-id={templateId}>
  <div id={title} class="">
    <div class="justify-center items-center block">
      <div class="flex flex-col p-7">
        <div class="flex flex-col" style={`color: ${textColor};`}>
          <!-- <span
            class="font-helvetica text-base lg:text-4xl md:text-2xl sm:text-xl -mb-2"
          >
            {page.pageSubtitle}
          </span> -->
          <span
            class="font-bold text-5xl lg:text-9xl md:text-8xl sm:text-7xl font-kepler"
          >
            {toTitleCase(title)}
          </span>
          <!-- <span
            class="font-helvetica text-sm lg:text-xl md:text-lg sm:text-base"
          >
            {page.pageCopys}
          </span> -->
        </div>

        <!-- GRID -->
        <div
          class={`mobile${numProducts}` in CLASSES_BY_ELEMENTS
            ? CLASSES_BY_ELEMENTS[`mobile${numProducts}`].grid
            : "mt-0 grid grid-cols-2 grid-rows-3 gap-3 h-full w-full bg-white"}
        >
          {#each groupPages as product, i}
            <button
              style={`height: ${
                `mobile${numProducts}` in CLASSES_BY_ELEMENTS
                  ? CLASSES_BY_ELEMENTS[`mobile${numProducts}`].gridHeight
                  : "100%"
              };`}
              class="w-full flex items-center justify-center overflow-hidden opacity-0 transform transition-transform ease-out"
              class:fade-enter-active={showImages[i]}
              data-visible-id={product.SKU}
              on:click|preventDefault={(e) =>
                handleImageClick(product.SKU, product.pageRelatedProducts)}
            >
              <div class="relative w-full h-full">
                {#if product.pageIcons.length > 0}
                  <div
                    class="w-full h-full absolute flex items-start justify-end pr-1 pt-1"
                  >
                    <img
                      src={product.pageIcons[0]}
                      loading="eager"
                      alt=""
                      class="w-full max-w-[30%] object-contain"
                    />
                  </div>
                {/if}

                <!-- video or foto -->
                {#if product.pageVideos.length === 1 && product.pageVideos[0] !== ""}
                  <video
                    autoplay
                    loop
                    muted
                    playsinline
                    src="{URLS.videos}{product.pageVideos[0]}"
                    class="w-full h-full object-cover"
                  />
                {:else}
                  <OptimImg
                    imgClass="w-full h-full object-cover"
                    source="{URLS.fotos}{product.SKU}.webp"
                  />
                {/if}
              </div>
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
