<script lang="ts">
  import { cartStore } from "$lib/components/cartLogic.js";
  import { URLS } from "$lib/constants/strings";
  export let showCompra = false;
  let showConfirmation = false;
  let cartItems = [];

  let clientData = {
    nombre: "",
    apellidos: "",
    telefono: "",
  };

  var loggedAdi: any;

  var confirmLoading = false;
  const handleConfirmClientData = () => {
    confirmLoading = true;
    let body = {
      origin: "catalogo-web",
      adi: {},
      cliente: clientData,
      subtotal: formatPrice(subtotal).replace("$", ""),
      cart: cartItems.map((item) => {
        return {
          price: item.price,
          quantity: item.quantity,
          product: {
            id: item.product.id,
            Name: item.product.Name,
          },
        };
      }),
    };

    loggedAdi = localStorage.getItem("adi");
    if (loggedAdi) {
      body.adi = {
        tarjeta: loggedAdi ? loggedAdi : "shopify",
        herramienta: "catalogo-web",
      };
    }

    async function buyPost() {
      try {
        const endpoint = loggedAdi
          ? "https://us-central1-mx-vianney-001.cloudfunctions.net/mitienda/processOrder"
          : "https://us-central1-mx-vianney-001.cloudfunctions.net/mitienda/processOrderShopify";

        body.adi = {
          tarjeta: loggedAdi,
          herramienta: "catalogo-web",
        };

        const res = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify(body, null, 2),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status !== 200) {
          throw new Error("Error: por favor intenta más tarde.");
        }

        if (res.status === 200 && loggedAdi) {
          showCompra = false;
          showConfirmation = true;
        } else {
          const result = await res.json();
          window.open(result.link, "_blank");
          showCompra = false;
          showConfirmation = true;
        }
      } catch (error) {
        console.error(error);
      }
    }
    buyPost();
    confirmLoading = false;
  };

  cartStore.subscribe((value) => {
    cartItems = value;
  });
  function closePopup() {
    showCompra = false;
    showConfirmation = false;
  }

  $: subtotal = cartItems.reduce(
    (acc, item) => acc + item.price.basePrice * item.quantity,
    0,
  );

  function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0, // No decimales
      maximumFractionDigits: 0, // No decimales
    }).format(price);
  }

  function constructWhatsAppMessage() {
    let message =
      "*Hola*%20👋%20%0A_He%20visto%20los%20productos%20que%20me%20has%20compartido%20y%20me%20gustaría%20hacer%20el%20siguiente%20pedido_%20%0A%20%20Notas:%20%20%0A%20%20*Detalles%20del%20pedido:*%20%0A";

    message += `%20%20Subtotal:%20${formatPrice(subtotal).replace(
      " ",
      "%20",
    )}%20%0A`;
    message += `%20%20Cantidad%20de%20artículos:%20${cartItems.length}%20%0A`;
    message += `%20%20*Artículos%20en%20el%20pedido:*%20%0A`;

    for (let item of cartItems) {
      message += `%20%20x${item.quantity}%20${item.product.Name}%20%0A`;
      message += `%20%20%20%20${formatPrice(item.price.basePrice).replace(
        " ",
        "%20",
      )}%20/%20${item.product.Id}%20/%20${
        item.product.VariantProduct ? item.product.VariantProduct : ""
      }%20%0A%20%20%20%20%0A`;
    }

    return message;
  }

  function shareOnWhatsApp() {
    const message = constructWhatsAppMessage();
    const whatsappURL = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappURL, "_blank");
  }
</script>

{#if showCompra}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click={closePopup} class="popup-overlay show"></div>

  <div
    class="popup show w-4/5 sm:m-w-0 sm:w-auto h-auto md:max-w-full mx-auto flex flex-col justify-between sm:p-6 p-4 sm:h-auto"
  >
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <div class="">
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
    </div>
    <div class="w-full h-full flex align-middle">
      <form on:submit|preventDefault={handleConfirmClientData} class="w-full">
        <div class="mx-auto max-w-xl px-5">
          <div class="mx-auto max-w-xl py-3">
            <!-- <h1 class="text-base font-medium text-vianney-600">¡Gracias por tu pedido!</h1> -->
            <p
              class="text-left sm:text-2xl text-xl font-medium leading-9 tracking-tight text-gray-900"
            >
              Finaliza tu pedido
            </p>
            <p class="mt-2 text-base text-gray-500">
              Para continuar con tu pedido, por favor ingresa los siguientes
              datos
            </p>
          </div>

          <div class="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <div>
              <label
                for="first-name"
                class="block text-sm font-semibold leading-6 text-gray-900"
                >Nombre(s)</label
              >
              <div class="mt-2.5">
                <input
                  required
                  type="text"
                  on:change={(e) => (clientData.nombre = e.target.value)}
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="block w-full rounded-md border-0 px-3.5 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                for="last-name"
                class="block text-sm font-semibold leading-6 text-gray-900"
                >Apellido(s)</label
              >
              <div class="mt-2.5">
                <input
                  required
                  type="text"
                  on:change={(e) => (clientData.apellidos = e.target.value)}
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  class="block w-full rounded-md border-0 px-3.5 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="first-name"
                class="block text-sm font-semibold leading-6 text-gray-900"
                >Teléfono</label
              >
              <div class="mt-0 flex rounded-md shadow-sm">
                <span
                  class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 text-sm leading-6"
                  >+52</span
                >
                <input
                  required
                  maxlength="10"
                  type="tel"
                  on:change={(e) => (clientData.telefono = e.target.value)}
                  name="phone-number"
                  id="phone-number"
                  autocomplete="tel"
                  class="block w-full rounded-r-md border-0 px-3.5 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              disabled={confirmLoading}
              type="submit"
              class="mt-8 flex w-full justify-center rounded-md bg-vianney-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-vianney-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vianney-600"
              >Confirmar</button
            >
          </div>
        </div>
      </form>
    </div>
  </div>
{:else if showConfirmation}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click={closePopup} class="popup-overlay show"></div>

  <div
    class="popup show w-4/5 md:max-w-full mx-auto flex flex-col justify-between sm:p-6 p-4 sm:h-full"
  >
    <div class="w-full h-full flex align-middle">
      <div class="w-full h-full">
        <div class="bg-white">
          <div
            class="mx-auto max-w-3xl px-4 pt-16 pb-6 sm:px-6 sm:py-24 lg:px-8"
          >
            <div class="">
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
            <div class="max-w-xl">
              <p class="text-base font-medium text-vianney-600">
                {loggedAdi
                  ? "¡Gracias por tu pedido!"
                  : "¡Tu pedido esta listo!"}
              </p>
              <h1 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {loggedAdi
                  ? "El pedido fue enviado a tu ADI"
                  : "Completa tu compra en nuestra página web"}
              </h1>
              <p class="mt-2 text-base text-gray-500">
                {loggedAdi
                  ? "Los detalles de tu pedido ya fueron enviados a tu ADI y se pondra en contácto a la brevedad."
                  : "Los detalles de tu pedido ya fueron enviados a nuestra página web, completa tu compra lo antes posible o continua explorando nuestro catálogo web y añade mas articulos al carrito."}
              </p>
              <div class="mt-4">
                <button
                  on:click={shareOnWhatsApp}
                  type="button"
                  class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  style="background-color: #25D366;"
                >
                  Compartir pedido por Whatsapp
                  <svg
                    class="-mr-0.5 h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="mt-6 border-t border-gray-200">
              <h2 class="sr-only">Tu pedido</h2>

              <h3 class="sr-only">Articulos</h3>
              {#each cartItems as item (item.product.id)}
                <div class="flex space-x-6 border-b border-gray-200 py-4">
                  <img
                    src="{URLS.tienda}{item.product.Id}.jpg"
                    alt={item.product.Name}
                    class="h-16 w-16 flex-none rounded-lg bg-gray-100 object-cover object-center"
                  />
                  <div class="flex flex-auto flex-col">
                    <div>
                      <h4 class="font-medium text-base text-gray-900">
                        {item.product.Name}
                      </h4>
                      <p class="mt-1 text-sm text-gray-600">
                        {item.product.VariantProduct
                          ? item.product.VariantProduct
                          : ""}
                      </p>
                    </div>
                    <div class="mt-6 flex flex-1 items-end">
                      <dl
                        class="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6"
                      >
                        <div class="flex">
                          <dt class="font-medium text-gray-900">Cantidad</dt>
                          <dd class="ml-2 text-gray-700">{item.quantity}</dd>
                        </div>
                        <div class="flex pl-4 sm:pl-6">
                          <dt class="font-medium text-gray-900">Precio</dt>
                          <dd class="ml-2 text-gray-700">
                            {formatPrice(item.price.basePrice)}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              {/each}

              <h3 class="sr-only">Resumen</h3>

              <dl class="space-y-6 border-t border-gray-200 pt-10 text-sm">
                <div class="flex justify-between">
                  <dt class="font-medium text-gray-900">Subtotal</dt>
                  <dd class="text-gray-700">{formatPrice(subtotal)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

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

  /* .loader {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #830048;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto;
    padding: 0;
    position: inherit;
  } */

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
