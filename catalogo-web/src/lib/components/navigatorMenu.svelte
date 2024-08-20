<script lang="ts">
  import tippy from "tippy.js";
  import "tippy.js/dist/tippy.css";
  import {
    cartStore,
    removeFromCart,
    updateQuantity,
  } from "$lib/components/cartLogic.js";
  import { fly, fade } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { userStore } from "$lib/components/userLogic.js";
  import SearchPallete from "$lib/components/searchPallete.svelte";
  import PopupShop from "./popupShop.svelte";
  import PopupCompra from "./popupCompra.svelte";
  import PopupAuth from "./popupAuth.svelte";
  import CategoriesFooter from "./categoriesFooter.svelte";
  import { BiasiFooterHeader } from "$lib/constants/FooterHeaders";
  import { Catalogs } from "$lib/constants/globalTypes";
  import {
    catalogSections,
    getCurrentPageInfo,
  } from "$lib/components/currentCatalogPage.js";
  import { onMount } from "svelte";
  import CatalogMenu from "./catalogMenu.svelte";
  import { user } from "$lib/firebase";
  import {
    navigateToNextPage,
    navigateToPreviousPage,
  } from "$lib/utils/navigation";
  import { CATALOGS_DESCRIPTIONS, URLS } from "$lib/constants/strings";
  export let visibleIds: string[] = [];
  export let relatedProducts: string[] = [];
  export let showPopup = false;
  export let showViewPrices = false;
  export let showLogin = false;
  export let showCart = false;
  export let selectedProduct: null | string = null;
  export let catalog: Catalogs;

  let showMenu = false;

  function toggleMenu() {
    if (typeof gtag !== "undefined") {
      gtag("event", "open_menu", {
        event_category: "navigation",
        event_label: "menu-sidebar",
      });
    }
    showMenu = !showMenu;
  }

  function toggleCart() {
    if (typeof gtag !== "undefined") {
      gtag("event", "open_cart", {
        event_category: "navigation",
        event_label: "cart",
      });
    }
    showMenu = false;
    showCart = !showCart;
  }

  function togglePopup() {
    if (typeof gtag !== "undefined") {
      gtag("event", "open_shop", {
        event_category: "search",
        event_label: "shop",
      });
    }
    showPopup = !showPopup;
  }

  function toggleLogin() {
    showMenu = false;
    showLogin = !showLogin;
  }

  let cartItems = [];

  cartStore.subscribe((value) => {
    cartItems = value;
  });

  let userCatalog = {};

  userStore.subscribe((value) => {
    userCatalog = value;
  });

  $: isLoggedIn = userCatalog && userCatalog.authorized;

  function handleRemove(productId) {
    removeFromCart(productId);
  }

  function handleQuantityChange(productId, event) {
    const newQuantity = parseInt(event.target.value);
    updateQuantity(productId, newQuantity);
  }

  $: subtotal = cartItems.reduce(
    (acc, item) => acc + item.price.basePrice * item.quantity,
    0,
  );
  // number of items in cart

  function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0, // No decimales
      maximumFractionDigits: 0, // No decimales
    }).format(price);
  }

  let compra = false;

  function handleCompra() {
    if (typeof gtag !== "undefined") {
      gtag("event", "conversion", {
        send_to: "G-EJZYDKKDJK",
        value: subtotal,
        currency: "MXN",
      });
    }
    showCart = false;
    compra = true;
  }

  let searchPalleteOpen = false;

  function handleOpenSearchPallete() {
    if (typeof gtag !== "undefined") {
      gtag("event", "open_search", {
        event_category: "search",
        event_label: "search_query",
      });
    }
    searchPalleteOpen = !searchPalleteOpen;
  }

  let pageInfo: string = "";
  let loggedAdi: any;
  let mounted = false;
  onMount(() => {
    const url = window.location.pathname;
    pageInfo = getCurrentPageInfo(url);
    loggedAdi = localStorage.getItem("adi");
    mounted = true;
  });

  let showCollections = false;

  function handleShowCollections() {
    showCollections = !showCollections;
  }

  function handleShowSections() {
    document
      .getElementById("sections-dropdown-arrow")
      ?.classList.toggle("-rotate-90");

    let sectionsList = document.getElementById("sections-list");
    if (!sectionsList) return;
    sectionsList.style.transition = "all 0.2s linear";

    if (sectionsList.classList.contains("hidden")) {
      sectionsList.classList.remove("hidden");
      setTimeout(function () {
        sectionsList?.classList.remove("opacity-0");
      }, 20);
    } else {
      sectionsList.classList.add("opacity-0");
      sectionsList.addEventListener(
        "transitionend",
        function (e) {
          sectionsList?.classList.add("hidden");
        },
        { capture: false, once: true, passive: false },
      );
    }
  }
  function handleShowCatalogs() {
    document
      .getElementById("catalogs-dropdown-arrow")
      ?.classList.toggle("-rotate-90");

    let catalogsList = document.getElementById("catalogs-list");
    if (!catalogsList) return;
    catalogsList.style.transition = "all 0.2s linear";

    if (catalogsList.classList.contains("hidden")) {
      catalogsList.classList.remove("hidden");
      setTimeout(function () {
        catalogsList?.classList.remove("opacity-0");
      }, 20);
    } else {
      catalogsList.classList.add("opacity-0");
      catalogsList.addEventListener(
        "transitionend",
        function (e) {
          catalogsList?.classList.add("hidden");
        },
        { capture: false, once: true, passive: false },
      );
    }
  }

  let openIndex = false;

  function handleOpenIndex() {
    if (typeof gtag !== "undefined") {
      gtag("event", "open_index", {
        event_category: "navigation",
        event_label: "index",
      });
    }
    openIndex = !openIndex;
  }
</script>

<!-- <SlideToTheSides /> -->
<PopupAuth bind:showLogin />
<PopupShop
  bind:visibleIds
  bind:relatedProducts
  bind:show={showPopup}
  bind:showSearch={searchPalleteOpen}
  bind:clickProduct={selectedProduct}
/>
<PopupCompra bind:showCompra={compra} />

<!-- Indice -->
<div class="overlays w-clearfix"></div>
{#if openIndex}
  <div
    in:fly={{ y: 10, duration: 400, easing: cubicOut }}
    out:fly={{ y: -10, duration: 300, easing: cubicIn }}
    class="flex"
    style=" z-index: 600; width: 100%; height: 100%; background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)); flex-direction: column; justify-content: flex-start; align-items: center; position: fixed; top: 0%; bottom: 0%; left: 0%; right: 0%;"
  >
    <div class="div-block-28">
      {#if catalog === Catalogs.BIASI}
        <CategoriesFooter
          {catalog}
          showOnlyGrid={true}
          categories={catalogSections.BIASI}
          HeaderComponent={BiasiFooterHeader()}
        />
      {:else if catalog === Catalogs.CHAVOS}
        <!-- <PhotographicIndex {catalog} showOnlyGrid={true} categories={ChavosCategories} /> -->
        <CategoriesFooter
          {catalog}
          showOnlyGrid={true}
          categories={catalogSections.CHAVOS}
        />
      {:else if catalog === Catalogs.VIANNEY}
        <CategoriesFooter
          {catalog}
          showOnlyGrid={true}
          categories={catalogSections.VIANNEY}
        />
      {:else if catalog === Catalogs.BEBE}
        <CategoriesFooter
          {catalog}
          showOnlyGrid={true}
          categories={catalogSections.BEBE}
        />
      {:else if catalog === Catalogs.INVIERNO}
        <CategoriesFooter
          {catalog}
          showOnlyGrid={true}
          categories={catalogSections.INVIERNO}
        />
      {/if}
    </div>
  </div>
{/if}

<!-- Action menú -->
{#if showViewPrices}
  <div id="bottom-button-prices" class="menu-options flex">
    {#if mounted}
      <div
        in:fly={{ y: 10, duration: 400, easing: cubicIn }}
        class="w-auto pointer-events-auto h-auto rounded-3xl bg-white flex flex-col justify-center duration-500 transition-all ease-in shadow-xl"
      >
        {#if showCollections}
          <ul
            in:fly={{ y: -10, duration: 400, easing: cubicOut }}
            out:fly={{ y: 10, duration: 400, easing: cubicIn }}
            role="list"
            class="px-2 mt-2 rounded-[18px]"
          >
            <li
              class="flex flex-wrap hover:bg-gray-100 rounded-2xl items-center justify-between gap-x-6 gap-y-4 pb-4 pt-2 px-2 sm:flex-nowrap"
            >
              <div>
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  <a href="#" class="">Regalos para mi mamá</a>
                </p>
                <div
                  class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500"
                >
                  <p>
                    <a href="#" class="">Guardar en la colección</a>
                  </p>
                  <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                    <circle cx="1" cy="1" r="1" />
                  </svg>
                  <p><time datetime="2023-01-22T12:59Z">3d ago</time></p>
                </div>
              </div>
              <dl
                class="flex w-full flex-none justify-between gap-x-8 sm:w-auto"
              >
                <div class="flex w-auto gap-x-2.5">
                  <dt>
                    <span class="sr-only">Total comments</span>

                    <svg
                      class="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </dt>
                </div>
              </dl>
            </li>
            <li
              class="flex flex-wrap hover:bg-gray-100 rounded-2xl items-center justify-between gap-x-6 gap-y-4 pb-4 pt-2 px-2 sm:flex-nowrap"
            >
              <div>
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  <a href="#" class="">Remodelación recámara</a>
                </p>
                <div
                  class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500"
                >
                  <p>
                    <a href="#" class="">Agregar a la colección</a>
                  </p>
                  <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                    <circle cx="1" cy="1" r="1" />
                  </svg>
                  <p><time datetime="2023-01-22T12:59Z">3d ago</time></p>
                </div>
              </div>
              <dl
                class="flex w-full flex-none justify-between gap-x-8 sm:w-auto"
              >
                <div class="flex w-auto gap-x-2.5">
                  <dt>
                    <span class="sr-only">Total comments</span>
                    <svg
                      class="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </dt>
                </div>
              </dl>
            </li>
          </ul>
        {/if}

        <div class="p-1.5 flex flex-row justify-center">
          <!-- <button
          use:tippy={{ content: "Colecciones", placement: "top" }}
          on:click={handleShowCollections}
          class="hidden flex-row rounded-[18px] cursor-pointer w-auto h-auto px-3 py-3 bg-gray-100 hover:bg-gray-200 mr-1"
        >
          <img
            src="../images/icons/colecciones.svg"
            loading="lazy"
            alt=""
            class=""
          />
        </button> -->
          <button
            on:click={togglePopup}
            class="flex flex-row align-middle justify-center rounded-[18px] cursor-pointer w-auto h-auto px-3 py-3 bg-gray-100 hover:bg-gray-200"
          >
            <img src="../images/CurrencyPrices.svg" loading="eager" alt="" />
            <span
              style="font-family: Helvetica;"
              class="text-base px-1 text-gray-900 font-medium leading-6 my-auto"
              >Ver precios</span
            >
          </button>
        </div>
      </div>
    {/if}
  </div>
{/if}

<!-- Navbar movil -->

<nav class="bg-white sm:hidden top-0 fixed w-full z-[800]">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 justify-between">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <!-- Mobile menu button -->
        <button
          on:click={toggleMenu}
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
        >
          <!-- Mobile menu icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="block h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        {#if mounted}
          <button
            transition:fade={{ duration: 500 }}
            on:click={handleOpenIndex}
            class="flex items-center overflow-hidden"
          >
            <!-- PageInfo with dynamic width to avoid overlap -->
            {#if !openIndex}
              <span
                class="text-sm font-medium text-gray-800 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[45vw] pl-1"
              >
                {pageInfo}
              </span>
              <div class="flex items-center justify-center cursor-pointer px-2">
                <!-- Chevron icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5 text-gray-500"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            {:else}
              <span
                class="text-sm font-medium text-gray-800 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[45vw] pl-1"
              >
                Cerrar indice de páginas
              </span>
              <div class="flex items-center justify-center cursor-pointer px-2">
                <!-- Close icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5 text-gray-500"
                >
                  <path
                    d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                  />
                </svg>
              </div>
            {/if}
          </button>
        {/if}
      </div>

      <div
        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
      >
        <!-- SEARCH BUTTON (USING ALGOLIA) -->
        <button
          class="ml-0.5 mr-3 cursor-pointer"
          on:click={handleOpenSearchPallete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="w-5 h-5 text-gray-800"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        <div
          class="bg-gray-300 h-full mx-1"
          style="width: 1px; height:16px"
        ></div>

        <!-- Profile dropdown -->
        <div class="relative ml-3">
          <div>
            <button on:click={toggleCart} class="py-3 pr-2 flex flex-row">
              <img
                src="../images/Shopping-cart.svg"
                loading="lazy"
                alt=""
                class="image-6 w-6 h-5 pr-1"
              />
              <span class="text-sm font-medium text-gray-800 pr-0.5"
                >{cartItems.length}</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>

<!-- Navbar escritorio -->

<div
  class="fixed top-0 w-full hidden sm:flex justify-between align-top items-baseline"
  style="z-index: 800;"
>
  <!-- Left tab for menu -->
  <div class="flex items-center shadow-xl bg-white space-x-2 rounded-br-2xl">
    <button
      on:click={toggleMenu}
      use:tippy={{ content: "Menú", placement: "right" }}
      class="pl-2 py-3 pr-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>
  </div>

  <!-- Middle tab for page name/section and search -->
  {#if pageInfo != ""}
    <div
      in:fly={{ y: -10, duration: 400, easing: cubicOut }}
      class="flex relative top shadow-xl justify-center ml-4 items-center pt-3 pb-2.5 text-gray-400 bg-white rounded-br-2xl rounded-bl-2xl"
    >
      <button
        on:click={handleOpenIndex}
        class="justify-center items-center flex cursor-pointer"
      >
        {#if !openIndex}
          <span class="text-sm font-medium text-gray-800 pl-4 pr-1 capitalize">
            {pageInfo}
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5 mr-1 text-gray-500"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        {:else}
          <span class="text-sm font-medium text-gray-800 pl-4 pr-1">
            Cerrar indice de páginas
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5 mr-1 text-gray-500"
            >
              <path
                d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
              />
            </svg>
          </span>
        {/if}
      </button>
      <div
        class="bg-gray-300 h-full mx-1"
        style="width: 1px; height:16px"
      ></div>
      <button
        use:tippy={{ content: "Busqueda rápida", placement: "right" }}
        class="ml-0.5 mr-4 cursor-pointer"
        on:click={handleOpenSearchPallete}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          class="w-6 h-4 text-gray-800"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  {/if}

  <!-- Right tab for the cart -->
  <div class="flex items-center shadow-xl bg-white space-x-2 rounded-bl-2xl">
    <button
      on:click={toggleCart}
      use:tippy={{ content: "Carrito", placement: "left" }}
      class="pl-2 py-3 pr-2 flex flex-row"
    >
      <img
        src="../images/Shopping-cart.svg"
        loading="lazy"
        alt=""
        class="image-6 w-6 h-5 pr-1"
      />
      <span class="text-sm font-medium text-gray-800 pr-0.5"
        >{cartItems.length}</span
      >
    </button>
  </div>
</div>

{#if catalog !== Catalogs.INVIERNO}
  <!-- Left navigation button -->
  <div
    class="fixed left-0 top-1/2 transform -translate-y-1/2"
    style="z-index: 800;"
  >
    <button
      on:click={navigateToPreviousPage}
      use:tippy={{ content: "Página anterior", placement: "left" }}
      class="bg-white text-gray-900 py-2 pr-2 pl-1 rounded-tr-full rounded-br-full shadow-xl focus:outline-none hover:bg-gray-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  </div>

  <!-- Right navigation button -->
  <div
    class="fixed right-0 top-1/2 transform -translate-y-1/2"
    style="z-index: 800;"
  >
    <button
      on:click={navigateToNextPage}
      use:tippy={{ content: "Siguiente Página", placement: "right" }}
      class="bg-white text-gray-900 py-2 sm:pr-0 pl-2 rounded-tl-full rounded-bl-full shadow-xl focus:outline-none hover:bg-gray-100 pr-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </div>
{/if}

<!-- Panel Busqueda -->

<!-- SEARCH WITH ALGOLIA -->
<div class="{searchPalleteOpen ? 'block' : 'hidden'} pointer-events-none">
  <div
    class="{searchPalleteOpen
      ? 'opacity-100'
      : 'opacity-0'} transition-opacity ease duration-500 pointer-events-auto"
  >
    <SearchPallete bind:showSearch={searchPalleteOpen} />
  </div>
</div>

<!-- Menu lateral -->

{#if showMenu}
  <div
    class="relative"
    style="z-index: 900;"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="fixed inset-0"></div>
    <div class="fixed inset-0 overflow-hidden">
      <div
        class="absolute inset-0 overflow-hidden"
        transition:fade={{ duration: 500 }}
        style="background-color: rgba(0, 0, 0, 0.5);"
      >
        <div
          class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10"
        >
          <div class="pointer-events-auto w-screen sm:max-w-xs max-w-md">
            <div
              class="flex h-full flex-col overflow-y-scroll bg-white py-0 shadow-xl"
              transition:fly={{ x: -400, duration: 500 }}
            >
              <div class="relative mt-4 flex-1 px-4 sm:px-6">
                <div class="lg:col-start-3 lg:row-end-1 mb-2 flex">
                  <div
                    class="rounded-lg bg-gray-100 shadow-sm ring-1 ring-gray-200"
                  >
                    <CatalogMenu />
                  </div>

                  <!-- close icon -->
                  <div class="ml-3 flex h-7 items-center w-fit justify-end">
                    <button
                      on:click={toggleMenu}
                      type="button"
                      class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-vianney-500 focus:ring-offset-2"
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
                <nav aria-label="Sidebar" class="sticky top-4">
                  <div class="space-y-1 pb-2">
                    <button
                      on:click={toggleLogin}
                      class="text-gray-700 w-full hover:bg-gray-100 group flex items-center rounded-md px-3 py-1 text-sm font-medium"
                    >
                      <svg
                        class="text-gray-400 group-hover:text-gray-500 -ml-1 mr-3 h-6 w-6 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>

                      <span class="truncate"
                        >{$user ? "Administrar perfil" : "Iniciar sesión"}</span
                      >
                    </button>
                    <button
                      on:click={toggleCart}
                      class="text-gray-700 w-full hover:bg-gray-100 group flex items-center rounded-md px-3 py-1 text-sm font-medium"
                    >
                      <svg
                        class="text-gray-400 group-hover:text-gray-500 -ml-1 mr-3 h-6 w-6 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke=""
                        aria-hidden="true"
                      >
                        <g>
                          <path
                            id="Icon"
                            d="M3 3.7395H5L5.4 5.7395M7 13.7395H17L21 5.7395H5.4M7 13.7395L5.4 5.7395M7 13.7395L4.70711 16.0324C4.07714 16.6624 4.52331 17.7395 5.41421 17.7395H17M17 17.7395C15.8954 17.7395 15 18.6349 15 19.7395C15 20.8441 15.8954 21.7395 17 21.7395C18.1046 21.7395 19 20.8441 19 19.7395C19 18.6349 18.1046 17.7395 17 17.7395ZM9 19.7395C9 20.8441 8.10457 21.7395 7 21.7395C5.89543 21.7395 5 20.8441 5 19.7395C5 18.6349 5.89543 17.7395 7 17.7395C8.10457 17.7395 9 18.6349 9 19.7395Z"
                            stroke="#94a3b8"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                      </svg>

                      <span class="truncate">Carrito</span>
                    </button>

                    <!--
                    <a href="#" class="text-gray-700 hover:bg-gray-100 group flex items-center rounded-md px-3 py-2 text-sm font-medium">
                      <svg class="text-gray-400 group-hover:text-gray-500 -ml-1 mr-3 h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                      </svg>
                      
                      <span class="truncate">Decoradora IA</span>
                    </a> -->

                    {#if catalog === Catalogs.CHAVOS || catalog === Catalogs.VIANNEY || catalog === Catalogs.BEBE || catalog === Catalogs.INVIERNO}
                      <button
                        on:click={handleShowSections}
                        class="text-gray-700 w-full hover:bg-gray-100 group flex items-center rounded-md px-3 py-1 text-sm font-medium"
                      >
                        <svg
                          class="text-gray-400 group-hover:text-gray-500 -ml-1 mr-3 h-6 w-6 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke=""
                          aria-hidden="true"
                        >
                          <g>
                            <path
                              id="Icon"
                              d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                              stroke="#94a3b8"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                        </svg>

                        <span class="truncate">Secciones</span>

                        <div
                          id="sections-dropdown-arrow"
                          class="flex items-center justify-center cursor-pointer px-2"
                        >
                          <!-- Chevron icon -->
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="w-5 h-5 text-gray-500"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </button>
                      <div
                        id="sections-list"
                        class="mt-3 ml-8 space-y-1"
                        aria-labelledby="communities-headline"
                      >
                        {#each catalogSections[catalog] as section}
                          <a
                            href={section.link}
                            class="group flex flex-col leading-5 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          >
                            <span class="truncate chavos-bold-sm"
                              >{section.title.replaceAll("<br />", " ")}</span
                            >
                            <span class="truncate chavos-xs"
                              >{section.subtitle}</span
                            >
                          </a>
                        {/each}
                      </div>
                    {/if}
                  </div>
                  <!--
                <div class="pt-10">
                  <p class="px-3 text-sm font-medium text-gray-500" id="communities-headline">Mis Colecciones</p>
                  <div class="mt-3 space-y-1" aria-labelledby="communities-headline">
                    <a href="#" class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                      <span class="truncate">Favoritos</span>
                    </a>
                    <a href="#" class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                      <span class="truncate">Recámara</span>
                    </a>
                    <a href="#" class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                      <span class="truncate">Comedor</span>
                    </a>
                    <a href="#" class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                      <span class="truncate">Sala</span>
                    </a>
                    <a href="#" class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                      <span class="truncate">Cocina</span>
                    </a>
                    <a href="#" class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                      <span class="truncate">Estudio</span>
                    </a>
                    <a href="#" class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                      <span class="truncate">Jardín</span>
                    </a>
                    <a href="#" class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                      <span class="truncate">Baño</span>
                    </a>
                  </div>
                </div>
                -->

                  <button
                    on:click={handleShowCatalogs}
                    class="w-full bg-vianney-400 text-vianney-600 group flex items-center rounded-md px-3 py-1 text-sm font-medium"
                  >
                    <svg
                      class="text-vianney-600 -ml-1 mr-3 h-6 w-6 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    </svg>

                    <span class="truncate">Catálogos</span>

                    <div
                      id="catalogs-dropdown-arrow"
                      class="flex items-center justify-center cursor-pointer px-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-5 h-5 text-gray-500"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>

                  <div
                    id="catalogs-list"
                    class="mt-3 ml-8 mb-12 flex flex-wrap text-black items-center justify-center space-x-1"
                    aria-labelledby="communities-headline"
                  >
                    {#each Object.keys(CATALOGS_DESCRIPTIONS) as catalogName, index}
                      <!-- href={CATALOGS_DESCRIPTIONS[catalogName].url} -->
                      <a
                        href={URLS.landing + catalogName}
                        class="w-1/6 flex flex-col items-center justify-center"
                        rel="noopener noreferrer"
                      >
                        <div class="h-full w-full mb-1">
                          <img
                            class="h-full w-full object-contain"
                            src={CATALOGS_DESCRIPTIONS[catalogName].image}
                            alt=""
                          />
                        </div>

                        <p class="truncate text-sm">
                          {CATALOGS_DESCRIPTIONS[catalogName].title}
                        </p>
                      </a>
                    {/each}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Carrito -->

{#if showCart}
  <div
    class="relative"
    style="z-index: 900;"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
  >
    <!-- Background backdrop, show/hide based on slide-over state. -->
    <div class="fixed inset-0"></div>

    <div class="fixed inset-0 overflow-hidden">
      <div
        class="absolute inset-0 overflow-hidden"
        transition:fade={{ duration: 500 }}
        style="background-color: rgba(0, 0, 0, 0.5);"
      >
        <div
          class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"
        >
          <!--
          Slide-over panel, show/hide based on slide-over state.

          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        -->
          <div class="pointer-events-auto w-screen max-w-md">
            <div
              transition:fly={{ x: 400, duration: 500 }}
              class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
            >
              <div class="px-6 pt-6 py-4">
                <div class="flex items-start justify-between">
                  <h2
                    class="text-lg font-semibold leading-6 text-gray-900"
                    id="slide-over-title"
                  >
                    Carrito
                  </h2>
                  <div class="ml-3 flex h-7 items-center">
                    <button
                      on:click={toggleCart}
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
              <div
                class="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6"
              >
                <div>
                  <dl class="space-y-4">
                    <div class="flex items-center justify-between">
                      <dt class="text-base font-medium text-gray-700">
                        Subtotal
                      </dt>
                      <dd class="ml-4 text-base font-medium text-gray-700">
                        {formatPrice(subtotal)}
                      </dd>
                    </div>
                  </dl>
                  <p class="mt-1 text-sm text-gray-500">
                    {loggedAdi
                      ? "Los detalles de tu pedido seran enviados a tu ADI."
                      : "Te enviaremos a vianney.com.mx para terminar tu pedido."}
                  </p>
                </div>
                <div class="">
                  <div class="mt-6">
                    <button
                      on:click={handleCompra}
                      type="submit"
                      class="w-full rounded-md border border-transparent bg-vianney-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-vianney-700 focus:outline-none focus:ring-2 focus:ring-vianney-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      >{loggedAdi
                        ? "Hacer pedido a mi ADI"
                        : "Comprar ahora"}</button
                    >
                  </div>
                </div>
              </div>
              <div class="border-b border-gray-200">
                <div class="px-6">
                  <!-- Tab component -->
                  <nav class="-mb-px flex justify-center space-x-6">
                    <!-- Current: "border-vianney-500 text-vianney-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
                    <span
                      class="border-vianney-500 text-vianney-600 whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-medium"
                      >Articulos en el carrito</span
                    >
                  </nav>
                </div>
              </div>
              <ul
                role="list"
                class="divide-y divide-gray-200 border-b border-gray-200 px-4 w-full overflow-y-auto"
              >
                {#each cartItems as item (item.product.id)}
                  <li class="flex py-2 sm:py-6 cursor-pointer align-middle">
                    <!-- Puedes ajustar las rutas de las imágenes según la estructura de tu objeto -->
                    <div class="flex-shrink-0">
                      <img
                        src="{URLS.tienda}{item.product.Id}.jpg"
                        alt={item.product.Name}
                        class="h-14 w-14 rounded-md object-cover object-center"
                      />
                    </div>
                    <div class="ml-2 flex flex-1 flex-col sm:ml-2">
                      <div>
                        <div class="flex justify-between">
                          <div class="flex" style="flex-direction: column">
                            <div
                              class="font-medium text-gray-700 hover:text-gray-800 text-sm capitalize mr-2"
                            >
                              {item.product.Name}
                              {item.product.VariantProduct
                                ? "/ " + item.product.VariantProduct
                                : ""}
                            </div>
                            <select
                              bind:value={item.quantity}
                              on:change={(event) =>
                                handleQuantityChange(item.product.id, event)}
                              style="max-width: 40px"
                              class="rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-vianney-500 focus:outline-none focus:ring-1 focus:ring-vianney-500 sm:text-sm"
                            >
                              <option
                                style="display: none;"
                                selected
                                value={item.quantity}>{item.quantity}</option
                              >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                            </select>
                          </div>
                          <div class="mt-4 sm:mt-0">
                            <div class="absolute right-0 top-0"></div>
                            <div
                              id="remove-btn"
                              class="px-1 py-1 mr-2 text-gray-500 hover:bg-gray-100 rounded-sm"
                              style="max-height: 32px;"
                              on:click={() => handleRemove(item.product.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .spinner {
    padding-left: 2px;
    padding-right: 2px;
    margin-left: 4px;
    margin-right: 4px;
    margin-top: 4px;
    margin-bottom: 4px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #292929;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
