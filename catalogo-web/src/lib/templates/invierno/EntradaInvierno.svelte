<script lang="ts">
  import ScrollDownArrows from "$lib/components/animations/ScrollDownArrows.svelte";
  import { COLORS, EnumEntradaInvierno } from "$lib/constants/strings";

  export let titleSvg: string;
  export let variant: string;
  export let storySvg: string = "";
  export let titleSize: string = "h-1/3";
  export let titlePosition: string = "";
  export let storyPosition: string = "";
  export let bgImage: string = "";
  export let bgVideo: string = "";
  export let bgColor: string = COLORS.beige;
</script>

<!-- MOBILE -->
<div style="background-color: {bgColor};" class="md:hidden relative w-screen">
  <div class="flex flex-col space-y-1 min-h-fit relative">
    {#if variant === EnumEntradaInvierno.SOLO_FOTO || variant === EnumEntradaInvierno.SOLO_VIDEO}
      <!-- <div class="h-fit"> -->
      <div class="w-full h-[70vh]">
        {#if variant === EnumEntradaInvierno.SOLO_FOTO}
          <img class="w-full h-full object-cover" src={bgImage} alt="" />
        {:else if variant === EnumEntradaInvierno.SOLO_VIDEO}
          <div
            data-poster-url={bgVideo.replace("mp4", "jpg")}
            data-video-urls="{bgVideo},{bgVideo.replace('mp4', 'webm')}"
            data-autoplay="true"
            data-loop="true"
            data-wf-ignore="true"
            class="w-full h-full"
          >
            <video
              autoplay
              loop
              muted
              playsinline
              style="background-image: url(&quot;{bgVideo.replace(
                'mp4',
                'jpg',
              )}&quot;)"
              data-wf-ignore="true"
              class="w-full h-full object-cover"
            >
              <source src={bgVideo} data-wf-ignore="true" />
              <source
                src={bgVideo.replace("mp4", "webm")}
                data-wf-ignore="true"
              />
            </video>
          </div>
        {/if}

        <div class="z-20 absolute p-3 {titlePosition} {titleSize}">
          <img class="w-full h-full" src={titleSvg} alt="" />
        </div>

        {#if storySvg && storySvg !== ""}
          <div class="z-20 absolute h-1/5 {storyPosition}">
            <img class="w-full h-full" src={storySvg} alt="" />
          </div>
        {/if}
      </div>

      <!-- TODO -->
      <!-- <div class="h-fit">
          <ScrollDownArrows backgroundColor={bgColor} />
        </div>
      </div> -->
    {/if}

    <!-- FOTO Y VIDEO -->
    {#if variant === EnumEntradaInvierno.FOTO_VIDEO || variant === EnumEntradaInvierno.VIDEO_FOTO}
      <div
        class="w-full flex space-y-1 {variant === EnumEntradaInvierno.VIDEO_FOTO
          ? 'space-y-reverse'
          : ''}"
        style={`flex-direction: ${variant === EnumEntradaInvierno.VIDEO_FOTO ? "column-reverse" : "column"};`}
      >
        <!-- image -->
        <div class="w-full h-[60vh]">
          <img class="w-full h-full object-cover" src={bgImage} alt="" />
        </div>

        <!-- video -->
        <div
          class="w-full h-[30vh]"
          data-poster-url={bgVideo.replace("mp4", "jpg")}
          data-video-urls="{bgVideo},{bgVideo.replace('mp4', 'webm')}"
          data-autoplay="true"
          data-loop="true"
          data-wf-ignore="true"
        >
          <video
            autoplay
            loop
            muted
            playsinline
            style="background-image: url(&quot;{bgVideo.replace(
              'mp4',
              'jpg',
            )}&quot;)"
            data-wf-ignore="true"
            class="w-full h-full object-cover"
          >
            <source src={bgVideo} data-wf-ignore="true" />
            <source
              src={bgVideo.replace("mp4", "webm")}
              data-wf-ignore="true"
            />
          </video>
        </div>

        <div class="z-20 absolute p-3 {titlePosition} {titleSize}">
          <img class="w-full h-full" src={titleSvg} alt="" />
        </div>

        {#if storySvg && storySvg !== ""}
          <div class="z-20 absolute h-1/5 {storyPosition}">
            <img class="w-full h-full" src={storySvg} alt="" />
          </div>
        {/if}

        {#if titleSvg.includes("FUNDA-DUVET")}
          <div class="z-20 absolute h-1/5 top-[55%]">
            <img
              class="w-full h-full"
              src="/images/invierno/copys/ENTRADA-P02-FUNDA-DUVET-COPY2.svg"
              alt=""
            />
          </div>
        {/if}

        <div class="z-20 absolute bottom-24">
          <ScrollDownArrows backgroundColor="transparent" />
        </div>
      </div>
    {/if}
  </div>
</div>

<!-- DESKTOP -->
<!-- TODO -->
<div
  class="hidden md:block relative w-screen h-[85vh] bg-cover bg-center"
></div>
