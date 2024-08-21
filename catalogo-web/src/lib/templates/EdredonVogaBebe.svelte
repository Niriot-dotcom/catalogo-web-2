<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import TitleVoga from "$lib/components/titles/TitleVoga.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { COLORS, URLS } from "$lib/constants/strings";
  import { getCurrentCatalog } from "$lib/utils/navigation";
  import { onMount } from "svelte";

  export let page: DatabasePage;
  export let handleImageClick: (sku: string, relatedProds: string[]) => void;
  let isShowingTexture = false;
  let bgColor =
    page.pageResources &&
    page.pageResources.length > 0 &&
    page.pageResources[0] !== "#"
      ? page.pageResources[0]
      : COLORS.beige;
  let mainColor =
    page.pageResources &&
    page.pageResources.length > 1 &&
    page.pageResources[1] !== "#"
      ? page.pageResources[1]
      : COLORS.beige;

  function handleShowTexture() {
    isShowingTexture = !isShowingTexture;
    let divContent = document.getElementById("grid-content-" + page.SKU);
    if (!divContent) return;
    divContent.style.transition = "all 0.2s linear";

    let texturePart = document.getElementById("texture-part-" + page.SKU);
    if (!texturePart) return;
    texturePart.style.transition = "height 0.3s";

    if (divContent.classList.contains("hidden")) {
      texturePart.style.height = "33%";

      divContent.classList.remove("hidden");
      setTimeout(function () {
        divContent?.classList.remove("opacity-0");
      }, 20);
    } else {
      texturePart.style.height = "100%";

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

  let currentCatalog: string;
  onMount(() => {
    if (window) {
      currentCatalog = getCurrentCatalog();
    }
  });
</script>

<!-- MOBILE -->
<div
  id={page.SKU}
  style="background-color: {bgColor};"
  class="md:hidden overflow-x-hidden w-screen relative"
>
  <!-- text header -->
  <div
    style="background-color: {bgColor};"
    class="absolute z-10 left-0 right-0 m-auto top-8 text-center text-black opacity-80 pt-8 rounded-2xl"
  >
    <p class="chavos-5xl xs:chavos-6xl">{page.pageTitle}</p>
    <div class="relative w-full h-10 xs:h-16 flex justify-center">
      <p class="w-fit chavos-base xs:chavos-lg italic">{page.pageSubtitle}</p>
      <div class="absolute left-[62%] -z-10 -top-[20%] h-[65%]">
        <TitleVoga color={page.pageResources[1]} opacity="100" />
      </div>
    </div>
  </div>

  <!-- images -->
  <div class="h-[90vh] w-full relative">
    <!-- main image -->
    <div class="h-[70vh] w-full">
      <OptimImg
        onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
        imgClass="object-cover w-full h-full"
        source={`${URLS.fotos}${page.SKU}.webp`}
      />
    </div>

    <!-- 2nd view image -->
    <div class="w-full h-[32vh] absolute bottom-0">
      <div class="w-full h-full flex items-center justify-center">
        <div class="text-black w-5/6 h-full rounded-2xl overflow-hidden">
          {#if page.pageVideos.length > 0 && page.pageVideos[0] !== ""}
            <video
              autoplay
              loop
              muted
              playsinline
              src={page.pageVideos[0]}
              class="object-cover w-full h-full"
            />
          {:else}
            <OptimImg
              onClick={() =>
                handleImageClick(page.SKU, page.pageRelatedProducts)}
              imgClass="object-contain w-full"
              source={`${URLS.fotos}${page.SKU}-2.webp`}
            />
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- details -->
  <div
    class="text-black grid grid-cols-3 grid-rows-3 mx-auto w-5/6 h-[50vh] mt-7 mb-5"
  >
    <div class="col-span-1 corner-b corner-r w-full h-full relative">
      <div class="w-full text-black absolute bottom-3">
        <div class="w-full flex mb-2">
          {#each { length: 5 } as _, i}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-3 h-3"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          {/each}
        </div>
        <p class="chavos-xs xs:chavos-lg">materiales de</p>
        <p class="chavos-bold-xs xs:chavos-bold-lg">calidad,</p>
        <p class="chavos-xs xs:chavos-lg">texturas en</p>
        <p class="chavos-bold-xs xs:chavos-bold-lg">tendencia</p>
      </div>
    </div>
    <div class="col-span-1 corner-b corner-r">
      <div class="w-full h-full">
        <OptimImg
          onClick={() =>
            handleImageClick(page.complDecoration[0], page.pageRelatedProducts)}
          imgClass="object-contain scale-[0.85] h-full cursor-pointer"
          source={`${URLS.fotos}${page.complDecoration[0]}.webp`}
        />
      </div>
    </div>
    <div class="col-span-1 corner-b">
      <div class="w-full h-full overflow-hidden">
        <OptimImg
          onClick={() =>
            handleImageClick(page.complSheets[0], page.pageRelatedProducts)}
          imgClass="object-contain scale-[1.25] h-full cursor-pointer"
          source={`${URLS.fotos}${page.complSheets[0]}.webp`}
        />
      </div>
    </div>
    <div class="col-span-1 corner-r corner-b">
      <div class="w-full h-full">
        <OptimImg
          onClick={() =>
            handleImageClick(page.complCurtains[0], page.pageRelatedProducts)}
          imgClass="object-contain scale-[1] h-full cursor-pointer"
          source={`${URLS.fotos}${page.complCurtains[0]}.webp`}
        />
      </div>
    </div>
    <div class="col-span-2 row-span-2 p-1">
      <div class="w-full h-full">
        <OptimImg
          onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
          imgClass="object-cover w-full h-full cursor-pointer"
          source={`${URLS.fotos}${page.SKU}-3.webp`}
        />
      </div>
    </div>
    <div class="col-span-1 corner-r">
      <div class="w-full h-full">
        <OptimImg
          onClick={() =>
            handleImageClick(
              page.complPillowCovers[0],
              page.pageRelatedProducts,
            )}
          imgClass="object-contain scale-[0.85] h-full cursor-pointer"
          source={`${URLS.fotos}${page.complPillowCovers[0]}.webp`}
        />
      </div>
    </div>
  </div>
</div>

<!-- DESKTOP -->
<div
  id="{page.SKU}d"
  style="background-color: {bgColor};"
  class="hidden md:block w-screen h-screen overflow-hidden"
>
  <div class="w-full h-full flex space-x-1">
    <!-- main image -->
    <div class="w-7/12 h-full relative">
      <div class="w-full h-full overflow-hidden">
        <OptimImg
          onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
          imgClass="w-full h-full object-cover scale-[1.2]"
          source={`${URLS.fotos}${page.SKU}.webp`}
        />
      </div>

      <div class="absolute mt-12 top-0 right-1/3 w-2/6 text-black">
        <div class="w-full h-full flex relative">
          <!-- text -->
          <div class="w-full h-full text-center absolute z-10">
            <p class="chavos-4xl xs:chavos-5xl">{page.pageTitle}</p>
            <p class="chavos-sm xs:chavos-base">{page.pageSubtitle}</p>
          </div>

          <!-- image -->
          <div class="absolute w-full h-[6vh] left-24 mt-9">
            <TitleVoga color={page.pageResources[1]} />
          </div>
        </div>
      </div>

      <!-- test VianneyCopy -->
      <!-- <div class="absolute bottom-0 left-0 w-2/6 lg:w-3/6 mx-8 mb-4">
        <VianneyCopy>
          <p slot="title" class="text-right chavos-4xl">
            textura<br />
            <span class="italic leading-6">jacquard</span>
          </p>
          <p slot="content">
            Una textura
            <span class="italic">exquisita</span>
            que evoca naturaleza, disfruta de suaves hojas en relieve.
          </p>
        </VianneyCopy>
      </div> -->

      <!-- calidad premium -->
      <!-- izquierda => <div class="absolute bottom-0 left-0 w-2/6 ml-9"> -->
      <!--    arriba => <div class="absolute top-0 left-0 w-2/6 ml-9"> -->
      <div class="absolute top-0 left-0 w-3/6 lg:w-[27%] ml-9 overflow-hidden">
        <!-- <div class="absolute bottom-0 left-0 w-2/6 h-[30vh] ml-9 overflow-hidden"> -->
        <div class="w-full h-full flex relative">
          <div
            style="background-color: {mainColor};"
            class="w-full h-full absolute rounded-br-[50px]"
          />

          <div class="w-full h-full text-black relative p-8 pt-8">
            <div class="w-full flex mb-5">
              {#each { length: 5 } as _, i}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    class="w-5 h-5 xl:w-7 xl:h-7"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              {/each}
            </div>

            <p class="text-white chavos-bold-2xl xl:chavos-bold-3xl mb-2">
              calidad
            </p>
            <p class="text-white chavos-bold-2xl xl:chavos-bold-3xl mb-2">
              premium
            </p>
            <p class="text-white chavos-lg xl:chavos-xl">
              Línea exclusiva con materiales y tejidos premium en colores de
              tendencia, diseñados para combinar con cualquier producto.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- details -->
    <div class="w-5/12 h-full text-black">
      <div id="texture-part-{page.SKU}" class="w-full" style="height: 33%;">
        <!-- texture -->
        <div class="col-span-3 w-full h-full">
          <div class="w-full h-full relative">
            <OptimImg
              onClick={() =>
                handleImageClick(page.SKU, page.pageRelatedProducts)}
              imgClass="h-full w-full object-cover"
              source={`${URLS.fotos}${page.SKU}-3.webp`}
            />

            <div
              class="w-full h-full absolute top-0 pt-14 text-center"
              on:click={handleShowTexture}
            >
              <button
                style="background-color: {bgColor};"
                class="bottom-3 px-4 py-1.5 text-black rounded-xl chavos-lg h-fit"
              >
                {isShowingTexture ? "Ver ambiente" : "Ver textura"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="grid-content-{page.SKU}"
        class="w-full h-4/6 grid grid-cols-3 grid-rows-3 p-5"
      >
        <div class="col-span-1 corner-b corner-r w-full h-full relative">
          <div class="w-full text-black absolute bottom-3">
            <div class="w-full h-full">
              <!-- <img
                src="/images/copys/{currentCatalog === CATALOGS_ROUTES.VIANNEY
                  ? 'CambiaElLookConEstosComplementos'
                  : 'AgregaComplementosBlack'}.svg"
                loading="eager"
                alt=""
                class="w-full h-full {currentCatalog === CATALOGS_ROUTES.VIANNEY
                  ? 'scale-[0.8]'
                  : 'scale-150'}"
              /> -->
              <div class="w-full text-black absolute bottom-3">
                <div class="w-full flex mb-2">
                  {#each { length: 5 } as _, i}
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-7 h-7"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  {/each}
                </div>
                <p class="chavos-xs xs:chavos-3xl">materiales de</p>
                <p class="chavos-bold-xs xs:chavos-bold-3xl">calidad,</p>
                <p class="chavos-xs xs:chavos-3xl">texturas en</p>
                <p class="chavos-bold-xs xs:chavos-bold-3xl">tendencia</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-1 corner-b corner-r">
          <div class="w-full h-full">
            <OptimImg
              onClick={() =>
                handleImageClick(page.SKU, page.pageRelatedProducts)}
              imgClass="object-cover w-full h-full cursor-pointer"
              source={`${URLS.fotos}${page.complDecoration[0]}.webp`}
            />
          </div>
        </div>
        <div class="col-span-1 corner-b">
          <div class="w-full h-full">
            <OptimImg
              onClick={() =>
                handleImageClick(page.SKU, page.pageRelatedProducts)}
              imgClass="object-cover w-full h-full cursor-pointer"
              source={`${URLS.fotos}${page.complSheets[0]}.webp`}
            />
          </div>
        </div>
        <div class="col-span-1 corner-r corner-b">
          <div class="w-full h-full">
            <OptimImg
              onClick={() =>
                handleImageClick(page.SKU, page.pageRelatedProducts)}
              imgClass="object-cover w-full h-full cursor-pointer"
              source={`${URLS.fotos}${page.complCurtains[0]}.webp`}
            />
          </div>
        </div>
        <div class="col-span-2 row-span-2 p-1">
          <div class="w-full h-full overflow-hidden">
            <OptimImg
              onClick={() =>
                handleImageClick(page.SKU, page.pageRelatedProducts)}
              imgClass="object-cover w-full h-full cursor-pointer scale-[1.4]"
              source={`${URLS.fotos}${page.SKU}-2.webp`}
            />
          </div>
        </div>
        <div class="col-span-1 corner-r">
          <div class="w-full h-full">
            <OptimImg
              onClick={() =>
                handleImageClick(page.SKU, page.pageRelatedProducts)}
              imgClass="object-cover w-full h-full cursor-pointer"
              source={`${URLS.fotos}${page.complPillowCovers[0]}.webp`}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
