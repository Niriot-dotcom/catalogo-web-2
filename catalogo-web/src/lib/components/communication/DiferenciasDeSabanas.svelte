<script lang="ts">
  import ArrowLeft from "$lib/components/resources/ArrowLeft.svelte";
  import ArrowRight from "$lib/components/resources/ArrowRight.svelte";
  import HorizontalScroll from "../HorizontalScroll.svelte";

  const sabanasInfos = [
    {
      title: "Camiseta",
      subtitle: "",
      image: "/images/invierno/recortes/SABANAS-CAMISETA.webp",
      link: "",
      description: "Frescura en el verano,<br />calidez en el invierno",
    },
    {
      title: "Franela",
      subtitle: "",
      image: "/images/invierno/recortes/SABANAS-FRANELA.webp",
      link: "",
      description:
        "Ligeras y calientitas<br />Especiales para cuando<br />empieza a hacer frío",
    },
    {
      title: "Siberia",
      subtitle: "",
      image: "/images/invierno/recortes/SABANAS-SIBERIA.webp",
      link: "",
      description: "La más calientitas por su<br />suave textura de borrega",
    },
    {
      title: "Siberia",
      subtitle: "con cobertor ligero",
      image: "/images/invierno/recortes/SABANAS-SIBERIACOBERTOR.webp",
      link: "",
      description: "La más calientitas por su<br />suave textura de borrega",
    },
    {
      title: "Andes Polar",
      subtitle: "",
      image: "/images/invierno/recortes/SABANAS-POLAR.webp",
      link: "",
      description:
        "Textura suave,<br />Calidez y suavidad ideales<br />para la temporada",
    },
  ];
</script>

<div class="overflow-hidden w-screen text-black relative bg-[#f3ece7] pb-8">
  <p class="text-center text-nowrap w-full pt-8 pb-5 chavos-5xl font-[100]">
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
        href={sabana.link}
        class="link-block-5 w-inline-block"
      >
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
            <p class="text-nowrap w-full leading-none font-bold">
              {sabana.subtitle}
            </p>
          </div>

          <!-- description -->
          <p class="text-center relative text-nowrap leading-tight">
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
  <div class="hidden md:grid grid-cols-3 grid-rows-2 m-5 gap-5">
    {#each sabanasInfos as sabana, i}
      <div class="">
        <!-- images (product and plasta) -->
        <div class="relative">
          <img
            src="../images/invierno_fotos_ENTRADA-03.png"
            loading="eager"
            sizes="(max-width: 479px) 92vw, (max-width: 767px) 83vw, 29vw"
            srcset="../images/invierno_fotos_ENTRADA-03-p-500.png 500w, ../images/invierno_fotos_ENTRADA-03-p-800.png 800w, ../images/invierno_fotos_ENTRADA-03-p-1080.png 1080w, ../images/invierno_fotos_ENTRADA-03.png 1280w"
            alt=""
            class="z-20"
          />
        </div>

        <!-- sabana title -->
        <div
          data-tippy-content="Ir a la sección →"
          words-slide-from-right=""
          text-split=""
          class="title goto-section text-center mb-3"
        >
          {sabana.title}
        </div>

        <!-- description -->
        <p class="text-center relative">{@html sabana.description}</p>
      </div>
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
