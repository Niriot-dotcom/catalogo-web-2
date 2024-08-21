<script lang="ts">
  import AddAll from "$lib/components/AddAll.svelte";
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import OptimImg from "$lib/components/OptimImg.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { URLS } from "$lib/constants/strings";

  export let page: DatabasePage;
</script>

<div id={page.pageTitle} class="plantilla-austral" data-visible-id={page.SKU}>
  <section class="section-7">
    <div class="h-full">
      <div
        data-poster-url={`${URLS.fotos}${page.SKU}.webp`}
        data-video-urls="../videos/invierno/AUSTRAL/{page.pageTitle.toUpperCase()}/video-{page.pageTitle}.mp4,../videos/invierno/AUSTRAL/{page.pageTitle.toUpperCase()}/video-{page.pageTitle}.webm"
        data-autoplay="true"
        data-loop="true"
        data-wf-ignore="true"
        class="background-video-3 w-background-video w-background-video-atom"
      >
        <video
          id="03aaf391-43fe-3144-f30a-a9a620053ba8-video"
          autoplay
          loop
          style="background-image:url(&quot;{`${URLS.fotos}${page.SKU}-2.webp`}&quot;)"
          muted
          playsinline
          data-wf-ignore
          data-object-fit="cover"
        >
          <source
            src="../videos/invierno/AUSTRAL/{page.pageTitle.toUpperCase()}/video-{page.pageTitle}.mp4"
            data-wf-ignore="true"
          />
          <source
            src="../videos/invierno/AUSTRAL/{page.pageTitle.toUpperCase()}/video-{page.pageTitle}.webm"
            data-wf-ignore="true"
          />
        </video>
        <div class="div-block-37">
          <ImageComponent
            id="13bb5612-fe92-2612-82a1-47ecd004a28d"
            alt=""
            src={`${URLS.fotos}${page.SKU}.webp`}
            classList="image-25"
          />
          {#if page.pageCopys && page.pageCopys.length >= 1 && page.pageCopys[0] !== ""}
            <div class="copy-box-everest mb-80">
              <div class="text-block-25" style="text-transform: lowercase;">
                {page.pageCopys[0]}
              </div>
              <div class="text-block-27 mt-0 leading-none">
                {page.pageCopys[1] || ""}
              </div>
              <img
                src="/images/Flechas-1.svg"
                loading="eager"
                alt=""
                class="arrow-image mt-0 ml-20"
              />
            </div>
          {/if}
          <div class="div-block-11 title-right">
            <div class="page-title-box">
              <h2
                text-split=""
                words-slide-from-right=""
                class="heading-4 alternate mt-12"
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
    </div>
  </section>
  <div class="div-block-39">
    <div class="related-products austral">
      <div>
        <div
          text-split=""
          words-slide-from-right=""
          class="text-block-23 look-book"
        >
          Completa<br /><strong class="bold-text">el Look</strong>
        </div>

        <div class="h-[10vh] pl-[12%] flex justify-between">
          <AddAll
            skus={[page.SKU, page.complSheets[0], page.complCurtains[0]]}
          />
        </div>
      </div>
      <div class="link-block-10 w-inline-block">
        <OptimImg
          imgClass="image-18"
          source={`${URLS.fotos}${page.complSheets[0]}.webp`}
        />
        <div data-visible-id={page.complSheets[0]} class="text-block-22">
          agrega estas<strong class="bold-text-6"><br />sábanas</strong>
        </div>
      </div>
      <div
        data-visible-id={page.complCurtains[0]}
        class="link-block-10 w-inline-block"
      >
        <OptimImg
          imgClass="image-18"
          source={`${URLS.fotos}${page.complCurtains[0]}.webp`}
        />
        <div class="text-block-22">
          combina con estas <br />‍<strong>cortinas</strong>
        </div>
      </div>
    </div>
  </div>
</div>
