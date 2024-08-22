<script lang="ts">
  import { COLORS } from "$lib/constants/strings";
  import { onMount } from "svelte";

  export let backgroundVideo: string;
  export let textImage: string;
  export let storyMainPhrase: string;
  export let storyCopy: string;
  export let backgroundColor: string = COLORS.beige;

  onMount(() => {
    const script = document.createElement("script");
    script.src = "/js/webflow.js";
    script.type = "text/javascript";
    script.defer = true;
    document.head.appendChild(script);
  });
</script>

<div
  style="background-color: {backgroundColor};"
  class="md:hidden relative w-screen h-[75vh] bg-cover bg-center"
>
  <div class="w-8/12 h-full">
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

  <div class="absolute w-8/12 mr-0 top-1/4 text-right -right-3 text-black">
    <img src={textImage} alt="" />
  </div>

  <div
    class="absolute bottom-0 right-0 rounded-3xl w-8/12 bg-white p-6 mb-4 mr-8 z-10 overflow-hidden text-black opacity-80"
  >
    <p class="chavos-bold-sm">{storyMainPhrase}</p>
    <p class="chavos-sm">{storyCopy}</p>
  </div>
</div>
<div
  style="background-color: {backgroundColor};"
  class="md:hidden relative w-screen h-[10vh] flex justify-center"
>
  <!-- <div
    style="-webkit-text-stroke-color: #000;"
    class="w-24 text-black mt-0 text-sm relative"
    data-animation-type="lottie"
    data-src="/documents/9261-scroll-down.json"
    data-loop="1"
    data-direction="1"
    data-autoplay="1"
    data-is-ix2-target="0"
    data-renderer="svg"
    data-duration="10000"
  ></div> -->

  <!-- <svg class="arrows">
    <path class="a1" d="M0 0 L10 12 L20 0"></path>
    <path class="a2" d="M0 20 L10 32 L20 20"></path>
    <path class="a3" d="M0 40 L10 52 L20 40"></path>
  </svg> -->

  <div
    class="lottie-animation"
    data-w-id="e37d71ea-2f7e-d30b-df49-c890c74b5ee0"
    data-animation-type="lottie"
    data-src="/documents/9261-scroll-down.json"
    data-loop="1"
    data-direction="1"
    data-autoplay="1"
    data-is-ix2-target="0"
    data-renderer="svg"
    data-duration="1"
  ></div>
</div>

<!-- DESKTOP -->
<div
  style="background-color: {backgroundColor};"
  class="hidden md:block relative w-screen h-[85vh] bg-cover bg-center"
>
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

<style>
  .arrows {
    width: 60px;
    height: 72px;
    position: absolute;
    left: 50%;
    margin-left: -30px;
    bottom: 20px;
  }

  .arrows path {
    stroke: #76236d;
    fill: transparent;
    stroke-width: 3px;
    animation: arrow 2s infinite;
    -webkit-animation: arrow 2s infinite;
  }

  @keyframes arrow {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes arrow /*Safari and Chrome*/ {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  .arrows path.a1 {
    animation-delay: -1s;
    -webkit-animation-delay: -1s; /* Safari 和 Chrome */
  }

  .arrows path.a2 {
    animation-delay: -0.5s;
    -webkit-animation-delay: -0.5s; /* Safari 和 Chrome */
  }

  .arrows path.a3 {
    animation-delay: 0s;
    -webkit-animation-delay: 0s; /* Safari 和 Chrome */
  }
</style>
