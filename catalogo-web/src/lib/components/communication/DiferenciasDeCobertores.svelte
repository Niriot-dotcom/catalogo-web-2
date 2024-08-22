<script lang="ts">
  import ArrowLeft from "$lib/components/resources/ArrowLeft.svelte";
  import ArrowRight from "$lib/components/resources/ArrowRight.svelte";
  import CircleBehind from "$lib/components/resources/CircleBehind.svelte";
  import HorizontalScroll from "../HorizontalScroll.svelte";

  const cobertoresInfos = [
    {
      title: "Everest",
      image: "/images/invierno/recortes/EVEREST_MARFIL_RECORTE",
      link: "cobertor-everest",
      characteristics: [
        "Linea Premium",
        "Diseños vanguardistas",
        "Máxima calidez",
        "La línea mas pachoncita",
        "Reverso de borrega premium",
      ],
    },
    {
      title: "Funda de duvet",
      image: "/images/invierno/recortes/FUNDA_DUVET_INCIENSO_RECORTE",
      link: "funda-de-duvet",
      characteristics: [
        "Cubierta removible para duvet<br />de pelo ultrasuave",
        "Lavable en casa",
        "Reverso de borrega premium",
        "Ocupa poco espacio",
      ],
    },
    {
      title: "Austral",
      image: "/images/invierno/recortes/AUSTRAL_ROSETA_RECORTE",
      link: "cobertor-austral",
      characteristics: [
        "Detalles únicos",
        "Texturas de jacquard",
        "Bordados",
        "Reverso de borrega premium",
      ],
    },
    {
      title: "Invernal",
      image: "/images/invierno/recortes/INVERNAL_AMBER_RECORTE",
      link: "cobertor-invernal",
      characteristics: [
        "Suavidad y calidez a tu alcance",
        "Diseño en tendencia",
        "Reverso de borrega premium",
        "Lavable en casa",
      ],
    },
    {
      title: "Nórdico",
      image: "/images/invierno/recortes/NORDICO_VOSTOK_RECORTE",
      link: "cobertor-nordico",
      characteristics: [
        "2 diseños en uno",
        "Texturas especiales",
        "Ligeros",
        "Lavable en casa",
      ],
    },
    {
      title: "Ligero",
      image: "/images/invierno/recortes/LIGERO_BOLD_RECORTE",
      link: "cobertor-ligero",
      characteristics: [
        "Ideal para todo el año",
        "El más ligero",
        "Textura suave",
        "Regalo ideal",
        "Lavable en casa",
      ],
    },
  ];
</script>

<div
  class="overflow-hidden w-screen text-black relative bg-[#f3ece7] py-3 md:py-12"
>
  <!-- header -->
  <div class="w-full pl-10 flex">
    <!-- text -->
    <div class="title text-nowrap w-2/3 text-[#a5722f] text-2xl md:text-6xl">
      <span class="">Encuentra tu</span>
      <span class="font-bold">cobertor ideal:</span>
    </div>
  </div>

  <!-- MOBILE -->
  <div class="md:hidden flex overflow-x-scroll hidden-scroll">
    <!-- hand -->
    <div class="absolute top-[18%] z-10 w-1/2 h-12 min-h-12 flex right-0">
      <HorizontalScroll />
    </div>

    <button
      class="absolute z-30 left-0 top-[38%] ml-[8vw] focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
    >
      <ArrowRight color="#6b5751" />
    </button>

    {#each cobertoresInfos as cobertor, i}
      <a
        data-sveltekit-preload-data="tap"
        data-sveltekit-reload
        href={cobertor.link}
        class="link-block-5 w-inline-block"
      >
        <div class="min-w-[60vw] text-[#6c5750]">
          <!-- images (product and plasta) -->
          <div class="md:hidden pt-0 relative">
            <div class="w-2/3 h-2/3 absolute z-0 bottom-5 -right-1">
              <CircleBehind color="#e2d9cf" />
            </div>

            <!-- text header -->
            <div class="relative">
              <img
                src={`${cobertor.image}-500.webp`}
                loading="eager"
                sizes="(max-width: 479px) 92vw, (max-width: 767px) 83vw, 29vw"
                srcset={`${cobertor.image}-500.webp 500w, ${cobertor.image}-800.webp 800w, ${cobertor.image}-1080.webp 1080w, ${cobertor.image}-1800.webp 1800w`}
                alt=""
                class="z-20 inset-0"
              />
            </div>
          </div>

          <!-- cobertor title -->
          <div
            data-tippy-content="Ir a la sección →"
            words-slide-from-right=""
            text-split=""
            class="title goto-section text-center mb-3 relative"
          >
            {cobertor.title}
          </div>

          <!-- characteristics -->
          {#each cobertor.characteristics as characteristic, i}
            <p class="text-center relative chavos-sm">
              {@html characteristic}
            </p>
          {/each}
        </div>
      </a>
    {/each}

    <button
      class="absolute z-30 right-0 top-[38%] mr-[8vw] focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
    >
      <ArrowLeft color="#6b5751" />
    </button>
  </div>

  <!-- DESKTOP -->
  <div class="hidden md:grid grid-cols-3 xl:grid-cols-6">
    {#each cobertoresInfos as cobertor, i}
      <a
        data-sveltekit-preload-data="tap"
        data-sveltekit-reload
        href={cobertor.link}
      >
        <div class="text-[#6c5750]">
          <div class="flex text-center justify-center relative">
            <div
              class="absolute z-0 w-2/3 h-2/3 md:bottom-3 md:right-0 lg:bottom-20 lg:right-10 xl:w-2/3 xl:h-2/3 xl:bottom-5 xl:-right-1"
            >
              <CircleBehind color="#e2d9cf" />
            </div>

            <div
              class="w-[30vh] h-[30vh] lg:w-[35vh] lg:h-[35vh] xl:w-[30vh] xl:h-[30vh] z-10"
            >
              <img
                class="h-full object-contain"
                src={`${cobertor.image}-500.webp`}
                loading="eager"
                sizes="(max-width: 479px) 92vw, (max-width: 767px) 83vw, 29vw"
                srcset={`${cobertor.image}-500.webp 500w, ${cobertor.image}-800.webp 800w, ${cobertor.image}-1080.webp 1080w, ${cobertor.image}-1800.webp 1800w`}
                alt=""
              />
            </div>
          </div>

          <!-- cobertor title -->
          <div
            data-tippy-content="Ir a la sección →"
            words-slide-from-right=""
            text-split=""
            class="goto-section text-center mb-3 relative"
          >
            <p class="title text-center leading-none mt-5 lg:text-6xl">
              {cobertor.title}
            </p>
          </div>

          <!-- characteristics -->
          {#each cobertor.characteristics as characteristic, i}
            <p
              class="text-center relative chavos-base md:chavos-xl text-nowrap leading-tight"
            >
              {@html characteristic}
            </p>
          {/each}
        </div>
      </a>
    {/each}
  </div>
</div>
