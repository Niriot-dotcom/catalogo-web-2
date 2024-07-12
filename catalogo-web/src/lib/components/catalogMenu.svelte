<script lang="ts">
  import { onMount } from "svelte";
  import PopupShare from "./popupShare.svelte";
  import { CATALOGS_DESCRIPTIONS } from "$lib/constants/strings";
  export let catalogDetail = "invierno";
  let showSharePopup = false;

  function openSharePopup() {
    showSharePopup = true;
  }

  onMount(() => {
    //get the catalog from the url domain/catalog
    const url = window.location.href;
    const urlSplit = url.split("/");
    const catalog = urlSplit[3];
    catalogDetail = catalog;
  });

  let catalogTitle: string;
  let catalogYear: string;
  let catalogDescription: string;
  let catalogImage: string;
  let catalogUrl: string;
  let catalogLaunchVideo: string;
  let catalogDownloadLink: string;

  $: switch (catalogDetail) {
    case "invierno":
      catalogTitle = CATALOGS_DESCRIPTIONS.invierno.title;
      catalogYear = CATALOGS_DESCRIPTIONS.invierno.year;
      catalogUrl = CATALOGS_DESCRIPTIONS.invierno.url;
      catalogDescription = CATALOGS_DESCRIPTIONS.invierno.description;
      catalogImage = CATALOGS_DESCRIPTIONS.invierno.image;
      catalogLaunchVideo = CATALOGS_DESCRIPTIONS.invierno.launchVideo;
      catalogDownloadLink = CATALOGS_DESCRIPTIONS.invierno.downloadLink;
      break;
    case "biasi":
      catalogTitle = CATALOGS_DESCRIPTIONS.biasi.title;
      catalogYear = CATALOGS_DESCRIPTIONS.biasi.year;
      catalogUrl = CATALOGS_DESCRIPTIONS.biasi.url;
      catalogDescription = CATALOGS_DESCRIPTIONS.biasi.description;
      catalogImage = CATALOGS_DESCRIPTIONS.biasi.image;
      catalogLaunchVideo = CATALOGS_DESCRIPTIONS.biasi.launchVideo;
      catalogDownloadLink = CATALOGS_DESCRIPTIONS.biasi.downloadLink;
      break;
    case "chavos":
      catalogTitle = CATALOGS_DESCRIPTIONS.chavos.title;
      catalogYear = CATALOGS_DESCRIPTIONS.chavos.year;
      catalogUrl = CATALOGS_DESCRIPTIONS.chavos.url;
      catalogDescription = CATALOGS_DESCRIPTIONS.chavos.description;
      catalogImage = CATALOGS_DESCRIPTIONS.chavos.image;
      catalogLaunchVideo = CATALOGS_DESCRIPTIONS.chavos.launchVideo;
      catalogDownloadLink = CATALOGS_DESCRIPTIONS.chavos.downloadLink;
      break;
    case "vianney":
      catalogTitle = CATALOGS_DESCRIPTIONS.vianney.title;
      catalogYear = CATALOGS_DESCRIPTIONS.vianney.year;
      catalogUrl = CATALOGS_DESCRIPTIONS.vianney.url;
      catalogDescription = CATALOGS_DESCRIPTIONS.vianney.description;
      catalogImage = CATALOGS_DESCRIPTIONS.vianney.image;
      catalogLaunchVideo = CATALOGS_DESCRIPTIONS.vianney.launchVideo;
      catalogDownloadLink = CATALOGS_DESCRIPTIONS.vianney.downloadLink;
      break;
    case "bebe":
      catalogTitle = CATALOGS_DESCRIPTIONS.bebe.title;
      catalogYear = CATALOGS_DESCRIPTIONS.bebe.year;
      catalogUrl = CATALOGS_DESCRIPTIONS.bebe.url;
      catalogDescription = CATALOGS_DESCRIPTIONS.bebe.description;
      catalogImage = CATALOGS_DESCRIPTIONS.bebe.image;
      catalogLaunchVideo = CATALOGS_DESCRIPTIONS.bebe.launchVideo;
      catalogDownloadLink = CATALOGS_DESCRIPTIONS.bebe.downloadLink;
      break;
  }
</script>

<dl class="flex flex-wrap">
  <div class="flex-auto pl-6 pt-3">
    <dd class="mt-1 text-base font-semibold leading-6 text-gray-900">
      {catalogTitle}
    </dd>
    <dt class="text-sm font-semibold leading-6 text-gray-900">{catalogYear}</dt>
  </div>
  <a
    href={catalogLaunchVideo}
    class="mt-3 flex w-full flex-none gap-x-2 border-t border-gray-900/5 px-6 cursor-pointer pt-3"
  >
    <dt class="flex-none">
      <span class="sr-only">Menú Catálogo</span>
      <svg
        class="h-6 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z"
          clip-rule="evenodd"
        />
      </svg>
    </dt>
    <dd class="text-sm font-medium leading-6 text-gray-500">
      Ver Video Lanzamiento
    </dd>
  </a>
  <a
    href={catalogDownloadLink}
    class="mt-4 flex w-full flex-none gap-x-2 cursor-pointer px-6"
  >
    <dt class="flex-none">
      <span class="sr-only">Status</span>
      <svg
        class="h-6 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z"
        />
        <path
          d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z"
        />
      </svg>
    </dt>
    <dd class="text-sm font-medium leading-6 text-gray-500">
      Descargar Catálogo
    </dd>
  </a>
  <button
    on:click={openSharePopup}
    class="my-4 flex w-full flex-none gap-x-2 cursor-pointer px-6 text-vianney-600"
  >
    <dt class="flex-none">
      <svg
        class="h-6 w-5 text-vianney-600"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z"
        />
      </svg>
    </dt>
    <dd class="text-sm font-semibold leading-6 text-vianney-600">
      Compartir Catálogo
    </dd>
  </button>
</dl>
<!-- <div class="mt-4 border-t border-gray-900/5 px-6 py-3">
    <button on:click={openSharePopup} class="text-sm font-semibold leading-6 flex flex-row align-middle justify-center text-vianney-600">
      Compartir Catálogo
      <span class="ml-2 pt-0.5" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
        </svg>
      </span>
    </button>
  </div> -->

<PopupShare bind:showShare={showSharePopup} />
