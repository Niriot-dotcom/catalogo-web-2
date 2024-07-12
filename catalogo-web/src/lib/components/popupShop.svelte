<script lang="ts">
  import { addToCart } from "$lib/components/cartLogic.js";
  import { onMount, beforeUpdate } from "svelte";
  import {
    collection,
    query,
    where,
    getDoc,
    getDocs,
    doc,
  } from "firebase/firestore";
  import { db } from "$lib/firebase";
  import { createEventDispatcher } from "svelte";
  import Carousel from "svelte-carousel";
  import { URLS } from "$lib/constants/strings";
  let carousel;
  let unique = {};

  export let show = false;
  export let showSearch = false;
  export let visibleIds = [];
  export let relatedProducts = [];
  export let clickProduct: string | null = null;
  let loading = false;
  let loadingLowerPrice = true;

  onMount(() => {
    // This will only run once after the component is mounted to the DOM
    toggleNoScroll(show);
  });

  async function fetchProductsPrices() {
    visibleIds.forEach(async (productSku) => {
      if (productSku in allPrices) return;

      let sku = parseInt(productSku);
      let lowerPrice: number = 1_000_000;
      let fproductsWithSameName: any[] = [];
      const productsRef = collection(db, "products");
      const productQueryId = query(productsRef, where("Id", "==", sku));
      const productQueryIdSnapshot = await getDocs(productQueryId);
      productQueryIdSnapshot.forEach((doc) => {
        fproductsWithSameName.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const productName = fproductsWithSameName[0].Name;

      // 1. Buscar todos los productos con el mismo nombre
      const productQueryName = query(
        productsRef,
        where("Name", "==", productName),
      );
      const productQueryNameSnapshot = await getDocs(productQueryName);
      productQueryNameSnapshot.forEach((doc) => {
        fproductsWithSameName.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      // 2. Ahora, para cada producto, buscamos su precio en la colección priceList
      let fpricesForProducts: any[] = [];
      for (let product of fproductsWithSameName) {
        const priceRef = doc(db, "priceList", product.id);
        const priceSnap = await getDoc(priceRef);
        if (priceSnap.exists()) {
          fpricesForProducts.push(priceSnap.data());
        } else {
          fpricesForProducts.push(null); // Puedes manejar esto de otra forma si lo deseas
        }
      }

      // Remove the same products
      fproductsWithSameName = Object.values(
        fproductsWithSameName.reduce(
          (acc, obj) => ({ ...acc, [obj.id]: obj }),
          {},
        ),
      );

      // 3. Combinar la información del producto y su precio en un solo objeto
      fproductsWithSameName.map((product) => {
        // Encuentra el precio correspondiente al ID del producto
        const productPrice = fpricesForProducts.find(
          (price) => price && price.Id === product.Id,
        );

        if (productPrice.basePrice < lowerPrice) {
          lowerPrice = productPrice.basePrice;
        }

        return {
          product: product,
          price: productPrice,
        };
      });

      allPrices[productSku] = lowerPrice;
      setTimeout(() => {
        loadingLowerPrice = false;
      }, 400);
    });
  }

  beforeUpdate(() => {
    // This will run before every update to the DOM, making it ideal to check `show`
    toggleNoScroll(show);
  });

  function toggleNoScroll(shouldPreventScroll) {
    if (shouldPreventScroll) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }

  let products = []; // Products fetched from Firebase
  let allPrices: any = {};

  $: if (clickProduct !== null) {
    fetchProductDetail(null, +clickProduct);
  }
  $: if (show && visibleIds.length) {
    fetchProducts(visibleIds);

    // get lower prices for each product
    fetchProductsPrices();
  }

  async function fetchProducts(ids) {
    loading = true;
    let fetchedProducts = [];
    for (let id of ids) {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        fetchedProducts.push(docSnap.data());
      }
    }

    products = fetchedProducts;
    loading = false;
  }

  let selectedProduct = null;
  let selectedVariant = null;
  let selectedVariantId = null;

  async function fetchProductDetail(event, clickId) {
    loading = true;
    show = true;

    let productsWithSameName = [];

    if (clickId) {
      const productsRef = collection(db, "products");
      const productQuery = query(productsRef, where("Id", "==", clickId));
      const productQuerySnapshot = await getDocs(productQuery);
      productQuerySnapshot.forEach((doc) => {
        productsWithSameName.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    }

    const productName = clickId
      ? productsWithSameName[0].Name
      : event
        ? event.currentTarget.getAttribute("data-id")
        : console.log("vars:", clickId);

    // 1. Buscar todos los productos con el mismo nombre
    const productsRef = collection(db, "products");
    const productQuery = query(productsRef, where("Name", "==", productName));
    const productQuerySnapshot = await getDocs(productQuery);

    productQuerySnapshot.forEach((doc) => {
      productsWithSameName.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // 2. Ahora, para cada producto, buscamos su precio en la colección priceList
    let pricesForProducts = [];
    for (let product of productsWithSameName) {
      const priceRef = doc(db, "priceList", product.id);
      const priceSnap = await getDoc(priceRef);
      if (priceSnap.exists()) {
        pricesForProducts.push(priceSnap.data());
      } else {
        pricesForProducts.push(null); // Puedes manejar esto de otra forma si lo deseas
      }
    }

    // Remove the same products
    productsWithSameName = Object.values(
      productsWithSameName.reduce(
        (acc, obj) => ({ ...acc, [obj.id]: obj }),
        {},
      ),
    );

    // 3. Combinar la información del producto y su precio en un solo objeto
    selectedProduct = productsWithSameName.map((product) => {
      // Encuentra el precio correspondiente al ID del producto
      const productPrice = pricesForProducts.find(
        (price) => price && price.Id === product.Id,
      );

      return {
        product: product,
        price: productPrice,
      };
    });

    selectedVariant = selectedProduct[0];
    selectedVariantId = selectedProduct[0].product.Id.toString(); // Seleccionar el primer producto de la lista
    loading = false;
  }

  function showList() {
    selectedProduct = null;
    clickProduct = null;
  }

  function changeVariant(event) {
    const variantId = event.currentTarget.getAttribute("data-id");
    selectedVariant = selectedProduct.find(
      (variant) => variant.product.id.toString() === variantId,
    );
    selectedVariantId = variantId;
  }

  function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0, // No decimales
      maximumFractionDigits: 0, // No decimales
    }).format(price);
  }

  function replaceFontAndSize(input) {
    return input
      .replace(/Metropolis-Medium/g, "Inter")
      .replace(/font-size:16px;/g, "");
  }

  function closePopup() {
    show = false;
    selectedProduct = null;
    clickProduct = null;
  }

  const dispatch = createEventDispatcher();

  let quantity = 1;

  function addToCartClick(product) {
    selectedProduct = null;
    clickProduct = null;
    show = false;
    product.quantity = Number(quantity); // Añadir la cantidad al producto
    addToCart(product);
    dispatch("addtocart");
    if (typeof gtag !== "undefined") {
      gtag("event", "add_to_cart", {
        event_category: "ecommerce",
        event_label: product.product.Name,
      });
    }
  }

  function showSearchPopup() {
    showSearch = true;
    closePopup();
  }
</script>

<!-- Conditional rendering of the popup and the popup-overlay -->
{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click={closePopup} class="popup-overlay show"></div>
  <div
    class="popup show w-4/5 md:max-w-full mx-auto h-full flex flex-col justify-between sm:p-8 p-4"
  >
    {#if loading}
      <div class="flex flex-grow justify-center items-center">
        <div class="loader"></div>
      </div>
    {:else if selectedProduct}
      <div>
        <div class="w-full flex align-middle justify-end content-end">
          <button
            on:click={closePopup}
            type="button"
            class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
          >
            <span class="sr-only">Close</span>
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
        <div
          class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:items-center lg:gap-x-8"
        >
          <!-- CLOSE BUTTON -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <span
            class="absolute top-0 right-0 m-6 cursor-pointer rounded-full p-1 z-[1] bg-beige"
            on:click={closePopup}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-6 h-6 text-black"
            >
              <path
                d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
              />
            </svg>
          </span>

          <!-- main img -->
          {#key unique}
            <div
              class="m-auto h-full w-full sm:col-span-12 lg:col-span-5 flex items-center"
            >
              <Carousel bind:this={carousel} autoplay autoplayDuration={5000}>
                <button
                  slot="prev"
                  on:click={() => carousel.goToPrev()}
                  class="absolute z-30 left-0 top-[53%] ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
                >
                  <svg
                    class="dark:text-gray-900"
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 1L1 7L7 13"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                {#each { length: 3 } as _, i}
                  <div class="overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src="{URLS.tienda}{selectedProduct[0].product.Id}{i > 0
                        ? `_${i + 1}`
                        : ''}.jpg"
                      alt=""
                      class="object-cover object-center"
                    />
                  </div>
                {/each}
                <button
                  slot="next"
                  on:click={() => carousel.goToNext()}
                  class="absolute z-30 right-0 top-[53%] mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
                >
                  <svg
                    class="dark:text-gray-900"
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L7 7L1 13"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </Carousel>
            </div>
          {/key}

          <!--  -->
          <div class="sm:col-span-12 lg:col-span-7">
            <h2 class="text-xl font-medium text-gray-900 sm:pr-12">
              {selectedProduct[0].product.Name} -
              {selectedVariant.product.Id}
            </h2>
            <section aria-labelledby="information-heading" class="mt-1">
              <h3 id="information-heading" class="sr-only">
                Product information
              </h3>
              <p class="font-medium text-gray-900">
                {formatPrice(selectedVariant.price.basePrice)}
              </p>
            </section>

            <section aria-labelledby="options-heading" class="mt-8">
              <h3 id="options-heading" class="sr-only">Product options</h3>

              <!-- Size picker -->
              <div class="mt-8">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-medium text-gray-900">Talla</h4>
                </div>

                <fieldset class="mt-2">
                  <legend class="sr-only">Selecciona una talla</legend>
                  <div class="grid grid-cols-auto gap-2">
                    {#each selectedProduct as variant, index}
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                      <label
                        data-id={variant.product.Id}
                        on:click={changeVariant}
                        class="flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none
                        {variant.product.Id.toString() === selectedVariantId
                          ? 'ring-2 ring-vianney-600'
                          : ''}"
                      >
                        <input
                          type="radio"
                          name="size-choice"
                          value="XXS"
                          class="sr-only"
                          aria-labelledby="size-choice-{index}-label"
                        />
                        <span id="size-choice-{index}-label"
                          >{variant.product.VariantProduct
                            ? variant.product.VariantProduct
                            : "estándar"}</span
                        >
                      </label>
                    {/each}
                  </div>
                </fieldset>
              </div>
              <div>
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-medium text-gray-900 mt-2">
                    Cantidad
                  </h4>
                </div>
                <div>
                  <label for="number" class="sr-only">Cantidad</label>
                  <input
                    type="number"
                    name="quantity"
                    id="productQuantity"
                    min="1"
                    max="25"
                    class="block w-full rounded-md border-0 p-2 my-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    bind:value={quantity}
                  />
                </div>
              </div>
              <button
                on:click={addToCartClick(selectedVariant)}
                class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-vianney-600 px-8 py-3 text-base font-medium text-white hover:bg-vianney-700 focus:outline-none focus:ring-2 focus:ring-vianney-500 focus:ring-offset-2"
                >Añadir al carrito</button
              >

              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <div
                on:click={showList}
                class="font-medium text-vianney-600 hover:text-vianney-500 cursor-pointer"
              >
                <p class="text-center sm:static sm:mt-8">Regresar a la lista</p>
              </div>
            </section>
          </div>
        </div>

        <div class="w-full mt-4 pt-2">
          <div>
            <div class="px-4 sm:px-0">
              <h3 class="text-base font-semibold leading-7 text-gray-900">
                Información del producto
              </h3>
              <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Descubre los detalles del producto seleccionado.
              </p>
            </div>
            <div class="mt-6 border-t border-gray-100">
              <dl class="divide-y divide-gray-100">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">
                    Categoría
                  </dt>
                  <dd
                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                    style="text-transform: capitalize;"
                  >
                    <span
                      style="font-size: 12px;"
                      class="hidden sm:inline-flex items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                      >{selectedProduct[0].product.DepartmentId}</span
                    >
                  </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">
                    Descripción
                  </dt>
                  <dd
                    style="font-size: 14px !important;"
                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  >
                    {@html replaceFontAndSize(
                      selectedProduct[0].product.Description,
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {#if relatedProducts && relatedProducts.length > 0}
          <div class="w-full mt-4 pt-2">
            <div>
              <div class="px-4 sm:px-0">
                <h3 class="text-base font-semibold leading-7 text-gray-900">
                  Productos relacionados
                </h3>
              </div>

              <!-- images -->
              <div class="w-full grid grid-cols-2 grid-rows-2 gap-4">
                {#each relatedProducts as relatedProduct, i}
                  <button
                    class="mt-3 bg-gray-100"
                    on:click={() => {
                      selectedProduct = relatedProduct;
                      clickProduct = relatedProduct;
                      // TODO update related products from other database
                      relatedProducts = [];
                    }}
                  >
                    <img
                      src="{URLS.tienda}{relatedProduct}.jpg"
                      alt=""
                      class="object-cover object-center rounded-lg"
                    />
                  </button>
                {/each}
              </div>
            </div>
          </div>
        {/if}
      </div>
    {:else if visibleIds.length > 0}
      <div class="w-full">
        <div class="w-full flex align-middle justify-end content-end">
          <button
            on:click={closePopup}
            type="button"
            class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
          >
            <span class="sr-only">Close</span>
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
        <ul
          role="list"
          class="divide-y divide-gray-200 border-b border-gray-200 w-full"
        >
          <li style="margin-bottom: 12px;">
            <div class="px-4 sm:px-0">
              <h3 class="text-base font-semibold leading-7 text-gray-900">
                Productos en la página
              </h3>
              <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Selecciona el producto que deseas añadir al carrito.
              </p>
            </div>
          </li>
          {#each products as product}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li
              data-id={product.Name}
              on:click={fetchProductDetail}
              class="flex py-6 cursor-pointer"
            >
              <div class="flex-shrink-0">
                <img
                  src="{URLS.tienda}{product.Id}.jpg"
                  alt={product.Name}
                  class="h-16 w-16 rounded-md object-cover object-center"
                />
              </div>

              <div class="ml-4 flex flex-1 flex-col sm:ml-6">
                <div>
                  <div class="flex justify-between">
                    <div>
                      <span
                        style="font-size: 10px;"
                        class="hidden sm:inline-flex items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                        >{product.DepartmentId}</span
                      >
                      <div
                        class="font-medium text-gray-700 hover:text-gray-800 text-base capitalize"
                      >
                        {product.Name.toLowerCase()}
                        {#if !loadingLowerPrice}
                          <br />
                          <p class="text-sm text-vianney-600">
                            Desde {formatPrice(allPrices[product.Id])}
                          </p>
                        {/if}
                      </div>
                    </div>

                    <button
                      type="button"
                      class="hidden sm:block rounded-full bg-gray-100 px-4 py-0 text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                    >
                      <svg
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="2"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="mt-4 flex flex-1 items-end justify-between">
                  <div class="ml-4"></div>
                </div>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    {:else}
      <div class="w-full h-full">
        <div class="w-full flex align-middle justify-end content-end">
          <button
            on:click={closePopup}
            type="button"
            class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
          >
            <span class="sr-only">Close</span>
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

        <div
          class="text-center h-full flex flex-col align-middle justify-center"
        >
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>

          <h3 class="mt-2 text-sm font-semibold text-gray-900">
            No se detectaron los productos en la pantalla
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Desliza hacia arriba o hacia abajo para descubrir los productos de
            la página o intenta dar clic en los productos.
          </p>
          <div class="mt-6">
            <button
              on:click={showSearchPopup}
              type="button"
              class="inline-flex w-full max-w-xs justify-center rounded-md bg-vianney-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-vianney-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vianney-600 sm:col-start-2"
              >Buscar productos</button
            >
            <button
              on:click={closePopup}
              type="button"
              class="mt-3 inline-flex w-full max-w-xs justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              >Cerrar</button
            >
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}

<!-- Styling for the popup -->
<style>
  .popup {
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    background-color: #fff;
    border: 1px solid #ddd;
    color: black;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: none;
    z-index: 901;
    max-height: 80%;
    overflow-y: auto;
  }

  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    z-index: 900;
  }

  .show {
    display: flex;
  }

  .loader {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #830048;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto;
    padding: 0;
    position: inherit;
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
