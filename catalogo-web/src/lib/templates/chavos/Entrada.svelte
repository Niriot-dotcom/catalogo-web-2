<script lang="ts">
  import { COLORS } from "$lib/constants/strings";

  export let backgroundVideo: string;
  export let textImage: string;
  export let plastaImage: string;
  export let storyCopy: string;
  export let leftSide: boolean = false;
  export let backgroundColor: string = COLORS.beige;
</script>

<div
  class="md:hidden relative w-screen h-[85vh] bg-cover bg-center bg-slate-300"
>
  <div class="w-full h-full">
    <video
      autoplay
      loop
      muted
      playsinline
      src={backgroundVideo}
      class="w-full h-full object-cover"
    ></video>
  </div>
  <div class="absolute -bottom-20 left-0 w-full z-10 overflow-hidden">
    <img src={textImage} loading="eager" alt="" class="scale-105" />
  </div>
</div>

<!-- story copy -->
<div
  class="md:hidden relative w-full px-5 py-12 overflow-hidden flex justify-end text-black"
  style={`background-color: ${backgroundColor};`}
>
  {#if leftSide}
    <div class="absolute -top-1/3 right-1/3">
      <img src={plastaImage} loading="eager" alt="" class="" />
    </div>

    <div class="chavos-lg xs:chavos-2xl relative mx-5 text-right pl-8">
      <span>
        {@html storyCopy}
      </span>
    </div>
  {:else}
    <div class="absolute -bottom-1/3 left-1/3">
      <img src={plastaImage} loading="eager" alt="" class="" />
    </div>

    <div class="chavos-lg xs:chavos-2xl relative mx-5 pr-8">
      <span>
        {@html storyCopy}
      </span>
    </div>
  {/if}
</div>

<!-- DESKTOP -->
<div class="hidden md:block w-screen h-[85vh] bg-slate-300 overflow-hidden">
  <div class="w-full h-full flex">
    <!-- story copy -->
    {#if !leftSide}
      <div
        style={`background-color: ${backgroundColor};`}
        class="w-3/12 h-full relative px-5 py-12 flex justify-end text-black"
      >
        {#if leftSide}
          <div class="absolute -top-1/3 right-1/3">
            <img src={plastaImage} loading="eager" alt="" class="" />
          </div>

          <div class="chavos-lg xs:chavos-2xl relative mx-5 text-right pl-8">
            <span>
              {@html storyCopy}
            </span>
          </div>
        {:else}
          <div class="absolute -bottom-1/3 left-1/3">
            <img src={plastaImage} loading="eager" alt="" class="" />
          </div>

          <div class="chavos-lg xs:chavos-2xl relative mx-5 pr-8">
            <span>
              {@html storyCopy}
            </span>
          </div>
        {/if}
      </div>
    {/if}

    <!-- video with section title -->
    <div class="w-9/12 h-full relative">
      <video
        autoplay
        loop
        muted
        playsinline
        src={backgroundVideo}
        class="w-full h-full object-cover"
      />
      <div class="absolute -bottom-20 left-0 w-full z-10">
        <img src={textImage} loading="eager" alt="" class="scale-105" />
      </div>
    </div>

    <!-- story copy -->
    {#if leftSide}
      <div
        style={`background-color: ${backgroundColor};`}
        class="w-3/12 h-full relative px-5 py-12 flex justify-end text-black"
      >
        {#if leftSide}
          <div class="absolute -top-1/3 right-1/3">
            <img src={plastaImage} loading="eager" alt="" class="" />
          </div>

          <div class="chavos-lg xs:chavos-2xl relative mx-5 text-right pl-8">
            <span>
              {@html storyCopy}
            </span>
          </div>
        {:else}
          <div class="absolute -bottom-1/3 left-1/3">
            <img src={plastaImage} loading="eager" alt="" class="" />
          </div>

          <div class="chavos-lg xs:chavos-2xl relative mx-5 pr-8">
            <span>
              {@html storyCopy}
            </span>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>
