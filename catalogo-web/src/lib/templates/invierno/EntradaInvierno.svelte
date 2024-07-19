<script lang="ts">
  import ScrollDownArrows from "$lib/components/animations/ScrollDownArrows.svelte";
  import { COLORS, EnumEntradaInvierno } from "$lib/constants/strings";

  export let titleSvg: string;
  export let storySvg: string;
  export let variant: string;
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

        <div class="z-20 absolute h-1/3 p-3 {titlePosition}">
          <img class="w-full h-full" src={titleSvg} alt="" />
        </div>

        <div class="z-20 absolute h-1/5 {storyPosition}">
          <img class="w-full h-full" src={storySvg} alt="" />
        </div>
      </div>
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
        <div class="w-full h-[30vh]">
          <img class="w-full h-full object-cover" src={bgImage} alt="" />
        </div>

        <!-- video -->
        <div
          data-poster-url={bgVideo.replace("mp4", "jpg")}
          data-video-urls="{bgVideo},{bgVideo.replace('mp4', 'webm')}"
          data-autoplay="true"
          data-loop="true"
          data-wf-ignore="true"
          class="w-full h-[40vh]"
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

        <!-- TODO aqui agregar el svg para el titulo y para el story -->
        <div class="z-20 absolute h-1/3 p-3 {titlePosition}">
          <img class="w-full h-full" src={titleSvg} alt="" />
        </div>

        <div class="z-20 absolute h-1/5 {storyPosition}">
          <img class="w-full h-full" src={storySvg} alt="" />
        </div>
      </div>
    {/if}
  </div>
</div>
<ScrollDownArrows backgroundColor={bgColor} />

<!-- DESKTOP -->
<!-- TODO -->
<div
  class="hidden md:block relative w-screen h-[85vh] bg-cover bg-center"
></div>
