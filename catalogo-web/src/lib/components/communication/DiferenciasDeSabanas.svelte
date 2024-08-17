<script lang="ts">
  import ArrowLeft from "$lib/components/resources/ArrowLeft.svelte";
  import ArrowRight from "$lib/components/resources/ArrowRight.svelte";
  import HorizontalScroll from "../HorizontalScroll.svelte";

  const sabanasInfos = [
    {
      title: "Camiseta",
      subtitle: "",
      image: "/images/invierno/recortes/SABANAS-CAMISETA.webp",
      link: "sábanas-camiseta",
      description: "Frescura en el verano,<br />calidez en el invierno",
    },
    {
      title: "Franela",
      subtitle: "",
      image: "/images/invierno/recortes/SABANAS-FRANELA.webp",
      link: "sábanas-franela",
      description:
        "Ligeras y calientitas<br />Especiales para cuando<br />empieza a hacer frío",
    },
    {
      title: "Siberia",
      subtitle: "",
      image: "/images/invierno/recortes/SABANAS-SIBERIA.webp",
      link: "sábanas-siberia",
      description: "La más calientitas por su<br />suave textura de borrega",
    },
    {
      title: "Siberia",
      subtitle: "con cobertor ligero",
      image: "/images/invierno/recortes/SABANAS-SIBERIACOBERTOR.webp",
      link: "sábanas-siberia-con-cobertor-ligero",
      description: "La más calientitas por su<br />suave textura de borrega",
    },
    {
      title: "Andes Polar",
      subtitle: "",
      image: "/images/invierno/recortes/SABANAS-POLAR.webp",
      link: "sábanas-andes-polar",
      description:
        "Textura suave,<br />Calidez y suavidad ideales<br />para la temporada",
    },
  ];
</script>

<div class="overflow-hidden w-screen text-black relative bg-beige pb-8">
  <p
    class="text-black text-nowrap chavos-5xl md:chavos-7xl text-center mt-5 mb-3"
  >
    Sábanas
  </p>

  <!-- MOBILE -->
  <div
    class="md:hidden flex overflow-x-scroll hidden-scroll px-3 space-x-1 sticky"
  >
    <button class="absolute z-30 left-0 top-[30%] ml-[8vw] cursor-pointer">
      <ArrowRight color="#fff" />
    </button>

    {#each sabanasInfos as sabana, i}
      <a
        data-sveltekit-preload-data="tap"
        data-sveltekit-reload
        href="#section-{sabana.link}"
        class="link-block-5 w-inline-block"
        style="margin-top: -20px; padding-top: 50px;"
      >
        <!-- style="scroll-margin-top: 5rem;" -->
        <div class="min-w-[35vw] text-[#6c5750]">
          <div class="md:hidden flex text-center justify-center">
            <div class="rounded-[50%] w-[25vh] h-[25vh]">
              <img
                src={sabana.image}
                loading="eager"
                alt=""
                class="rounded-[50%] object-cover w-full h-full"
              />
            </div>
          </div>

          <!-- sabana title -->
          <div
            data-tippy-content="Ir a la sección →"
            words-slide-from-right=""
            text-split=""
            class="goto-section text-center mb-3 relative"
          >
            <p class="title text-center leading-none mt-5">{sabana.title}</p>
            <p
              class="text-nowrap w-full leading-none font-bold chavos-bold-base"
            >
              {sabana.subtitle}
            </p>
          </div>

          <!-- description -->
          <p class="text-center relative chavos-base text-nowrap leading-tight">
            <!-- <p class="text-black  pl-5 xs:chavos-xl">Sábanas</p> -->

            {@html sabana.description}
          </p>
        </div>
      </a>
    {/each}

    <button
      class="absolute z-30 right-0 top-[30%] mr-[16vw] focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
    >
      <ArrowLeft color="#fff" />
    </button>
  </div>

  <!-- DESKTOP -->
  <div class="hidden md:grid grid-cols-5">
    {#each sabanasInfos as sabana, i}
      <a
        data-sveltekit-preload-data="tap"
        data-sveltekit-reload
        href="#desktop-section-{sabana.link}"
      >
        <div class="text-[#6c5750]">
          <div class="flex text-center justify-center">
            <div class="rounded-[50%] w-[25vh] h-[25vh]">
              <img
                src={sabana.image}
                loading="eager"
                alt=""
                class="rounded-[50%] object-cover w-full h-full"
              />
            </div>
          </div>

          <!-- sabana title -->
          <div
            data-tippy-content="Ir a la sección →"
            words-slide-from-right=""
            text-split=""
            class="goto-section text-center mb-3 relative"
          >
            <p class="title text-center leading-none mt-5 md:text-6xl">
              {sabana.title}
            </p>
            <p
              class="text-nowrap w-full leading-none font-bold chavos-bold-base md:chavos-bold-xl"
            >
              {sabana.subtitle}
            </p>
          </div>

          <!-- description -->
          <p
            class="text-center relative chavos-base md:chavos-xl text-nowrap leading-tight"
          >
            {@html sabana.description}
          </p>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .hidden-scroll::-webkit-scrollbar-thumb {
    background: transparent;
  }
  .hidden-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
</style>
