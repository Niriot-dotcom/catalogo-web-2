<script lang="ts">
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import CategoriesFooter from "$lib/components/categoriesFooter.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";
  import { catalogSections } from "$lib/components/currentCatalogPage";
  import type { PageData } from "./$types";

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

{#each products as product, index}
  <div
    id={product.pageTitle}
    data-visible-id="{product.pageProducts}, {product
      .pageProductsImages[0]}, {product.pageProductsImages[1]}"
  >
    <div class="plantilla-nordico">
      <div class="div-block-46">
        <div class="handle-container">
          <div class="div-block-45">
            <ImageComponent
              src={product.pageImages[1]}
              loading="eager"
              id="f09abdcc-902f-003f-2d59-9712f02a5bd1"
              alt=""
              classList="image-28"
            />
            <div class="div-block-43 ligero">
              <div class="div-block-48">
                <div class="page-title-box">
                  <h2 text-split="" words-slide-from-right="" class="heading-4">
                    {product.pageTitle}
                  </h2>
                  <p
                    text-split=""
                    words-slide-from-right=""
                    class="paragraph product-detail-subtitle alternate"
                  >
                    Cobertor Ligero
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
              <div class="copy-box-everest right ligero">
                <div class="text-block-26">
                  <span class="text-span-8">{product.pageDescriptions[0]}</span>
                </div>
                <div class="text-block-27">
                  {product.pageDescriptions[1]}, {product.pageDescriptions[2]}
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
              src={product.pageMainImage}
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
            src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
              .pageProductsImages[0]}.jpg"
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
            src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
              .pageProductsImages[1]}.jpg"
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
    id={products.pageTitle}
    data-visible-id="{product.pageProducts}, {product
      .pageProductsImages[0]}, {product.pageProductsImages[1]}"
  >
    <div class="plantilla-nordico">
      <div class="div-block-46">
        <div class="handle-container">
          <div class="div-block-45">
            <ImageComponent
              src={product.pageImages[1]}
              loading="eager"
              id="f09abdcc-902f-003f-2d59-9712f02a5bd1"
              alt=""
              classList="image-28"
            />
            <div class="div-block-43 ligero">
              <div class="div-block-48">
                <div class="page-title-box">
                  <h2 text-split="" words-slide-from-right="" class="heading-4">
                    {product.pageTitle}
                  </h2>
                  <p
                    text-split=""
                    words-slide-from-right=""
                    class="paragraph product-detail-subtitle alternate"
                  >
                    Cobertor Ligero
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
              <div class="copy-box-everest right ligero">
                <div class="text-block-26 hidden">
                  Pelo <span class="text-span-8">largo</span>
                </div>
                <div class="hidden text-block-27">
                  This is some text inside of a div block.
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
              src={product.pageMainImage}
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
            src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
              .pageProductsImages[0]}.jpg"
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
            src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
              .pageProductsImages[1]}.jpg"
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
  <script defer src="../js/animations.js" type="text/javascript"></script>
  <script defer src="../js/webflow.js" type="text/javascript"></script>
</div>
