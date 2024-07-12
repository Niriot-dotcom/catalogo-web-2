<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { COLORS, URLS } from "$lib/constants/strings";

  export let page: DatabasePage;
  export let templateId: string;
  export let handleImageClick: (sku: string, relatedProds: string[]) => void;
  let bgColor =
    page.pageResources &&
    page.pageResources.length > 0 &&
    page.pageResources[0] !== "#"
      ? page.pageResources[0]
      : COLORS.beige;
</script>

<!-- MOBILE -->
<div
  style="background-color: {bgColor};"
  class="md:hidden pt-10 overflow-x-hidden w-screen"
>
  <!-- text header -->
  <div class="text-black px-5 text-center">
    <p class="chavos-5xl xs:chavos-6xl">{page.pageTitle}</p>
    <p class="chavos-base xs:chavos-lg italic">{page.pageSubtitle}</p>
  </div>

  <!-- images -->
  <div class="h-[85vh] w-full pt-2 relative">
    <!-- main image -->
    <div class="h-[70vh] w-full">
      <OptimImg
        onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
        imgClass="object-cover w-full h-full"
        source={`${URLS.fotos}${page.SKU}.webp`}
      />
    </div>

    <!-- 2nd view image -->
    <div class="w-full h-[28vh] bottom-0 absolute flex justify-center">
      <div class="w-5/6 flex space-x-1">
        <div class="w-1/2 h-full relative">
          <OptimImg
            onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
            imgClass={page.pageTitle.toLowerCase().includes("duvet")
              ? "object-contain w-full h-full"
              : "object-cover h-full"}
            source={`${URLS.fotos}${page.SKU}-3.webp`}
          />
        </div>

        <div class="w-1/2 h-full relative">
          <OptimImg
            onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
            imgClass={page.pageTitle.toLowerCase().includes("duvet")
              ? "object-contain w-full h-full"
              : "object-cover h-full"}
            source={`${URLS.fotos}${page.SKU}-2.webp`}
          />
        </div>
      </div>
    </div>
  </div>

  <!-- other views -->
  <!-- text header -->
  <div class="mt-5 mb-8 mx-5 h-[30vh]">
    <div
      class="grid grid-rows-2 grid-cols-6 w-full h-full gap-1 justify-items-center overflow-hidden"
    >
      <!-- first row, 2 elements -->
      <div class="col-span-2">
        <OptimImg
          onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
          imgClass={page.pageTitle.toLowerCase().includes("duvet")
            ? "object-contain w-full h-full"
            : "object-cover h-full"}
          source={`${URLS.fotos}${page.SKU}-2.webp`}
        />
      </div>
      <div class="col-span-4">
        <OptimImg
          onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
          imgClass={page.pageTitle.toLowerCase().includes("duvet")
            ? "object-contain w-full h-full"
            : "object-cover h-full"}
          source={`${URLS.fotos}${page.SKU}-2.webp`}
        />
      </div>

      <!-- second row, 1 element -->
      <div class="col-span-6">
        <OptimImg
          onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
          imgClass={page.pageTitle.toLowerCase().includes("duvet")
            ? "object-contain w-full h-full"
            : "object-cover h-full"}
          source={`${URLS.fotos}${page.SKU}-2.webp`}
        />
      </div>
    </div>
  </div>
</div>

<!-- DESKTOP -->
<div
  data-template-id={templateId}
  style="background-color: {bgColor};"
  class="hidden md:block w-screen h-screen overflow-hidden"
>
  <div class="w-full h-full flex space-x-1">
    <!-- details -->
    <div class="w-3/12 h-full text-black py-16">
      <div class="w-full h-full grid grid-rows-3 gap-y-3">
        <div class="w-full h-full px-5">
          <OptimImg
            onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
            imgClass="object-cover w-full h-full cursor-pointer"
            source={`${URLS.fotos}${page.SKU}.webp`}
          />
        </div>
        <div class="w-full h-full px-5">
          <OptimImg
            onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
            imgClass="object-cover w-full h-full cursor-pointer"
            source={`${URLS.fotos}${page.SKU}.webp`}
          />
        </div>
        <div class="w-full h-full px-5">
          <OptimImg
            onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
            imgClass="object-cover w-full h-full cursor-pointer"
            source={`${URLS.fotos}${page.SKU}.webp`}
          />
        </div>
      </div>
    </div>

    <!-- main image -->
    <div class="w-9/12 h-full relative">
      <div class="w-full h-full">
        <OptimImg
          onClick={() => handleImageClick(page.SKU, page.pageRelatedProducts)}
          imgClass="w-full h-full object-cover"
          source={`${URLS.fotos}${page.SKU}.webp`}
        />
      </div>

      <div class="absolute mt-32 mr-8 top-0 left-0 w-2/6">
        <div class="w-full h-full flex relative">
          <!-- text -->
          <div class="w-full h-full text-center absolute">
            <p class="chavos-4xl xs:chavos-6xl">{page.pageTitle}</p>
            <p class="chavos-sm xs:chavos-base">{page.pageSubtitle}</p>
          </div>
        </div>
      </div>

      <!-- texture -->
      <div class="absolute top-0 right-0 w-3/12 h-[50vh] mr-24 rounded-b-3xl">
        <div class="w-full h-full flex relative">
          <div
            style={`background-image: url('${URLS.fotos}${page.SKU}-2-1280.webp')`}
            class="w-full h-full rounded-b-full"
          />
        </div>
      </div>
    </div>
  </div>
</div>
