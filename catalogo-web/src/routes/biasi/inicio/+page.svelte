<script lang="ts">
  import { onMount } from "svelte";

  let mounted = false;
  onMount(() => {
    // Crear y configurar el script de Webflow
    const scriptWebflow = document.createElement("script");
    scriptWebflow.src = "/js/webflow.js";
    scriptWebflow.type = "text/javascript";
    scriptWebflow.async = true;
    scriptWebflow.defer = true;

    // Crear y configurar el script de Animaciones
    const scriptAnimations = document.createElement("script");
    scriptAnimations.src = "/js/animations.js";
    scriptAnimations.type = "text/javascript";
    scriptAnimations.async = true;
    scriptAnimations.defer = true;

    // Obteniendo el elemento con la clase 'body'
    const bodyElement = document.querySelector(".body");
    if (bodyElement) {
      // Añadir primero el script de Webflow
      bodyElement.appendChild(scriptWebflow);
      // Añadiendo scripts - Luego añadir el script de Animaciones
      bodyElement.appendChild(scriptAnimations);
    }

    // wait 1 second to remove the preloader
    setTimeout(() => {
      mounted = true;
    }, 1000);
  });
</script>

<div>
  <link rel="stylesheet" href="https://use.typekit.net/nbh4cvf.css" />

  <link
    href="/css/catalogo-invierno-main-bb224a.webflow.css"
    rel="stylesheet"
    type="text/css"
  />

  <style>
    @media (min-width: 992px) {
      html.w-mod-js:not(.w-mod-ix)
        [data-w-id="89edf476-53ad-eba9-6756-9a72f2d57ba7"] {
        opacity: 0;
      }
    }
    @media (max-width: 991px) and (min-width: 768px) {
      html.w-mod-js:not(.w-mod-ix)
        [data-w-id="89edf476-53ad-eba9-6756-9a72f2d57ba7"] {
        opacity: 0;
      }
    }
    body {
      font-family: "Inter", sans-serif;
      overflow-x: hidden;
    }
  </style>

  <script type="text/javascript">
    try {
      Typekit.load();
    } catch (e) {}
  </script>
  <script type="text/javascript">
    !(function (o, c) {
      var n = c.documentElement,
        t = " w-mod-";
      (n.className += t + "js"),
        ("ontouchstart" in o ||
          (o.DocumentTouch && c instanceof DocumentTouch)) &&
          (n.className += t + "touch");
    })(window, document);
  </script>

  <script>
    if (window.innerWidth > 768) {
      window.addEventListener("scroll", function () {
        let header = document.getElementById("bgimg");
        let scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        header.style.opacity = 0.6 + scrollTop / 1500;
      });
    }
  </script>

  <link
    rel="stylesheet"
    href="https://unpkg.com/tippy.js@6/animations/scale.css"
  />

  <style>
    [text-split] {
      opacity: 0;
    }
    html.w-editor [text-split] {
      opacity: 1;
    }
    .word {
      overflow: inherit;
      padding-bottom: 0.1em;
      margin-bottom: -0.1em;
      transform-origin: bottom;
    }
    ::selection {
      background: #fdf886 !important;
      color: #000 !important;
    }
    .tippy-content {
      font-family: "Helvetica", sans-serif !important;
    }
    .menu-options {
      pointer-events: none;
    }
    .navigator {
      pointer-events: auto;
    }
    .background-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("/images/biasi/indice/INDICE-BIASI.webp");
      background-size: cover;
      background-repeat: no-repeat;
    }
    @media (min-width: 768px) {
      .background-image {
        opacity: 0.6; /* Adjust the opacity value as needed */
      }
    }
    .background-image2 {
      width: 100%;
      height: 100%;
      background-image: url("/images/biasi/indice/INDICE-BIASI.webp");
      background-size: cover;
      background-repeat: no-repeat;
    }
  </style>
</div>

{#if !mounted}
  <div style="position: fixed; z-index: 900;" class="pre-loader">
    <img
      src="/images/Rolling-1s-200px.gif"
      loading="eager"
      data-w-id="1f5e2a88-0001-12a7-db16-3b8a774a2252"
      alt=""
      class="image-42"
      style="mix-blend-mode: darken;"
    />
  </div>
{/if}

<div class="body">
  <section id="inicio" class="hidden introducci-n">
    <div class="div-block">
      <section class="categorias">
        <div class="w-full flex xs:p-16 sm:p-20 md:p-20 lg:p-40 p-10">
          <div class="text-black flex flex-col font-helvetica items-end w-full">
            <span class="uppercase text-xl lg:text-5xl">tu casa</span>
            <span class="font-bold font-kepler italic text-2xl lg:text-5xl"
              >como nunca la viste...</span
            >
          </div>
        </div>
      </section>

      <!-- DESKTOP -->
      <div class="hidden lg:block sticky-container primary-container">
        <div class="sticky-parent primary-sticky">
          <div class="card-parent pillows-background">
            <section class="hero-image-left">
              <div class="background-image2 bg-center"></div>

              <div
                class="absolute w-11/12 h-[70%] m-10 grid grid-cols-2 grid-rows-2"
              >
                <div class="relative">
                  <a href="/biasi/muebles">
                    <div class="absolute bottom-10 left-24">
                      <img
                        src="/images/biasi/indice/INDICE-AMUEBLANDO.webp"
                        loading="eager"
                        style="opacity:0"
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        alt=""
                        class="w-[27vw]"
                      />
                      <div class="absolute -bottom-5 -right-12">
                        <img
                          src="/images/biasi/indice/INDICE-AMUEBLANDO.svg"
                          loading="eager"
                          alt=""
                          style="opacity:0"
                          data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                          class="h-[7vw]"
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
                        style="opacity:0"
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        alt=""
                        class="w-[27vw]"
                      />
                      <div class="absolute top-7 right-5">
                        <img
                          src="/images/biasi/indice/INDICE-DECORANDO.svg"
                          loading="eager"
                          alt=""
                          style="opacity:0"
                          data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                          class="h-[7vw]"
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
                        style="opacity:0"
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        alt=""
                        class="w-[27vw]"
                      />
                      <div class="absolute top-5 right-5">
                        <img
                          src="/images/biasi/indice/INDICE-COCINANDO.svg"
                          loading="eager"
                          alt=""
                          style="opacity:0"
                          data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                          class="h-[7vw]"
                        />
                      </div>
                    </div>
                  </a>
                </div>

                <div class="relative">
                  <a href="/biasi/bano">
                    <div class="absolute -top-28 right-20">
                      <img
                        src="/images/biasi/indice/INDICE-BANO.webp"
                        loading="eager"
                        style="opacity:0"
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        alt=""
                        class="w-[27vw]"
                      />
                      <div class="absolute -bottom-5 -right-12">
                        <img
                          src="/images/biasi/indice/INDICE-BANO.svg"
                          loading="eager"
                          alt=""
                          style="opacity:0"
                          data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                          class="h-[7vw]"
                        />
                      </div>
                    </div>
                  </a>
                </div>

                <div class="absolute bottom-0 w-full h-[10%]">
                  <div class="w-screen px-40">
                    <div
                      class="w-full flex xs:p-16 sm:p-20 md:p-20 lg:p-40 p-10"
                    >
                      <div
                        class="flex flex-col font-helvetica items-end w-full"
                      >
                        <span class="text-5xl uppercase">Y MUCHO MÁS</span>
                        <span class="text-5xl font-bold font-kepler italic"
                          >no te lo pierdas</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <!-- MOBILE -->
      <div class="lg:hidden sticky-container primary-container">
        <div class="sticky-parent primary-sticky">
          <div class="card-parent pillows-background">
            <section class="hero-image-left">
              <div class="background-image2 bg-center"></div>

              <div
                class="absolute w-11/12 h-[85%] m-5 grid grid-cols-1 grid-rows-4"
              >
                <div class="relative">
                  <a href="/biasi/muebles">
                    <div class="absolute top-0 right-0">
                      <img
                        src="/images/biasi/indice/INDICE-AMUEBLANDO.webp"
                        loading="eager"
                        style="opacity:0"
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        alt=""
                        class="w-[45vw]"
                      />
                      <div class="absolute -bottom-5 -left-3">
                        <img
                          src="/images/biasi/indice/INDICE-AMUEBLANDO.svg"
                          loading="eager"
                          alt=""
                          style="opacity:0"
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
                        style="opacity:0"
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        alt=""
                        class="w-[45vw]"
                      />
                      <div class="absolute top-4 right-2">
                        <img
                          src="/images/biasi/indice/INDICE-DECORANDO.svg"
                          loading="eager"
                          alt=""
                          style="opacity:0"
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
                        style="opacity:0"
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        alt=""
                        class="w-[45vw]"
                      />
                      <div class="absolute top-2 right-2">
                        <img
                          src="/images/biasi/indice/INDICE-COCINANDO.svg"
                          loading="eager"
                          alt=""
                          style="opacity:0"
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
                        style="opacity:0"
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        alt=""
                        class="w-[45vw]"
                      />
                      <div class="absolute -bottom-5 -right-12">
                        <img
                          src="/images/biasi/indice/INDICE-BANO.svg"
                          loading="eager"
                          alt=""
                          style="opacity:0"
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

              <div class="absolute bottom-0 w-full">
                <div class="w-screen px-8 lg:px-40">
                  <div class="w-full flex sm:p-5 md:p-5 lg:p-10 p-5">
                    <div class="flex flex-col font-helvetica items-end w-full">
                      <span class="text-xl uppercase">Y MUCHO MÁS</span>
                      <span
                        class="font-bold font-kepler italic text-xl sm:text-2xl"
                        >no te lo pierdas</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ANIMACIONES Y SCRIPTS -->
  <script defer src="/js/webflowPage.js"></script>
  <script
    defer
    src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=643738a971c1d64a8bd7a90a"
    type="text/javascript"
    integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
    crossorigin="anonymous"
  ></script>
  <script defer src="https://unpkg.com/split-type"></script>
  <script
    defer
    src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"
  ></script>
  <script
    defer
    src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js"
  ></script>
  <script defer src="/js/animations.js" type="text/javascript"></script>
</div>
