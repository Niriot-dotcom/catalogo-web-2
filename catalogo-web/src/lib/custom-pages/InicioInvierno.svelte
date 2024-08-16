<script lang="ts">
  import Carousel from "svelte-carousel";
  let carousel: any;
</script>

<div class="flex h-[60vh] bg-white relative">
  <!-- LOGO INVIERNO -->
  <div class="absolute top-3 left-2 h-[45%] z-10">
    <img
      class="w-full h-full object-cover"
      alt="LOGO INVIERNO"
      src="/images/invierno/recursos/NOMBRE_INVIERNO.svg"
    />
  </div>

  <!-- CAROUSEL -->
  <div class="h-[60vh] w-full flex items-center">
    <Carousel
      bind:this={carousel}
      autoplayDuration={0}
      duration={3000}
      autoplay
      timingFunction="linear"
      dots={false}
      arrows={false}
      swiping={false}
    >
      <!-- IMAGES -->
      {#each { length: 3 } as _, i}
        <div class="overflow-hidden w-full h-[60vh]">
          <img
            src="/images/invierno/recursos/INICIO-{i + 1}.webp"
            alt=""
            class="w-full h-full object-cover object-center"
          />
        </div>
      {/each}
    </Carousel>
  </div>
</div>
