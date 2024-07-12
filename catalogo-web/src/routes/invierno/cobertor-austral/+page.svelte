<script lang="ts">
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";
  import type { PageData } from "./$types";
  import { catalogSections } from "$lib/components/currentCatalogPage";
  import CategoriesFooter from "$lib/components/categoriesFooter.svelte";

  let visibleIds = [];

  function handleVisibleChange(event) {
    visibleIds = event.detail;
  }

  let showPopup = false;

  function show() {
    showPopup = true;
  }

  let isLoaded = false;
  export let data: PageData;
  const products = data.props.products; // guarda el objeto product en una variable
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

{#each products as product, index}
  {#if index % 2 === 0}
    <div
      id={product.pageTitle}
      class="plantilla-austral"
      data-visible-id="{product.pageProducts}, {product
        .pageProductsImages[0]}, {product.pageProductsImages[1]}"
    >
      <section class="section-7">
        <div
          data-poster-url="../videos/poster-{product.pageTitle}.jpg"
          data-video-urls="../videos/video-{product.pageTitle}.mp4,../videos/video-{product.pageTitle}.webm"
          data-autoplay="true"
          data-loop="true"
          data-wf-ignore="true"
          class="background-video-3 w-background-video w-background-video-atom"
        >
          <video
            id="03aaf391-43fe-3144-f30a-a9a620053ba8-video"
            autoplay="true"
            loop="true"
            style="background-image:url(&quot;../videos/poster-{product.pageTitle}.jpg&quot;)"
            muted="true"
            playsinline=""
            data-wf-ignore="true"
            data-object-fit="cover"
          >
            <source
              src="../videos/video-{product.pageTitle}.mp4"
              data-wf-ignore="true"
            />
            <source
              src="../videos/video-{product.pageTitle}.webm"
              data-wf-ignore="true"
            />
          </video>
          <div class="div-block-37">
            <ImageComponent
              id="13bb5612-fe92-2612-82a1-47ecd004a28d"
              alt=""
              src={product.pageMainImage}
              classList="image-25"
            />
            <div class="div-block-11 title-right">
              <div class="page-title-box">
                <h2
                  text-split=""
                  words-slide-from-right=""
                  class="heading-4 alternate"
                >
                  {product.pageTitle}
                </h2>
                <p
                  text-split=""
                  words-slide-from-right=""
                  class="paragraph product-detail-subtitle"
                >
                  Cobertor Austral
                </p>
              </div>
              {#each product.pageIcons as icon}
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
              src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
                .pageProductsImages[0]}.jpg"
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
              src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
                .pageProductsImages[1]}.jpg"
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
      id={product.pageTitle}
      class="plantilla-austral"
      data-visible-id="{product.pageProducts}, {product
        .pageProductsImages[0]}, {product.pageProductsImages[1]}"
    >
      <section class="section-7">
        <div
          data-poster-url="../videos/poster-{product.pageTitle}.jpg"
          data-video-urls="../videos/video-{product.pageTitle}.mp4,../videos/video-{product.pageTitle}.webm"
          data-autoplay="true"
          data-loop="true"
          data-wf-ignore="true"
          class="background-video-3 w-background-video w-background-video-atom"
        >
          <video
            id="03aaf391-43fe-3144-f30a-a9a620053ba8-video"
            autoplay="true"
            loop="true"
            style="background-image:url(&quot;../videos/poster-{product.pageTitle}.jpg&quot;)"
            muted="true"
            playsinline=""
            data-wf-ignore="true"
            data-object-fit="cover"
          >
            <source
              src="../videos/video-{product.pageTitle}.mp4"
              data-wf-ignore="true"
            />
            <source
              src="../videos/video-{product.pageTitle}.webm"
              data-wf-ignore="true"
            />
          </video>
          <div class="div-block-37">
            <ImageComponent
              id="13bb5612-fe92-2612-82a1-47ecd004a28d"
              alt=""
              src={product.pageMainImage}
              classList="image-25"
            />
            <div class="div-block-11 title-right">
              <div class="page-title-box">
                <h2
                  text-split=""
                  words-slide-from-right=""
                  class="heading-4 alternate"
                >
                  {product.pageTitle}
                </h2>
                <p
                  text-split=""
                  words-slide-from-right=""
                  class="paragraph product-detail-subtitle"
                >
                  Cobertor Austral
                </p>
              </div>
              {#each product.pageIcons as icon}
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
              src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
                .pageProductsImages[0]}.jpg"
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
              src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
                .pageProductsImages[1]}.jpg"
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
