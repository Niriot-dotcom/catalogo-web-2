<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import Copy from "$lib/components/Copy.svelte";
  import { textToDivId } from "$lib/utils/strings";
  import type { DatabasePage } from "$lib/constants/globalTypes";

  export let page: DatabasePage;
  export let initAnimate = false;
  export let templateId: string;
  export let selectedProduct: null | string;
  const handleImageClick = (e, sku) => {
    selectedProduct = sku;
  };

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
<div
  class="div-block-19 hidden lg:block sticky top-0 z-10"
  data-template-id={templateId}
>
  <main id="smooth-content" class="main-wrapper-2]">
    <div class="section-height">
      <div class="sticky-element">
        <div class="track">
          <div class="track-flex">
            <div class="thanks-panel_wrap">
              <div
                class="bg-center w-screen h-screen bg-cover justify-center items-center relative"
              >
                <div
                  class="w-full h-full grid grid-flow-row-dense grid-cols-2 grid-rows-1"
                >
                  {#each { length: 2 } as _, i}
                    <div
                      id={page.pageSubtitle?.split(",")[i] +
                        " " +
                        page.pageTitle.split(",")[i]}
                      class="h-screen flex flex-col inset-0 transform translate-y-full transition-transform duration-500 ease-out"
                      style={`background-color: ${
                        page.pageResources?.split(",")[i + 1]
                      }`}
                      class:animate-up={showSide[i]}
                    >
                      <div
                        class="container text-center pb-3"
                        style={`color: ${page.pageResources?.split(",")[0]}`}
                      >
                        <div class="font-helvetica">
                          <p class="text-xl">
                            {page.pageSubtitle?.split(",")[i] || ""}
                          </p>
                        </div>
                        <div class="font-helvetica">
                          <p class="font-bold font-kepler text-7xl">
                            {page.pageTitle?.split(",")[i] || ""}
                          </p>
                        </div>
                        <div
                          class="border mx-[13vw] my-3"
                          style={`border-color: ${
                            page.pageResources?.split(",")[0]
                          }`}
                        />
                        <div class="font-helvetica">
                          <Copy
                            className="text-xl"
                            text={page.pageCopys?.split(/(?<!\\),/)[i]}
                            customColor={page.pageResources?.split(",")[0]}
                          />
                        </div>
                      </div>

                      <div class="w-full relative flex items-center">
                        <div
                          class="absolute w-full h-full flex items-start justify-center p-1"
                        >
                          <div
                            class="w-full flex items-start justify-center space-x-5"
                          >
                            {#each { length: 2 } as _, iconIndex}
                              {#if page.pageIcons && page.pageIcons.length > 0 && page.pageIcons
                                  .split(",")
                                  [i * 2 + iconIndex]?.includes(".webp")}
                                <img
                                  src={page.pageIcons.split(",")[
                                    i * 2 + iconIndex
                                  ]}
                                  loading="eager"
                                  alt=""
                                  class="w-full max-w-[10%] object-contain z-10"
                                />
                              {/if}
                            {/each}
                          </div>
                        </div>
                      </div>

                      <div
                        class="container relative z-0 w-full h-full max-w-lg -mt-10 cursor-pointer"
                        data-visible-id={page.pageProducts?.split(",")[i]}
                        on:click|preventDefault={(e) =>
                          handleImageClick(e, page.pageProducts?.split(",")[i])}
                      >
                        <OptimImg
                          imgClass={page.pageTitle?.split(",")[i] === "Acrílico"
                            ? "object-contain scale-75"
                            : "object-contain"}
                          source={page.pageMainImage
                            ?.split(",")
                            [i].replace(".webp", "-2.webp")}
                          loading={"lazy"}
                        />
                      </div>

                      <!-- SQUARES -->
                      <div
                        class="flex justify-center absolute bottom-0 items-center self-center transform translate-y-full transition-transform duration-500 ease-out"
                        class:animate-squares={showSquares[i]}
                      >
                        <div class="inline-block h-full p-4 align-middle">
                          <div
                            class="h-full w-60 h-30 max-h-60 min-h-30 relative"
                            data-visible-id={page.pageRelatedProducts?.split(
                              ",",
                            )[0]}
                          >
                            <Copy
                              className="max-w-[80%] flex absolute pl-3 pt-3 text-xl"
                              text={page.pageDescriptions.split(",")[i * 2]}
                            />
                            <OptimImg
                              imgClass="h-full object-cover rounded-md shadow-lg"
                              source={page.pageMainImage?.split(",")[i]}
                              loading={"lazy"}
                            />
                          </div>
                        </div>
                        <div class="inline-block p-4 align-middle">
                          <div
                            class="h-full w-60 h-30 max-h-60 min-h-30 relative"
                            data-visible-id={page.pageRelatedProducts?.split(
                              ",",
                            )[1]}
                          >
                            <Copy
                              className="max-w-[80%] flex absolute pl-3 pt-3 text-xl"
                              text={page.pageDescriptions.split(",")[i * 2 + 1]}
                            />
                            <OptimImg
                              imgClass="h-full rounded-md shadow-lg"
                              source={page.pageMainImage
                                ?.split(",")
                                [i].replace(".webp", "-4.webp")}
                              loading={"lazy"}
                            />
                          </div>
                        </div>
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
  </main>
</div>

<!-- MOBILE -->
{#each { length: 2 } as _, i}
  <div
    id={textToDivId(
      page.pageSubtitle?.split(",")[i] + " " + page.pageTitle.split(",")[i],
    )}
    class="overflow-hidden w-full h-full lg:hidden sticky z-10"
    data-template-id={templateId}
  >
    <div class="">
      <div
        class="bg-center w-screen bg-cover justify-center items-center h-full"
        style={`background-color: ${page.pageResources?.split(",")[i + 1]}`}
      >
        <div class="grid grid-cols-1 grid-rows-[min-content_0fr] h-full">
          <div
            class="w-full h-full pt-5 text-center font-helvetica"
            style={`color: ${page.pageResources?.split(",")[0]}`}
          >
            <p class="text-base md:text-2xl sm:text-2xl">
              {page.pageSubtitle?.split(",")[i] || ""}
            </p>
            <p class="font-bold font-kepler text-4xl md:text-7xl sm:text-6xl">
              {page.pageTitle?.split(",")[i]}
            </p>
            <div
              class="border mx-[13vw] my-1"
              style={`border-color: ${page.pageResources?.split(",")[0]}`}
            />
            <Copy
              className="px-8 text-sm md:text-2xl sm:text-2xl"
              text={page.pageCopys?.split(/(?<!\\),/)[i]}
              customColor={page.pageResources?.split(",")[0]}
            />

            <!-- ICONS -->
            <div
              class="w-full h-full flex items-start justify-center space-x-5 mt-3"
            >
              {#each { length: 2 } as _, iconIndex}
                {#if page.pageIcons && page.pageIcons.length > 0 && page.pageIcons
                    .split(",")
                    [i * 2 + iconIndex]?.includes(".webp")}
                  <img
                    src={page.pageIcons.split(",")[i * 2 + iconIndex]}
                    loading="eager"
                    alt=""
                    class="w-full max-w-[15%] object-contain z-10"
                  />
                {/if}
              {/each}
            </div>
          </div>

          <!-- MAIN IMAGE -->
          <div class="w-full h-full flex items-center justify-center">
            <div
              class="px-3 relative z-0 w-full h-full max-w-lg cursor-pointer"
              data-visible-id={page.pageProducts?.split(",")[i]}
              on:click|preventDefault={(e) =>
                handleImageClick(e, page.pageProducts?.split(",")[i])}
            >
              <OptimImg
                imgClass={page.pageTitle?.split(",")[i] === "Acrílico"
                  ? "object-contain scale-75"
                  : "object-contain scale-90"}
                source={page.pageMainImage
                  ?.split(",")
                  [i].replace(".webp", "-2.webp")}
                loading={"lazy"}
              />
            </div>
          </div>

          <!-- SQUARES -->
          <div
            class="w-full grid grid-cols-2 grid-rows-1 gap-x-3 px-3 pb-[10vh] text-black"
          >
            <div
              class=""
              data-visible-id={page.pageRelatedProducts?.split(",")[0]}
            >
              <Copy
                className="max-w-[40%] flex absolute pl-3 pt-3 text-md"
                text={page.pageDescriptions.split(",")[i * 2]}
              />
              <OptimImg
                imgClass="w-full h-full object-cover object-center rounded-md shadow-lg"
                source={page.pageMainImage?.split(",")[i]}
                loading={"lazy"}
              />
            </div>
            <div
              class=""
              data-visible-id={page.pageRelatedProducts?.split(",")[1]}
            >
              <Copy
                className="max-w-[40%] flex absolute pl-3 pt-3 text-md"
                text={page.pageDescriptions.split(",")[i * 2 + 1]}
              />
              <OptimImg
                imgClass="w-full h-full object-cover object-center rounded-md shadow-lg"
                source={page.pageMainImage
                  ?.split(",")
                  [i].replace(".webp", "-4.webp")}
                loading={"lazy"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/each}
