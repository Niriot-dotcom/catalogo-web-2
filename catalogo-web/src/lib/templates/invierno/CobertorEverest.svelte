<script lang="ts">
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { URLS } from "$lib/constants/strings";

  export let page: DatabasePage;
  export let inversa: boolean = false;
</script>

<div
  id={page.pageTitle}
  data-visible-id={page.SKU}
  class="plantilla-everest {inversa ? 'inversa' : ''} overflow-x-hidden"
>
  {#if !inversa}
    <div class="div-block-31">
      <ImageComponent
        src={`${URLS.fotos}${page.SKU}.webp`}
        loading="eager"
        id="85459054-6751-a5e7-07bf-1e4f3351a2d0"
        classList="image-16"
      />
      <div class="div-block-11">
        <div class="page-title-box">
          <h2 class="heading-4">{page.pageTitle}</h2>
          <p class="paragraph product-detail-subtitle alternate">
            Cobertor Everest
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
  {/if}

  <section class="section-6">
    <div class="background-video-2 w-background-video w-background-video-atom">
      <!-- <img
        src="../videos/poster-{page.pageTitle}.jpg"
        loading="eager"
        alt=""
        style="background-image:url(&quot;../videos/poster-{page.pageTitle}.jpg&quot;); height: 100%;
  object-fit: cover;"
      /> -->
      <ImageComponent
        src={`${URLS.fotos}${page.SKU}-2.webp`}
        loading="eager"
        classList="h-full object-cover"
      />

      <!-- TODO -->
      <!-- <div class="copy-box-everest right">
        <div class="text-block-26">
          Pelo <span class="text-span-8">largo</span>
        </div>
        <div class="text-block-27" style="text-transform: capitalize;">
          {typeof page.pageCopys[1] !== "undefined" ? page.pageCopys[1] : ""}
        </div>
        <img
          src="../images/Flechas.svg"
          loading="eager"
          alt=""
          class="arrow-image"
        />
      </div> -->
    </div>
    <div class="div-block-33">
      <ImageComponent
        src={`${URLS.fotos}${page.SKU}.webp`}
        loading="eager"
        id="85459054-6751-a5e7-07bf-1e4f3351a2d0"
        classList="image-17"
      />

      <!-- TODO -->
      <!-- <div class="copy-box-everest">
        <div class="text-block-25" style="text-transform: lowercase;">
          TODO
          page.pageDescriptions[1]
        </div>
        <div class="text-block-27">
          TODO
          page.pageDescriptions[2]
        </div>
        <img
          src="../images/Flechas-1.svg"
          loading="eager"
          alt=""
          class="arrow-image"
        />
      </div> -->
    </div>
    <div class="related-products">
      <div
        text-split=""
        words-slide-from-right=""
        class="text-block-23 look-book"
      >
        Completa<br /><strong class="bold-text">el Look</strong>
      </div>
      <!-- on:click={show} -->
      <div style="cursor:pointer;" class="link-block-10 w-inline-block">
        <img
          src={`${URLS.fotos}${page.complCurtains[0]}.webp`}
          loading="eager"
          alt=""
          class="image-18"
        />
        <div class="text-block-22">
          agrega <br />estas<br /><strong>sábanas</strong>
        </div>
      </div>
      <!-- on:click={show} -->
      <div style="cursor:pointer;" class="link-block-10 w-inline-block">
        <img
          src={`${URLS.fotos}${page.complSheets[0]}.webp`}
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

  {#if inversa}
    <div class="div-block-31">
      <ImageComponent
        src={page.pageMainImage}
        loading="eager"
        id="85459054-6751-a5e7-07bf-1e4f3351a2d0"
        classList="image-16"
      />
      <div class="div-block-11">
        <div class="page-title-box">
          <h2 class="heading-4">{page.pageTitle}</h2>
          <p class="paragraph product-detail-subtitle alternate">
            Cobertor Everest
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
  {/if}
</div>
