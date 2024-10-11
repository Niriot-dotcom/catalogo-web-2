<script lang="ts">
  let sectionsRefs = [
    {
      link: "/biasi/muebles",
      image: "/images/biasi/indice/INDICE-AMUEBLANDO",
      imgClass: "absolute bottom-5 left-12",
      svgClass: "absolute -bottom-5 -right-12",
    },
    {
      link: "/biasi/decoracion",
      image: "/images/biasi/indice/INDICE-DECORANDO",
      imgClass: "absolute top-5 left-0",
      svgClass: "absolute top-7 right-5",
    },
    {
      link: "/biasi/cocina",
      image: "/images/biasi/indice/INDICE-COCINANDO",
      imgClass: "absolute top-0 right-8",
      svgClass: "absolute top-5 right-5",
    },
    {
      link: "/biasi/bano",
      image: "/images/biasi/indice/INDICE-BANO",
      imgClass: "absolute -top-2 right-16",
      svgClass: "absolute -bottom-5 -right-12",
    },
  ];
</script>

<!-- TODO animations not working -->

<!-- DESKTOP -->
<section class="hidden lg:block w-screen h-screen relative">
  <div class="background-image bg-center"></div>

  <div
    class="absolute top-0 left-0 w-full h-full px-10 grid grid-cols-2 grid-rows-2"
  >
    {#each sectionsRefs as ref}
      <div class="relative">
        <a href={ref.link}>
          <div class={ref.imgClass}>
            <img
              src="{ref.image}.webp"
              loading="eager"
              data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
              alt=""
              class="w-[24vw]"
            />
            <div class={ref.svgClass}>
              <img
                src="{ref.image}.svg"
                loading="eager"
                alt=""
                data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                class="h-[7vw]"
              />
            </div>
          </div>
        </a>
      </div>
    {/each}
  </div>
</section>

<!-- MOBILE -->
<section id="inicio" class="lg:hidden introducci-n mt-16 lg:mt-0">
  <div class="div-block h-screen">
    <!-- <section class="categorias">
      <div class="w-full flex xs:p-16 sm:p-20 md:p-20 lg:p-40 p-10">
        <div class="text-black flex flex-col font-helvetica items-end w-full">
          <span class="uppercase text-xl lg:text-5xl">tu casa</span>
          <span class="font-bold font-kepler italic text-2xl lg:text-5xl"
            >como nunca la viste...</span
          >
        </div>
      </div>
    </section> -->

    <div class="lg:hidden sticky-container primary-container h-screen static">
      <div class="sticky-parent primary-sticky h-screen static">
        <div class="card-parent pillows-background h-screen">
          <section class="hero-image-left h-screen">
            <div class="background-image bg-center"></div>

            <div
              class="absolute w-11/12 h-[85%] m-5 grid grid-cols-1 grid-rows-4"
            >
              <div class="relative">
                <a href="/biasi/muebles">
                  <div class="absolute top-0 right-0">
                    <img
                      src="/images/biasi/indice/INDICE-AMUEBLANDO.webp"
                      loading="eager"
                      data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                      alt=""
                      class="w-[45vw]"
                    />
                    <div class="absolute -bottom-5 -left-3">
                      <img
                        src="/images/biasi/indice/INDICE-AMUEBLANDO.svg"
                        loading="eager"
                        alt=""
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        class="w-[50vw]"
                      />
                    </div>
                  </div>
                </a>
              </div>

              <div class="relative">
                <a href="/biasi/decoracion">
                  <div class="absolute top-0 left-0">
                    <img
                      src="/images/biasi/indice/INDICE-DECORANDO.webp"
                      loading="eager"
                      data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                      alt=""
                      class="w-[45vw]"
                    />
                    <div class="absolute top-4 right-2">
                      <img
                        src="/images/biasi/indice/INDICE-DECORANDO.svg"
                        loading="eager"
                        alt=""
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        class="w-[20vw]"
                      />
                    </div>
                  </div>
                </a>
              </div>

              <div class="relative">
                <a href="/biasi/cocina">
                  <div class="absolute top-0 right-0">
                    <img
                      src="/images/biasi/indice/INDICE-COCINANDO.webp"
                      loading="eager"
                      data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                      alt=""
                      class="w-[45vw]"
                    />
                    <div class="absolute top-2 right-2">
                      <img
                        src="/images/biasi/indice/INDICE-COCINANDO.svg"
                        loading="eager"
                        alt=""
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        class="w-[20vw]"
                      />
                    </div>
                  </div>
                </a>
              </div>

              <div class="relative">
                <a href="/biasi/bano">
                  <div class="absolute top-0 left-0">
                    <img
                      src="/images/biasi/indice/INDICE-BANO.webp"
                      loading="eager"
                      data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                      alt=""
                      class="w-[45vw]"
                    />
                    <div class="absolute -bottom-5 -right-12">
                      <img
                        src="/images/biasi/indice/INDICE-BANO.svg"
                        loading="eager"
                        alt=""
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        class="w-[50vw]"
                      />
                    </div>
                  </div>
                </a>
              </div>

              <!-- <div class="absolute bottom-0 w-full border border-red-500">
                  <div class="w-screen px-8 lg:px-40">
                    <div class="w-full flex sm:p-10 md:p-10 lg:p-20 p-10">
                      <div
                        class="flex flex-col font-helvetica items-end w-full"
                      >
                        <span class="text-xl uppercase">Y MUCHO MÁS</span>
                        <span
                          class="font-bold font-kepler italic text-xl sm:text-2xl"
                          >no te lo pierdas</span
                        >
                      </div>
                    </div>
                  </div>
                </div> -->
            </div>

            <div class="absolute bottom-3 right-3">
              <div class="flex flex-col font-helvetica items-end w-full">
                <span class="text-xl uppercase leading-none">Y MUCHO MÁS</span>
                <span class="font-bold font-kepler italic text-xl sm:text-2xl"
                  >no te lo pierdas</span
                >
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .background-image {
    width: 100%;
    height: 100%;
    background-image: url("/images/biasi/indice/INDICE-BIASI.webp");
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
