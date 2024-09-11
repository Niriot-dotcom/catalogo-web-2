<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import Copy from "$lib/components/Copy.svelte";
  import { textToDivId } from "$lib/utils/strings";
  import type { DatabasePage } from "$lib/constants/globalTypes";

  export let page: DatabasePage;
  export let initAnimate = false;
  export let templateId: string;
  export let selectedProduct: null | string;

  let hoverIndex = 0;
  let numProducts = page.pageProducts?.split(",").length || 0;

  let showImages = Array(numProducts).fill(false);
  const executeAnimation = async () => {
    for (const [i, _] of page.pageProducts?.split(",")!.entries()!) {
      showImages[i] = true;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };
  $: {
    if (initAnimate) {
      executeAnimation();
    }
  }

  let hoverCopys: string[] = [
    page.pageDescriptions.split(/(?<!\\),/)[hoverIndex * 2],
    page.pageDescriptions.split(/(?<!\\),/)[hoverIndex * 2 + 1],
  ];
  let hoverImages: string[] = [
    !page.pageImages?.split(",")[hoverIndex * 2].includes("-1280.webp")
      ? page.pageImages
          ?.split(",")
          [hoverIndex * 2].replace(".webp", "-1280.webp")!
      : page.pageImages?.split(",")[hoverIndex * 2],
    !page.pageImages?.split(",")[hoverIndex * 2 + 1].includes("-1280.webp")
      ? page.pageImages
          ?.split(",")
          [hoverIndex * 2 + 1].replace(".webp", "-1280.webp")!
      : page.pageImages?.split(",")[hoverIndex * 2 + 1],
  ];
  const handleMouseHover = (e, index: number) => {
    if (index === hoverIndex) {
      return;
    }
    hoverIndex = index;

    let imgSrc0 = page.pageImages?.split(",")[hoverIndex * 2]!;
    if (!imgSrc0?.includes("-1280.webp")) {
      imgSrc0 = imgSrc0.replace(".webp", "-1280.webp");
    }
    let imgSrc1 = page.pageImages?.split(",")[hoverIndex * 2 + 1]!;
    if (!imgSrc1?.includes("-1280.webp")) {
      imgSrc1 = imgSrc1.replace(".webp", "-1280.webp");
    }
    hoverImages = [imgSrc0, imgSrc1];

    hoverCopys = [
      page.pageDescriptions.split(/(?<!\\),/)[hoverIndex * 2],
      page.pageDescriptions.split(/(?<!\\),/)[hoverIndex * 2 + 1],
    ];
  };

  const handleImageClick = (e, sku) => {
    selectedProduct = sku;
  };

  const CLASSES_BY_ELEMENTS = {
    3: { grid: "mt-3 grid grid-cols-3 grid-rows-1 gap-3 h-full" },
    4: { grid: "mt-3 grid grid-cols-2 grid-rows-2 gap-3 max-h-[75vh]" },
    5: { grid: "mt-3 grid grid-cols-3 grid-rows-2 gap-3 h-full" },
    6: { grid: "mt-3 grid grid-cols-3 grid-rows-2 gap-3 h-full" },

    mobile3: {
      grid: "mt-3 grid grid-cols-1 grid-rows-3 gap-3 h-full w-full bg-white",
      gridHeight: "21vh",
    },
    mobile4: {
      grid: "mt-3 grid grid-cols-2 grid-rows-2 gap-3 h-full w-full bg-white",
      gridHeight: "35vh",
    },
    mobile5: {
      grid: "mt-3 grid grid-cols-2 grid-rows-3 gap-3 h-full w-full bg-white",
      gridHeight: "100%",
    },
    mobile6: {
      grid: "mt-3 grid grid-cols-2 grid-rows-3 gap-3 h-full w-full bg-white",
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
                    style={`border-color: ${page.pageResources || "#00614B"};`}
                  >
                    <div class="flex flex-col w-full pr-10">
                      <div class="">
                        <Copy
                          className="font-helvetica flex absolute ml-3 mt-3 text-[1.6vw]"
                          text={hoverCopys[0]}
                        />
                        <img
                          src={hoverImages[0]}
                          class="h-[50vh] w-full object-bottom font-semibold"
                          style={`object-fit: ${
                            page.pageProductsImagesPosition?.split(",")[
                              hoverIndex * 2
                            ] || ""
                          }`}
                        />
                      </div>
                      <div>
                        <Copy
                          className="font-helvetica flex absolute ml-3 mt-3 text-[1.6vw]"
                          text={hoverCopys[1]}
                        />
                        <img
                          src={hoverImages[1]}
                          class="h-[50vh] w-full object-bottom"
                          style={`object-fit: ${
                            page.pageProductsImagesPosition?.split(",")[
                              hoverIndex * 2 + 1
                            ] || "contain"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="px-8 py-5 h-screen flex flex-col col-span-3">
                    <div
                      class={page.pageCategory === "Vialité"
                        ? "flex flex-col self-center"
                        : "flex flex-col"}
                      style={`color: ${page.pageResources || "#00614B"};`}
                    >
                      <span
                        text-split=""
                        words-slide-from-right=""
                        class="font-helvetica text-base lg:text-3xl md:text-2xl sm:text-xl -mb-0"
                        >{page.pageSubtitle}</span
                      >
                      <span
                        text-split=""
                        words-slide-from-right=""
                        class="font-bold text-5xl lg:text-8xl md:text-8xl sm:text-7xl font-kepler"
                        >{page.pageTitle}</span
                      >
                      <span
                        text-split=""
                        words-slide-from-right=""
                        class="font-helvetica text-xs lg:text-xl md:text-lg sm:text-base"
                      >
                        {page.pageCopys}
                      </span>
                    </div>

                    <!-- GRID -->
                    <div class={CLASSES_BY_ELEMENTS[numProducts].grid}>
                      {#each { length: numProducts } as _, i}
                        <div
                          class="w-full h-full flex items-center justify-center overflow-hidden hover:cursor-pointer opacity-0 transform transition-transform ease-out"
                          class:fade-enter-active={showImages[i]}
                          draggable="true"
                          data-visible-id={page.pageProducts?.split(",")[i]}
                          on:click|preventDefault={(e) =>
                            handleImageClick(
                              e,
                              page.pageProducts?.split(",")[i],
                            )}
                          on:mouseover|preventDefault={(e) =>
                            handleMouseHover(e, i)}
                        >
                          <div class="relative w-full h-full">
                            {#if page.pageIcons && page.pageIcons.split(",").length > 0 && page.pageIcons
                                .split(",")
                                [i]?.includes(".webp")}
                              <div class="flex absolute right-0 pr-1 pt-3">
                                <img
                                  src={page.pageIcons.split(",")[i]}
                                  loading="eager"
                                  alt=""
                                  class="pricing-image-two shadow-two"
                                />
                              </div>
                            {/if}
                            <OptimImg
                              imgClass="w-full h-full object-cover rounded-md"
                              style={numProducts === 4
                                ? "object-position: bottom;"
                                : null}
                              source={page.pageMainImage?.split(",")[i]}
                              loading={"lazy"}
                            />
                          </div>
                        </div>
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
<div
  class="lg:hidden min-h-screen z-10 bg-white pt-1 sticky"
  data-template-id={templateId}
>
  <div id={textToDivId(page.pageTitle)} class="min-h-screen">
    <div class="justify-center items-center block min-h-screen">
      <div class="flex flex-col p-7 min-h-screen">
        <div
          class="flex flex-col"
          style={`color: ${page.pageResources || "#00614B"};`}
        >
          <span
            class="font-helvetica text-base lg:text-4xl md:text-2xl sm:text-xl -mb-2"
            >{page.pageSubtitle}</span
          >
          <span
            class="font-bold text-5xl lg:text-9xl md:text-8xl sm:text-7xl font-kepler"
            >{page.pageTitle}</span
          >
          <span
            class="font-helvetica text-sm lg:text-xl md:text-lg sm:text-base"
          >
            {page.pageCopys}
          </span>
        </div>

        <!-- GRID -->
        <div class="">
          <div class={CLASSES_BY_ELEMENTS[`mobile${numProducts}`].grid}>
            {#each { length: numProducts } as _, i}
              <div
                style={`height: ${
                  CLASSES_BY_ELEMENTS[`mobile${numProducts}`].gridHeight
                };`}
                class="w-full flex items-center justify-center overflow-hidden opacity-0 transform transition-transform ease-out"
                class:fade-enter-active={showImages[i]}
                data-visible-id={page.pageProducts?.split(",")[i]}
                on:click|preventDefault={(e) =>
                  handleImageClick(e, page.pageProducts?.split(",")[i])}
              >
                <div class="relative w-full h-full">
                  {#if page.pageIcons && page.pageIcons.split(",").length > 0 && page.pageIcons
                      .split(",")
                      [i]?.includes(".webp")}
                    <div
                      class="w-full h-full absolute flex items-start justify-end pr-1 pt-1"
                    >
                      <img
                        src={page.pageIcons.split(",")[i]}
                        loading="eager"
                        alt=""
                        class="w-full max-w-[30%] object-contain"
                      />
                    </div>
                  {/if}
                  <OptimImg
                    imgClass="w-full h-full object-cover rounded-md"
                    source={page.pageMainImage?.split(",")[i]}
                    loading={"lazy"}
                  />
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
