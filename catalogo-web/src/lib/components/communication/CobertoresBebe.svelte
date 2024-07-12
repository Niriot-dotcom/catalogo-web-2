<script lang="ts">
  import AnimalitoBebe01 from "../resources/AnimalitoBebe01.svelte";

  // export let plastaImage: string;
  // export let _: string;
  // export let _: string;
  // export let _: string;
  // export let _: string;

  const cobertoresInfos = [
    {
      title: "siberia",
      subtitle: "Suavidad y calidez",
      characteristics: [
        "Textura suave",
        "El más calientito",
        "Segunda vista de borrega premium",
      ],
    },
    {
      title: "ligero",
      subtitle: "Ideal para todo el año",
      characteristics: ["El más ligero", "Textura suave", "Regalo ideal"],
    },
    {
      title: "nórdico",
      subtitle: "Diseños versátiles",
      characteristics: ["Ligero", "Doble vista"],
    },
    {
      title: "Voga",
      subtitle: "Calidad Premium",
      characteristics: [
        "Ligera y práctica para llevar a todas partes",
        "Tejido de punto",
        "Súper suave al tacto",
      ],
    },
  ];
</script>

<div class="overflow-hidden w-screen text-black relative bg-[#D2D6EA]">
  <!-- plasta -->
  <div class="absolute w-[40%] -top-4 rotate-180">
    <AnimalitoBebe01 color="#627DB3" />
  </div>

  <!-- text header -->
  <div class="w-full text-center mt-32">
    <div>
      <div class="z-20 absolute h-1/3 bottom-0">
        <!-- <img
          class="w-full h-full"
          src="/images/bebe/recursos/AnimalitoBebe01.svg"
          alt=""
        /> -->
      </div>
      <span class="font-bold">tu cobertor<br />ideal</span>
      <span class="">espera por ti</span>
    </div>

    <span>Conoce los beneficios de cada línea.</span>
  </div>

  <!-- grid -->
  <div class="w-full px-10 flex flex-col mt-3 mb-5">
    <!-- CARDS -->
    {#each cobertoresInfos as cobertorInfo, i}
      <div class="w-1/2 border border-red-400 self-{i % 2 ? 'end' : 'start'}">
        <!-- images -->
        <!-- <div>
        <img
          class="w-full h-full"
          src="/images/bebe/recursos/AnimalitoBebe01.svg"
          alt=""
        />

        <div>
          <img
            class="w-full h-full"
            src="/images/bebe/recursos/AnimalitoBebe02.svg"
            alt=""
          />
        </div>
      </div> -->

        <p>{cobertorInfo.title}</p>
        <p>{cobertorInfo.subtitle}</p>
        <ul class="list-disc text-red-500">
          {#each cobertorInfo.characteristics as bullet, _}
            <li>{bullet}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>
