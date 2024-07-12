<script lang="ts">
  import ScrollDownArrows from "$lib/components/animations/ScrollDownArrows.svelte";

  export let backgroundVideo: string;
  export let backgroundImage: string;
  export let backgroundColor: string;
  export let textColor: string;
  export let textImage: string;
  export let storyMainPhrase: string;
  export let storyCopy: string;
</script>

<div
  style="background-color: {backgroundColor};"
  class="md:hidden relative w-screen h-[75vh]"
>
  <div class="w-full h-2/3">
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

  <div class="z-10 absolute w-full h-full top-0 left-0">
    <img class="w-full h-full object-cover" src={backgroundImage} alt="" />
  </div>

  <div class="z-20 absolute h-1/3 bottom-0 ml-5">
    <img class="w-full h-full" src={textImage} alt="" />
  </div>

  <div
    style="color: {textColor};"
    class="absolute bottom-0 right-0 rounded-3xl w-[60%] p-6 mb-4 mr-3 z-10 overflow-hidden"
  >
    <p class="chavos-bold-lg">{storyMainPhrase}</p>
    <p class="chavos-lg">{storyCopy}</p>
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
