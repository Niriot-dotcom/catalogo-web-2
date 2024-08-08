<script lang="ts">
  import { URLS } from "$lib/constants/strings";
  import { deleteSubArray } from "$lib/utils/strings";
  import { createEventDispatcher, onMount } from "svelte";
  import { addToCart } from "./cartLogic";

  export let show: boolean;
  export let totalItems: [];
  export let selectedItems: [];
  export let loading: boolean;

  function handleCloseModal() {
    show = false;
    loading = false;
    totalItems = [];
    selectedItems = [];
  }
  function handleRemove(item: any) {
    totalItems = deleteSubArray(totalItems, item);
    selectedItems = totalItems.map((item) => item[0]);
  }
  function handleSizeChange(index: number, event: any) {
    const productId = event.target.value;
    let product = totalItems[index].find(
      (item: {}) => item.product.id === productId,
    );
    selectedItems[index] = product;
  }

  const dispatch = createEventDispatcher();
  function addToCartClick(product: {}) {
    product.quantity = 1; // Añadir la cantidad al producto
    addToCart(product);
    dispatch("addtocart");

    // TODO habilitar gtag
    // if (typeof gtag !== "undefined") {
    //   gtag("event", "add_to_cart", {
    //     event_category: "ecommerce",
    //     event_label: product.product.Name,
    //   });
    // }
  }

  function handleConfirm() {
    selectedItems.forEach((item) => addToCartClick(item));
    handleCloseModal();
  }
</script>

<!-- Conditional rendering of the popup and the popup-overlay -->
{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click={handleCloseModal} class="popup-overlay show"></div>
  <div
    class="popup show w-4/5 md:max-w-full mx-auto h-full flex flex-col justify-between sm:p-8 p-4"
  >
    <div class="w-full h-full">
      <div class="w-full flex align-middle justify-end content-end">
        <button
          on:click={handleCloseModal}
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

      {#if loading}
        <div class="flex flex-grow justify-center items-center">
          <div class="loader"></div>
        </div>
      {:else}
        <!--  -->
        <div
          class="text-center h-full flex flex-col align-middle justify-center"
        >
          <h3 class="mt-2 text-sm font-semibold text-gray-900 mb-5">
            Selecciona las tallas que desees
          </h3>

          <ul
            role="list"
            class="divide-y divide-gray-200 border-b border-gray-200 px-4 w-full overflow-y-auto"
          >
            {#each totalItems as item, i}
              <li class="flex py-2 sm:py-6 cursor-pointer align-middle">
                <div class="flex-shrink-0">
                  <img
                    src="{URLS.fotos}{item[0].product.Id}-500.webp"
                    alt={item[0].product.Name}
                    class="h-14 w-14 rounded-md object-cover object-center"
                  />
                </div>
                <div class="ml-2 flex flex-1 flex-col sm:ml-2">
                  <div>
                    <div class="flex justify-between">
                      <div class="flex flex-col w-full">
                        <div
                          class="font-medium text-start text-gray-700 hover:text-gray-800 text-sm capitalize mr-2"
                        >
                          {item[0].product.Name}
                        </div>
                        <select
                          on:change={(event) => handleSizeChange(i, event)}
                          class="rounded-md w-full md:w-1/2 border border-gray-300 px-2 py-1.5 text-left text-sm font-normal leading-5 text-gray-700 shadow-sm focus:border-vianney-500 focus:outline-none focus:ring-1 focus:ring-vianney-500 sm:text-sm"
                        >
                          {#each item as variantProduct}
                            <option value={variantProduct.product.Id}>
                              {variantProduct.product.VariantProduct}
                            </option>
                          {/each}
                        </select>
                      </div>
                      <div class="mt-4 sm:mt-0">
                        <div class="absolute right-0 top-0"></div>
                        <div
                          id="remove-btn"
                          class="px-1 py-1 mx-2 text-gray-500 hover:bg-gray-100 rounded-sm"
                          style="max-height: 32px;"
                          on:click={() => handleRemove(item)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
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

          <div class="mt-6">
            <button
              on:click={handleConfirm}
              type="button"
              class="inline-flex w-full max-w-xs justify-center rounded-md bg-vianney-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-vianney-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vianney-600 sm:col-start-2"
            >
              Listo
            </button>
            <button
              on:click={handleCloseModal}
              type="button"
              class="mt-3 inline-flex w-full max-w-xs justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            >
              Cancelar
            </button>
          </div>
        </div>
      {/if}
      <!--  -->
    </div>
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

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
