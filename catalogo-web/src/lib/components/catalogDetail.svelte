<script lang="ts">
  // import fly from svelte animations
  import { fly } from "svelte/transition";
  import PopupShare from "./popupShare.svelte";
  import { CATALOGS_DESCRIPTIONS } from "$lib/constants/strings";

  let flyParams = {
    x: 400, // Starting position (pixels to the right of the final position)
    duration: 500,
  };

  export let showCatalogDetail = false;
  export let catalogDetail = "invierno";

  let showOptions = false;

  function openCatalogOptions() {
    showOptions = true;
    setTimeout(() => {
      showOptions = false;
    }, 5000);
  }

  let showSharePopup = false;

  function openSharePopup() {
    showSharePopup = true;
  }

  function closeCatalogDetail() {
    showCatalogDetail = false;
  }

  let catalogTitle: string;
  let catalogYear: string;
  let catalogDescription: string;
  let catalogImage: string;
  let catalogUrl: string;
  let catalogLaunchVideo: string;
  let catalogDownloadLink: string;

  // when catalogDetail changes, update catalogTitle and catalogDescription
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

  // switch statements for catalog detail options
</script>

{#if showCatalogDetail == true}
  <div class="relative" style="z-index: 200;" role="dialog" aria-modal="true">
    <!-- Background backdrop, show/hide based on slide-over state. -->
    <div
      class="fixed inset-0"
      style="background-color: rgba(0, 0, 0, 0.5);"
    ></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"
        >
          <div
            class="pointer-events-auto w-screen max-w-md"
            transition:fly={flyParams}
          >
            <div
              class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
            >
              <div class="px-4 py-6 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2
                    id="slide-over-heading"
                    class="text-base font-semibold leading-6 text-gray-900"
                  >
                    Detalles del catálogo
                  </h2>
                  <div class="ml-3 flex h-7 items-center">
                    <button
                      on:click={closeCatalogDetail}
                      type="button"
                      class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-vianney-500"
                    >
                      <span class="absolute -inset-2.5"></span>
                      <span class="sr-only">Close panel</span>
                      <svg
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <!-- Main -->
              <div>
                <div class="pb-1 sm:pb-6">
                  <div>
                    <div class="relative h-40 sm:h-56">
                      <img
                        class="absolute h-full w-full object-cover"
                        src={catalogImage}
                        alt=""
                      />
                    </div>
                    <div class="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                      <div class="sm:flex-1">
                        <div>
                          <div class="flex items-center">
                            <h3
                              class="text-xl font-bold text-gray-900 sm:text-2xl"
                            >
                              Catálogo {catalogTitle}
                            </h3>
                          </div>
                          <p class="text-sm text-gray-500">{catalogYear}</p>
                        </div>
                        <div
                          class="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0"
                        >
                          <a
                            href={catalogUrl}
                            data-sveltekit-reload
                            class="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-vianney-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-vianney-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vianney-600 sm:flex-1"
                            >Ver catálogo</a
                          >
                          <button
                            on:click={openSharePopup}
                            type="button"
                            class="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >Compartir</button
                          >
                          <div class="ml-3 inline-flex sm:ml-0">
                            <div class="relative inline-block text-left">
                              <button
                                on:click={openCatalogOptions}
                                type="button"
                                class="relative inline-flex items-center rounded-md bg-white p-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                id="options-menu-button"
                                aria-expanded="false"
                                aria-haspopup="true"
                              >
                                <span class="absolute -inset-1"></span>
                                <span class="sr-only">Open options menu</span>
                                <svg
                                  class="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
                                  />
                                </svg>
                              </button>
                              {#if showOptions == true}
                                <div
                                  in:fly={{ y: -50, duration: 200 }}
                                  out:fly={{ y: -50, duration: 200 }}
                                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby="options-menu-button"
                                  tabindex="-1"
                                >
                                  <div class="py-1" role="none">
                                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                    <a
                                      href={catalogLaunchVideo}
                                      class="text-gray-700 block px-4 py-2 text-sm"
                                      role="menuitem"
                                      tabindex="-1"
                                      id="options-menu-item-1"
                                      >Video lanzamiento</a
                                    >
                                    <a
                                      href={catalogDownloadLink}
                                      class="text-gray-700 block px-4 py-2 text-sm"
                                      role="menuitem"
                                      tabindex="-1"
                                      id="options-menu-item-0"
                                      >Descargar catálogo</a
                                    >
                                  </div>
                                </div>
                              {/if}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
                  <dl class="space-y-8 px-4 sm:space-y-6 sm:px-6">
                    <div>
                      <dt
                        class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0"
                      >
                        Descripción
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
                        <p>{catalogDescription}</p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<PopupShare bind:showShare={showSharePopup} />
