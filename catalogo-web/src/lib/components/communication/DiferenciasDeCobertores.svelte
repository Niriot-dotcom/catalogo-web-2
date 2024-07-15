<script lang="ts">
  // import CircleBehind from "../resources/AnimalitoBebe01.svelte";
  import Carousel from "svelte-carousel";
  import ArrowLeft from "$lib/components/resources/ArrowLeft.svelte";
  import ArrowRight from "$lib/components/resources/ArrowRight.svelte";
  import CircleBehind from "$lib/components/resources/CircleBehind.svelte";

  let carousel: any;
  let unique = {};

  const cobertoresInfos = [
    {
      title: "Everest",
      subtitle: "",
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
      subtitle: "",
      characteristics: [
        "Cubierta removible para duvet de pelo ultrasuave",
        "Lavable en casa",
        "Reverso de borrega premium",
        "Ocupa poco espacio",
      ],
    },
    {
      title: "Austral",
      subtitle: "",
      characteristics: [
        "Detalles únicos",
        "Texturas de jacquard",
        "Bordados",
        "Reverso de borrega premium",
      ],
    },
    {
      title: "Invernal",
      subtitle: "",
      characteristics: [
        "Suavidad y calidez a tu alcance",
        "Diseño en tendencia",
        "Reverso de borrega premium",
        "Lavable en casa",
      ],
    },
    {
      title: "Nórdico",
      subtitle: "",
      characteristics: [
        "2 diseños en uno",
        "Texturas especiales",
        "Ligeros",
        "Lavable en casa",
      ],
    },
    {
      title: "Ligero",
      subtitle: "",
      characteristics: [
        "Ideal para todo el año",
        "El más ligero",
        "Textura suave",
        "Regalo ideal",
        "Lavable en casa",
      ],
    },
  ];

  const moveX = (direction: string) => {
    console.log("direction: ", direction);
    let box = document.getElementById("cob-info");
    box!.style.transform = "translateX(50px);";
    console.log("box: ", box);
  };
</script>

<div class="overflow-hidden w-screen text-black relative bg-[#f3ece7] py-8">
  <!-- text header -->
  <div class="w-full ml-24">
    <div class="title">
      <span class="">Encuentra tu</span>
      <br />
      <span class="font-bold">cobertor ideal:</span>
    </div>
  </div>

  <!-- descriptions -->

  <!-- carousel -->
  <!-- {#key unique}
    <div class="mt-5 mb-24 mx-auto w-11/12">
      <Carousel bind:this={carousel} autoplay autoplayDuration={5000}>
        <button
          slot="prev"
          on:click={() => carousel.goToPrev()}
          class="absolute z-30 left-0 top-[0%] ml-[8vw] focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
        >
          <ArrowRight color="#6b5751" />
        </button>
        {#each cobertoresInfos as cobertor, i}
          <div class="w-3/12 border">
            images (product and plasta)
            <div class="border relative">
              <div class="absolute -z-10">
                <CircleBehind color="#e2d9cf" />
              </div>
              <div class="">
                <img
                  src="../images/invierno_fotos_ENTRADA-03.png"
                  loading="lazy"
                  sizes="(max-width: 479px) 92vw, (max-width: 767px) 83vw, 29vw"
                  srcset="../images/invierno_fotos_ENTRADA-03-p-500.png 500w, ../images/invierno_fotos_ENTRADA-03-p-800.png 800w, ../images/invierno_fotos_ENTRADA-03-p-1080.png 1080w, ../images/invierno_fotos_ENTRADA-03.png 1280w"
                  alt=""
                  class="image-14"
                />
              </div>
            </div>

            cobertor title
            <div
              data-tippy-content="Ir a la sección →"
              words-slide-from-right=""
              text-split=""
              class="title goto-section text-center mb-3"
            >
              {cobertor.title}
            </div>

            characteristics
            {#each cobertor.characteristics as characteristic, i}
              <p class="text-center">{characteristic}</p>
            {/each}
          </div>
        {/each}

        <button
          slot="next"
          on:click={() => carousel.goToNext()}
          class="absolute z-30 right-0 top-[0] mr-[8vw] focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
        >
          <ArrowLeft color="#6b5751" />
        </button>
      </Carousel>
    </div>
  {/key} -->

  <!-- MOBILE -->
  <div id="cob-info" class="md:hidden flex overflow-x-scroll hidden-scroll">
    <button
      on:click={() => moveX("prev")}
      class="absolute z-30 left-0 top-1/2 ml-[8vw] focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
    >
      <ArrowRight color="#6b5751" />
    </button>

    <!-- <div id="cob-info"> -->
    {#each cobertoresInfos as cobertor, i}
      <div class="min-w-[60vw]">
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

          <div class="absolute top-0 z-10">
            <CircleBehind color="#e2d9cf" />
          </div>
        </div>

        <!-- cobertor title -->
        <div
          data-tippy-content="Ir a la sección →"
          words-slide-from-right=""
          text-split=""
          class="title goto-section text-center mb-3"
        >
          {cobertor.title}
        </div>

        <!-- characteristics -->
        {#each cobertor.characteristics as characteristic, i}
          <p class="text-center">{characteristic}</p>
        {/each}
      </div>
    {/each}
    <!-- </div> -->

    <button
      on:click={() => moveX("next")}
      class="absolute z-30 right-0 top-1/2 mr-[8vw] focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
    >
      <ArrowLeft color="#6b5751" />
    </button>
  </div>

  <!-- DESKTOP -->
  <div class="hidden md:grid grid-cols-3 grid-rows-2 m-5 gap-5">
    {#each cobertoresInfos as cobertor, i}
      <div class="border">
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

          <div class="absolute top-0 z-10">
            <CircleBehind color="#e2d9cf" />
          </div>
        </div>

        <!-- cobertor title -->
        <div
          data-tippy-content="Ir a la sección →"
          words-slide-from-right=""
          text-split=""
          class="title goto-section text-center mb-3"
        >
          {cobertor.title}
        </div>

        <!-- characteristics -->
        {#each cobertor.characteristics as characteristic, i}
          <p class="text-center">{characteristic}</p>
        {/each}
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
