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
    Conoce las características principales de cada almohada, para mejorar tu
    calidad del sueño.
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
    La guía de almohadas
  </h3>
  <div
    id="w-node-e83bae0f-fde6-8fb7-22fd-2490a397fabf-5ea81bcd"
    class="w-layout-layout quick-stack-4 wf-layout-layout"
  >
    <div
      id="w-node-e83bae0f-fde6-8fb7-22fd-2490a397fac0-5ea81bcd"
      class="w-layout-cell"
    >
      <div>
        <img
          src="https://storage.googleapis.com/catalogo-web/invierno/fotos/SOPORTE-SUAVE.webp"
          loading="eager"
          alt=""
          class="image-43"
        />
        <div class="div-block-62">
          <div class="div-block-63">
            <div class="div-block-64"></div>
            <div class="div-block-64"></div>
          </div>
          <div text-split="" letters-fade-in="" class="text-block-31">
            soporte<br />suave
          </div>
        </div>
      </div>
    </div>
    <div
      id="w-node-e83bae0f-fde6-8fb7-22fd-2490a397fac1-5ea81bcd"
      class="w-layout-cell"
    >
      <div>
        <img
          src="https://storage.googleapis.com/catalogo-web/invierno/fotos/SOPORTE-MEDIO.webp"
          loading="eager"
          alt=""
          class="image-43"
        />
        <div class="div-block-62">
          <div class="div-block-63">
            <div class="div-block-64"></div>
            <div class="div-block-64"></div>
            <div class="div-block-64"></div>
          </div>
          <div text-split="" letters-fade-in="" class="text-block-31">
            soporte<br />medio
          </div>
        </div>
      </div>
    </div>
    <div
      id="w-node-_685fdca8-2fb8-1bca-13e4-8e225a70dc12-5ea81bcd"
      class="w-layout-cell"
    >
      <div>
        <img
          src="https://storage.googleapis.com/catalogo-web/invierno/fotos/SOPORTE-FIRME.webp"
          loading="eager"
          alt=""
          class="image-43"
        />
        <div class="div-block-62">
          <div class="div-block-63">
            <div class="div-block-64"></div>
            <div class="div-block-64"></div>
            <div class="div-block-64"></div>
            <div class="div-block-64"></div>
          </div>
          <div text-split="" letters-fade-in="" class="text-block-31">
            soporte<br />firme
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    data-w-id="1e8676b8-2f0a-deb9-64c7-dd5f9bd27c1e"
    style="opacity:0"
    class="detalles-almohada"
  >
    <div class="pricing-content">
      <div class="pricing-info">
        <h3 class="heading-8">
          almohadas <span class="text-span-10">VIAFOAM</span>
        </h3>
      </div>
      <div text-split="" letters-fade-in="" class="text-block-30 card">
        Diseñadas para necesidades específicas, promoviendo un descanso
        reparador.
      </div>
    </div>
    <div class="div-block-65 small">
      <img
        src="../images/viafom.svg"
        loading="eager"
        alt=""
        class="pricing-image-two shadow-two top"
      /><img
        src="../images/viafom2.svg"
        loading="eager"
        alt=""
        class="pricing-image-two shadow-two top"
      />
    </div>
  </div>

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
          {#if product.pageSubtitle.includes("Viafoam")}
            <div
              id={product.pageTitle}
              class="team-slide-wrapper w-slide"
              style="cursor: pointer;"
              on:click={show}
              data-visible-id={product.pageProducts}
            >
              <div class="team-block viafom">
                <img
                  src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product.pageProducts}.jpg"
                  loading="eager"
                  alt=""
                  class="team-member-image-two"
                />
                <div class="team-block-info">
                  <h3
                    class="team-member-name-two text-xl"
                    style="font-weight: 500; color: black"
                  >
                    {product.pageSubtitle}
                  </h3>
                  <p
                    class="team-member-text"
                    style="font-weight: 400; color: black"
                  >
                    {product.pageDescriptions[0]}
                  </p>
                  <div
                    class="div-block-65"
                    style="width: 100%; flex-wrap: wrap; align-content: center; justify-content: space-evenly; align-items: center; display: flex;"
                  >
                    {#each product.pageIcons as icon}
                      <div>
                        <ImageComponent
                          src={icon}
                          loading="eager"
                          alt=""
                          classList="pricing-image-two shadow-two"
                        />
                      </div>
                    {/each}
                  </div>
                  <a href="#" class="text-link-arrow w-inline-block">
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
          {/if}
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

  <div
    data-w-id="cc12ae12-b4c5-1f8e-3775-f67177d1e268"
    style="opacity:0"
    class="detalles-almohada vialifresh"
  >
    <div class="pricing-content">
      <div class="pricing-info">
        <h3 class="heading-8 vialifresh">
          almohadas <span class="text-span-10">VIALIFRESH</span>
        </h3>
      </div>
      <div text-split="" letters-fade-in="" class="text-block-30 card">
        Tecnología hipoalergénica que ayuda a proteger de bacterias, hongos,
        moho y ácaros, además previene malos olores.
      </div>
    </div>
    <div class="div-block-65">
      <img
        style="object-fit: cover;"
        src="../images/bacterias.svg"
        loading="eager"
        alt=""
        class="pricing-image-two shadow-two"
      /><img
        style="object-fit: cover;"
        src="../images/hongos.svg"
        loading="eager"
        alt=""
        class="pricing-image-two shadow-two"
      /><img
        style="object-fit: cover;"
        src="../images/moho.svg"
        loading="eager"
        alt=""
        class="pricing-image-two shadow-two"
      /><img
        style="object-fit: cover;"
        src="../images/denied.svg"
        loading="eager"
        alt=""
        class="pricing-image-two shadow-two denied"
      />
    </div>
  </div>
</section>
<section class="team-slider vialifresh">
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
        <!--
              <div class="team-slide-wrapper w-slide">
                <div class="team-block viafom"><img src="../images/87554_3.jpg" loading="eager" sizes="(max-width: 479px) 89vw, (max-width: 991px) 39vw, 25vw" srcset="../images/87554_3-p-500.jpg 500w, ../images/87554_3-p-800.jpg 800w, ../images/87554_3-p-1080.jpg 1080w, ../images/87554_3-p-1600.jpg 1600w, ../images/87554_3.jpg 2000w" alt="" class="team-member-image-two">
                  <div class="team-block-info">
                    <h3 class="team-member-name-two">Nombre Almohada</h3>
                    <p class="team-member-text">Copy principal almohada</p>
                    <a href="#" class="text-link-arrow w-inline-block">
                      <div>Ver más detalles</div>
                      <div class="arrow-embed w-embed"><svg width="20" height="20" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.72 15L16.3472 10.357C16.7732 9.92932 16.7732 9.23603 16.3472 8.80962L11.72 4.16667L10.1776 5.71508L12.9425 8.4889H4.16669V10.6774H12.9425L10.1776 13.4522L11.72 15Z" fill="currentColor"></path>
                        </svg></div>
                    </a>
                  </div>
                </div>
              </div>
              <div class="team-slide-wrapper w-slide">
                <div class="team-block"><img src="../images/87554_3.jpg" loading="eager" sizes="(max-width: 479px) 92vw, (max-width: 991px) 39vw, 25vw" srcset="../images/87554_3-p-500.jpg 500w, ../images/87554_3-p-800.jpg 800w, ../images/87554_3-p-1080.jpg 1080w, ../images/87554_3-p-1600.jpg 1600w, ../images/87554_3.jpg 2000w" alt="" class="team-member-image-two">
                  <div class="team-block-info">
                    <h3 class="team-member-name-two">Full Name</h3>
                    <p class="team-member-text">Copy principal almohada</p>
                    <a href="#" class="text-link-arrow w-inline-block">
                      <div>Ver más detalles</div>
                      <div class="arrow-embed w-embed"><svg width="20" height="20" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.72 15L16.3472 10.357C16.7732 9.92932 16.7732 9.23603 16.3472 8.80962L11.72 4.16667L10.1776 5.71508L12.9425 8.4889H4.16669V10.6774H12.9425L10.1776 13.4522L11.72 15Z" fill="currentColor"></path>
                        </svg></div>
                    </a>
                  </div>
                </div>
              </div>

              -->
        {#each products as product, index}
          {#if product.pageSubtitle.includes("Vialifresh")}
            <div
              id={product.pageTitle}
              class="team-slide-wrapper w-slide"
              on:click={show}
              data-visible-id={product.pageProducts}
              style="cursor: pointer;"
            >
              <div class="team-block vialifresh">
                <img
                  src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product.pageProducts}.jpg"
                  loading="eager"
                  alt=""
                  class="team-member-image-two"
                />
                <div class="team-block-info">
                  <h3
                    class="team-member-name-two text-xl"
                    style="font-weight: 500;"
                  >
                    {product.pageSubtitle}
                  </h3>
                  <p class="team-member-text" style="font-weight: 400">
                    {product.pageDescriptions[0]}
                  </p>
                  <div
                    class="div-block-65"
                    style="width: 100%; flex-wrap: wrap; align-content: center; justify-content: space-evenly; align-items: center; display: flex;"
                  >
                    {#each product.pageIcons as icon}
                      <div>
                        <ImageComponent
                          src={icon}
                          loading="eager"
                          alt=""
                          classList="pricing-image-two shadow-two"
                        />
                      </div>
                    {/each}
                  </div>
                  <a href="#" class="text-link-arrow w-inline-block">
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
          {/if}
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
          {#if product.pageSubtitle.includes("Viafoam") == false && product.pageSubtitle.includes("Vialifresh") == false}
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
                    style="font-weight: 500;"
                  >
                    {product.pageSubtitle}
                  </h3>
                  <p class="team-member-text" style="font-weight: 400">
                    {product.pageDescriptions[0]}
                  </p>
                  <div
                    class="div-block-65"
                    style="width: 100%; flex-wrap: wrap; align-content: center; justify-content: space-evenly; align-items: center; display: flex;"
                  >
                    {#each product.pageIcons as icon}
                      <div>
                        <ImageComponent
                          src={icon}
                          loading="eager"
                          alt=""
                          classList="pricing-image-two shadow-two"
                        />
                      </div>
                    {/each}
                  </div>
                  <a href="#" class="text-link-arrow w-inline-block">
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
          {/if}
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
