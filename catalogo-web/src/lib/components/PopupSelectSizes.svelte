<script lang="ts">
  import { URLS } from "$lib/constants/strings";
  import { stringify } from "postcss";
  import { removeFromCart } from "./cartLogic";

  export let show: boolean;
  export let totalItems: any[];

  function handleCloseModal() {
    show = false;
  }
  function handleRemove(productId: any) {
    removeFromCart(productId);
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

      <div class="text-center h-full flex flex-col align-middle justify-center">
        <h3 class="mt-2 text-sm font-semibold text-gray-900">
          Selecciona las tallas que desees
        </h3>
        <!-- <p class="mt-1 text-sm text-gray-500">
          Desliza hacia arriba o hacia abajo para descubrir los productos de la
          página o intenta dar clic en los productos.
        </p> -->

        <ul
          role="list"
          class="divide-y divide-gray-200 border-b border-gray-200 px-4 w-full overflow-y-auto"
        >
          {#each totalItems as item}
            <li class="flex py-2 sm:py-6 cursor-pointer align-middle">
              <!-- {JSON.stringify(item)} -->

              <div class="ml-2 flex flex-1 flex-col sm:ml-2">
                <div>
                  <div class="flex justify-between">
                    <div class="flex flex-col w-full">
                      <div
                        class="font-medium text-start text-gray-700 hover:text-gray-800 text-sm capitalize mr-2"
                      >
                        {item[0].product.Name}
                      </div>
                      <!-- on:change={(event) =>
                          handleQuantityChange(item.product.id, event)} -->
                      <select
                        class="rounded-md w-1/2 border border-gray-300 px-2 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-vianney-500 focus:outline-none focus:ring-1 focus:ring-vianney-500 sm:text-sm"
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

        <div class="mt-6">
          <button
            on:click={handleCloseModal}
            type="button"
            class="inline-flex w-full max-w-xs justify-center rounded-md bg-vianney-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-vianney-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vianney-600 sm:col-start-2"
            >Listo</button
          >
          <button
            on:click={handleCloseModal}
            type="button"
            class="mt-3 inline-flex w-full max-w-xs justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          >
            Cancelar
          </button>
        </div>
      </div>
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
