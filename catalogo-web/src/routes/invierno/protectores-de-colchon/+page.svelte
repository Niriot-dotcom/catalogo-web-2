<script lang="ts">
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import CategoriesFooter from "$lib/components/categoriesFooter.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";
  import { catalogSections } from "$lib/components/currentCatalogPage";
  import type { PageData } from "./$types";
  import { page } from "$app/stores";

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
  const pageQ = data.props.page;
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

<section class="section-8">
  <div class="div-block-60">
    <h1 text-split="" letters-fade-in="" class="heading-6">
      {pageQ[0].pageTitle}
    </h1>
    <div text-split="" letters-fade-in="" class="text-block-30">
      Los expertos en <span class="text-span-9">descanso</span> para tí y los tuyos.
    </div>
  </div>
  <div class="div-block-61" style="opacity: 1 !important;">
    <div
      data-poster-url="../videos/poster-Aria.jpg"
      data-video-urls="../videos/video-Aria.mp4,../videos/video-Aria.webm"
      data-autoplay="false"
      data-loop="true"
      data-wf-ignore="true"
      data-w-id="889fb7fa-f1f6-4aa1-238d-dd289001ed4f"
      style="opacity:1"
      class="background-video-4 w-background-video w-background-video-atom"
    >
      <video
        id="889fb7fa-f1f6-4aa1-238d-dd289001ed4f-video"
        autoplay="true"
        loop="true"
        style="background-image:url(&quot;../videos/poster-Aria.jpg&quot;)"
        muted="true"
        playsinline=""
        data-wf-ignore="true"
        data-object-fit="cover"
      >
        <source src="../videos/video-Aria.mp4" data-wf-ignore="true" />
        <source src="../videos/video-Aria.webm" data-wf-ignore="true" />
      </video><noscript>
        <style>
          [data-wf-bgvideo-fallback-img] {
            display: none;
          }

          @media (prefers-reduced-motion: reduce) {
            [data-wf-bgvideo-fallback-img] {
              position: absolute;
              z-index: -100;
              display: inline-block;
              height: 100%;
              width: 100%;
              object-fit: cover;
            }
          }
        </style><img
          data-wf-bgvideo-fallback-img="true"
          src="documents/invierno_videos_88190-V1.mp4"
          alt=""
        />
      </noscript>
      <div aria-live="polite">
        <button
          type="button"
          data-w-bg-video-control="true"
          aria-controls="889fb7fa-f1f6-4aa1-238d-dd289001ed4f-video"
          class="w-backgroundvideo-backgroundvideoplaypausebutton w-background-video--control"
          ><span
            ><img
              src="https://uploads-ssl.webflow.com/6022af993a6b2191db3ed10c/628299f8aa233b83918e24fd_Pause.svg"
              loading="eager"
              alt="Pause video"
            /></span
          ><span hidden=""
            ><img
              loading="eager"
              alt="Play video"
              src="https://uploads-ssl.webflow.com/6022af993a6b2191db3ed10c/628298b20ae0236682d4b87f_Play-24.svg"
            /></span
          ></button
        >
      </div>
    </div>
  </div>
</section>
<section class="section-10">
  <h2 scrub-each-word="" text-split="" class="heading-9">
    Conoce las características principales de cada protector de colchón y
    encuentra el ideal.
  </h2>
  <img
    src="../images/abajo.svg"
    loading="eager"
    style="opacity:0"
    data-w-id="ea4b971a-27e3-8638-3274-44384a88c49a"
    alt=""
    class="image-44"
  />
</section>
<section class="section-9">
  <h3 text-split="" letters-fade-in="" class="heading-7 section-9">
    La guía de protectores de colchón
  </h3>

  <div class="container-8">
    <div
      data-delay="4000"
      data-animation="slide"
      class="team-slider-wrapper w-slider"
      data-autoplay="false"
      data-easing="ease"
      data-hide-arrows="false"
      data-disable-swipe="false"
      data-autoplay-limit="0"
      data-nav-spacing="6"
      data-duration="1000"
      data-infinite="true"
    >
      <div class="w-slider-mask">
        {#each products as product, index}
          <div
            id={product.pageTitle}
            class="team-slide-wrapper w-slide"
            on:click={show}
            data-visible-id={product.pageProducts}
            style="cursor: pointer;"
          >
            <div class="team-block">
              <img
                src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product.pageProducts}.jpg"
                loading="eager"
                alt=""
                class="team-member-image-two"
              />
              <div class="team-block-info">
                <h3
                  class="team-member-name-two text-xl"
                  style="font-weight: 500; color: black;"
                >
                  {product.pageSubtitle}
                </h3>
                <p
                  class="team-member-text"
                  style="font-weight: 400; color: black;"
                >
                  {product.pageDescriptions[0]}
                </p>
                <div
                  class="div-block-65"
                  style="width: 100%; flex-wrap: wrap; align-content: center; justify-content: space-evenly; align-items: center; display: flex;"
                >
                  {#each product.pageIcons as icon}
                    <ImageComponent
                      src={icon}
                      loading="eager"
                      alt=""
                      classList="pricing-image-two shadow-two"
                    />
                  {/each}
                </div>
                <a
                  href="#"
                  class="text-link-arrow w-inline-block"
                  style="margin-top: 12px;"
                >
                  <div>Ver más detalles</div>
                  <div class="arrow-embed w-embed">
                    <svg
                      width="20"
                      height="20"
                      viewbox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.72 15L16.3472 10.357C16.7732 9.92932 16.7732 9.23603 16.3472 8.80962L11.72 4.16667L10.1776 5.71508L12.9425 8.4889H4.16669V10.6774H12.9425L10.1776 13.4522L11.72 15Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        {/each}
      </div>
      <div class="team-slider-arrow w-slider-arrow-left">
        <div class="icon-2 w-icon-slider-left"></div>
      </div>
      <div class="team-slider-arrow w-slider-arrow-right">
        <div class="icon-3 w-icon-slider-right"></div>
      </div>
      <div
        class="team-slider-nav w-slider-nav w-slider-nav-invert w-round"
      ></div>
    </div>
  </div>
</section>
<section class="team-slider vialifresh"></section>

<CategoriesFooter
  catalog={Catalogs.INVIERNO}
  categories={catalogSections.INVIERNO}
/>
<NavigatorMenu bind:visibleIds bind:showPopup catalog={Catalogs.INVIERNO} />

<div>
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
  <script defer src="../js/webflow.js" type="text/javascript"></script>
</div>

<style>
  .w-backgroundvideo-backgroundvideoplaypausebutton {
    max-height: 44px;
    overflow: hidden;
  }
</style>
