<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { COLORS, URLS, VIALIFRESH_ICONS } from "$lib/constants/strings";
  import Carousel from "svelte-carousel";

  export let pages: DatabasePage[];
  export let handleImageClick: (sku: string, relatedProds: string[]) => void;
  let carousel;

  // let Carousel;
  // onMount(async () => {
  //   const module = await import("$lib/components/carousel.svelte");
  //   Carousel = module.default;
  // });

  let filteredPages = [...pages];
  let unique = {};
</script>

<!-- MOBILE -->
<div class="opacity-bg-img md:hidden text-black w-screen">
  <!-- title and video -->
  <div class="relative">
    <div class="w-full text-center pt-12 pb-8 px-8">
      <p class="font-helvetica font-thin text-5xl">Protectores De Colchón</p>
      <p class="font-helvetica text-lg">
        Expertos en <span class="font-kepler italic text-2xl">descanso</span> para
        ti y los tuyos
      </p>
    </div>
    <div class="w-full flex items-center justify-center justify-items-center">
      <iframe
        title="Presentacion de Almohadas"
        width="280"
        height="280"
        class="rounded-xl"
        src={`https://www.youtube.com/embed/B8FBWGD7OpA` +
          `?autoplay=1&mute=1&loop=1`}
      />
    </div>
  </div>

  <!-- carousel -->
  {#key unique}
    <div class="mt-5 mb-24 mx-auto w-11/12">
      <Carousel bind:this={carousel} autoplay autoplayDuration={5000}>
        <button
          slot="prev"
          on:click={() => carousel.goToPrev()}
          class="absolute z-30 left-0 top-[25%] ml-[8vw] p-5 cursor-pointer"
        >
          <svg
            class="dark:text-gray-900"
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
        </button>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#each filteredPages as product, i}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            data-visible-id={product.SKU}
            on:click={() => handleImageClick(product.SKU, [])}
            class="w-full h-[45vh] select-none rounded-xl p-3 relative"
            style={`background-color: ${
              product.pageKeywords.includes("vialifresh")
                ? COLORS.bgVialifresh
                : product.pageKeywords.includes("viafoam")
                  ? COLORS.bgViafoam
                  : product.pageTitle.toLowerCase() === "tencel"
                    ? COLORS.bgTencel
                    : product.pageKeywords.includes("nuit")
                      ? COLORS.bgNuit
                      : COLORS.bgBasicPillow
            }`}
          >
            <OptimImg
              imgClass="w-full max-h-[40%] object-cover mb-3 rounded-2xl"
              loading="eager"
              source="{URLS.fotos}{product.SKU}.webp"
            />
            <div class="w-full">
              <p
                class="chavos-3xl"
                style={product.pageKeywords.includes("nuit")
                  ? `color: #fff`
                  : ""}
              >
                {@html product.pageTitle}
              </p>
              <p class="chavos-base h-[3%]">{@html product.pageSubtitle}</p>
            </div>

            <div class="grid grid-cols-4 gap-3 my-3">
              {#if product.pageIcons && product.pageIcons.length > 0}
                {#each { length: Math.min(product.pageIcons.length, 4) } as _, i}
                  {#if product.pageIcons[i] !== ""}
                    <div class="h-full w-full">
                      <img
                        src={URLS.iconos + product.pageIcons[i]}
                        loading="eager"
                        alt=""
                        class="h-full w-full"
                      />
                    </div>
                  {/if}
                {/each}
              {/if}
            </div>
            <div class="mb-3">
              {#each product.pageCopys as copy, i}
                <p class="chavos-sm mb-1">{@html copy}</p>
              {/each}
            </div>
            {#if product.pageKeywords.includes("vialifresh")}
              <div class="grid grid-cols-4 gap-3 my-3">
                {#each VIALIFRESH_ICONS as icon}
                  <img
                    src={icon}
                    loading="eager"
                    alt=""
                    class="h-full w-full"
                  />
                {/each}
              </div>
            {:else if product.pageKeywords.includes("viafoam")}
              <div class="flex max-h-[10%]">
                <img src="/images/viafom.svg" loading="eager" alt="" class="" />
                <img
                  src="/images/viafom2.svg"
                  loading="eager"
                  alt=""
                  class=""
                />
              </div>
            {/if}

            <button
              class="absolute flex bottom-3 px-3 py-1 h-fit bg-white text-black rounded-lg items-center chavos-lg"
            >
              Ver más
              <div class="arrow-embed w-embed ml-1">
                <svg
                  class=""
                  width="20"
                  height="20"
                  viewbox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.72 15L16.3472 10.357C16.7732 9.92932 16.7732 9.23603 16.3472 8.80962L11.72 4.16667L10.1776 5.71508L12.9425 8.4889H4.16669V10.6774H12.9425L10.1776 13.4522L11.72 15Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        {/each}
        <button
          slot="next"
          on:click={() => carousel.goToNext()}
          class="absolute z-30 right-0 top-[25%] mr-[8vw] p-5 cursor-pointer"
        >
          <svg
            class="dark:text-gray-900"
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
        </button>
      </Carousel>
    </div>
  {/key}
</div>

<!-- DESKTOP -->
<div class="opacity-bg-img hidden md:block text-black overflow-x-hidden">
  <div class="relative">
    <div
      class="h-screen w-screen grid grid-cols-3 place-items-center items-center relative"
    >
      <div class="w-full text-right">
        <p class="font-helvetica font-thin text-8xl">Protectores De Colchón</p>
        <p class="font-helvetica text-2xl">
          Expertos en <span class="font-kepler italic text-3xl">descanso</span> para
          ti y los tuyos
        </p>
      </div>
      <div class="w-full flex items-center justify-center justify-items-center">
        <iframe
          width="300"
          height="300"
          class="rounded-xl"
          src={`https://www.youtube.com/embed/B8FBWGD7OpA` +
            `?autoplay=1&mute=1&loop=1`}
        />
      </div>
    </div>
  </div>

  <div class="min-h-screen w-screen text-black overflow-x-hidden flex flex-col">
    <div
      class="my-[3vw] mx-[5vw] flex flex-col"
      text-split=""
      words-slide-from-right=""
    >
      <p
        class="font-helvetica font-thin text-8xl mb-5 relative"
        text-split=""
        words-slide-from-right=""
      >
        Conoce las características<br />
        principales de cada<br />
        protector de colchón y<br />
        encuentra el ideal
      </p>

      <img
        id="pillows-grid-desktop"
        src="/images/abajo.svg"
        loading="eager"
        style="opacity:0"
        data-w-id="ea4b971a-27e3-8638-3274-44384a88c49a"
        alt=""
        class="image-44"
      />
    </div>

    <div
      class="w-full flex flex-col items-center justify-center mt-[10vh] mb-[20vh]"
    >
      <div
        class="h-full gap-8 grid w-8/12 grid-cols-1 sm:w-11/12 sm:grid-cols-2 lg:w-11/12 lg:grid-cols-3 xl:w-8/12 xl:grid-cols-3"
      >
        {#each filteredPages as product, i}
          <div
            data-visible-id={product.SKU}
            on:click={() => handleImageClick(product.pageProducts[0])}
            class="h-[70vh] rounded-xl p-3 relative"
            style={`background-color: ${
              product.pageKeywords.includes("vialifresh")
                ? COLORS.bgVialifresh
                : product.pageKeywords.includes("viafoam")
                  ? COLORS.bgViafoam
                  : product.pageTitle.toLowerCase() === "tencel"
                    ? COLORS.bgTencel
                    : product.pageKeywords.includes("nuit")
                      ? COLORS.bgNuit
                      : COLORS.bgBasicPillow
            }`}
          >
            <OptimImg
              imgClass="w-full max-h-[40%] object-cover mb-3 rounded-2xl"
              loading="eager"
              source="{URLS.fotos}{product.SKU}.webp"
            />
            <!-- source={`https://storage.googleapis.com/catalogo-web/biasi/fotos/${product.pageProducts[0]}.webp`} -->
            <div class="w-full">
              <p
                class="chavos-3xl"
                style={product.pageKeywords.includes("nuit")
                  ? `color: #fff`
                  : ""}
              >
                {@html product.pageTitle}
              </p>
              <p class="chavos-base h-[3%]">{@html product.pageSubtitle}</p>
            </div>

            <div class="grid grid-cols-4 gap-3 my-3">
              {#if product.pageIcons && product.pageIcons.length > 0}
                {#each { length: Math.min(product.pageIcons.length, 4) } as _, i}
                  {#if product.pageIcons[i] !== ""}
                    <div class="h-full w-full">
                      <img
                        src={URLS.iconos + product.pageIcons[i]}
                        loading="eager"
                        alt=""
                        class="h-full w-full"
                      />
                    </div>
                  {/if}
                {/each}
              {/if}
            </div>
            <div class="mb-3">
              {#each product.pageCopys as copy, i}
                <p class="chavos-sm mb-1">{@html copy}</p>
              {/each}
            </div>
            {#if product.pageKeywords.includes("vialifresh")}
              <div class="grid grid-cols-4 gap-3 my-3">
                {#each VIALIFRESH_ICONS as icon}
                  <img
                    src={icon}
                    loading="eager"
                    alt=""
                    class="h-full w-full"
                  />
                {/each}
              </div>
            {:else if product.pageKeywords.includes("viafoam")}
              <div class="flex max-h-[10%]">
                <img src="/images/viafom.svg" loading="eager" alt="" class="" />
                <img
                  src="/images/viafom2.svg"
                  loading="eager"
                  alt=""
                  class=""
                />
              </div>
            {/if}

            <button
              class="absolute flex bottom-3 px-3 py-1 h-fit bg-white text-black rounded-lg items-center chavos-lg"
            >
              Ver más
              <div class="arrow-embed w-embed ml-1">
                <svg
                  class=""
                  width="20"
                  height="20"
                  viewbox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.72 15L16.3472 10.357C16.7732 9.92932 16.7732 9.23603 16.3472 8.80962L11.72 4.16667L10.1776 5.71508L12.9425 8.4889H4.16669V10.6774H12.9425L10.1776 13.4522L11.72 15Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<div>
  <script defer src="/js/webflowPage.js"></script>

  <script
    defer
    src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=643738a971c1d64a8bd7a90a"
    type="text/javascript"
    integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
    crossorigin="anonymous"
  ></script>
  <script defer src="https://unpkg.com/split-type"></script>
  <script
    defer
    src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"
  ></script>
  <script
    defer
    src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js"
  ></script>
  <script defer src="/js/animations.js" type="text/javascript"></script>
</div>

<style>
  .opacity-bg-img {
    position: relative;
    min-height: fit-content;
    width: 100%;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
  }

  .opacity-bg-img::before {
    overflow-x: hidden;
    content: "";
    background-image: url("/images/chavos/texturaAlmohadas.png");
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.5;
  }
</style>
