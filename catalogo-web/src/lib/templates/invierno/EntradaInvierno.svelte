<script lang="ts">
  import ScrollDownArrows from "$lib/components/animations/ScrollDownArrows.svelte";

  export let backgroundVideo: string;
  export let backgroundImage: string;
  export let backgroundColor: string;
  export let textImage: string;
  export let storyMainPhrase: string;
  export let storyCopy: string;
</script>

<div
  style="background-color: {backgroundColor};"
  class="md:hidden relative w-screen"
>
  <div class="flex flex-col space-y-1 min-h-fit relative">
    <!-- history image -->
    <div class="w-full h-[35vh]">
      <img class="w-full h-full object-cover" src={backgroundImage} alt="" />
    </div>

    <!-- video -->
    <div class="w-full h-[45vh]">
      <div
        data-poster-url={backgroundVideo.replace("mp4", "jpg")}
        data-video-urls="{backgroundVideo},{backgroundVideo.replace(
          'mp4',
          'webm',
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
          style="background-image: url(&quot;{backgroundVideo.replace(
            'mp4',
            'jpg',
          )}&quot;)"
          data-wf-ignore="true"
          class="w-full h-full object-cover"
        >
          <source src={backgroundVideo} data-wf-ignore="true" />
          <source
            src={backgroundVideo.replace("mp4", "webm")}
            data-wf-ignore="true"
          />
        </video>
      </div>
    </div>

    <!-- story box -->
    <div
      class="absolute -rotate-3 min-w-fit min-h-fit top-[27vh] left-0 w-fit py-6 px-3 z-10 overflow-hidden border whitespace-nowrap"
    >
      <!-- bg-[url('/images/invierno/recursos/PLECA_GRIS.svg')] bg-no-repeat bg-cover" -->
      <p class="title leading-none text-right text-black">
        {@html storyMainPhrase}
      </p>
      <p class="chavos-lg text-right text-black">{@html storyCopy}</p>

      <!-- TODO otra opcion -->
      <!-- <div class="w-full h-full border border-blue-400">
        <div class="absolute w-full h-full top-0 left-0">
          <img class="" src="/images/invierno/recursos/PLECA_GRIS.svg" alt="" />
        </div>

        <div
          class="absolute top-0 left-0 min-w-fit min-h-fit py-6 px-3 z-10 whitespace-nowrap"
        >
          <p class="title leading-none text-right text-black">
            {@html storyMainPhrase}
          </p>
          <p class="chavos-lg text-right text-black">{@html storyCopy}</p>
        </div>
      </div> -->
      <!--  -->
    </div>

    <!-- -rotate-3 min-w-fit min-h-fit top-[27vh] left-0 w-fit py-6 px-3 z-10 overflow-hidden border whitespace-nowrap -->
    <!-- <div
      class="absolute inset-0 top-[27vh] left-0 flex items-center justify-center"
    >
      <div class="bg-gray-200 w-full h-full">
        <div class="absolute inset-0 flex items-center justify-center">
          <p class="text-white text-lg">
            Primer div absoluto dentro del div que se expande
          </p>
        </div>

        <div class="absolute inset-0 flex items-center justify-center">
          <p class="text-white text-lg">
            Segundo div absoluto dentro del div que se expande
          </p>
        </div>
      </div>
    </div> -->
    <!--  -->
  </div>

  <!-- section text -->
  <div class="z-20 absolute h-1/3 bottom-0 ml-3">
    <img class="w-full h-full" src={textImage} alt="" />
  </div>
</div>
<ScrollDownArrows {backgroundColor} />

<!-- DESKTOP -->
<div class="hidden md:block relative w-screen h-[85vh] bg-cover bg-center">
  <div class="w-10/12 h-full">
    <video
      autoplay
      loop
      muted
      playsinline
      src={backgroundVideo}
      class="w-full h-full object-cover"
    ></video>
  </div>

  <div class="absolute w-4/12 mr-12 top-0 text-right right-0 text-black">
    <div class="mx-6">
      <img src={textImage} loading="eager" alt="" class="h-full" />
    </div>
  </div>

  <div
    class="absolute bottom-0 left-0 rounded-3xl w-5/12 bg-white px-16 py-12 mb-4 ml-8 z-10 overflow-hidden text-black opacity-80"
  >
    <p class="chavos-bold-3xl">{storyMainPhrase}</p>
    <p class="chavos-3xl">{storyCopy}</p>
  </div>
</div>
