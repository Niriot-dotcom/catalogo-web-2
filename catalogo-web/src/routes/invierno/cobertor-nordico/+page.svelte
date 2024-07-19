<script lang="ts">
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import CategoriesFooter from "$lib/components/categoriesFooter.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";
  import { catalogSections } from "$lib/components/currentCatalogPage";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import EntradaInvierno from "$lib/templates/invierno/EntradaInvierno.svelte";
  import { URLS } from "$lib/constants/strings";

  onMount(() => {
    const script = document.createElement("script");
    script.src = "../js/nordicSlider.js";
    script.async = true;
    document.body.appendChild(script);
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
  const pages = data.props.pages; // guarda el objeto product en una variable
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

<!-- ENTRADA -->
<EntradaInvierno
  backgroundVideo="/images/invierno/portadillas/ENTRADA-P05-NORDICO-VERTICAL.mp4"
  backgroundImage="/images/invierno/portadillas/ENTRADA-P05-NORDICO.webp"
  backgroundColor="#EDE3EC"
  textImage="/images/invierno/copys/.svg"
  storyMainPhrase="llega la época<br />de abrazos"
  storyCopy="donde la familia se reúne<br />cubre del frío con los<br />cobertores más <b>calientitos.</b>"
/>

{#each pages as page, index}
  {#if index % 2 === 0}
    <div
      id={page.pageTitle}
      class="plantilla-nordico"
      data-visible-id={page.SKU}
    >
      <div class="div-block-46">
        <div class="handle-container">
          <div class="div-block-45">
            <ImageComponent
              src={`${URLS.fotos}${page.SKU}-2.webp`}
              loading="eager"
              id="f09abdcc-902f-003f-2d59-9712f02a5bd1"
              alt=""
              classList="image-28"
            />
            <div class="div-block-43 ligero">
              <div class="div-block-48">
                <div class="page-title-box">
                  <h2 text-split="" words-slide-from-right="" class="heading-4">
                    {page.pageTitle}
                  </h2>
                  <p
                    text-split=""
                    words-slide-from-right=""
                    class="paragraph product-detail-subtitle alternate"
                  >
                    Cobertor Nórdico
                  </p>
                </div>
                {#each page.pageIcons as icon}
                  <div>
                    <ImageComponent
                      src={icon}
                      loading="eager"
                      alt=""
                      classList="icon-image"
                    />
                  </div>
                {/each}
              </div>
              <img
                src="../images/CopyNordico.svg"
                loading="eager"
                alt=""
                class="image-30"
              />
            </div>
          </div>
          <div udesly-before-after="50" class="handle-wrapper">
            <ImageComponent
              classList="image-right"
              src={`${URLS.fotos}${page.SKU}.webp`}
              alt=""
              image="right"
            />
            <ImageComponent
              classList="image-left"
              src={page.pageMainImage}
              alt=""
              image="left"
            />
            <div before-after="handle" class="handle-bar">
              <div class="circle-wrapper"></div>
            </div>
            <div image="left-label" class="before">
              <h1 class="handle">1er vista</h1>
            </div>
            <div image="right-label" class="after">
              <h1 class="handle">2da vista</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="related-products horizontal">
        <div
          text-split=""
          words-slide-from-right=""
          class="text-block-23 look-book"
        >
          Completa<br /><strong class="bold-text">el Look</strong>
        </div>
        <div class="link-block-10 centered w-inline-block">
          <img
            src={`${URLS.fotos}${page.complCurtains[0]}.webp`}
            loading="eager"
            alt=""
            class="image-18 horizontal"
          />
          <div class="text-block-22 centered">
            agrega estas<br />‍<strong class="bold-text-2"> sábanas</strong>
          </div>
        </div>
        <div class="link-block-10 centered w-inline-block">
          <img
            src={`${URLS.fotos}${page.complSheets[0]}.webp`}
            loading="eager"
            alt=""
            class="image-18 horizontal"
          />
          <div class="text-block-22 centered">
            combina con estas<br />
            <strong class="bold-text-3"> cortinas</strong>
          </div>
        </div>
      </div>
    </div>
  {:else if page.pageTitle === "Bariloche"}
    <div data-visible-id={page.SKU}>
      <div class="plantilla-nordico">
        <div class="div-block-46">
          <div class="handle-container">
            <div class="div-block-45">
              <ImageComponent
                src={`${URLS.fotos}${page.SKU}-2.webp`}
                loading="eager"
                id="f09abdcc-902f-003f-2d59-9712f02a5bd1"
                alt=""
                classList="image-28"
              />
              <div class="div-block-43 ligero">
                <div class="div-block-48">
                  <div class="page-title-box">
                    <h2
                      text-split=""
                      words-slide-from-right=""
                      class="heading-4"
                    >
                      {page.pageTitle}
                    </h2>
                    <p
                      text-split=""
                      words-slide-from-right=""
                      class="paragraph product-detail-subtitle alternate"
                    >
                      Cobertor Ligero
                    </p>
                  </div>
                  {#each page.pageIcons as icon}
                    <div>
                      <ImageComponent
                        src={icon}
                        loading="eager"
                        alt=""
                        classList="icon-image"
                      />
                    </div>
                  {/each}
                </div>
                <div class="copy-box-everest right ligero">
                  <div class="text-block-26">
                    <span class="text-span-8">
                      <!-- TODO -->
                      page.pageDescriptions[0]
                    </span>
                  </div>
                  <div class="text-block-27">
                    <!-- TODO -->
                    page.pageDescriptions[1], page.pageDescriptions[2]
                  </div>
                  <img
                    src="../images/Flechas.svg"
                    loading="eager"
                    alt=""
                    class="arrow-image"
                  />
                </div>
              </div>
            </div>
            <div udesly-before-after="50" class="ligero-container">
              <ImageComponent
                src={page.pageMainImage}
                loading="eager"
                id="adfea8dd-6554-1c71-61f8-1c4b232589e5"
                classList="image-31"
              />
            </div>
          </div>
        </div>
        <div class="related-products horizontal">
          <div
            text-split=""
            words-slide-from-right=""
            class="text-block-23 look-book"
          >
            Completa<br /><strong class="bold-text">el Look</strong>
          </div>
          <a href="#" class="link-block-10 centered w-inline-block"
            ><img
              src={`${URLS.fotos}${page.SKU}.webp`}
              loading="eager"
              alt=""
              class="image-18 horizontal"
            />
            <div class="text-block-22 centered">
              agrega estas<br />‍<strong class="bold-text-2"> sábanas</strong>
            </div>
          </a>
          <a href="#" class="link-block-10 centered w-inline-block"
            ><img
              src={`${URLS.fotos}${page.SKU}-2.webp`}
              loading="eager"
              alt=""
              class="image-18 horizontal"
            />
            <div class="text-block-22 centered">
              combina con estas<br />
              <strong class="bold-text-3"> cortinas</strong>
            </div>
          </a>
        </div>
      </div>
    </div>
  {:else}
    <div
      id={page.pageTitle}
      class="plantilla-nordico"
      data-visible-id={page.SKU}
    >
      <div>
        <div class="handle-container inverse">
          <div udesly-before-after="50" class="handle-wrapper">
            <ImageComponent
              classList="image-right"
              src={`${URLS.fotos}${page.SKU}.webp`}
              alt=""
              image="right"
            />
            <ImageComponent
              classList="image-left"
              src={page.pageMainImage}
              alt=""
              image="left"
            />
            <div before-after="handle" class="handle-bar">
              <div class="circle-wrapper"></div>
            </div>
            <div image="left-label" class="before">
              <h1 class="handle">1er vista</h1>
            </div>
            <div image="right-label" class="after">
              <h1 class="handle">2da vista</h1>
            </div>
          </div>
          <div class="div-block-45 left">
            <ImageComponent
              src={`${URLS.fotos}${page.SKU}-2.webp`}
              loading="eager"
              id="1fd515fa-fb89-8c4a-3025-2143feb88432"
              alt=""
              classList="image-28"
            />
            <div class="div-block-43 ligero">
              <div class="div-block-48">
                <div class="page-title-box">
                  <h2 text-split="" words-slide-from-right="" class="heading-4">
                    {page.pageTitle}
                  </h2>
                  <p
                    text-split=""
                    words-slide-from-right=""
                    class="paragraph product-detail-subtitle alternate"
                  >
                    Cobertor Nórdico
                  </p>
                </div>
                {#each page.pageIcons as icon}
                  <ImageComponent
                    src={icon}
                    loading="eager"
                    alt=""
                    classList="icon-image"
                  />
                {/each}
              </div>
              <img
                src="../images/CopyNordico.svg"
                loading="eager"
                alt=""
                class="image-30"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="related-products horizontal">
        <div
          text-split=""
          words-slide-from-right=""
          class="text-block-23 look-book"
        >
          Completa<br /><strong class="bold-text">el Look</strong>
        </div>
        <a href="#" class="link-block-10 centered w-inline-block"
          ><img
            src={`${URLS.fotos}${page.complCurtains[0]}.webp`}
            loading="eager"
            alt=""
            class="image-18 horizontal"
          />
          <div class="text-block-22 centered">
            agrega estas<br />‍<strong class="bold-text-2"> sábanas</strong>
          </div>
        </a>
        <a href="#" class="link-block-10 centered w-inline-block"
          ><img
            src={`${URLS.fotos}${page.complSheets[0]}.webp`}
            loading="eager"
            alt=""
            class="image-18 horizontal"
          />
          <div class="text-block-22 centered">
            combina con estas<br />
            <strong class="bold-text-3"> cortinas</strong>
          </div>
        </a>
      </div>
    </div>
  {/if}
{/each}

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
  <script defer src="../js/webflow.js" type="text/javascript"></script>
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
