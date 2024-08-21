<script lang="ts">
  import ScrollDownArrows from "$lib/components/animations/ScrollDownArrows.svelte";
  import SectionsPaginationArrows from "$lib/components/navigation/SectionsPaginationArrows.svelte";
  import { COLORS, EnumEntradaInvierno } from "$lib/constants/strings";

  export let titleSvg: string;
  export let variant: string;
  export let storySvg: string = "";
  export let titleSize: string = "h-1/3 md:h-1/2";
  export let titlePosition: string = "";
  export let storyPosition: string = "";
  export let bgImage: string = "";
  export let bgVideo: string = "";
  export let bgColor: string = COLORS.beige;

  function getSectionNameByTitleSvg(): string {
    return titleSvg
      .replace("/images/invierno/copys/ENTRADA-", "")
      .replace("-TITULO.svg", "");
  }
  let portadillasConfigDesktop: Record<string, string> = {
    "P01-EVEREST": "bottom-0 h-1/2 right-0",
    "P02-FUNDA-DUVET": "bottom-0 h-1/2 right-0",
    "P03-AUSTRAL": "top-12 h-1/2 right-0",
    "P04-INVERNAL": "top-1/2 transform -translate-y-1/2 h-2/3 left-0",
    "P05-NORDICO": "bottom-0 h-2/3 right-0",
    "P06-LIGERO": "bottom-0 h-2/3 right-0",
    "P07-FRAZADAS": "bottom-0 w-2/3 right-0",
    "P08-COMPLEMENTOS": "top-5 right-0 w-1/2",
    "P09-BASICOS": "top-5 right-0 w-1/2",
    "P10-ACCESORIOS-PERSONALES": "bottom-5 right-0 w-1/2",
    "P11-DECORACION": "top-5 right-0 w-1/2",
    "P12-VIALITE": "bottom-0 right-0 h-1/2 md:bottom-5",
    "P13-MASCOTAS": "top-5 right-0 w-2/3 lg:w-[50%] xl:w-[40%]",
    "P14-CORTINAS": "bottom-5 right-0 w-1/2",
    "P15-NAVIDAD": "bottom-5 right-0 w-1/2",
    "P16-COMEDOR-Y-SALA-NAVIDAD": "bottom-5 right-0 w-full",
    "P17-BEBE": "top-5 right-0 w-1/2",
  };
</script>

<!-- MOBILE -->
<div style="background-color: {bgColor};" class="md:hidden relative w-screen">
  <SectionsPaginationArrows />

  <div class="flex flex-col space-y-1 min-h-fit relative">
    {#if variant === EnumEntradaInvierno.SOLO_FOTO || variant === EnumEntradaInvierno.SOLO_VIDEO}
      <!-- <div class="h-fit"> -->
      <div class="w-full h-[72vh]">
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
<div
  class="hidden md:block relative w-screen h-screen bg-cover bg-center bg-beige overflow-hidden"
>
  <!-- style={variant === EnumEntradaInvierno.SOLO_FOTO ||
  variant === EnumEntradaInvierno.SOLO_VIDEO
    ? "h-screen"
    : "h-[85vh]"} -->
  <SectionsPaginationArrows />

  <div class="flex relative w-full h-full">
    {#if variant === EnumEntradaInvierno.SOLO_FOTO || variant === EnumEntradaInvierno.SOLO_VIDEO}
      <div class="w-full h-screen">
        {#if variant === EnumEntradaInvierno.SOLO_FOTO}
          <img
            class="w-full h-full object-cover
            {titleSvg.includes('DECORACION') ||
            titleSvg.includes('MASCOTAS') ||
            titleSvg.includes('BEBE')
              ? ''
              : titleSvg.includes('VIALITE')
                ? 'object-bottom'
                : 'object-top'}"
            src={bgImage}
            alt=""
          />
        {:else if variant === EnumEntradaInvierno.SOLO_VIDEO}
          <div
            data-poster-url={bgVideo.replace("mp4", "jpg")}
            data-video-urls="{bgVideo},{bgVideo.replace(
              'VERTICAL.mp4',
              'HORIZONTAL.webm',
            )}"
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
              class="w-full h-full object-cover {titleSvg.includes('NAVIDAD')
                ? ''
                : titleSvg.includes('VIALITE')
                  ? 'object-bottom'
                  : 'object-top'}"
            >
              <source
                src={bgVideo.replace("VERTICAL", "HORIZONTAL")}
                data-wf-ignore="true"
              />
              <source
                src={bgVideo.replace("VERTICAL.mp4", "HORIZONTAL.webm")}
                data-wf-ignore="true"
              />
            </video>
          </div>
        {/if}

        <div
          class="z-20 absolute p-3 {portadillasConfigDesktop[
            getSectionNameByTitleSvg()
          ]}"
        >
          <img class="w-full h-full" src={titleSvg} alt="" />
        </div>

        {#if storySvg && storySvg !== ""}
          <div class="z-20 absolute h-1/3 bottom-0">
            <img class="w-full h-full" src={storySvg} alt="" />
          </div>
        {/if}
      </div>
    {/if}

    <!-- FOTO Y VIDEO -->
    {#if variant === EnumEntradaInvierno.FOTO_VIDEO || variant === EnumEntradaInvierno.VIDEO_FOTO}
      <div
        class="w-full h-full flex space-x-1.5 {variant ===
        EnumEntradaInvierno.VIDEO_FOTO
          ? 'space-x-reverse'
          : ''}"
        style={`flex-direction: ${variant === EnumEntradaInvierno.VIDEO_FOTO ? "row-reverse" : "row"};`}
      >
        <!-- video -->
        <div
          class="h-full w-[70vw] relative"
          data-poster-url={bgVideo.replace("mp4", "jpg")}
          data-video-urls="{bgVideo},{bgVideo.replace(
            'VERTICAL.mp4',
            'HORIZONTAL.webm',
          )}"
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
            <source
              src={bgVideo.replace("VERTICAL", "HORIZONTAL")}
              data-wf-ignore="true"
            />
            <source
              src={bgVideo.replace("VERTICAL.mp4", "HORIZONTAL.webm")}
              data-wf-ignore="true"
            />
          </video>

          <div
            class="z-20 absolute p-3 {portadillasConfigDesktop[
              getSectionNameByTitleSvg()
            ]}"
          >
            <img class="w-full h-full" src={titleSvg} alt="" />
          </div>
        </div>

        <!-- image -->
        <div class="h-full w-[30vw] relative">
          <img class="w-full h-full object-cover" src={bgImage} alt="" />

          {#if storySvg && storySvg !== ""}
            <div
              class="z-20 absolute
              {titleSvg.includes('LIGERO') ||
              titleSvg.includes('NORDICO') ||
              titleSvg.includes('FRAZADAS')
                ? 'bottom-10 h-1/3'
                : 'top-5'}"
            >
              <img class="w-full h-full" src={storySvg} alt="" />
            </div>
          {/if}
        </div>

        {#if titleSvg.includes("FUNDA-DUVET")}
          <div class="z-20 absolute h-1/5 top-[20%]">
            <img
              class="w-full h-full"
              src="/images/invierno/copys/ENTRADA-P02-FUNDA-DUVET-COPY2.svg"
              alt=""
            />
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>
