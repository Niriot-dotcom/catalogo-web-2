<script lang="ts">
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import CategoriesFooter from "$lib/components/categoriesFooter.svelte";
  import { Catalogs } from "$lib/constants/globalTypes";
  import { catalogSections } from "$lib/components/currentCatalogPage";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  function isSafari() {
    return (
      navigator.userAgent.includes("Safari") &&
      !navigator.userAgent.includes("Chrome")
    );
  }

  onMount(() => {
    // Si el navegador es Safari, ajusta los elementos .image-16
    if (isSafari()) {
      const images = document.querySelectorAll(".image-16");

      images.forEach((img) => {
        img.removeAttribute("data-w-id"); // Eliminar el atributo data-w-id
        img.classList.add("safari-browser"); // Agregar la clase safari-browser
      });
    }
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

<div>
  <style>
    .safari-browser {
      max-height: 100% !important;
      min-height: 100% !important;
    }
  </style>
</div>
{#each products as product, index}
  {#if index % 2 === 0}
    <div
      id={product.pageTitle}
      data-visible-id="{product.pageProducts}, {product
        .pageProductsImages[0]}, {product.pageProductsImages[1]}"
      class="plantilla-everest"
    >
      <div class="div-block-31">
        <ImageComponent
          src={product.pageMainImage}
          loading="eager"
          id="85459054-6751-a5e7-07bf-1e4f3351a2d0"
          classList="image-16"
        />
        <div class="div-block-11">
          <div class="page-title-box">
            <h2 class="heading-4">{product.pageTitle}</h2>
            <p class="paragraph product-detail-subtitle alternate">
              Cobertor Everest
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
      <section class="section-6">
        <div
          class="background-video-2 w-background-video w-background-video-atom"
        >
          <img
            src="../videos/poster-{product.pageTitle}.jpg"
            loading="eager"
            alt=""
            style="background-image:url(&quot;../videos/poster-{product.pageTitle}.jpg&quot;); height: 100%;
        object-fit: cover;"
          />
          <div class="copy-box-everest right">
            <div class="text-block-26">
              Pelo <span class="text-span-8">largo</span>
            </div>
            <div class="text-block-27" style="text-transform: capitalize;">
              {typeof product.pageCopys[1] !== "undefined"
                ? product.pageCopys[1]
                : ""}
            </div>
            <img
              src="../images/Flechas.svg"
              loading="eager"
              alt=""
              class="arrow-image"
            />
          </div>
        </div>
        <div class="div-block-33">
          <ImageComponent
            src={product.pageImages[0]}
            loading="eager"
            id="85459054-6751-a5e7-07bf-1e4f3351a2d0"
            classList="image-17"
          />
          <div class="copy-box-everest">
            <div class="text-block-25" style="text-transform: lowercase;">
              {product.pageDescriptions[1]}
            </div>
            <div class="text-block-27">{product.pageDescriptions[2]}</div>
            <img
              src="../images/Flechas-1.svg"
              loading="eager"
              alt=""
              class="arrow-image"
            />
          </div>
        </div>
        <div class="related-products">
          <div
            text-split=""
            words-slide-from-right=""
            class="text-block-23 look-book"
          >
            Completa<br /><strong class="bold-text">el Look</strong>
          </div>
          <div
            on:click={show}
            style="cursor:pointer;"
            class="link-block-10 w-inline-block"
          >
            <img
              src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
                .pageProductsImages[0]}.jpg"
              loading="eager"
              alt=""
              class="image-18"
            />
            <div class="text-block-22">
              agrega <br />estas<br /><strong>sábanas</strong>
            </div>
          </div>
          <div
            on:click={show}
            style="cursor:pointer;"
            class="link-block-10 w-inline-block"
          >
            <img
              src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
                .pageProductsImages[1]}.jpg"
              loading="eager"
              alt=""
              class="image-18"
            />
            <div class="text-block-22">
              combina con <br />estas <br /><strong>cortinas</strong>
            </div>
            <div
              data-w-id="75741da4-174f-3d3b-ddbf-263c2aab5253"
              style="opacity:0"
              class="div-block-34"
            ></div>
          </div>
        </div>
      </section>
    </div>
  {:else}
    <div
      id={product.pageTitle}
      data-visible-id="{product.pageProducts}, {product
        .pageProductsImages[0]}, {product.pageProductsImages[1]}"
      class="plantilla-everest inversa"
    >
      <section class="section-6">
        <div
          class="background-video-2 w-background-video w-background-video-atom"
        >
          <img
            src="../videos/poster-{product.pageTitle}.jpg"
            loading="eager"
            alt=""
            style="background-image:url(&quot;../videos/poster-{product.pageTitle}.jpg&quot;); height: 100%;
        object-fit: cover;"
          />

          <div class="copy-box-everest right">
            <div class="text-block-26">
              Pelo <span class="text-span-8">largo</span>
            </div>
            <div class="text-block-27" style="text-transform: capitalize;">
              {typeof product.pageCopys[1] !== "undefined"
                ? product.pageCopys[1]
                : ""}
            </div>
            <img
              src="../images/Flechas.svg"
              loading="eager"
              alt=""
              class="arrow-image"
            />
          </div>
        </div>
        <div class="div-block-33">
          <ImageComponent
            src={product.pageImages[0]}
            loading="eager"
            id="85459054-6751-a5e7-07bf-1e4f3351a2d0"
            classList="image-17"
          />
          <div class="copy-box-everest">
            <div class="text-block-25" style="text-transform: lowercase;">
              {product.pageDescriptions[1]}
            </div>
            <div class="text-block-27 hidden">
              This is some text inside of a div block.
            </div>
            <img
              src="../images/Flechas-1.svg"
              loading="eager"
              alt=""
              class="arrow-image"
            />
          </div>
        </div>
        <div class="related-products">
          <div
            text-split=""
            words-slide-from-right=""
            class="text-block-23 look-book"
          >
            Completa<br /><strong class="bold-text">el Look</strong>
          </div>
          <div
            on:click={show}
            style="cursor:pointer;"
            class="link-block-10 w-inline-block"
          >
            <img
              src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
                .pageProductsImages[0]}.jpg"
              loading="eager"
              alt=""
              class="image-18"
            />
            <div class="text-block-22">
              agrega <br />estas<br /><strong>sábanas</strong>
            </div>
          </div>
          <div
            on:click={show}
            style="cursor:pointer;"
            class="link-block-10 w-inline-block"
          >
            <img
              src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{product
                .pageProductsImages[1]}.jpg"
              loading="eager"
              alt=""
              class="image-18"
            />
            <div class="text-block-22">
              combina con <br />estas <br /><strong>cortinas</strong>
            </div>
            <div
              data-w-id="75741da4-174f-3d3b-ddbf-263c2aab5253"
              style="opacity:0"
              class="div-block-34"
            ></div>
          </div>
        </div>
      </section>
      <div class="div-block-31">
        <ImageComponent
          src={product.pageMainImage}
          loading="eager"
          id="85459054-6751-a5e7-07bf-1e4f3351a2d0"
          classList="image-16"
        />
        <div class="div-block-11">
          <div class="page-title-box">
            <h2 class="heading-4">{product.pageTitle}</h2>
            <p class="paragraph product-detail-subtitle alternate">
              Cobertor Everest
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
  <script defer src="../js/animations.js" type="text/javascript"></script>
  <script defer src="../js/webflow.js" type="text/javascript"></script>
</div>
