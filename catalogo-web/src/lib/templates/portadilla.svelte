<script lang="ts">
  import OptimImg from "$lib/components/OptimImg.svelte";
  import type { BiasiPage } from "$lib/constants/BiasiPages";
  import { onMount } from "svelte";

  export let page: BiasiPage;
  export let templateId: string;
  export let initAnimate = false;

  const classEachCategory = {
    amueblando:
      "text-black absolute flex flex-col mx-16 sm:mx-20 justify-center pb-3",
    descansando:
      "text-black absolute flex flex-col mx-16 sm:mx-20 justify-center md:ml-28 md:pb-32 pb-14 px-5",
    decorando:
      "text-black absolute flex flex-col mx-16 sm:mx-20 justify-center lg:-ml-5 pt-10 px-5",
    organizando:
      "text-black absolute flex flex-col mx-16 sm:mx-20 justify-center pb-12 px-1",
    cocinando:
      "text-black absolute flex flex-col mx-16 sm:mx-20 justify-center pb-8 pl-5 mx-22",
    lavando:
      "text-black absolute flex flex-col mx-16 sm:mx-20 justify-center pb-8 px-5",
    baño: "text-black absolute flex flex-col mx-16 sm:mx-20 justify-center pb-16 pl-3 mx-28",
  };

  const executeAnimation = async () => {};
  $: {
    if (initAnimate) {
      executeAnimation();
    }
  }

  onMount(() => {
    const scrollingElement = document.getElementById("scrolling-element");

    window.addEventListener("scroll", () => {
      // Calculate the amount to move the element up based on the scroll position
      const scrollY = window.scrollY;
      const translateY = -scrollY / 2; // Adjust this value as needed

      // Apply the transform CSS property to move the element up
      scrollingElement!.style.transform = `translateY(${translateY}px)`;
    });
  });
</script>

<link rel="preload" href={page.pageMainImage} as="image" />

<div class="div-block-19 sticky top-0" data-template-id={templateId}>
  <main id="smooth-content" class="main-wrapper-2] overflow-hidden">
    <div
      class="bg-center w-screen h-screen bg-cover justify-center items-center block relative object-contain bg-no-repeat"
      style={`background-image: url('${page.pageMainImage}')`}
    >
      <div id="scrolling-element" class="thanks-panel_contain">
        <div class="h-screen flex w-screen items-center justify-center">
          <div
            class="flex w-full items-center justify-center scale-110"
            data-visible-id={page.pageProductsInImage?.split(",")[0]}
          >
            <OptimImg source={page.pageResources} loading={"eager"} />
          </div>
        </div>
        <div class={classEachCategory[page.pageTitle]}>
          <span
            text-split=""
            letters-fade-in-random=""
            class="font-helvetica text-base lg:text-4xl md:text-2xl sm:text-xl -mb-2"
            >{page.pageSubtitle}</span
          >
          <span
            text-split=""
            letters-slide-up=""
            class="font-bold text-5xl lg:text-9xl md:text-8xl sm:text-7xl font-kepler mb-1"
            >{page.pageTitle}</span
          >
          <span
            text-split=""
            letters-fade-in-random=""
            class="font-helvetica text-xs lg:text-xl md:text-lg sm:text-base"
          >
            {page.pageCopys?.split(",")[0]}
          </span>
        </div>
      </div>
    </div>
  </main>
</div>
