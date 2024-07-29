<script lang="ts">
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { URLS } from "$lib/constants/strings";

  export let page: DatabasePage;
  export let inversa: boolean = false;
</script>

<!-- class="plantilla-nordico {inversa ? 'inversa' : ''}"
{#if !inversa}
{/if} -->

<div id={page.pageTitle} class="plantilla-nordico" data-visible-id={page.SKU}>
  <div class="div-block-46">
    <div class="handle-container {inversa ? 'inverse' : ''}">
      {#if !inversa}
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
      {/if}

      <div udesly-before-after="50" class="handle-wrapper">
        <ImageComponent
          classList="image-right"
          src={`${URLS.fotos}${page.SKU}.webp`}
          alt=""
          image="right"
        />
        <ImageComponent
          classList="image-left"
          src={`${URLS.fotos}${page.SKU}-3.webp`}
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

      {#if inversa}
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
      {/if}
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
