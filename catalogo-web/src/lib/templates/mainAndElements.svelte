<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import Copy from "$lib/components/Copy.svelte";
  import { textToDivId } from "$lib/utils/strings";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { COLORS, URLS } from "$lib/constants/strings";
  import Carousel from "svelte-carousel";

  export let page: DatabasePage;
  export let initAnimate = false;
  export let templateId: string;
  export let handleImageClick: (sku: string, relatedProds: string[]) => void;

  let carousel: any;
  let urls = ["", "-2", "-3"];
  let showSides = false;
  let showMainImg = false;
  const executeAnimation = () => {
    setTimeout(() => {
      showSides = true;
      showMainImg = true;
    }, 700);
  };
  $: {
    if (initAnimate) {
      executeAnimation();
    }
  }
</script>

<div id={page.pageTitle} class="sticky z-10" data-template-id={templateId}>
  <div class="z-10">
    <!-- DESKTOP -->
    <!-- borde en Y para que muestre un recorte en lineas verticales blancas del mismo color del fondo -->
    <!-- <div
      class="hidden lg:block h-screen w-screen text-white font-helvetica border-t-[20px] border-b-[40px] pb-20"
      style={`background-color: ${page.pageResources}; border-color: ${page.pageResources};`}
    > -->
    <div
      class="hidden lg:block h-screen w-screen text-white font-helvetica"
      style={`background-color: ${page.pageResources[0] || COLORS.beige}`}
    >
      <div class="grid grid-flow-row-dense grid-cols-8 grid-rows-1">
        <div
          class="px-8 py-12 h-screen flex items-center col-span-2 border-r-4 border-white inset-0 transform translate-y-full transition-transform duration-700 ease-out"
          class:animate-up={showSides}
        >
          <div class="w-full h-full flex items-start">
            <div class="w-full h-full">
              <div class="w-full h-full grid grid-cols-1 grid-rows-6 gap-4">
                <div class="row-span-4 w-full h-full">
                  <Copy
                    className="font-helvetica lex absolute pl-3 pt-3 text-[1.6vw]"
                    text={page.pageCopys[1]}
                  />
                  <OptimImg
                    imgClass="w-full h-full object-cover"
                    source="{URLS.fotos}{page.SKU}-2.webp"
                    loading={"eager"}
                  />
                </div>

                <div
                  class="row-span-2 w-full h-full border-t-4 border-white pt-4"
                >
                  <Copy
                    className="font-helvetica flex absolute pl-3 pt-3 text-[1.6vw]"
                    text={page.pageCopys[2]}
                  />

                  <OptimImg
                    imgClass="w-full h-full object-cover"
                    source="{URLS.fotos}{page.SKU}-3.webp"
                    loading={"eager"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full h-full px-10 py-10 col-span-4">
          <div class="flex justify-around">
            <div class="">
              <div class="text-black flex flex-col items-start">
                <p
                  text-split=""
                  words-slide-from-right=""
                  class="text-7xl md:text-6xl"
                >
                  {page.pageTitle}
                </p>
                <p
                  text-split=""
                  words-slide-from-right=""
                  class="italic text-2xl md:text-2xl"
                >
                  {page.pageSubtitle}
                </p>
              </div>
            </div>
            <div class="">
              <div
                class="items-start"
                style="width: 100%; flex-wrap: wrap; align-content: start; justify-content: space-evenly; align-items: start; display: flex;"
              >
                <!-- {#each page.pageIcons
                  .filter((icon) => icon.includes(".webp")) as icon}
                  <div class="p-1">
                    <img
                      src={icon}
                      loading="eager"
                      alt=""
                      class="pricing-image-two shadow-two"
                    />
                  </div>
                {/each} -->
              </div>
            </div>
          </div>

          <div
            class="w-full flex my-12 overflow-hidden opacity-0 transform transition-transform ease-out cursor-pointer"
            class:fade-enter-active={showMainImg}
            data-visible-id={page.pageProducts?.split(",")[0]}
            on:click|preventDefault={(e) =>
              handleImageClick(page.SKU, page.pageRelatedProducts)}
          >
            <OptimImg
              imgClass="h-full w-full object-contain scale-[0.8]"
              source="{URLS.fotos}{page.SKU}.webp"
            />
          </div>
        </div>

        <div
          class="px-8 py-12 h-screen flex items-center col-span-2 border-l-4 border-white inset-0 transform translate-y-full transition-transform duration-700 ease-out"
          class:animate-up={showSides}
        >
          <div class="w-full h-full flex items-start">
            <div class="h-full">
              <div class="w-full h-full grid grid-cols-1 grid-rows-6 gap-5">
                <div class="row-span-1 w-full flex items-end justify-center">
                  <p
                    class="text-[2vw] pb-16"
                    style={page.pageTemplate !== "Muebles"
                      ? "color: black"
                      : "color: white"}
                  >
                    Hace juego con:
                  </p>
                </div>

                <!-- elements  -->
                <div
                  class="row-span-5 w-full flex flex-col items-center justify-center"
                >
                  <div
                    class="grid grid-cols-1 grid-rows-3 gap-3 place-items-center h-full w-full"
                  >
                    <!-- <div
                      class="w-full h-full border-b-4 border-white pb-4 flex justify-center cursor-pointer"
                      data-visible-id={page.pageRelatedProducts?.split(",")[0]}
                      on:click|preventDefault={(e) =>
                        handleImageClick(
                          page.pageComplementProducts?.split(",")[0],
                        )}
                    >
                      <OptimImg
                        imgClass="h-full object-contain"
                        source={`https://storage.googleapis.com/catalogo-web/biasi/fotos/${
                          page.pageComplementProducts?.split(",")[0]
                        }.webp`}
                        loading={"eager"}
                      />
                    </div> -->

                    <!-- <div
                      class="h-full cursor-pointer"
                      data-visible-id={page.pageRelatedProducts?.split(",")[1]}
                      on:click|preventDefault={(e) =>
                        handleImageClick(
                          page.pageComplementProducts?.split(",")[1],
                        )}
                    >
                      <OptimImg
                        imgClass="h-full object-cover"
                        source={`https://storage.googleapis.com/catalogo-web/biasi/fotos/${
                          page.pageComplementProducts?.split(",")[1]
                        }.webp`}
                        loading={"eager"}
                      />
                    </div>

                    <div
                      class="w-full h-full border-t-4 border-white pt-4 cursor-pointer"
                      data-visible-id={page.pageRelatedProducts?.split(",")[2]}
                      on:click|preventDefault={(e) =>
                        handleImageClick(
                          page.pageComplementProducts?.split(",")[2],
                        )}
                    >
                      <OptimImg
                        imgClass="w-full h-full object-contain"
                        source={`https://storage.googleapis.com/catalogo-web/biasi/fotos/${
                          page.pageComplementProducts?.split(",")[2]
                        }.webp`}
                        loading={"eager"}
                      />
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- MOBILE -->
<div
  id={textToDivId(page.pageTitle)}
  class="sticky min-h-fit"
  data-template-id={templateId}
>
  <div class="h-full">
    <div
      class="lg:hidden font-helvetica min-h-fit"
      style={`background-color: ${page.pageResources[0] || COLORS.beige}`}
    >
      <div class="h-full grid grid-rows-[min-content_0fr] grid-cols-1">
        <!-- title -->
        <div class="flex mx-7 mt-7 mb-3 justify-between relative">
          <div class="flex h-full z-10">
            <div class="text-black flex flex-col">
              {#if page.productType === "Organización"}
                <span
                  text-split=""
                  words-slide-from-right=""
                  class="font-helvetica italic md:text-xl sm:text-2xl text-xl"
                  >{page.pageSubtitle}</span
                >
                <span
                  text-split=""
                  words-slide-from-right=""
                  class="font-helvetica md:text-7xl sm:text-5xl text-4xl"
                  >{page.pageTitle}</span
                >
              {:else}
                <span
                  text-split=""
                  words-slide-from-right=""
                  class="font-helvetica md:text-7xl sm:text-5xl text-4xl"
                  >{page.pageTitle}</span
                >
                <span
                  text-split=""
                  words-slide-from-right=""
                  class="font-helvetica italic md:text-xl sm:text-2xl text-xl"
                  >{page.pageSubtitle}</span
                >
              {/if}
            </div>
          </div>

          {#if page.pageIcons.length > 0}
            <div class="flex h-full justify-end items-start">
              {#each page.pageIcons as icon}
                <div class="">
                  <img
                    src="{URLS.iconos}{icon}.webp"
                    loading="eager"
                    alt=""
                    class="max-w-[15vw] ml-1"
                  />
                </div>
              {/each}
            </div>
          {/if}
        </div>

        <!-- main image -->
        <div class="mt-5 mb-0 mx-auto w-11/12 h-fit" data-visible-id={page.SKU}>
          <Carousel bind:this={carousel} autoplay autoplayDuration={3000}>
            <!-- hide buttons -->
            <div slot="prev" />
            <div slot="next" />

            <div
              slot="dots"
              class="flex space-x-5"
              let:currentPageIndex
              let:showPage
            >
              {#each urls as url, pageIndex (pageIndex)}
                <button
                  symbol={pageIndex + 1}
                  active={currentPageIndex === pageIndex}
                  on:click={() => showPage(pageIndex)}
                  class="w-12 h-12"
                  style={currentPageIndex === pageIndex
                    ? "border: 2px solid #000"
                    : ""}
                >
                  <img
                    class="w-full h-full object-cover"
                    src="{URLS.fotos}{page.SKU}{url}-500.webp"
                    alt={page.SKU}
                  />
                </button>
              {/each}
            </div>

            <!-- <button
              slot="prev"
              on:click={() => carousel.goToPrev()}
              class="absolute z-30 left-0 top-1/2 ml-[8vw] p-4 cursor-pointer rounded-full bg-beige opacity-70"
            >
              <svg
                class="text-gray-900"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1L1 7L7 13"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button> -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#each urls as url, _}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                on:click={() =>
                  handleImageClick(page.SKU, page.pageRelatedProducts)}
                class="w-full h-full select-none p-3 relative"
              >
                <OptimImg
                  imgClass="w-full h-full object-cover mb-3"
                  loading="eager"
                  source="{URLS.fotos}{page.SKU}{url}.webp"
                />
                <div class="w-full">
                  <p class="chavos-3xl">
                    {@html page.pageTitle}
                  </p>
                  <p class="chavos-base h-[3%]">{@html page.pageSubtitle}</p>
                </div>

                <!-- <div class="grid grid-cols-4 gap-3 my-3">
                  {#if page.pageIcons && page.pageIcons.length > 0}
                    {#each { length: Math.min(page.pageIcons.length, 4) } as _, i}
                      {#if page.pageIcons[i] !== ""}
                        <div class="h-full w-full">
                          <img
                            src={URLS.iconos + page.pageIcons[i]}
                            loading="eager"
                            alt=""
                            class="h-full w-full"
                          />
                        </div>
                      {/if}
                    {/each}
                  {/if}
                </div> -->
                <!-- <div class="mb-3">
                  {#each page.pageCopys as copy, i}
                    <p class="chavos-sm mb-1">{@html copy}</p>
                  {/each}
                </div> -->
              </div>
            {/each}
            <!-- <button
              slot="next"
              on:click={() => carousel.goToNext()}
              class="absolute z-30 right-0 top-1/2 mr-[8vw] p-4 cursor-pointer rounded-full bg-beige opacity-70"
            >
              <svg
                class="text-gray-900"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button> -->

            <!-- top-0 right-0 m-6 " -->
          </Carousel>
        </div>

        <!-- elements images -->
        <div class="flex flex-col min-h-fit pb-10">
          <p
            class="w-full text-xl pt-3 px-7"
            style={page.pageTemplate !== "Muebles"
              ? "color: black"
              : "color: white"}
          >
            Hace juego con:
          </p>
          <div
            data-visible-id={page.SKU}
            class="max-h-[22vh] grid grid-cols-2 grid-rows-1 gap-3 m-3 place-items-center"
          >
            <div class="h-full w-full flex justify-center">
              <OptimImg
                imgClass="h-full object-contain cursor-pointer"
                source="{URLS.fotos}{page.complSheets[0]}.webp"
                onClick={() => handleImageClick(page.complSheets[0], [])}
              />
            </div>
            <div class="h-full w-full flex justify-center">
              <OptimImg
                imgClass="h-full object-contain cursor-pointer"
                source="{URLS.fotos}{page.complCurtains[0]}.webp"
                onClick={() => handleImageClick(page.complCurtains[0], [])}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
