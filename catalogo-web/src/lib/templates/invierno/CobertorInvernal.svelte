<script lang="ts">
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { URLS } from "$lib/constants/strings";

  export let page: DatabasePage;
  export let inversa: boolean = false;
</script>

<div id={page.pageTitle}>
  <div
    data-visible-id={page.SKU}
    data-w-id="26494cac-c879-c70d-1939-3984a45c1663"
    class="div-block-40 column-container"
  >
    <div
      style="overflow-x: hidden; max-width: 100vw;"
      class="columna-invernal-{inversa ? '3' : '1'}"
    >
      <div class="div-block-43 sm:hidden block">
        <div class="page-title-box">
          <div>
            <h2 class="heading-4">{page.pageTitle}</h2>
            <p class="paragraph product-detail-subtitle alternate">
              Cobertor Invernal
            </p>
          </div>
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
      <ImageComponent
        src={`${URLS.fotos}${page.SKU}.webp`}
        loading="eager"
        alt=""
        classList="image-26"
      />
    </div>
    <div class="columna-invernal-2 austral">
      <ImageComponent
        src={`${URLS.fotos}${page.SKU}.webp`}
        loading="eager"
        alt=""
        classList="image-26"
      />
      <div class="div-block-43 sm:block hidden">
        <div class="page-title-box">
          <div>
            <h2 class="heading-4">{page.pageTitle}</h2>
            <p class="paragraph product-detail-subtitle alternate">
              Cobertor Invernal
            </p>
          </div>
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
    </div>
    <div class="columna-invernal-{inversa ? '1' : '3'}">
      <ImageComponent
        src={`${URLS.fotos}${page.SKU}-2.webp`}
        loading="eager"
        alt=""
        classList="image-26"
      />
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
