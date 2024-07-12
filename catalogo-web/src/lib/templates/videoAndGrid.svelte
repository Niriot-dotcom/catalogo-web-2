<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import type { BiasiPage } from "$lib/constants/BiasiPages";

  export let page: BiasiPage;
  export let initAnimate = false;
  export let templateId: string;
  export let selectedProduct: null | string;
  const handleImageClick = (e, sku) => {
    selectedProduct = sku;
  };

  let showVideo = false;
  let showGrid = false;
  let showText = false;
  const executeAnimation = () => {
    setTimeout(() => {
      showVideo = true;
      showGrid = true;
      setTimeout(() => {
        showText = true;
      }, 300);
    }, 300);

    initAnimate = false;
  };
  $: {
    if (initAnimate) {
      executeAnimation();
    }
  }

  let numProducts = page.pageProducts?.split(",").length || 0;
</script>

<!-- DESKTOP -->
<div
  class="hidden lg:block section-height sticky top-0 z-10"
  data-template-id={templateId}
>
  <div class="sticky-element">
    <div
      class="w-screen h-screen text-black font-helvetica bg-[url('/images/biasi/background-multiusos.png')] bg-no-repeat bg-cover"
    >
      <div class="grid grid-flow-row-dense grid-cols-5 grid-rows-1">
        <div
          class="px-8 py-24 w-full h-screen flex flex-col col-span-2 border-r-4 border-[#00614B]"
        >
          <div id="texts" class="px-8 mb-4">
            <p text-split="" letters-slide-down="" class="text-xl">
              {page.pageSubtitle}
            </p>
            <p text-split="" letters-slide-down="" class="text-5xl">
              {page.pageTitle}
            </p>
            <p text-split="" letters-slide-down="" class="text-lg">
              {page.pageCopys?.split(",")[0]}
            </p>
          </div>

          <div
            class="h-full flex items-start inset-0 transform translate-y-full transition-transform duration-500 ease-out"
            class:animate-up={showVideo}
            data-visible-id={page.pageProducts?.split(",")}
          >
            <video
              id="7b732aeb-25d4-e088-b75e-87da51e1cfbb-video"
              autoplay={true}
              loop={true}
              muted={true}
              playsinline={true}
              data-wf-ignore="true"
              data-object-fit="cover"
              class="object-cover"
            >
              <source src={page.pageMainVideo} data-wf-ignore={true} />
              <source
                src={page.pageMainVideo?.replace("mp4", "webm")}
                data-wf-ignore={true}
              />
            </video>
          </div>
        </div>

        <div class="px-8 py-24 h-screen flex flex-col col-span-3">
          <div id="texts" class="px-8">
            <div id="text">
              <p
                class="text-3xl mt-4 opacity-0 transform transition-transform ease-out"
                class:fade-enter-active={showText}
              >
                Descubre más usos
              </p>
            </div>
          </div>

          <!-- GRID -->
          {#if numProducts === 4}
            <div class="mt-3 grid grid-cols-2 grid-rows-2 gap-3 max-h-[65vh]">
              {#each { length: numProducts } as _, i}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                <div
                  class="w-full h-full flex items-center justify-center overflow-hidden"
                >
                  <div
                    class="relative w-full h-full cursor-pointer"
                    data-visible-id={page.pageProducts?.split(",")[i]}
                    on:click|preventDefault={(e) =>
                      handleImageClick(e, page.pageProducts?.split(",")[i])}
                  >
                    <OptimImg
                      imgClass="w-full h-full object-contain"
                      source={page.pageImages?.split(",")[i * 3]}
                      loading={"lazy"}
                    />
                  </div>
                </div>
              {/each}
            </div>
          {:else}
            <div
              class="mt-3 grid grid-cols-2 grid-rows-1 gap-3 h-full w-full inset-0 transform -translate-y-[120%] transition-transform duration-500 ease-out"
              class:animate-up={showGrid}
            >
              {#each { length: numProducts } as _, i}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                <div
                  class="w-full h-full flex items-center justify-center overflow-hidden"
                >
                  <div
                    class="relative w-full h-full cursor-pointer"
                    data-visible-id={page.pageProducts?.split(",")[i]}
                    on:click|preventDefault={(e) =>
                      handleImageClick(e, page.pageProducts?.split(",")[i])}
                  >
                    <OptimImg
                      imgClass="w-full h-full object-contain"
                      source={page.pageImages?.split(",")[i * 3]}
                      loading={"lazy"}
                    />
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- MOBILE -->
<div class="lg:hidden h-screen sticky top-0 z-10" data-template-id={templateId}>
  <div class="sticky-element h-full">
    <div
      class="h-screen text-black font-helvetica bg-[url('/images/biasi/background-multiusos.png')]"
    >
      <div class="w-screen h-screen grid grid-cols-1 grid-rows-2">
        <!--  -->
        <div class="container">
          <div class="px-8 mb-4">
            <p text-split="" letters-slide-down="" class="text-lg">
              {page.pageSubtitle}
            </p>
            <p text-split="" letters-slide-down="" class="text-4xl">
              {page.pageTitle}
            </p>
            <p text-split="" letters-slide-down="" class="text-base">
              {page.pageCopys?.split(",")[0]}
            </p>
          </div>

          <div
            class="row-span-2 h-full flex items-start"
            data-visible-id={page.pageProducts}
          >
            <video
              id="7b732aeb-25d4-e088-b75e-87da51e1cfbb-video"
              autoplay={true}
              loop={true}
              muted={true}
              playsinline={true}
              data-wf-ignore="true"
              data-object-fit="cover"
              class="object-cover"
            >
              <source src={page.pageMainVideo} data-wf-ignore={true} />
              <source
                src={page.pageMainVideo?.replace("mp4", "webm")}
                data-wf-ignore={true}
              />
            </video>
          </div>
        </div>

        <!--  -->
        <div class="container">
          <div class="px-8 mb-4">
            <p text-split="" words-slide-up="" class="text-xl tracking-wide">
              Descubre más usos
            </p>
          </div>

          <div>
            {#if numProducts === 4}
              <div class="mt-3 grid grid-cols-2 grid-rows-2 gap-3 max-h-[65vh]">
                {#each { length: numProducts } as _, i}
                  <div
                    class="w-full h-full flex items-center justify-center overflow-hidden"
                    data-visible-id={page.pageProducts?.split(",")[i]}
                    on:click|preventDefault={(e) =>
                      handleImageClick(e, page.pageProducts?.split(",")[i])}
                  >
                    <div class="relative w-full h-full cursor-pointer">
                      <OptimImg
                        imgClass="w-full h-full object-contain"
                        source={page.pageImages?.split(",")[i * 3]}
                        loading={"lazy"}
                      />
                    </div>
                  </div>
                {/each}
              </div>
            {:else}
              <div
                class="mt-3 grid grid-cols-2 grid-rows-1 gap-3 h-full w-full"
              >
                {#each { length: numProducts } as _, i}
                  <div
                    class="w-full h-full flex items-center justify-center overflow-hidden"
                    data-visible-id={page.pageProducts?.split(",")[i]}
                    on:click|preventDefault={(e) =>
                      handleImageClick(e, page.pageProducts?.split(",")[i])}
                  >
                    <div class="relative w-full h-full cursor-pointer">
                      <OptimImg
                        imgClass="w-full h-full object-cover"
                        source={page.pageImages?.split(",")[i * 3]}
                        loading={"lazy"}
                      />
                    </div>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</div>
