<script lang="ts">
  export let PORTADA_ROUTE: string;
</script>

<div class="pre-loader">
  <img
    src="images/Rolling-1s-200px.gif"
    loading="lazy"
    data-w-id="1f5e2a88-0001-12a7-db16-3b8a774a2252"
    alt=""
    class="image-42"
    style="mix-blend-mode: darken;"
  />
</div>

<div>
  <style>
    @media (max-width: 600px) {
      /* Ajusta el 600px según tus necesidades */
      body {
        margin-top: 0px !important;
      }
    }
  </style>
</div>

<div
  id="portada"
  data-w-id="daa6ea3e-1745-dd4d-5171-e63e5d2d6b58"
  style="opacity:0"
  class="loader_img-wrap md:hidden"
>
  <div
    data-poster-url="{PORTADA_ROUTE}V.jpg"
    data-video-urls="{PORTADA_ROUTE}V.mp4,{PORTADA_ROUTE}V.webm"
    data-autoplay="true"
    data-loop="true"
    data-wf-ignore="true"
    class="loader_img is-middle cover w-background-video w-background-video-atom"
  >
    <video
      id="daa6ea3e-1745-dd4d-5171-e63e5d2d6b5b-video"
      autoplay
      loop
      style="background-image:url(&quot;{PORTADA_ROUTE}V.jpg&quot;)"
      muted
      playsinline
      data-wf-ignore="true"
      data-object-fit="cover"
    >
      <source src="{PORTADA_ROUTE}V.mp4" data-wf-ignore="true" />
      <source src="{PORTADA_ROUTE}V.webm" data-wf-ignore="true" />
    </video>

    <div class="w-screen h-screen flex justify-center items-center">
      <img
        class="w-[90vw] sm:w-[50vw] md:w-[60vw] lg:w-[50vw]"
        src="{PORTADA_ROUTE}LOGOTIPO.svg"
        alt="PortadaLogo"
      />
    </div>
  </div>
</div>

<div class="hidden md:block loader_img-wrap">
  <div
    data-poster-url="{PORTADA_ROUTE}H.jpg"
    data-video-urls="{PORTADA_ROUTE}H.mp4,{PORTADA_ROUTE}H.webm"
    data-autoplay="true"
    data-loop="true"
    data-wf-ignore="true"
    class="loader_img is-middle cover w-background-video w-background-video-atom"
  >
    <video
      id="daa6ea3e-1745-dd4d-5171-e63e5d2d6b5b-video"
      autoplay
      loop
      style="background-image:url(&quot;{PORTADA_ROUTE}H.jpg&quot;)"
      muted
      playsinline
      data-wf-ignore="true"
      data-object-fit="cover"
    >
      <source src="{PORTADA_ROUTE}H.mp4" data-wf-ignore="true" />
      <source src="{PORTADA_ROUTE}H.webm" data-wf-ignore="true" />
    </video>

    <div class="w-screen h-screen flex justify-center items-center">
      <img
        class="w-[100vw] sm:w-[50vw] md:w-[60vw] lg:w-[50vw]"
        src="{PORTADA_ROUTE}LOGOTIPO.svg"
        alt="PortadaLogo"
      />
    </div>
  </div>
</div>

<!-- VER CATALOGO button -->
<div
  data-w-id="a065ae01-88da-7301-488b-fc63d5f5e07c"
  style="display:none;-webkit-transform:translate3d(0, 200px, 0) scale3d(0, 0, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 200px, 0) scale3d(0, 0, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 200px, 0) scale3d(0, 0, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 200px, 0) scale3d(0, 0, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
  class="menu-options"
>
  <div class="navigator closed-menu">
    <div class="div-block-15">
      <a
        data-sveltekit-reload
        id="next"
        href="/biasi/muebles"
        class="link-block w-inline-block"
      >
        <div id="next" class="navigator-menu btn-next">
          <div class="text-block-3">Ver Catálogo</div>
          <img src="images/start.svg" loading="lazy" alt="" class="image-6" />
        </div>
      </a>
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
  <script defer src="https://unpkg.com/split-type"></script>
  <script
    defer
    src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"
  ></script>
  <script
    defer
    src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js"
  ></script>
  <script defer src="/js/animations.js"></script>
  <script defer src="/js/webflow.js" type="text/javascript"></script>
</div>
