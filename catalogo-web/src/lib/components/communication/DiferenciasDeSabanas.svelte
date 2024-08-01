<script lang="ts">
  import ArrowLeft from "$lib/components/resources/ArrowLeft.svelte";
  import ArrowRight from "$lib/components/resources/ArrowRight.svelte";
  import HorizontalScroll from "../HorizontalScroll.svelte";

  const sabanasInfos = [
    {
      title: "Camiseta",
      subtitle: "",
      image: "/images/invierno/recortes/EVEREST_MARFIL_RECORTE",
      link: "",
      description: "Frescura en el verano,<br />calidez en el invierno",
    },
    {
      title: "Franela",
      subtitle: "",
      image: "/images/invierno/recortes/EVEREST_MARFIL_RECORTE",
      link: "",
      description:
        "Ligeras y calientitas<br />Especiales para cuando<br />empieza a hacer frío",
    },
    {
      title: "Siberia",
      subtitle: "",
      image: "/images/invierno/recortes/FUNDA_DUVET_INCIENSO_RECORTE",
      link: "",
      description: "La más calientitas por su<br />suave textura de borrega",
    },
    {
      title: "Siberia",
      subtitle: "con cobertor ligero",
      image: "/images/invierno/recortes/AUSTRAL_ROSETA_RECORTE",
      link: "",
      description: "La más calientitas por su<br />suave textura de borrega",
    },
    {
      title: "Andes Polar",
      subtitle: "",
      image: "/images/invierno/recortes/AUSTRAL_ROSETA_RECORTE",
      link: "",
      description:
        "Textura suave,<br />Calidez y suavidad ideales<br />para la temporada",
    },
  ];
</script>

<div class="overflow-hidden w-screen text-black relative bg-[#f3ece7] pb-8">
  <p class="text-center text-nowrap w-full text-[#a5722f] pt-8 pb-5 text-5xl">
    Sábanas
  </p>

  <!-- MOBILE -->
  <div class="md:hidden flex overflow-x-scroll hidden-scroll">
    <button class="absolute z-30 left-0 top-1/2 ml-[8vw] cursor-pointer">
      <ArrowRight color="#fff" />
    </button>

    {#each sabanasInfos as sabana, i}
      <a
        data-sveltekit-preload-data="tap"
        data-sveltekit-reload
        href={sabana.link}
        class="link-block-5 w-inline-block"
      >
        <div class="min-w-[60vw] text-[#6c5750]">
          <div class="md:hidden flex text-center justify-center">
            <div
              style="background-color: #6c5750;"
              class="rounded-[50%] w-[20vh] h-[20vh]"
            >
              <img
                src={`${sabana.image}-500.webp`}
                loading="eager"
                sizes="(max-width: 479px) 92vw, (max-width: 767px) 83vw, 29vw"
                srcset={`${sabana.image}-500.webp 500w, ${sabana.image}-800.webp 800w, ${sabana.image}-1080.webp 1080w, ${sabana.image}-1800.webp 1800w`}
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
          <p class="text-center relative">{@html sabana.description}</p>
        </div>
      </a>
    {/each}

    <button
      class="absolute z-30 right-0 top-1/2 mr-[8vw] focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
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
