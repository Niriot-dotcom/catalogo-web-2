<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import type { BiasiPage } from "$lib/constants/BiasiPages";

  export let templateId: string;
  export let initAnimate = false;
  export let page: BiasiPage;
  export let handleImageClick: (sku: string) => void;

  let playAnimation = false;
  const executeAnimation = () => {
    setTimeout(() => {
      playAnimation = true;
    }, 500);
  };

  $: {
    if (initAnimate) {
      executeAnimation();
    }
  }
</script>

<!-- DESKTOP -->
<div
  id="Utensilios"
  class="hidden lg:block section-height sticky top-0 z-10"
  data-template-id={templateId}
>
  <div class="sticky-element">
    <div class="track">
      <div class="track-flex">
        <div
          class="h-screen w-screen grid grid-cols-3 grid-rows-3"
          style={`background-color: ${page.pageResources || "#fff"}`}
        >
          <div
            class="row-span-2 pl-10 animate-enter-left"
            data-visible-id={page.pageProducts?.split(",")[1]}
            class:animate-enter-left-active={playAnimation}
          >
            <OptimImg
              imgClass="w-full object-cover cursor-pointer"
              source={page.pageMainImage?.split(",")[4]}
              loading={"lazy"}
              onClick={() => handleImageClick(page.pageProducts?.split(",")[1])}
            />
          </div>
          <div class="">
            <div class="row-span-1 flex">
              <div class="text-black flex flex-col mx-7 mt-7">
                <span
                  class="font-helvetica text-5xl lg:text-7xl md:text-5xl sm:text-5xl"
                  >{page.pageTitle}</span
                >
                <span
                  class="font-helvetica uppercase font-bold text-base lg:text-3xl md:text-xl sm:text-lg"
                  >{page.pageSubtitle}</span
                >
                {#if page.pageCopys && page.pageCopys.split(",")}
                  {#each page.pageCopys?.split(",") as copy, i}
                    <span
                      class="font-helvetica text-base lg:text-2xl md:text-xl sm:text-base"
                      >{copy}</span
                    >
                  {/each}
                {/if}
              </div>

              <!-- ICONS -->
              <div class="min-w-[10vw] mt-7">
                {#each page.pageIcons.split(",") as iconUrl, iconIndex}
                  {#if page.pageIcons && page.pageIcons.length > 0 && page.pageIcons
                      .split(",")
                      [iconIndex]?.includes(".webp")}
                    <img
                      src={iconUrl}
                      loading="eager"
                      alt=""
                      class="object-contain min-w-[30%] w-[100vh] h-[10vh]"
                    />
                  {/if}
                {/each}
              </div>
            </div>
          </div>
          <div
            class="row-span-2 animate-enter-right"
            data-visible-id={page.pageProducts?.split(",")[0]}
            class:animate-enter-right-active={playAnimation}
          >
            <OptimImg
              imgClass="w-full object-cover cursor-pointer"
              source={page.pageMainImage?.split(",")[0]}
              loading={"lazy"}
              onClick={() => handleImageClick(page.pageProducts?.split(",")[0])}
            />
          </div>
          <div
            class="row-span-2 w-full h-[100%] inset-0 transform translate-y-full transition-transform duration-500 ease-out"
            data-visible-id={page.pageProducts?.split(",")[3]}
            class:animate-up={playAnimation}
          >
            <OptimImg
              imgClass="h-full w-full object-contain scale-90 cursor-pointer"
              source={page.pageMainImage?.split(",")[2]}
              loading={"lazy"}
              onClick={() => handleImageClick(page.pageProducts?.split(",")[3])}
            />
          </div>
          <div
            class="h-full w-full animate-enter-left"
            data-visible-id={page.pageProducts?.split(",")[4]}
            class:animate-enter-left-active={playAnimation}
          >
            <OptimImg
              imgClass="h-full w-full object-cover cursor-pointer"
              source={page.pageMainImage?.split(",")[1]}
              loading={"lazy"}
              onClick={() => handleImageClick(page.pageProducts?.split(",")[4])}
            />
          </div>
          <div
            class="mb-16 mr-16 animate-enter-right"
            data-visible-id={page.pageProducts?.split(",")[2]}
            class:animate-enter-right-active={playAnimation}
          >
            <OptimImg
              imgClass="h-full w-full object-cover scale-125 cursor-pointer"
              source={page.pageMainImage?.split(",")[3]}
              loading={"lazy"}
              onClick={() => handleImageClick(page.pageProducts?.split(",")[2])}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- MOBILE -->
<div
  id="Utensilios"
  class="lg:hidden section-height sticky top-0 z-10"
  data-template-id={templateId}
>
  <div class="sticky-element">
    <div class="track">
      <div class="track-flex">
        <div
          class="h-screen w-screen"
          style={`background-color: ${page.pageResources || "#fff"}`}
        >
          <div class="w-full h-[90%]">
            <div class="h-[70%]">
              <div class="h-full grid grid-cols-12 grid-rows-6">
                <!-- texts -->
                <div class="h-full col-span-8 row-span-2">
                  <div class="text-black flex flex-col mx-7 mt-7">
                    <span
                      class="font-helvetica text-5xl lg:text-7xl md:text-5xl sm:text-5xl"
                      >{page.pageTitle}</span
                    >
                    <span
                      class="font-helvetica uppercase font-bold text-base lg:text-3xl md:text-xl sm:text-lg"
                      >{page.pageSubtitle}</span
                    >
                    {#if page.pageCopys && page.pageCopys.split(",")}
                      {#each page.pageCopys?.split(",") as copy, i}
                        <span
                          class="font-helvetica text-base lg:text-2xl md:text-xl sm:text-base"
                          >{copy}</span
                        >
                      {/each}
                    {/if}
                  </div>

                  <!-- ICONS -->
                  <div class="mt-3 mx-7 max-w-fit">
                    {#each page.pageIcons.split(",") as iconUrl, iconIndex}
                      {#if page.pageIcons && page.pageIcons.length > 0 && page.pageIcons
                          .split(",")
                          [iconIndex]?.includes(".webp")}
                        <img
                          src={iconUrl}
                          loading="eager"
                          alt=""
                          class="object-contain h-[10vh]"
                        />
                      {/if}
                    {/each}
                  </div>
                </div>

                <div
                  class="h-full w-auto col-span-4 row-span-4 flex items-center mr-12 justify-start scale-[2.5]"
                  data-visible-id={page.pageProducts?.split(",")[0]}
                >
                  <div
                    class="animate-down ease-in-out duration-500"
                    class:animate-down-active={playAnimation}
                  >
                    <OptimImg
                      imgClass="w-full object-contain cursor-pointer"
                      source={page.pageMainImage?.split(",")[0]}
                      loading={"lazy"}
                      onClick={() =>
                        handleImageClick(page.pageProducts?.split(",")[0])}
                    />
                  </div>
                </div>

                <div
                  class="h-full col-span-4 row-span-4 flex items-center ml-12 w-full animate-enter-left"
                  data-visible-id={page.pageProducts?.split(",")[1]}
                  class:animate-enter-left-active={playAnimation}
                >
                  <OptimImg
                    imgClass="w-full object-cover cursor-pointer scale-[1.5]"
                    source={page.pageMainImage?.split(",")[4]}
                    loading={"lazy"}
                    onClick={() =>
                      handleImageClick(page.pageProducts?.split(",")[1])}
                  />
                </div>

                <div
                  class="h-full col-span-8 row-span-2 flex justify-end animate-enter-right"
                  data-visible-id={page.pageProducts?.split(",")[3]}
                  class:animate-enter-right-active={playAnimation}
                >
                  <OptimImg
                    imgClass="w-full object-contain cursor-pointer"
                    source={page.pageMainImage?.split(",")[2]}
                    loading={"lazy"}
                    onClick={() =>
                      handleImageClick(page.pageProducts?.split(",")[3])}
                  />
                </div>
              </div>
            </div>

            <div class="h-[30%]">
              <div class="h-full grid grid-cols-12 grid-rows-1">
                <div
                  class="h-full col-span-5 flex items-start animate-enter-left"
                  data-visible-id={page.pageProducts?.split(",")[1]}
                  class:animate-enter-left-active={playAnimation}
                >
                  <OptimImg
                    imgClass="w-full object-contain cursor-pointer"
                    source={page.pageMainImage?.split(",")[0]}
                    loading={"lazy"}
                    onClick={() =>
                      handleImageClick(page.pageProducts?.split(",")[1])}
                  />
                </div>
                <div
                  class="h-full col-span-7 flex items-end animate-enter-right"
                  data-visible-id={page.pageProducts?.split(",")[2]}
                  class:animate-enter-right-active={playAnimation}
                >
                  <OptimImg
                    imgClass="w-full object-contain cursor-pointer"
                    source={page.pageMainImage?.split(",")[3]}
                    loading={"lazy"}
                    onClick={() =>
                      handleImageClick(page.pageProducts?.split(",")[2])}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
