<script lang="ts">
  import {
    InstantSearch,
    SearchBox,
    Hits,
    Pagination,
    HitsPerPage,
    RefinementList,
    ClearRefinements,
    ToggleRefinement,
    SortBy,
    Highlight,
    HierarchicalMenu,
    Breadcrumb,
    CurrentRefinements,
    Menu,
    RangeInput,
    Stats,
  } from "$lib";
  import algoliasearch from "algoliasearch/lite";
  const searchClient = algoliasearch(
    "KT6YMZ9Q0G",
    "a17bedcd85471acaf00cd03f4331cdaf",
  );
  import PopupShop from "./popupShop.svelte";

  let currentSearchFromChild: any;

  function handleize(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");
  }

  export let showSearch = false;

  function closeSearch() {
    showSearch = false;
  }

  let visibleIds: any[] = [];
  let selectedProduct = "52353";
  let showShop = false;
  let showDifferent = false;

  $: if (showSearch == true && showShop == true && showDifferent == false) {
    showShop = false;
  }

  const handleResultClick = (sku) => {
    showDifferent = true;
    showSearch = true;
    selectedProduct = sku;
    showShop = true;
  };
</script>

<InstantSearch indexName="shopify_products" {searchClient}>
  <div class="relative z-[900]" role="dialog" aria-modal="true">
    <!--
      Background backdrop, show/hide based on modal state.
  
      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div
      style="background-color: rgba(0, 0, 0, 0.5);"
      class="fixed inset-0 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
      <!--
        Command palette, show/hide based on modal state.
  
        Entering: "ease-out duration-300"
          From: "opacity-0 scale-95"
          To: "opacity-100 scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 scale-100"
          To: "opacity-0 scale-95"
      -->
      <div
        class="w-full flex flex-row align-middle justify-center items-center my-2"
      >
        <button on:click={closeSearch}>
          <div
            class="close-indice image-13"
            style="min-height: 45px; padding-top: 1px;"
          >
            <img
              src="/images/close.svg"
              loading="lazy"
              alt=""
              style="width: 20px;"
              class="image-13 close-search"
            />
          </div>
        </button>
      </div>

      <div
        class="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
      >
        <div class="relative">
          <svg
            class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clip-rule="evenodd"
            />
          </svg>

          <SearchBox
            bind:currentSearch={currentSearchFromChild}
            placeholder="Buscar"
          />
        </div>

        <div style="display: none;">
          <HitsPerPage
            items={[
              { label: "20 hits per page", value: 6, default: true },
              { label: "40 hits per page", value: 12 },
            ]}
          />
        </div>

        <!-- Results, show/hide based on command palette state. -->
        <ul
          class="max-h-96 transform-gpu scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
          id="options"
          role="listbox"
        >
          <li
            style="display: {currentSearchFromChild === '' ? 'none' : 'block'};"
          >
            <h2 class="text-xs font-semibold text-gray-900">
              Catálogo / Página
            </h2>
            <InstantSearch indexName="searchPages" {searchClient}>
              <div style="display: none;">
                <SearchBox
                  initialQuery={currentSearchFromChild}
                  placeholder="Buscar 2"
                />
              </div>
              <div style="display: none;">
                <HitsPerPage
                  items={[
                    { label: "20 hits per page", value: 6, default: true },
                    { label: "40 hits per page", value: 12 },
                  ]}
                />
              </div>

              <ul class="-mx-4 mt-2 text-sm text-gray-700">
                <!-- Active: "bg-indigo-600 text-white" -->

                <Hits let:hit>
                  <a data-sveltekit-reload href={`${hit.sectionUrl}`}>
                    <li
                      class="group flex cursor-default select-none items-center px-4 py-2 w-full hover:bg-gray-200 cursor-pointer"
                      id="option-1"
                      role="option"
                      tabindex="-1"
                    >
                      <!-- Active: "text-white", Not Active: "text-gray-400" -->

                      <svg
                        class="h-6 w-6 flex-none text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                      <span class="ml-3 flex-auto truncate"
                        >{hit.pageCategory} / {hit.pageTitle}</span
                      >
                      <span class="flex flex-grow items-end justify-end"
                        ><span
                          class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                          >{hit.catalog}</span
                        ></span
                      >
                    </li>
                  </a>
                </Hits>

                <!-- More projects... -->
              </ul>
            </InstantSearch>
          </li>
          <li
            style="display: {currentSearchFromChild === '' ? 'none' : 'block'};"
          >
            <h2 class="text-xs font-semibold text-gray-900">Productos</h2>
            <ul class="-mx-4 mt-2 text-sm text-gray-700">
              <!-- Active: "bg-indigo-600 text-white" -->

              <Hits let:hit>
                <li
                  on:click|preventDefault={(e) => handleResultClick(hit.sku)}
                  class="group flex select-none items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  id="option-2"
                  role="option"
                  tabindex="-1"
                >
                  <img
                    src={hit.image}
                    alt=""
                    class="h-6 w-6 flex-none rounded-lg"
                  />
                  <span class="ml-3 flex-auto truncate">{hit.title}</span>
                </li>
              </Hits>

              <!-- More users... -->
            </ul>
          </li>
          <li>
            <div
              style="display: {currentSearchFromChild !== ''
                ? 'none'
                : 'block'};"
              class="px-6 py-14 text-center text-sm sm:px-14"
            >
              <svg
                class="mx-auto h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>

              <p class="mt-4 font-semibold text-gray-900">Busqueda rápida</p>
              <p class="mt-2 text-gray-500">
                Usa esta herramienta para encontrar fácilmente los productos en
                las páginas del catálogo.
              </p>
            </div>
          </li>
        </ul>

        <!-- Help, show/hide based on command palette state. -->

        <!-- Empty state, show/hide based on command palette state. -->

        <div
          class="flex flex-wrap items-center bg-gray-50 px-4 py-2.5 text-xs text-gray-700"
        >
          Se muestran los primeros<kbd
            class="mx-1 flex h-5 w-5 items-center justify-center rounded border border-gray-400 bg-white font-semibold text-gray-900 sm:mx-2"
            >6</kbd
          >
          <span class=""
            >resultados en páginas y productos en los catálogos web
          </span>.
        </div>
      </div>
    </div>
  </div>

  <PopupShop
    bind:visibleIds
    bind:show={showShop}
    bind:clickProduct={selectedProduct}
  />
</InstantSearch>

<style>
  /* .search-thing{
      background-color: white !important;
      color: black !important;
    } */
</style>
