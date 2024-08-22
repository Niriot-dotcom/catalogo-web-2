<script lang="ts">
  import AddAll from "$lib/components/AddAll.svelte";
  import ImageComponent from "$lib/components/imageComponent.svelte";
  import OptimImg from "$lib/components/OptimImg.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import { URLS } from "$lib/constants/strings";
  import { onMount } from "svelte";

  export let page: DatabasePage;
  export let inversa: boolean = false;
  export let handleImageClick: (sku: string, relatedProds: string[]) => void;

  onMount(() => {
    const script = document.createElement("script");
    script.src = "/js/nordicSlider.js";
    script.async = true;
    document.body.appendChild(script);
  });
</script>

<div
  id={page.SKU}
  class="w-screen overflow-x-hidden"
  data-visible-id="{page.SKU}, {page.complSheets[0]}, {page.complCurtains[0]}"
>
  <div class="div-block-46" id="{page.SKU}d">
    <div class="handle-container {inversa ? 'inverse' : ''}">
      {#if !inversa}
        <div class="div-block-45">
          {#if page.pageVideos.length > 0 && page.pageVideos[0].includes(".mp4")}
            <video
              id="03aaf391-43fe-3144-f30a-a9a620053ba8-video"
              autoplay
              loop
              style="background-image:url(&quot;{`${URLS.fotos}${page.SKU}-2.webp`}&quot;)"
              muted
              playsinline
              data-wf-ignore
              data-object-fit="cover"
              class="image-28"
            >
              <source
                src="../videos/invierno/NORDICO/{page.pageTitle.toUpperCase()}/video-{page.pageTitle}.mp4"
                data-wf-ignore="true"
              />
              <source
                src="../videos/invierno/NORDICO/{page.pageTitle.toUpperCase()}/video-{page.pageTitle}.webm"
                data-wf-ignore="true"
              />
            </video>
          {:else}
            <ImageComponent
              src={`${URLS.fotos}${page.SKU}-2.webp`}
              loading="eager"
              id="f09abdcc-902f-003f-2d59-9712f02a5bd1"
              alt=""
              classList="image-28"
            />
          {/if}
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
              src="/images/CopyNordico.svg"
              loading="eager"
              alt=""
              class="image-30"
            />
          </div>
        </div>
      {/if}

      <div udesly-before-after="50" class="handle-wrapper">
        <OptimImg
          imgClass="image-right"
          source={`${URLS.fotos}${page.SKU}.webp`}
          alt=""
          image="right"
        />
        <OptimImg
          imgClass="image-left"
          source={`${URLS.fotos}${page.SKU}-3.webp`}
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
              src="/images/CopyNordico.svg"
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
    <div class="h-[10vh] pl-[12%] flex justify-between">
      <AddAll skus={[page.SKU, page.complSheets[0], page.complCurtains[0]]} />
    </div>
    <div class="link-block-10 centered w-inline-block">
      <OptimImg
        onClick={() => handleImageClick(page.complSheets[0], [])}
        imgClass="image-18 horizontal"
        source={`${URLS.fotos}${page.complSheets[0]}.webp`}
      />
      <div class="text-block-22 centered">
        agrega estas<br />‍<strong class="bold-text-2"> sábanas</strong>
      </div>
    </div>
    <div class="link-block-10 centered w-inline-block">
      <OptimImg
        onClick={() => handleImageClick(page.complCurtains[0], [])}
        imgClass="image-18 horizontal"
        source={`${URLS.fotos}${page.complCurtains[0]}.webp`}
      />
      <div class="text-block-22 centered">
        combina con estas<br />
        <strong class="bold-text-3"> cortinas</strong>
      </div>
    </div>
  </div>
</div>

<div>
  <script defer src="/js/webflowPage.js"></script>
  <script
    defer
    src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=643738a971c1d64a8bd7a90a"
    type="text/javascript"
    integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
    crossorigin="anonymous"
  ></script>
  <script defer src="/js/webflow.js" type="text/javascript"></script>
  <script defer src="https://unpkg.com/split-type"></script>
  <script
    defer
    src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"
  ></script>
  <script
    defer
    src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js"
  ></script>
  <script defer src="/js/animations.js" type="text/javascript"></script>
</div>
