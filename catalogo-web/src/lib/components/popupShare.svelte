<script lang="ts">
  import { fade } from "svelte/transition";
  import { user, db } from "$lib/firebase";
  import { onMount } from "svelte";
  import { doc, getDoc } from "firebase/firestore";
  import { CATALOGS_NAMES, URLS } from "$lib/constants/strings";
  import { capitalizeFirstLetter } from "$lib/utils/strings";
  import { getCurrentCatalog } from "$lib/utils/navigation";

  let selectedOption = "invierno";

  // Función para actualizar la opción seleccionada
  function updateSelection(option: string) {
    selectedOption = option;
    listIsOpen = false;
  }

  // Esta función se llama cuando se monta el componente
  onMount(() => {
    getUserDoc();
    selectedOption = CATALOGS_NAMES.includes(getCurrentCatalog())
      ? getCurrentCatalog()
      : "invierno";
  });

  let storeUrl = "https://catalogos.vianney.mx/";

  let currentStoreOwner = {
    username: "hola",
  };

  let listIsOpen = false;

  function toggleOptions() {
    listIsOpen = !listIsOpen;
  }

  let tarjetaAdi: string;
  let userDoc;
  let adiDoc;

  async function getUserDoc() {
    if (!$user) {
      tarjetaAdi = "";
      return;
    }

    const docRef = doc(db, "users", $user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      tarjetaAdi = "";
      return;
    }

    userDoc = docSnap.data();

    if (!userDoc.adiDoc) {
      tarjetaAdi = "";
      return;
    }

    const adiDocRef = doc(db, "adis", userDoc.adiDoc.id);
    const adiDocSnap = await getDoc(adiDocRef);

    if (!adiDocSnap.exists()) {
      tarjetaAdi = "";
      return;
    }

    adiDoc = adiDocSnap.data();
    tarjetaAdi = adiDoc.tarjeta_adi;
  }

  $: if ($user) getUserDoc();

  // cuando tarjetaAdi cambie, apendea a las opciones del arreglo de options (que son urls) el parámetro adi con el valor de tarjetaAdi
  // $: if (tarjetaAdi) {
  //   options = options.map((option: string) => option + "?adi=" + tarjetaAdi);
  //   selectedOption = CATALOGS_NAMES[0];
  // }

  export let showShare = false;

  function closeShare() {
    showShare = false;
  }

  function constructMessage() {
    let message =
      "¡Hola!%20te%20envió%20este%20mensaje%20para%20compartir%20contigo%20los%20productos%20que%20puedes%20comprar%20para%20decorar%20tu%20hogar.%20%0A%0AEncuentra%20los%20productos%20aquí:%20" +
      selectedOption;
    return message;
  }

  function shareOnWhatsApp() {
    const message = constructMessage();
    const whatsappURL = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappURL, "_blank");
  }

  function shareOnFacebook() {
    const message = constructMessage();
    const facebookURL =
      `https://www.facebook.com/sharer/sharer.php?u=` +
      encodeURI(selectedOption);
    window.open(facebookURL, "_blank");
  }

  function shareEmail() {
    window.open(
      "mailto:?subject=Decora tu hogar con Vianney!&body=" +
        encodeURIComponent(selectedOption),
    );
  }

  function shareNative() {
    if (navigator.share) {
      navigator
        .share({
          title: "Mi Tienda Vianney",
          text: "Decora tu hogar con Vianney:",
          url: selectedOption,
        })
        // .then(() => console.log("Shared successfully!"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      copyToClipboard(selectedOption);
    }
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);

      alert("Enlace copiado al portapapeles");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }
</script>

{#if showShare}
  <div
    class="relative"
    in:fade={{ duration: 300 }}
    out:fade={{ duration: 300 }}
    style="z-index: 900 !important;"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
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
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <!--
          Modal panel, show/hide based on modal state.
  
          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
        <div
          class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-8 pt-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl"
        >
          <div class="w-full h-full">
            <div class="">
              <button
                on:click={closeShare}
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
            <div class="flex h-full w-full align-middle items-center">
              <div class="mx-auto">
                <div>
                  <div class="flex flex-col justify-start pt-2">
                    <h2
                      class="text-2xl text-left font-medium leading-6 text-gray-900"
                    >
                      Compartir Catálogo Web
                    </h2>
                    <p class="mt-2 text-sm text-left text-gray-600 font-normal">
                      Envía a tus amigos y familiares las mejores soluciones
                      para decorar sus hogares.
                    </p>
                  </div>
                  <div class="w-full text-left mt-6">
                    <label
                      for="combobox"
                      class="block text-sm font-medium text-gray-900"
                      >Selecciona el catálogo que deseas compartir:</label
                    >
                  </div>
                  <div class="mt-2 flex flex-col sm:flex-row">
                    <div class="w-full">
                      <div class="relative">
                        <input
                          on:click={toggleOptions}
                          readonly
                          id="combobox"
                          type="text"
                          bind:value={selectedOption}
                          class="w-full cursor-pointer rounded-md border-0 bg-white py-4 pl-3 pr-12 sm:mb-0 mb-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-vianney-600 sm:text-sm sm:leading-6"
                          role="combobox"
                          aria-controls="options"
                          aria-expanded={listIsOpen}
                        />
                        <button
                          type="button"
                          on:click={toggleOptions}
                          class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
                        >
                          <svg
                            class="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.47 4.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 01-1.06-1.06l3.75-3.75zm-3.75 9.75a.75.75 0 011.06 0L12 17.69l3.22-3.22a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 010-1.06z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>

                        <ul
                          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          id="options"
                          role="listbox"
                          style="display: {listIsOpen ? 'block' : 'none'}"
                        >
                          {#each CATALOGS_NAMES as option, index}
                            <!-- svelte-ignore a11y-role-has-required-aria-props -->
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <li
                              class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
                              id={`option-${index}`}
                              role="option"
                              tabindex="-1"
                              on:click={() => updateSelection(option)}
                              data-value={option}
                            >
                              <span class="block truncate"
                                >{capitalizeFirstLetter(option)}</span
                              >
                              {#if selectedOption === option}
                                <span
                                  class="absolute inset-y-0 right-0 flex items-center pr-4 text-vianney-600"
                                >
                                  <!-- Heroicon name: solid/check -->
                                  <svg
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </span>
                              {/if}
                            </li>
                          {/each}
                        </ul>
                      </div>
                    </div>

                    <button
                      on:click={() =>
                        copyToClipboard(
                          `${URLS.landing}${selectedOption}${tarjetaAdi ? "?adi=" + tarjetaAdi : ""}`,
                        )}
                      type="button"
                      class="inline-flex items-center justify-center gap-x-1.5
                                        rounded-md bg-vianney-600 px-3 py-2 text-sm font-semibold text-white shadow-sm
                                        hover:bg-vianney-500 focus-visible:outline focus-visible:outline-2
                                        focus-visible:outline-offset-2 focus-visible:outline-vianney-600 sm:ml-2"
                    >
                      Copiar enlace
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
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                        />
                      </svg>
                    </button>
                  </div>

                  <div class="text-center mt-2">
                    <div class="flex items-center justify-between mt-2"></div>

                    <ul
                      role="list"
                      class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
                    >
                      <li>
                        <button
                          on:click={shareOnWhatsApp}
                          type="button"
                          class="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-vianney-600 focus:ring-offset-2 ring-1 ring-gray-300"
                        >
                          <span
                            class="flex min-w-0 flex-1 items-center space-x-3"
                          >
                            <span class="block flex-shrink-0">
                              <img
                                class="h-10 w-10 rounded-full"
                                src="../images/icons/whats.png"
                                alt=""
                              />
                            </span>
                            <span class="block min-w-0 flex-1">
                              <span
                                class="block truncate text-sm font-medium text-gray-900"
                                >Whatsapp</span
                              >
                              <span
                                class="block truncate text-sm font-medium text-gray-500"
                                >Comparte el catálogo
                              </span>
                            </span>
                          </span>
                          <span
                            class="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5 text-gray-400 group-hover:text-gray-500"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                              />
                            </svg>
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          on:click={shareOnFacebook}
                          type="button"
                          class="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-vianney-600 focus:ring-offset-2 ring-1 ring-gray-300"
                        >
                          <span
                            class="flex min-w-0 flex-1 items-center space-x-3"
                          >
                            <span class="block flex-shrink-0">
                              <img
                                class="h-10 w-10 rounded-full"
                                src="../images/icons/face.png"
                                alt=""
                              />
                            </span>
                            <span class="block min-w-0 flex-1">
                              <span
                                class="block truncate text-sm font-medium text-gray-900"
                                >Facebook</span
                              >
                              <span
                                class="block truncate text-sm font-medium text-gray-500"
                                >Publica el catálogo
                              </span>
                            </span>
                          </span>
                          <span
                            class="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5 text-gray-400 group-hover:text-gray-500"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                              />
                            </svg>
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          on:click={shareEmail}
                          type="button"
                          class="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-vianney-600 focus:ring-offset-2 ring-1 ring-gray-300"
                        >
                          <span
                            class="flex min-w-0 flex-1 items-center space-x-3"
                          >
                            <span class="block flex-shrink-0">
                              <img
                                class="h-10 w-10 rounded-full"
                                src="../images/icons/mail.png"
                                alt=""
                              />
                            </span>
                            <span class="block min-w-0 flex-1">
                              <span
                                class="block truncate text-sm font-medium text-gray-900"
                                >Correo electrónico</span
                              >
                              <span
                                class="block truncate text-sm font-medium text-gray-500"
                                >Comparte el catálogo
                              </span>
                            </span>
                          </span>
                          <span
                            class="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5 text-gray-400 group-hover:text-gray-500"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                              />
                            </svg>
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          on:click={shareNative}
                          type="button"
                          class="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-vianney-600 focus:ring-offset-2 ring-1 ring-gray-300"
                        >
                          <span
                            class="flex min-w-0 flex-1 items-center space-x-3"
                          >
                            <span class="block flex-shrink-0">
                              <img
                                class="h-10 w-10 rounded-full"
                                src="../images/icons/apps.png"
                                alt=""
                              />
                            </span>
                            <span class="block min-w-0 flex-1">
                              <span
                                class="block truncate text-sm font-medium text-gray-900"
                                >Otras aplicaciones</span
                              >
                              <span
                                class="block truncate text-sm font-medium text-gray-500"
                                >Comparte el catálogo
                              </span>
                            </span>
                          </span>
                          <span
                            class="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5 text-gray-400 group-hover:text-gray-500"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                              />
                            </svg>
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
