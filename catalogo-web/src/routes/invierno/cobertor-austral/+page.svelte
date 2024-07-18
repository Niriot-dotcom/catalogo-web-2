<script lang="ts">
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";
  import type { PageData } from "./$types";
  import { catalogSections } from "$lib/components/currentCatalogPage";
  import CategoriesFooter from "$lib/components/categoriesFooter.svelte";
  import EntradaInvierno from "$lib/templates/invierno/EntradaInvierno.svelte";
  import { URLS } from "$lib/constants/strings";

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
  backgroundVideo="/images/invierno/portadillas/ENTRADA-P03-AUSTRAL-VERTICAL.mp4"
  backgroundImage="/images/invierno/portadillas/ENTRADA-P03-AUSTRAL.webp"
  backgroundColor="#EDE3EC"
  textImage="/images/invierno/copys/.svg"
  storyMainPhrase="llega la época<br />de abrazos"
  storyCopy="donde la familia se reúne<br />cubre del frío con los<br />cobertores más <b>calientitos.</b>"
/>

{#each pages as page, index}
  {#if index % 2 === 0}
    <div
      id={page.pageTitle}
      class="plantilla-austral"
      data-visible-id={page.SKU}
    >
      <section class="section-7">
        <div
          data-poster-url="../videos/poster-{page.pageTitle}.jpg"
          data-video-urls="../videos/video-{page.pageTitle}.mp4,../videos/video-{page.pageTitle}.webm"
          data-autoplay="true"
          data-loop="true"
          data-wf-ignore="true"
          class="background-video-3 w-background-video w-background-video-atom"
        >
          <video
            id="03aaf391-43fe-3144-f30a-a9a620053ba8-video"
            autoplay="true"
            loop="true"
            style="background-image:url(&quot;../videos/poster-{page.pageTitle}.jpg&quot;)"
            muted="true"
            playsinline=""
            data-wf-ignore="true"
            data-object-fit="cover"
          >
            <source
              src="../videos/video-{page.pageTitle}.mp4"
              data-wf-ignore="true"
            />
            <source
              src="../videos/video-{page.pageTitle}.webm"
              data-wf-ignore="true"
            />
          </video>
          <div class="div-block-37">
            <ImageComponent
              id="13bb5612-fe92-2612-82a1-47ecd004a28d"
              alt=""
              src={page.pageMainImage}
              classList="image-25"
            />
            <div class="div-block-11 title-right">
              <div class="page-title-box">
                <h2
                  text-split=""
                  words-slide-from-right=""
                  class="heading-4 alternate"
                >
                  {page.pageTitle}
                </h2>
                <p
                  text-split=""
                  words-slide-from-right=""
                  class="paragraph product-detail-subtitle"
                >
                  Cobertor Austral
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
          </div>
        </div>
      </section>
      <div class="div-block-39">
        <div class="related-products austral">
          <div
            text-split=""
            words-slide-from-right=""
            class="text-block-23 look-book"
          >
            Completa<br /><strong class="bold-text">el Look</strong>
          </div>
          <a href="#" class="link-block-10 w-inline-block"
            ><img
              src={`${URLS.fotos}${page.complCurtains[0]}.webp`}
              loading="eager"
              alt=""
              class="image-18"
            />
            <div class="text-block-22">
              agrega estas<strong class="bold-text-6"><br />sábanas</strong>
            </div>
          </a>
          <a href="#" class="link-block-10 w-inline-block"
            ><img
              src={`${URLS.fotos}${page.complSheets[0]}.webp`}
              loading="eager"
              alt=""
              class="image-18"
            />
            <div class="text-block-22">
              combina con estas <br />‍<strong>cortinas</strong>
            </div>
          </a>
        </div>
      </div>
    </div>
  {:else}
    <div
      id={page.pageTitle}
      class="plantilla-austral"
      data-visible-id={page.SKU}
    >
      <section class="section-7">
        <div
          data-poster-url="../videos/poster-{page.pageTitle}.jpg"
          data-video-urls="../videos/video-{page.pageTitle}.mp4,../videos/video-{page.pageTitle}.webm"
          data-autoplay="true"
          data-loop="true"
          data-wf-ignore="true"
          class="background-video-3 w-background-video w-background-video-atom"
        >
          <video
            id="03aaf391-43fe-3144-f30a-a9a620053ba8-video"
            autoplay="true"
            loop="true"
            style="background-image:url(&quot;../videos/poster-{page.pageTitle}.jpg&quot;)"
            muted="true"
            playsinline=""
            data-wf-ignore="true"
            data-object-fit="cover"
          >
            <source
              src="../videos/video-{page.pageTitle}.mp4"
              data-wf-ignore="true"
            />
            <source
              src="../videos/video-{page.pageTitle}.webm"
              data-wf-ignore="true"
            />
          </video>
          <div class="div-block-37">
            <ImageComponent
              id="13bb5612-fe92-2612-82a1-47ecd004a28d"
              alt=""
              src={page.pageMainImage}
              classList="image-25"
            />
            <div class="div-block-11 title-right">
              <div class="page-title-box">
                <h2
                  text-split=""
                  words-slide-from-right=""
                  class="heading-4 alternate"
                >
                  {page.pageTitle}
                </h2>
                <p
                  text-split=""
                  words-slide-from-right=""
                  class="paragraph product-detail-subtitle"
                >
                  Cobertor Austral
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
          </div>
        </div>
      </section>
      <div class="div-block-39">
        <div class="related-products austral">
          <div
            text-split=""
            words-slide-from-right=""
            class="text-block-23 look-book"
          >
            Completa<br /><strong class="bold-text">el Look</strong>
          </div>
          <a href="#" class="link-block-10 w-inline-block"
            ><img
              src={`${URLS.fotos}${page.complCurtains[0]}.webp`}
              loading="eager"
              alt=""
              class="image-18"
            />
            <div class="text-block-22">
              agrega estas<strong class="bold-text-6"><br />sábanas</strong>
            </div>
          </a>
          <a href="#" class="link-block-10 w-inline-block"
            ><img
              src={`${URLS.fotos}${page.complSheets[0]}.webp`}
              loading="eager"
              alt=""
              class="image-18"
            />
            <div class="text-block-22">
              combina con estas <br />‍<strong>cortinas</strong>
            </div>
          </a>
        </div>
      </div>
    </div>
  {/if}
{/each}

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
  <script defer src="../js/animations.js"></script>
  <script defer src="../js/webflow.js" type="text/javascript"></script>
</div>
