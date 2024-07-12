<script lang="ts">
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import CategoriesFooter from "$lib/components/categoriesFooter.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";
  import { catalogSections } from "$lib/components/currentCatalogPage";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import ImageComponent from "$lib/components/imageComponent.svelte";

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
  const products = data.props.products; // guarda el objeto product en una variable

  function removeSpecialChars(str) {
    return str.replace(/["\[\]]/g, "");
  }
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />

{#each products as product, index}
  {#if index % 2 === 0}
    <div
      id={product.pageTitle}
      class="plantilla-nordico"
      data-visible-id="{product.pageProducts}, {product
        .pageProductsImages[0]}, {product.pageProductsImages[1]}"
    >
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
                    Cobertor Nórdico
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
              src={product.pageImages[0]}
              alt=""
              image="right"
            />
            <ImageComponent
              classList="image-left"
              src={product.pageMainImage}
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
            src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
              .pageProductsImages[0]}.jpg"
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
        </div>
      </div>
    </div>
  {:else if product.pageTitle === "Bariloche"}
    <div
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
                    <h2
                      text-split=""
                      words-slide-from-right=""
                      class="heading-4"
                    >
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
                    <span class="text-span-8"
                      >{product.pageDescriptions[0]}</span
                    >
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
      id={product.pageTitle}
      class="plantilla-nordico"
      data-visible-id="{product.pageProducts}, {product
        .pageProductsImages[0]}, {product.pageProductsImages[1]}"
    >
      <div>
        <div class="handle-container inverse">
          <div udesly-before-after="50" class="handle-wrapper">
            <ImageComponent
              classList="image-right"
              src={product.pageImages[0]}
              alt=""
              image="right"
            />
            <ImageComponent
              classList="image-left"
              src={product.pageMainImage}
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
              src={product.pageImages[1]}
              loading="eager"
              id="1fd515fa-fb89-8c4a-3025-2143feb88432"
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
                    Cobertor Nórdico
                  </p>
                </div>
                {#each product.pageIcons as icon}
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
