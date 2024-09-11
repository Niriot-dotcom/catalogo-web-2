<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";

  export let templateId: string;
  export let page: DatabasePage;
  export let initAnimate = false;
  export let handleImageClick: (sku: string) => void;

  let playAnimation = false;
  let playDownAnimation = false;
  let playStaticAnimation = false;
  const executeAnimation = () => {
    setTimeout(() => {
      playAnimation = true;
      setTimeout(() => {
        playDownAnimation = true;
        setTimeout(() => {
          playStaticAnimation = true;
        }, 1500);
      }, 700);
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
  id="Macetas"
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
            class="row-span-2 pl-10 animate-down ease-in-out duration-500"
            data-visible-id={page.pageProducts?.split(",")[4]}
            class:animate-down-active={playDownAnimation}
            class:bounce={playStaticAnimation}
          >
            <OptimImg
              imgClass="w-full object-cover scale-150 cursor-pointer cursor-pointer"
              source={page.pageMainImage?.split(",")[4]}
              loading={"lazy"}
              onClick={(e) =>
                handleImageClick(page.pageProducts?.split(",")[4])}
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
            </div>
          </div>
          <div
            class="row-span-2 animate-down ease-in-out duration-500"
            data-visible-id={page.pageProducts?.split(",")[0]}
            class:animate-down-active={playDownAnimation}
            class:bounce={playStaticAnimation}
          >
            <OptimImg
              imgClass="w-full object-cover cursor-pointer"
              source={page.pageMainImage?.split(",")[0]}
              loading={"lazy"}
              onClick={(e) =>
                handleImageClick(page.pageProducts?.split(",")[0])}
            />
          </div>
          <div
            class="row-span-2 w-full h-[100%] inset-0 transform translate-y-full transition-transform duration-500 ease-out"
            data-visible-id={page.pageProducts?.split(",")[2]}
            class:animate-up={playAnimation}
            class:shake={playStaticAnimation}
          >
            <!-- ICONS -->
            <div class="absolute mx-7 max-w-fit bottom-[19vh] left-[5.5vw]">
              <img
                src={"https://storage.googleapis.com/catalogo-web/biasi/fotos/ICON-NU.webp"}
                loading="eager"
                alt=""
                class="object-contain w-[5vw]"
              />
            </div>
            <OptimImg
              imgClass="h-full w-full object-contain scale-150 cursor-pointer"
              source={page.pageMainImage?.split(",")[2]}
              loading={"lazy"}
              onClick={(e) =>
                handleImageClick(page.pageProducts?.split(",")[2])}
            />
          </div>
          <div class="h-full w-full"></div>
          <div
            class="w-[24vw] h-[40%] bottom-0 absolute animate-enter-left"
            data-visible-id={page.pageProducts?.split(",")[4]}
            class:animate-enter-left-active={playAnimation}
          >
            <OptimImg
              imgClass="w-full transform scale-x-[-1] cursor-pointer"
              source={page.pageMainImage?.split(",")[1]}
              loading={"lazy"}
              onClick={(e) =>
                handleImageClick(page.pageProducts?.split(",")[1])}
            />
          </div>
          <div
            class="w-[40vw] h-[60%] bottom-0 left-[60vw] absolute flex items-end animate-enter-right"
            data-visible-id={page.pageProducts?.split(",")[3]}
            class:animate-enter-right-active={playAnimation}
          >
            <!-- ICONS -->
            <div class="absolute mx-7 max-w-fit bottom-[8rem] right-[28vw]">
              <img
                src={"https://storage.googleapis.com/catalogo-web/biasi/fotos/ICON-NU.webp"}
                loading="eager"
                alt=""
                class="object-contain w-[5vw]"
              />
            </div>
            <OptimImg
              imgClass="w-full scale-125 cursor-pointer"
              source={page.pageMainImage?.split(",")[3]}
              loading={"lazy"}
              onClick={(e) =>
                handleImageClick(page.pageProducts?.split(",")[3])}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- MOBILE -->
<div
  id="Macetas"
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
                <div class="h-full col-span-8 row-span-2 z-10">
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
                </div>

                <div
                  class="h-full col-span-4 row-span-4 animate-down ease-in-out duration-500"
                  data-visible-id={page.pageProducts?.split(",")[0]}
                  class:animate-down-active={playAnimation}
                  class:bounce={playStaticAnimation}
                >
                  <OptimImg
                    imgClass="h-full object-cover cursor-pointer"
                    source={page.pageMainImage?.split(",")[0]}
                    loading={"lazy"}
                    onClick={(e) =>
                      handleImageClick(page.pageProducts?.split(",")[0])}
                  />
                </div>

                <div
                  class="h-full col-span-4 row-span-4 opacity-0 transform transition-transform ease-out"
                  data-visible-id={page.pageProducts?.split(",")[4]}
                  class:fade-enter-active={playAnimation}
                  class:bounce={playStaticAnimation}
                >
                  <OptimImg
                    imgClass="h-full object-cover scale-125 ml-5 cursor-pointer"
                    source={page.pageMainImage?.split(",")[4]}
                    loading={"lazy"}
                    onClick={(e) =>
                      handleImageClick(page.pageProducts?.split(",")[4])}
                  />
                </div>

                <div
                  class="h-full col-span-8 row-span-2 flex justify-end animate-enter-right"
                  data-visible-id={page.pageProducts?.split(",")[3]}
                  class:animate-enter-right-active={playAnimation}
                >
                  <!-- ICONS -->
                  <div class="absolute mx-7 max-w-fit top-[-1vh] right-[10vw]">
                    <img
                      src={"https://storage.googleapis.com/catalogo-web/biasi/fotos/ICON-NU.webp"}
                      loading="eager"
                      alt=""
                      class="object-contain w-[12vw]"
                    />
                  </div>
                  <OptimImg
                    imgClass="h-full object-contain scale-[2] cursor-pointer"
                    source={page.pageMainImage?.split(",")[3]}
                    loading={"lazy"}
                    onClick={(e) =>
                      handleImageClick(page.pageProducts?.split(",")[3])}
                  />
                </div>
              </div>
            </div>

            <div class="h-[30%]">
              <div class="h-full grid grid-cols-12 grid-rows-1">
                <div class="h-full col-span-5 mt-3">
                  <div
                    class="transform scale-x-[-1]"
                    data-visible-id={page.pageProducts?.split(",")[1]}
                  >
                    <div
                      class="animate-enter-right"
                      class:animate-enter-right-active={playAnimation}
                    >
                      <OptimImg
                        imgClass="h-full object-contain scale-[1.2] cursor-pointer"
                        source={page.pageMainImage?.split(",")[1]}
                        loading={"lazy"}
                        onClick={(e) =>
                          handleImageClick(page.pageProducts?.split(",")[1])}
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="h-full col-span-7 animate-enter-right"
                  data-visible-id={page.pageProducts?.split(",")[2]}
                  class:animate-enter-right-active={playAnimation}
                >
                  <!-- ICONS -->
                  <div class="absolute mx-7 max-w-fit bottom-[6vh] left-[-2vw]">
                    <img
                      src={"https://storage.googleapis.com/catalogo-web/biasi/fotos/ICON-NU.webp"}
                      loading="eager"
                      alt=""
                      class="object-contain w-[12vw]"
                    />
                  </div>
                  <OptimImg
                    imgClass="h-full object-contain scale-150 cursor-pointer"
                    source={page.pageMainImage?.split(",")[2]}
                    loading={"lazy"}
                    onClick={(e) =>
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
