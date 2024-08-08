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
    <div
      data-poster-url={`${URLS.fotos}${page.SKU}.webp`}
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
        style="background-image:url(&quot;{`${URLS.fotos}${page.SKU}-2.webp`}&quot;)"
        muted="true"
        playsinline=""
        data-wf-ignore="true"
        data-object-fit="cover"
      >
        <!-- <source
          src="../videos/video-{page.pageTitle}.mp4"
          data-wf-ignore="true"
        />
        <source
          src="../videos/video-{page.pageTitle}.webm"
          data-wf-ignore="true"
        /> -->
      </video>
      <div class="div-block-37">
        <ImageComponent
          id="13bb5612-fe92-2612-82a1-47ecd004a28d"
          alt=""
          src={`${URLS.fotos}${page.SKU}.webp`}
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
      <div class="h-[10vh] pl-[12%] flex justify-between">
        <AddAll skus={[page.SKU, page.complSheets[0], page.complCurtains[0]]} />
      </div>
      <a href="#" class="link-block-10 w-inline-block">
        <OptimImg
          imgClass="image-18"
          source={`${URLS.fotos}${page.complSheets[0]}.webp`}
        />
        <div class="text-block-22">
          agrega estas<strong class="bold-text-6"><br />sábanas</strong>
        </div>
      </a>
      <a href="#" class="link-block-10 w-inline-block">
        <OptimImg
          imgClass="image-18"
          source={`${URLS.fotos}${page.complCurtains[0]}.webp`}
        />
        <div class="text-block-22">
          combina con estas <br />‍<strong>cortinas</strong>
        </div>
      </a>
    </div>
  </div>
</div>
