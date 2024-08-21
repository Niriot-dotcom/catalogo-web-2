<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { COLORS, URLS, VIALIFRESH_ICONS } from "$lib/constants/strings";
  import Carousel from "svelte-carousel";

  export let pages: DatabasePage[];
  export let handleImageClick: (sku: string, relatedProds: string[]) => void;
  let carousel: any;

  let soportes = [
    {
      name: "suave",
      icon: "https://storage.googleapis.com/catalogo-web/invierno/fotos/SOPORTE-SUAVE.webp",
      video: "https://www.youtube.com/embed/B8FBWGD7OpA",
    },
    {
      name: "medio",
      icon: "https://storage.googleapis.com/catalogo-web/invierno/fotos/SOPORTE-MEDIO.webp",
      video: "https://www.youtube.com/embed/B8FBWGD7OpA",
    },
    {
      name: "firme",
      icon: "https://storage.googleapis.com/catalogo-web/invierno/fotos/SOPORTE-FIRME.webp",
      video: "https://www.youtube.com/embed/B8FBWGD7OpA",
    },
  ];

  let filteredPages = [...pages];
  let unique = {};

  const handleFilterBySupport = (support: string) => {
    if (support === "") {
      filteredPages = [...pages];
    } else {
      filteredPages = pages.filter((page) =>
        page.pageKeywords?.includes(support),
      );
    }

    var elmntToView = document.getElementById("pillows-grid-mobile");
    elmntToView?.scrollIntoView({
      behavior: "smooth",
    });
    var elmntToView = document.getElementById("pillows-grid-desktop");
    elmntToView?.scrollIntoView({
      behavior: "smooth",
    });
    unique = {}; // to reset the carousel component
  };
</script>

<!-- MOBILE -->
<div class="opacity-bg-img md:hidden text-black w-screen">
  <!-- title and video -->
  <div class="relative">
    <div class="w-full text-center pt-12 pb-8 px-8">
      <p class="font-helvetica font-thin text-5xl">Almohadas</p>
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

  <!-- la guia de almohadas -->
  <div class="h-screen w-full flex">
    <div class="grid grid-rows-6 h-full w-full place-items-center">
      <!-- title -->
      <div class="flex w-full h-full items-end justify-center">
        <p class="chavos-4xl xs:chavos-5xl text-center relative">
          la guía de <span class="italic">almohadas</span>
        </p>
      </div>

      <!-- soportes y lineas -->
      <div class="w-full row-span-2 flex justify-center mt-5">
        <div class="grid grid-cols-3 w-11/12 place-items-center">
          {#each soportes as soporte, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
              class="flex flex-col h-full w-11/12 cursor-pointer relative"
              on:click={() => handleFilterBySupport(soporte.name)}
            >
              <!-- imagen -->
              <div class="bg-[#D9D9D9] p-1.5 rounded-xl w-full relative">
                <OptimImg
                  imgClass="rounded-xl object-contain"
                  source={soporte.icon}
                  loading={"eager"}
                />

                <div
                  class="h-1/4 w-full flex justify-center absolute right-0 bottom-1.5 xs:bottom-2"
                >
                  <img
                    src="/images/abajo.svg"
                    loading="eager"
                    alt=""
                    class="h-5 xs:h-5 -rotate-90"
                  />
                </div>
              </div>

              <!-- texto -->
              <div class="flex items-center">
                <img src={soporte.icon} loading="eager" alt="" />
                <div class="h-[52px] mt-0 flex justify-center items-end">
                  <div class="w-auto h-auto pb-1 pr-1.5">
                    {#each { length: i + 2 } as _, j}
                      <div
                        class="w-6 h-2 border-2 border-black bg-transparent rounded mt-0.5 mb-0"
                      />
                    {/each}
                  </div>
                  <div
                    text-split=""
                    letters-fade-in=""
                    class="chavos-sm xs:chavos-xl"
                  >
                    soporte<br />{soporte.name}
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- lineas -->
      <div class="w-11/12 h-full row-span-3 flex flex-col space-y-3 relative">
        <button
          class="w-full h-full min-h-[50%] max-h-[50%] flex cursor-pointer"
          on:click={() => handleFilterBySupport("viafoam")}
        >
          <div
            class="border-2 border-[#cbc6be] bg-[#fcf6ee] px-7 py-3 rounded-3xl h-full"
          >
            <div class=" w-full h-full flex flex-col">
              <div class="w-full">
                <p class="text-lg xs:text-2xl text-[#CCB1A5] font-medium mb-1">
                  almohadas <span class="text-black">VIAFOAM</span>
                </p>
                <p
                  class="text-base xs:text-xl font-light leading-none text-start"
                >
                  Diseñadas para necesidades específicas, promoviendo un
                  descanso reparador.
                </p>
              </div>
              <div class="w-full flex justify-evenly h-[6vh] xs:h-[8vh] mt-3">
                <img alt="" src="/images/viafom.svg" />
                <img alt="" src="/images/viafom2.svg" />
              </div>
            </div>
          </div>
        </button>
        <button
          id="pillows-grid-mobile"
          class="w-full h-full cursor-pointer"
          on:click={() => handleFilterBySupport("vialifresh")}
        >
          <div
            class="w-full h-full flex items-center flex-col justify-center border-2 border-[#576a6a] px-8 py-3 bg-[#ADD3D5] rounded-3xl"
          >
            <div class="w-full">
              <p class="text-lg xs:text-2xl text-white font-medium">
                almohadas <span class="text-[#77B0B3]">VIALIFRESH</span>
              </p>
              <p
                class="w-full text-base xs:text-xl font-light leading-none text-start"
              >
                Tecnología hipoalergénica que ayuda a proteger de bacterias,
                hongos, moho y ácaros, además previene malos olores.
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>

  <!-- 'ver todas las almohadas' button -->
  <div class="w-full flex items-center justify-center relative mt-8 mb-5">
    <button
      class="px-4 py-1.5 bg-white text-black rounded-xl items-center chavos-base"
      on:click={() => handleFilterBySupport("")}
    >
      Ver todas las almohadas
    </button>
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
              product.pageKeywords?.includes("vialifresh")
                ? COLORS.bgVialifresh
                : product.pageKeywords?.includes("viafoam")
                  ? COLORS.bgViafoam
                  : product.pageKeywords?.includes("nuit")
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
                style={product.pageKeywords?.includes("nuit")
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
            {#if product.pageKeywords?.includes("vialifresh")}
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
            {:else if product.pageKeywords?.includes("viafoam")}
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
                  viewBox="0 0 20 20"
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
        <p class="font-helvetica font-thin text-8xl">Almohadas</p>
        <p class="font-helvetica text-2xl">
          Expertos en <span class="font-kepler italic text-3xl">descanso</span> para
          ti y los tuyos
        </p>
      </div>
      <div class="w-full flex items-center justify-center justify-items-center">
        <!-- svelte-ignore a11y-missing-attribute -->
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

  <div class="h-screen w-screen text-black overflow-x-hidden flex">
    <div class="w-9/12 h-full">
      <div class="grid grid-rows-6 h-full w-full place-items-center">
        <!-- title -->
        <div class="row-span-1 pt-12 h-full">
          <p
            class="font-helvetica font-thin text-8xl text-center h-full relative"
          >
            la guía de <span class="italic">almohadas</span>
          </p>
        </div>

        <!-- soportes y lineas -->
        <div class="w-full h-full row-span-2 flex justify-center">
          <div class="grid grid-cols-3 h-full w-8/12 place-items-center">
            {#each soportes as soporte, i}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <div
                class="flex flex-col h-full w-9/12 cursor-pointer"
                on:click={() => handleFilterBySupport(soporte.name)}
              >
                <!-- imagen -->
                <div class="bg-[#D9D9D9] p-2 rounded-xl w-full relative">
                  <OptimImg
                    imgClass="rounded-xl object-cover"
                    source={soporte.icon}
                    loading={"eager"}
                  />

                  <div
                    class="h-1/4 w-full flex justify-center absolute right-0 bottom-0"
                  >
                    <img
                      src="/images/abajo.svg"
                      loading="eager"
                      alt=""
                      class="h-8 -rotate-90"
                    />
                  </div>
                </div>

                <!-- texto -->
                <div class="flex items-center font-helvetica h-full">
                  <img src={soporte.icon} loading="eager" alt="" />
                  <div class="div-block-62">
                    <div class="div-block-63 relative">
                      {#each { length: i + 2 } as _, j}
                        <div
                          class="w-10 h-3 border-2 border-black rounded-xl mt-1 mb-0"
                        />
                      {/each}
                    </div>
                    <div
                      text-split=""
                      letters-fade-in=""
                      class="text-block-31 relative"
                    >
                      soporte<br />{soporte.name}
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- lineas -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="w-8/12 h-full row-span-3 justify-center flex flex-col space-y-3 relative"
        >
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            class="w-full h-full min-h-[40%] max-h-[40%] flex justify-center cursor-pointer"
            on:click={() => handleFilterBySupport("viafoam")}
          >
            <div
              class="border-2 border-[#cbc6be] px-8 py-3 bg-[#FDF7EE] rounded-3xl h-full"
            >
              <div class=" w-full h-full flex items-center justify-center">
                <div class="w-8/12">
                  <p class="text-2xl text-[#CCB1A5] font-medium mb-1">
                    almohadas <span class="text-black">VIAFOAM</span>
                  </p>
                  <p class="text-2xl font-light leading-none">
                    “Diseñadas para necesidades específicas, promoviendo un
                    descanso reparador.”
                  </p>
                </div>
                <div class="w-4/12 flex justify-evenly h-[9vh]">
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <img src="/images/viafom.svg" />
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <img src="/images/viafom2.svg" />
                </div>
              </div>
            </div>
          </div>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="w-full h-full min-h-[40%] max-h-[40%] flex justify-center cursor-pointer"
            on:click={() => handleFilterBySupport("vialifresh")}
          >
            <div
              class="border-2 border-[#576a6a] px-8 py-3 bg-[#ADD3D5] rounded-3xl h-full"
            >
              <div class=" w-full h-full flex items-center">
                <div class="w-8/12">
                  <p class="text-2xl text-white font-medium mb-1">
                    almohadas <span class="text-[#77B0B3]">VIALIFRESH</span>
                  </p>
                  <p class="text-2xl font-light leading-none">
                    Tecnología hipoalergénica que ayuda a proteger de bacterias,
                    hongos, moho y ácaros, además previene malos olores
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-3/12 h-full relative">
      <img
        class="h-full object-cover"
        alt=""
        src="/images/chavos/AmbienteAlmohadasLateral.jpg"
      />
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
        almohada, para mejorar<br />
        tu calidad del sueño
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
        class="h-full w-full self-center my-5 flex items-center justify-center"
      >
        <button
          class="bottom-3 px-3 py-1 bg-white text-black rounded-lg items-center chavos-xl relative"
          on:click={() => handleFilterBySupport("")}
        >
          Ver todas las almohadas
        </button>
      </div>
      <div
        class="h-full gap-8 grid w-8/12 grid-cols-1 sm:w-11/12 sm:grid-cols-2 lg:w-11/12 lg:grid-cols-3 xl:w-8/12 xl:grid-cols-3"
      >
        {#each filteredPages as product, i}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            data-visible-id={product.SKU}
            on:click={() => handleImageClick(product.SKU, [])}
            class="h-[70vh] rounded-xl p-3 relative"
            style={`background-color: ${
              product.pageKeywords?.includes("vialifresh")
                ? COLORS.bgVialifresh
                : product.pageKeywords?.includes("viafoam")
                  ? COLORS.bgViafoam
                  : product.pageKeywords?.includes("nuit")
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
                style={product.pageKeywords?.includes("nuit")
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
            {#if product.pageKeywords?.includes("vialifresh")}
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
            {:else if product.pageKeywords?.includes("viafoam")}
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
                  viewBox="0 0 20 20"
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
