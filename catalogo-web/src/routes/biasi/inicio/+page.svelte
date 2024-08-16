<script lang="ts">
  import CategoriesFooter from "$lib/components/categoriesFooter.svelte";
  import { catalogSections } from "$lib/components/currentCatalogPage";
  import { BiasiFooterHeader } from "$lib/constants/FooterHeaders";
  import { Catalogs } from "$lib/constants/globalTypes";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { onMount } from "svelte";
  let visibleIds: string[] = [];
  let selectedProduct: null | string = null;
  let showPopup = false;
  function handleVisibleChange(event) {
    visibleIds = event.detail;
  }
  function show() {
    showPopup = true;
  }

  let mounted = false;
  onMount(() => {
    // Crear y configurar el script de Webflow
    const scriptWebflow = document.createElement("script");
    scriptWebflow.src = "../js/webflow.js";
    scriptWebflow.type = "text/javascript";
    scriptWebflow.async = true;
    scriptWebflow.defer = true;

    // Crear y configurar el script de Animaciones
    const scriptAnimations = document.createElement("script");
    scriptAnimations.src = "../js/animations.js";
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
    href="../css/catalogo-invierno-main-bb224a.webflow.css"
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
      /* other styles for the parent div */
    }
    .navigator {
      pointer-events: auto;
      /* other styles for the child div */
    }
    .background-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("../images/biasi/entrada.png");
      background-size: cover;
      background-repeat: no-repeat;
      /* transition: opacity 3s ease; */
    }
    @media (min-width: 768px) {
      .background-image {
        opacity: 0.6; /* Adjust the opacity value as needed */
      }
    }
    .background-image2 {
      /* position: absolute;
    top: 0;
    left: 0; */
      width: 100%;
      height: 100%;
      background-image: url("../images/biasi/entrada2.png");
      background-size: cover;
      background-repeat: no-repeat;
    }
  </style>
</div>
{#if !mounted}
  <div style="position: fixed; z-index: 900;" class="pre-loader">
    <img
      src="../images/Rolling-1s-200px.gif"
      loading="lazy"
      data-w-id="1f5e2a88-0001-12a7-db16-3b8a774a2252"
      alt=""
      class="image-42"
      style="mix-blend-mode: darken;"
    />
  </div>
{/if}

<div class="body">
  <div data-w-id="1892024d-3b25-f39f-b72a-2d82ac76e8e1" class="tutorial">
    <div
      class="lottie-animation-2"
      data-w-id="1f700f8d-934b-35eb-3365-1457a93be06f"
      data-animation-type="lottie"
      data-src="../documents/animation_lkkxzewl.json"
      data-loop="1"
      data-direction="1"
      data-autoplay="1"
      data-is-ix2-target="0"
      data-renderer="svg"
      data-default-duration="1.5"
      data-duration="3"
    ></div>
    <h1 class="heading-5">
      ¡Bienvenido al catálogo web! <br />para avanzar desliza hacia abajo
    </h1>
  </div>
  <div class="overlays">
    <div class="indice">
      <div class="div-block-26">
        <div
          data-w-id="b7fd5656-7431-f976-cfc9-cb350ba3a3a8"
          class="close-indice image-13"
        >
          <img
            src="../images/close.svg"
            loading="lazy"
            width="22"
            height="22"
            alt=""
            class="image-13 close-search"
          />
        </div>
        <form action="/search" class="w-form">
          <input
            type="search"
            class="search-input w-input"
            maxlength="256"
            name="query"
            placeholder="Busqueda rápida"
            id="search"
          /><input
            type="submit"
            value="Search"
            class="search-button w-button"
          />
        </form>
      </div>
      <div class="div-block-28">
        <div
          id="w-node-b7fd5656-7431-f976-cfc9-cb350ba3a3ae-0ba3a3a5"
          class="w-layout-layout quick-stack wf-layout-layout"
        >
          <CategoriesFooter
            catalog={Catalogs.BIASI}
            showOnlyGrid={true}
            categories={catalogSections.BIASI}
          />
        </div>
      </div>
    </div>
    <div class="menu-options">
      <div class="navigator open-menu">
        <div class="div-block-18">
          <ul role="list" class="list w-list-unstyled">
            <li class="list-item">
              <img
                src="../images/External-link.svg"
                loading="lazy"
                alt=""
                class="image-7"
              />
              <div class="text-block-3 menu">Ver Productos en la Página</div>
            </li>
            <li class="list-item">
              <img
                src="../images/Share.svg"
                loading="lazy"
                alt=""
                class="image-7"
              />
              <div class="text-block-3 menu">Compartir Catálogo</div>
            </li>
            <li class="list-item">
              <img
                src="../images/Shopping-cart.svg"
                loading="lazy"
                alt=""
                class="image-7"
              />
              <div class="text-block-3 menu">Ver Carrito</div>
            </li>
            <li class="list-item">
              <img
                src="../images/Heart.svg"
                loading="lazy"
                alt=""
                class="image-7"
              />
              <div class="text-block-3 menu">Ver Favoritos</div>
            </li>
            <li class="list-item">
              <img
                src="../images/Document-search.svg"
                loading="lazy"
                alt=""
                class="image-7"
              />
              <div class="text-block-3 menu">Busqueda Rápida</div>
            </li>
            <li class="list-item">
              <img
                src="../images/Grid.svg"
                loading="lazy"
                alt=""
                class="image-7"
              />
              <div class="text-block-3 menu">Índice fotográfico</div>
            </li>
            <li class="list-item">
              <img
                src="../images/Download.svg"
                loading="lazy"
                alt=""
                class="image-7"
              />
              <div class="text-block-3 menu">Descargar Catálogo</div>
            </li>
            <li class="list-item">
              <img
                src="../images/Question-mark-circle.svg"
                loading="lazy"
                alt=""
                class="image-7"
              />
              <div class="text-block-3 menu">Ayuda y Tutoriales</div>
            </li>
          </ul>
          <div class="divisor"></div>
        </div>
        <div class="div-block-15">
          <div class="div-block-17">
            <div
              data-w-id="b7fd5656-7431-f976-cfc9-cb350ba3a476"
              class="navigator-menu close"
            >
              <img
                src="../images/close.svg"
                loading="lazy"
                alt=""
                class="image-8"
              />
            </div>
            <a href="#" class="link-block-3 w-inline-block">
              <div id="prev" class="navigator-menu btn-prev">
                <img
                  src="../images/Grid.svg"
                  loading="lazy"
                  alt=""
                  class="image-7"
                />
              </div>
            </a>
            <a href="#" class="link-block-2 w-inline-block">
              <div class="div-block-2">
                <div class="text-block-3">1/180</div>
              </div>
            </a>
          </div>
          <a id="next" href="#" class="link-block w-inline-block">
            <div id="next" class="navigator-menu btn-next">
              <img
                src="../images/Shopping-cart.svg"
                loading="lazy"
                alt=""
                class="image-6"
              />
              <div class="text-block-3">Anadir al Carrito</div>
            </div>
          </a>
        </div>
      </div>
      <div class="navigator closed-menu">
        <div class="div-block-15">
          <div class="div-block-17">
            <div
              data-tippy-content="Menú"
              data-w-id="b7fd5656-7431-f976-cfc9-cb350ba3a487"
              class="navigator-menu initial nav-action"
            >
              <img
                src="../images/Menu.svg"
                loading="lazy"
                alt=""
                class="image-8"
              />
            </div>
            <a href="#" class="link-block-3 w-inline-block">
              <div
                id="prev"
                data-tippy-content="Páginas"
                data-w-id="b7fd5656-7431-f976-cfc9-cb350ba3a48a"
                class="navigator-menu btn-prev nav-action"
              >
                <img
                  src="../images/Grid.svg"
                  loading="lazy"
                  alt=""
                  class="image-7"
                />
              </div>
            </a>
            <a href="#" class="link-block-2 w-inline-block">
              <div
                data-tippy-content="Página actual"
                class="div-block-2 nav-action"
              >
                <div class="text-block-3">1/180</div>
              </div>
            </a>
          </div>
          <a id="next" href="#" class="link-block w-inline-block">
            <div
              id="next"
              data-tippy-content="Ver productos en la página"
              class="navigator-menu btn-next nav-action"
            >
              <img
                src="../images/Shopping-cart.svg"
                loading="lazy"
                alt=""
                class="image-6"
              />
              <div class="text-block-3">Anadir al Carrito</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <section id="inicio" class="hidden introducci-n">
    <div class="div-block">
      <div class="sticky-container primary-container">
        <div class="sticky-parent primary-sticky">
          <div class="card-parent pillows-background">
            <section class="hero-image-left relative">
              <div id="bgimg" class="background-image" />
              <div class="flex w-screen">
                <div
                  class="w-24 mt-0 ml-5 text-[2w] relative text-[#141414] hidden"
                  data-w-id="e37d71ea-2f7e-d30b-df49-c890c74b5ee0"
                  data-animation-type="lottie"
                  data-src="../documents/9261-scroll-down.json"
                  data-loop="1"
                  data-direction="1"
                  data-autoplay="1"
                  data-is-ix2-target="0"
                  data-renderer="svg"
                  data-duration="0"
                />
                <section class="div-block-3 primary-copy-box">
                  <div
                    data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                    style="position: relative; z-index: 50;"
                    class="py-2 sm:py-8 text-black font-helvetica"
                  >
                    <div class="mb-2">
                      <p
                        class="font-thin lg:text-7xl md:text-6xl sm:text-5xl text-4xl"
                      >
                        ¡qué gusto verte!
                      </p>
                    </div>
                    <div class="">
                      <p
                        class="font-semibold lg:text-4xl md:text-3xl sm:text-2xl text-xl"
                      >
                        Te invitamos a conocer
                      </p>
                    </div>
                    <div class="">
                      <p
                        class="font-extralight text-xl lg:text-3xl md:text-2xl"
                      >
                        las novedades de BIASI.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
              <div
                data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                class="absolute bottom-0 w-full h-[30%]"
              >
                <div class="w-screen px-8 lg:px-40">
                  <div class="">
                    <p
                      class="font-kepler italic text-3xl sm:text-2xl lg:text-8xl"
                    >
                      back in
                    </p>
                  </div>
                  <div class="">
                    <p
                      class="font-kepler font-bold text-3xl sm:text-2xl lg:text-9xl"
                    >
                      black
                    </p>
                  </div>
                  <div class="">
                    <div
                      class="font-helvetica font-extralight text-lg sm:text-2xl lg:text-4xl"
                    >
                      Encuentra todo lo que necesitas para mejorar y optimizar
                      tus interiores.
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

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
                  <a href="/biasi/accesorios-de-cocina">
                    <div class="absolute bottom-10 left-24">
                      <img
                        src="../images/biasi/indice1.svg"
                        loading="lazy"
                        style="opacity:0"
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        alt=""
                        class="w-[27vw]"
                      />
                      <div class="absolute top-1/2 right-0">
                        <img
                          src={"../images/biasi/indice1a.svg"}
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
                  <a href="/biasi/organizacion">
                    <div class="absolute top-0 left-0">
                      <img
                        src="../images/biasi/indice2.svg"
                        loading="lazy"
                        style="opacity:0"
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        alt=""
                        class="w-[27vw]"
                      />
                      <div class="absolute top-2/3 right-0">
                        <img
                          src={"../images/biasi/indice2a.svg"}
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
                  <a href="/biasi/muebles">
                    <div class="absolute top-0 right-0">
                      <img
                        src="../images/biasi/indice3.svg"
                        loading="lazy"
                        style="opacity:0"
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        alt=""
                        class="w-[27vw]"
                      />
                      <div class="absolute -top-10 right-0">
                        <img
                          src={"../images/biasi/indice3a.svg"}
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
                  <a href="/biasi/accesorios-de-decoracion">
                    <div class="absolute -top-28 right-20">
                      <img
                        src="../images/biasi/indice4.svg"
                        loading="lazy"
                        style="opacity:0"
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        alt=""
                        class="w-[27vw]"
                      />
                      <div class="absolute bottom-0 left-0">
                        <img
                          src={"../images/biasi/indice4a.svg"}
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
                class="absolute w-11/12 h-[70%] m-10 grid grid-cols-1 grid-rows-4"
              >
                <div class="relative">
                  <a href="/biasi/organizacion">
                    <div class="absolute top-0 right-0">
                      <img
                        src="../images/biasi/indice2.svg"
                        loading="lazy"
                        style="opacity:0"
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        alt=""
                        class="w-[40vw]"
                      />
                      <div class="absolute top-1/2 -left-1/2">
                        <img
                          src={"../images/biasi/indice2a.svg"}
                          loading="eager"
                          alt=""
                          style="opacity:0"
                          data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                          class="w-[35vw]"
                        />
                      </div>
                    </div>
                  </a>
                </div>

                <div class="relative">
                  <a href="/biasi/accesorios-de-cocina">
                    <div class="absolute top-0 left-0">
                      <img
                        src="../images/biasi/indice1.svg"
                        loading="lazy"
                        style="opacity:0"
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        alt=""
                        class="w-[40vw]"
                      />
                      <div class="absolute top-1/2 -right-1/2">
                        <img
                          src={"../images/biasi/indice1a.svg"}
                          loading="eager"
                          alt=""
                          style="opacity:0"
                          data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                          class="w-[35vw]"
                        />
                      </div>
                    </div>
                  </a>
                </div>

                <div class="relative">
                  <a href="/biasi/muebles">
                    <div class="absolute top-0 right-0">
                      <img
                        src="../images/biasi/indice3.svg"
                        loading="lazy"
                        style="opacity:0"
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        alt=""
                        class="w-[40vw]"
                      />
                      <div class="absolute top-1/2 -left-1/2">
                        <img
                          src={"../images/biasi/indice3a.svg"}
                          loading="eager"
                          alt=""
                          style="opacity:0"
                          data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                          class="w-[35vw]"
                        />
                      </div>
                    </div>
                  </a>
                </div>

                <div class="relative">
                  <a href="/biasi/accesorios-de-decoracion">
                    <div class="absolute top-0 left-0">
                      <img
                        src="../images/biasi/indice4.svg"
                        loading="lazy"
                        style="opacity:0"
                        data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                        alt=""
                        class="w-[40vw]"
                      />
                      <div class="absolute top-1/2 -right-1/2">
                        <img
                          src={"../images/biasi/indice4a.svg"}
                          loading="eager"
                          alt=""
                          style="opacity:0"
                          data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
                          class="w-[35vw]"
                        />
                      </div>
                    </div>
                  </a>
                </div>

                <div class="absolute bottom-0 w-full h-[0%]">
                  <div class="w-screen px-8 lg:px-40">
                    <div class="w-full flex sm:p-20 md:p-20 lg:p-40 p-10">
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
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <!--  -->
    </div>
  </section>
  <NavigatorMenu isBiasi={true} />
  <CategoriesFooter
    catalog={Catalogs.BIASI}
    categories={catalogSections.BIASI}
    HeaderComponent={BiasiFooterHeader()}
  />

  <script defer src="../js/webflowPage.js"></script>

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
  <script defer src="../js/animations.js" type="text/javascript"></script>
</div>
