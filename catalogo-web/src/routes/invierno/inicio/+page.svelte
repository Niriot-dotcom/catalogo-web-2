<script lang="ts">
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";
  import type { PageData } from "./$types";
  import { catalogSections } from "$lib/components/currentCatalogPage";
  import CategoriesFooter from "$lib/components/categoriesFooter.svelte";

  import { onMount } from "svelte";

  let mounted = false;
  onMount(() => {
    mounted = true;
    const script = document.createElement("script");
    script.src = "/js/webflow.js";
    script.type = "text/javascript";
    script.defer = true;
    document.head.appendChild(script);
  });

  let visibleIds = [];

  function handleVisibleChange(event) {
    visibleIds = event.detail;
  }

  let showPopup = false;

  function show() {
    showPopup = true;
  }

  export let data: PageData;
  const products = data.props.products; // guarda el objeto product en una variable
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />
{#if !mounted}
  <div style="position: fixed; z-index: 900;" class="pre-loader">
    <img
      src="/images/Rolling-1s-200px.gif"
      loading="lazy"
      data-w-id="1f5e2a88-0001-12a7-db16-3b8a774a2252"
      alt=""
      class="image-42"
      style="mix-blend-mode: darken;"
    />
  </div>
{/if}

<div
  id="Inicio"
  data-w-id="1892024d-3b25-f39f-b72a-2d82ac76e8e1"
  class="tutorial"
  class:hidden={!mounted}
>
  <div
    class="lottie-animation-2"
    data-w-id="1f700f8d-934b-35eb-3365-1457a93be06f"
    data-animation-type="lottie"
    data-src="/documents/animation_lkkxzewl.json"
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

<section id="inicio" class="introducci-n">
  <div class="div-block">
    <div class="sticky-container primary-container">
      <div class="sticky-parent primary-sticky">
        <div class="card-parent pillows-background">
          <section class="hero-image-left pillows-hero">
            <section id="page1" class="div-block-3 primary-copy-box">
              <div words-slide-from-right="" text-split="" class="text-block-4">
                Invierno<br />23-24
              </div>
              <h1 words-slide-up="" text-split="" class="big-heading intro">
                Hola de nuevo <br /> nos encanta verte <br /> por aquí
              </h1>
            </section>
            <div
              class="lottie-animation"
              data-w-id="e37d71ea-2f7e-d30b-df49-c890c74b5ee0"
              data-animation-type="lottie"
              data-src="/documents/9261-scroll-down.json"
              data-loop="1"
              data-direction="1"
              data-autoplay="1"
              data-is-ix2-target="0"
              data-renderer="svg"
              data-duration="0"
            ></div>
          </section>
        </div>
      </div>
    </div>
    <section id="page3" class="section-text">
      <div
        text-split=""
        words-slide-from-right=""
        class="text-block-5 subtitle-intro"
      >
        <span class="text-span-5">Tu cobertor </span><span class="text-span-2"
          >ideal</span
        ><span class="text-span-6"> espera por ti</span>
      </div>
      <div class="div-block-5">
        <div class="div-block-6 everest-ideal">
          <img
            src="/images/invierno_fotos_ENTRADA-02.png"
            loading="lazy"
            sizes="(max-width: 479px) 92vw, (max-width: 767px) 83vw, 30vw"
            srcset="/images/invierno_fotos_ENTRADA-02-p-500.png 500w, /images/invierno_fotos_ENTRADA-02-p-800.png 800w, /images/invierno_fotos_ENTRADA-02-p-1080.png 1080w, /images/invierno_fotos_ENTRADA-02.png 1280w"
            alt=""
          />
          <div class="div-block-20">
            <div
              data-tippy-content="Ir a la sección →"
              words-slide-from-right=""
              text-split=""
              class="title goto-section"
            >
              Everest
            </div>
            <a
              data-sveltekit-preload-data="tap"
              data-sveltekit-reload
              href="cobertor-everest"
              class="link-block-5 w-inline-block"
              ><img
                src="/images/mini-link.svg"
                loading="lazy"
                style="opacity:0"
                data-w-id="fc43544f-8d87-75cf-a494-d1d7c1345924"
                alt=""
                data-tippy-content="Ir a la sección →"
                class="goto-section"
              /></a
            >
          </div>
          <div text-split="" letters-slide-up="" class="text-block-6 intro">
            <span class="text-span-7">Línea Premium</span><br />· Diseños
            vanguardistas<br />· Máxima calidez<br />· Reverso de borrega
            premium<br />
          </div>
        </div>
        <div class="div-block-7">
          <img
            src="/images/invierno_fotos_ENTRADA-03.png"
            loading="lazy"
            sizes="(max-width: 479px) 92vw, (max-width: 767px) 83vw, 29vw"
            srcset="/images/invierno_fotos_ENTRADA-03-p-500.png 500w, /images/invierno_fotos_ENTRADA-03-p-800.png 800w, /images/invierno_fotos_ENTRADA-03-p-1080.png 1080w, /images/invierno_fotos_ENTRADA-03.png 1280w"
            alt=""
            class="image-14"
          />
          <div class="div-block-20">
            <div
              data-tippy-content="Ir a la sección →"
              words-slide-from-right=""
              text-split=""
              class="title goto-section"
            >
              Austral
            </div>
            <a
              data-sveltekit-preload-data="tap"
              data-sveltekit-reload
              href="cobertor-austral"
              class="link-block-4 w-inline-block"
              ><img
                src="/images/mini-link.svg"
                loading="lazy"
                style="opacity:0"
                data-w-id="60274898-b04a-decc-f3e0-aeb36354a8b3"
                alt=""
                data-tippy-content="Ir a la sección →"
                class="goto-section"
              /></a
            >
          </div>
          <div letters-slide-up="" text-split="" class="text-block-6 intro">
            <span class="text-span-7">Detalles únicos</span><br />· Texturas de
            jacquard<br />· Bordados<br />· Reverso de borrega premium<br />
          </div>
        </div>
        <div class="div-block-8">
          <img
            src="/images/invierno_fotos_ENTRADA-04.png"
            loading="lazy"
            sizes="(max-width: 479px) 94vw, (max-width: 767px) 87vw, 29vw"
            srcset="/images/invierno_fotos_ENTRADA-04-p-500.png 500w, /images/invierno_fotos_ENTRADA-04-p-800.png 800w, /images/invierno_fotos_ENTRADA-04-p-1080.png 1080w, /images/invierno_fotos_ENTRADA-04.png 1280w"
            alt=""
          />
          <div class="div-block-20">
            <div
              data-tippy-content="Ir a la sección →"
              words-slide-from-right=""
              text-split=""
              class="title goto-section"
            >
              Invernal
            </div>
            <a
              data-sveltekit-preload-data="tap"
              data-sveltekit-reload
              href="cobertor-invernal"
              class="link-block-6 w-inline-block"
              ><img
                src="/images/mini-link.svg"
                loading="lazy"
                style="opacity:0"
                data-w-id="4a607cd0-4d64-440d-a9b9-27e680034daa"
                alt=""
                data-tippy-content="Ir a la sección →"
                class="goto-section"
              /></a
            >
          </div>
          <div text-split="" letters-slide-up="" class="text-block-6 intro">
            <span class="text-span-7">Suavidad y calidez a tu alcance</span><br
            />· Diseño en tendencia<br />· Reverso de borrega premium<br />·
            Lavable en casa<br />
          </div>
        </div>
      </div>
      <div class="div-block-5">
        <div class="div-block-6">
          <img
            src="/images/invierno_fotos_ENTRADA-05.png"
            loading="lazy"
            sizes="(max-width: 479px) 94vw, (max-width: 767px) 87vw, (max-width: 991px) 30vw, 29vw"
            srcset="/images/invierno_fotos_ENTRADA-05-p-500.png 500w, /images/invierno_fotos_ENTRADA-05-p-800.png 800w, /images/invierno_fotos_ENTRADA-05-p-1080.png 1080w, /images/invierno_fotos_ENTRADA-05.png 1280w"
            alt=""
          />
          <div class="div-block-20">
            <div
              data-tippy-content="Ir a la sección →"
              words-slide-from-right=""
              text-split=""
              class="title goto-section"
            >
              Nórdico textura
            </div>
            <a
              data-sveltekit-preload-data="tap"
              data-sveltekit-reload
              href="cobertor-nordico"
              class="link-block-7 w-inline-block"
              ><img
                src="/images/mini-link.svg"
                loading="lazy"
                style="opacity:0"
                data-w-id="d1103af4-132a-ff2b-b336-e627bb744360"
                alt=""
                data-tippy-content="Ir a la sección →"
                class="goto-section"
              /></a
            >
          </div>
          <div letters-slide-up="" text-split="" class="text-block-6 intro">
            <span class="text-span-7">Textura en relieve en sus dos vistas</span
            > <br />· Ligero<br />· Lavable en casa<br />
          </div>
        </div>
        <div class="div-block-6">
          <img
            src="/images/invierno_fotos_ENTRADA-06.png"
            loading="lazy"
            sizes="(max-width: 479px) 94vw, (max-width: 767px) 87vw, (max-width: 991px) 30vw, 29vw"
            srcset="/images/invierno_fotos_ENTRADA-06-p-500.png 500w, /images/invierno_fotos_ENTRADA-06-p-800.png 800w, /images/invierno_fotos_ENTRADA-06-p-1080.png 1080w, /images/invierno_fotos_ENTRADA-06.png 1280w"
            alt=""
          />
          <div class="div-block-20">
            <div
              data-tippy-content="Ir a la sección →"
              words-slide-from-right=""
              text-split=""
              class="title goto-section"
            >
              Nórdico
            </div>
            <a
              data-sveltekit-preload-data="tap"
              data-sveltekit-reload
              href="cobertor-nordico"
              class="link-block-8 w-inline-block"
              ><img
                src="/images/mini-link.svg"
                loading="lazy"
                style="opacity:0"
                data-w-id="30999afb-b57a-fcb3-4f2e-1808f1855884"
                alt=""
                data-tippy-content="Ir a la sección →"
                class="goto-section"
              /></a
            >
          </div>
          <div letters-slide-up="" text-split="" class="text-block-6 intro">
            <span class="text-span-7">2 diseños en uno</span><br />· Ligeros<br
            />· Lavable en casa<br />
          </div>
        </div>
        <div class="div-block-8">
          <img
            src="/images/invierno_fotos_ENTRADA-07.png"
            loading="lazy"
            srcset="/images/invierno_fotos_ENTRADA-07-p-500.png 500w, /images/invierno_fotos_ENTRADA-07-p-800.png 800w, /images/invierno_fotos_ENTRADA-07-p-1080.png 1080w, /images/invierno_fotos_ENTRADA-07.png 1280w"
            sizes="(max-width: 479px) 94vw, (max-width: 767px) 87vw, (max-width: 991px) 30vw, 29vw"
            alt=""
          />
          <div class="div-block-20">
            <div
              data-tippy-content="Ir a la sección →"
              words-slide-from-right=""
              text-split=""
              class="title goto-section"
            >
              Ligero
            </div>
            <a
              data-sveltekit-preload-data="tap"
              data-sveltekit-reload
              href="cobertor-ligero"
              class="link-block-9 w-inline-block"
              ><img
                src="/images/mini-link.svg"
                loading="lazy"
                style="opacity:0"
                data-w-id="18834c1d-478e-d88b-655c-6fe9d9473b8f"
                alt=""
                data-tippy-content="Ir a la sección →"
                class="goto-section"
              /></a
            >
          </div>
          <div text-split="" letters-slide-up="" class="text-block-6 intro">
            <span class="text-span-7">Ideal para todo el año</span><br />· El
            más ligero<br />· Textura suave<br />
          </div>
        </div>
      </div>
    </section>
    <div class="sticky-container secondary-container">
      <div class="sticky-parent secondary-sticky">
        <div class="card-parent cloth-background">
          <section class="hero-image-left cloth-hero">
            <div class="div-block-29">
              <img
                src="/images/overlay-textures.svg"
                loading="lazy"
                width="100"
                data-w-id="89edf476-53ad-eba9-6756-9a72f2d57ba7"
                alt=""
                class="image-15"
              />
            </div>
            <section id="page1" class="div-block-3 secondary-copy-box">
              <h1 words-slide-up="" text-split="" class="big-heading secondary">
                solo lo <br />mejor para ti
              </h1>
              <div
                words-slide-from-right=""
                text-split=""
                class="text-block-4 secondary intro"
              >
                Somos los especialistas en tendencia y calidad para tu hogar.
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
    <div class="div-block-19">
      <main id="smooth-content" class="main-wrapper-2">
        <div class="section-height">
          <div class="sticky-element">
            <div class="track">
              <div class="track-flex">
                <div class="thanks-panel_wrap">
                  <div class="thanks-panel">
                    <div class="thanks-panel_contain">
                      <p class="thanks-panel_text">
                        Colores<br /><span class="text-span-4">impactantes</span
                        >
                      </p>
                      <div class="thanks-panel_img is-1">
                        <div class="thanks-panel_img-height">
                          <img
                            src="/images/INTRO-06.png"
                            loading="eager"
                            sizes="(max-width: 479px) 68vw, (max-width: 991px) 34vw, 19vw"
                            srcset="/images/INTRO-06-p-500.png 500w, /images/INTRO-06-p-800.png 800w, /images/INTRO-06-p-1080.png 1080w, /images/INTRO-06.png 1280w"
                            alt=""
                            class="thanks-panel_photo"
                          />
                        </div>
                      </div>
                      <div class="thanks-panel_img is-2">
                        <div class="thanks-panel_img-height">
                          <img
                            src="/images/INTRO-13.png"
                            loading="eager"
                            sizes="(max-width: 479px) 62vw, (max-width: 991px) 36vw, 16vw"
                            srcset="/images/INTRO-13-p-500.png 500w, /images/INTRO-13-p-800.png 800w, /images/INTRO-13-p-1080.png 1080w, /images/INTRO-13.png 1280w"
                            alt=""
                            class="thanks-panel_photo"
                          />
                        </div>
                      </div>
                      <div class="thanks-panel_img is-3">
                        <div class="thanks-panel_img-height">
                          <img
                            src="/images/INTRO-12.png"
                            loading="eager"
                            sizes="(max-width: 479px) 57vw, (max-width: 991px) 33vw, 18vw"
                            srcset="/images/INTRO-12-p-500.png 500w, /images/INTRO-12-p-800.png 800w, /images/INTRO-12-p-1080.png 1080w, /images/INTRO-12.png 1280w"
                            alt=""
                            class="thanks-panel_photo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="div-block-21 top-pallete">
            <img
              src="/images/Group-30.svg"
              loading="lazy"
              style="opacity:0"
              data-w-id="03369f7f-7877-3bc6-15b0-a390c7f48f9e"
              alt=""
              class="image-12"
            /><img
              src="/images/Group-32.svg"
              loading="lazy"
              style="opacity:0"
              data-w-id="9ad5db2e-7ec4-ac24-b1ff-c2c6c274c890"
              alt=""
              class="image-10"
            />
          </div>
          <div class="div-block-21">
            <img
              src="/images/Group-31.svg"
              loading="lazy"
              style="opacity:0"
              data-w-id="7661dc83-303f-e5db-6aab-cb876da5ccf9"
              alt=""
              class="image-11"
            /><img
              src="/images/Group-33.svg"
              loading="lazy"
              style="opacity:0"
              data-w-id="bb6a8283-6ed8-f3f9-74ef-b9ccbcdea8cd"
              alt=""
              class="image-9"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</section>

<CategoriesFooter
  catalog={Catalogs.INVIERNO}
  categories={catalogSections.INVIERNO}
/>
<NavigatorMenu bind:visibleIds bind:showPopup catalog={Catalogs.INVIERNO} />

<div>
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
