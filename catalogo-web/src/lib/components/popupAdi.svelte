<script>
  import { doc, setDoc, getDoc } from "firebase/firestore";
  import { db } from "$lib/firebase";
  import {
    userStore,
    saveUserToLocalStorage,
    logout,
  } from "$lib/components/userLogic.js";
  export let showLogin = false;
  let step = 1;
  let email = "";
  let cardNumber = "";
  let maskedMobile = "";
  let maskedEmail = "";
  let completeMobile = "";
  let completeEmail = "";
  let errorInChallenge = false;
  let loading = false;
  let error = null;

  async function saveOrUpdateCatalogCart(adi) {
    const dataToSave = {
      telefono: adi.phone,
      id: adi.cardNumber,
      email: adi.email,
    };

    // make adi.cardNumber a string
    let adiString = adi.cardNumber.toString();

    await setDoc(doc(db, "catalogOwner", adiString), dataToSave);
  }

  async function verifyEmail(event) {
    event.preventDefault();

    loading = true; // Comienza la carga
    error = null; // Reseteamos cualquier error anterior

    try {
      const response = await fetch(
        "https://us-central1-mx-vianney-001.cloudfunctions.net/mitienda/getTarjetaByEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      if (!response.ok) {
        throw new Error("Error inesperado, porfavor vuelve a intentarlo");
      }

      const data = await response.json();
      saveUserToLocalStorage({ email, cardNumber: data.numeroTarjeta });
      if (data.numeroTarjeta) {
        cardNumber = data.numeroTarjeta;
        getLoginChallenge();
      } else {
        step = 2;
      }
    } catch (err) {
      error = err.message; // Guardamos el mensaje de error
    } finally {
      loading = false; // Termina la carga
    }
  }

  async function getLoginChallenge(event) {
    if (event) {
      event.preventDefault();
    }

    loading = true; // Inicia el estado de carga
    error = null; // Resetea cualquier error previo

    try {
      const response = await fetch(
        "https://us-central1-mx-vianney-001.cloudfunctions.net/mitienda/loginChallenge",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: cardNumber }),
        },
      );

      if (!response.ok) {
        throw new Error(
          "La tarjeta ingresada es invalida, porfavor ingresa una tarjeta valida",
        );
      }

      const data = await response.json();
      maskedMobile = data.MOBIL;
      maskedEmail = data.E_MAIL;
      step = 3;
    } catch (err) {
      error = err.message; // Guarda el mensaje de error
    } finally {
      loading = false; // Termina el estado de carga
    }
  }

  async function verifyChallenge() {
    const requestBody = {
      E_MAIL: completeEmail || "",
      MOBIL: completeMobile || "",
      id: cardNumber || "",
    };

    const response = await fetch(
      "https://us-central1-mx-vianney-001.cloudfunctions.net/mitienda/verifyChallenge",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    );

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Error al verificar el desafío:", errorData);
      return;
    }

    const data = await response.json();
    if (data.verified) {
      const updatedUser = {
        ...userCatalog,
        authorized: true,
        phone: completeMobile, // Agregando el completeMobile al objeto del usuario
      };
      saveUserToLocalStorage(updatedUser);
      // Usuario autorizado:", updatedUser);
      await saveOrUpdateCatalogCart(updatedUser);
      step = 4;
    } else {
      errorInChallenge = true;
    }
  }

  function getCurrentDirectory() {
    const path = window.location.pathname; // Obtiene algo como "/invierno" o "/hogar"
    const segments = path.split("/"); // Divide en segmentos: ["", "invierno"] o ["", "hogar"]
    return segments[1]; // Devuelve el segundo segmento, que es el primer directorio
  }

  let userCatalog = null;
  let catalogLink = null;

  let userPhone = null;

  // Observa cambios en userPhone
  $: if (userPhone && userCatalog) {
    // Actualizar el valor de completeMobile en userCatalog
    userCatalog.phone = userPhone;

    // Actualizar el localStorage y userStore con el nuevo valor
    saveUserToLocalStorage(userCatalog);
  }

  async function handleCopyTextClipboard() {
    await navigator.clipboard.writeText(catalogLink);
    alert("Enlace copiado al portapapeles");
  }

  userStore.subscribe((value) => {
    userCatalog = value;
    if (userCatalog && userCatalog.authorized) {
      step = 4;
      if (!userPhone) userPhone = userCatalog.phone; // Sólo inicializa userPhone si aún no tiene un valor
      const currentDirectory = getCurrentDirectory();
      catalogLink = `https://catalogos.vianney.mx/${currentDirectory}?adi=${userCatalog.cardNumber}`;
    }
  });

  function closePopup() {
    showLogin = false;
  }

  function handleLogout() {
    showLogin = false;
    logout();
    // Aquí también puedes agregar cualquier lógica adicional que desees tras cerrar sesión.
    // Por ejemplo: redirigir al usuario a la página de inicio.

    // Recargar la página:
    window.location.reload();
  }

  function constructMessage() {
    let message =
      "¡Hola!%20Estoy%20empezando%20a%20vender%20a%20Vianney,%20te%20envió%20este%20mensaje%20para%20compartir%20contigo%20los%20productos%20que%20puedes%20comprar%20para%20decorar%20tu%20hogar.%20%0A%0AEncuentra%20los%20productos%20aquí:%20" +
      catalogLink;
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
      `https://www.facebook.com/sharer/sharer.php?u=` + encodeURI(catalogLink);
    window.open(facebookURL, "_blank");
  }

  function shareEmail() {
    window.open(
      "mailto:?subject=Decora tu hogar con Vianney!&body=" +
        encodeURIComponent(catalogLink),
    );
  }

  function shareNative() {
    if (navigator.share) {
      navigator
        .share({
          title: "Compartir",
          text: "Mira este enlace:",
          url: catalogLink,
        })
        // .then(() => console.log("Shared successfully!"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Tu navegador no soporta la API nativa de compartir.");
    }
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if showLogin}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={closePopup} class="popup-overlay show"></div>

  <div
    class="popup show sm:w-auto w-4/5 min-w-1/3 md:max-w-full mx-auto flex flex-col justify-between sm:p-6 p-4 sm:h-full"
  >
    <div class="w-full h-full flex align-middle">
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

      {#if step === 1}
        <div class="w-full h-full">
          <div
            class="flex min-h-full flex-col justify-center px-2 py-6 sm:px-6"
          >
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                style="width: 95px; height: auto; box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset; border-radius:24px"
                class="mb-8 mx-auto"
                src="/images/favicon.png"
                alt="app_icon"
              />
              <h2
                class="text-center sm:text-2xl text-xl font-medium leading-9 tracking-tight text-gray-900"
              >
                Catálogos Web Vianney
              </h2>
              <p
                class="block text-base font-normal mt-2 leading-6 text-center text-gray-600"
              >
                Incia sesión para compartir los catálogos y personalizar tu
                experiencia
              </p>
            </div>
            <form on:submit={verifyEmail}>
              <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Correo electrónico</label
                  >
                  <div class="mt-2">
                    <input
                      bind:value={email}
                      id="email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      required
                      class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    class="mt-4 flex w-full justify-center rounded-md bg-vianney-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-vianney-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vianney-600"
                    disabled={loading}
                  >
                    {#if loading}
                      <span class="spinner mr-2"></span>
                    {/if}
                    <span class={!loading ? "inline-block" : "hidden"}
                      >Siguiente</span
                    ></button
                  >
                </div>

                {#if error}<p class="text-red-500 mt-2">{error}</p>{/if}
              </div>
            </form>
          </div>
        </div>
      {:else if step === 2}
        <div class="w-full h-full">
          <div
            class="flex min-h-full flex-col justify-center px-2 py-6 sm:px-6"
          >
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                style="width: 95px; height: auto; box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset; border-radius:24px"
                class="mb-4 mx-auto"
                src="/images/favicon.png"
                alt="app_icon"
              />
              <h2
                class="text-center sm:text-2xl text-xl font-medium leading-9 tracking-tight text-gray-900"
              >
                Catálogos Web Vianney
              </h2>
              <p
                class="block text-base font-normal mt-2 leading-6 text-center text-gray-600"
              >
                Incia sesión para compartir los catálogos y personalizar tu
                experiencia
              </p>
            </div>

            <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
              <form on:submit={getLoginChallenge}>
                <div class="rounded-md bg-yellow-50 p-4 mb-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg
                        class="h-5 w-5 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-yellow-800">
                        No se encontro una tarjeta ADI asociada a este correo
                        electrónico
                      </h3>
                      <div class="mt-2 text-xs text-yellow-700">
                        Porfavor ingresa tu tarjeta ADI para sincronizar tus
                        beneficios.
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between">
                    <label
                      for="Tarjeta"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Tarjeta ADI</label
                    >
                  </div>
                  <div class="mt-2">
                    <input
                      bind:value={cardNumber}
                      id="tarjeta"
                      name="tarjeta"
                      type="number"
                      required
                      pattern="“\d{(1, 10)}”"
                      title="Por favor, ingrese un número de hasta 10 dígitos"
                      autocomplete="off"
                      class="no-arrows block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p class="mt-2 text-center text-sm text-gray-500">
                    ¿No recuerdas tu tarjeta ADI?
                    <a
                      target="_blank"
                      href="https://vianney.mx/pages/buscador-de-tarjeta"
                      class="font-semibold leading-6 text-vianney-600 hover:text-vianney-500"
                      >Busca aquí tu tarjeta</a
                    >
                  </p>
                </div>

                <div>
                  <button
                    type="submit"
                    class="mt-4 flex w-full justify-center rounded-md bg-vianney-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-vianney-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vianney-600"
                    disabled={loading}
                  >
                    {#if loading}
                      <span class="spinner mr-2"></span>
                    {/if}
                    <span class={!loading ? "inline-block" : "hidden"}
                      >Verificar tarjeta</span
                    ></button
                  >
                </div>

                {#if error}<p class="text-red-500 mt-2">{error}</p>{/if}
              </form>
            </div>
          </div>
        </div>
      {:else if step === 3}
        <div class="w-full h-full">
          <div
            class="flex min-h-full flex-col justify-center px-2 py-6 sm:px-6"
          >
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                style="width: 95px; height: auto; box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset; border-radius:24px"
                class="mb-4 mx-auto"
                src="/images/favicon.png"
                alt="app_icon"
              />
              <h2
                class="text-center sm:text-2xl text-xl font-medium leading-9 tracking-tight text-gray-900"
              >
                Catálogos Web Vianney
              </h2>
              <p
                class="block text-base font-normal mt-2 leading-6 text-center text-gray-600"
              >
                Incia sesión para compartir los catálogos y personalizar tu
                experiencia
              </p>
            </div>

            <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
              <div class="rounded-md bg-yellow-50 p-4 mb-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg
                      class="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-yellow-800">
                      Verificación de datos personales requerida
                    </h3>
                    <div class="mt-2 text-xs text-yellow-700">
                      Para validar tu identidad porfavor escribe tus datos
                      personales completando los caracteres faltantes.
                    </div>
                  </div>
                </div>
              </div>
              {#if errorInChallenge}
                <div class="rounded-md bg-red-50 p-2">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg
                        class="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-red-800">
                        Los datos ingresados no coinciden con los de la tarjeta
                        ADI
                      </h3>
                      <div class="mt-2 text-sm text-red-700"></div>
                    </div>
                  </div>
                </div>
              {/if}

              <form class="space-y-6" action="#" method="POST">
                {#if maskedEmail && maskedEmail !== "invalido"}
                  <div>
                    <label
                      for="email"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >{maskedEmail}</label
                    >
                    <div class="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                        class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 text-sm sm:leading-6"
                        bind:value={completeEmail}
                        placeholder={maskedEmail === "invalido"
                          ? "Invalid"
                          : maskedEmail}
                      />
                    </div>
                  </div>
                {/if}
                {#if maskedMobile && maskedMobile !== "invalido"}
                  <div>
                    <div class="flex items-center justify-between">
                      <label
                        for="password"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >{maskedMobile}</label
                      >
                    </div>
                    <div class="mt-2">
                      <input
                        id="phone"
                        name="phone"
                        type="phone"
                        autocomplete=""
                        bind:value={completeMobile}
                        placeholder={maskedMobile === "invalido"
                          ? "Invalid"
                          : maskedMobile}
                        required
                        class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                {/if}
                <p class="mt-2 text-center text-sm text-gray-500">
                  ¿No recuerdas tus datos?
                  <a
                    target="_blank"
                    href="https://vianney.mx/pages/nuestras-tiendas"
                    class="font-semibold leading-6 text-vianney-600 hover:text-vianney-500"
                    >Contácta a tu CN para solicitar una actualización de datos
                    personales</a
                  >
                </p>
                <div>
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <div
                    on:click={verifyChallenge}
                    class="flex w-full justify-center rounded-md bg-vianney-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-vianney-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vianney-600 cursor-pointer"
                  >
                    Confirmar mis datos
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      {:else if step === 4}
        <div class="w-full h-full">
          <div class="flex h-full w-full align-middle items-center">
            <div class="mx-auto max-w-lg">
              <div>
                <div class="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="mx-auto h-12 w-12 text-gray-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                  <h2
                    class="mt-2 text-center text-xl font-medium leading-9 tracking-tight text-gray-800"
                  >
                    Comparte el catálogo
                  </h2>
                  <p class="mt-1 text-sm text-gray-600 font-medium">
                    Envía a tus clientes el siguiente enlace para empezar a
                    recibir pedidos.
                  </p>
                </div>
                <ul
                  role="list"
                  class="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200"
                >
                  <li class="flex items-center justify-between py-3">
                    <div class="flex items-center">
                      <img src="/images/icons/adi.svg" alt="" class="h-8 w-8" />
                      <p class="ml-4 text-sm font-medium text-gray-900">
                        {userCatalog.email}
                      </p>
                    </div>
                    <button
                      type="button"
                      on:click={handleLogout}
                      class="ml-6 rounded-md bg-white text-sm font-medium text-vianney-600 hover:text-vianney-500 focus:outline-none focus:ring-2 focus:ring-vianney-500 focus:ring-offset-2"
                      >Cerrar sesión<span class="sr-only">
                        {userCatalog.email}</span
                      ></button
                    >
                  </li>
                </ul>
                <div class="mt-6 flex flex-col sm:flex-row">
                  <input
                    style="user-select: none; cursor: pointer;"
                    type="text"
                    name="email"
                    id="text"
                    readonly="readonly"
                    unselectable="on"
                    class="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 text-sm leading-6 mb-2 sm:mb-0"
                    placeholder={catalogLink}
                    value={catalogLink}
                  />

                  <button
                    on:click={handleCopyTextClipboard}
                    type="button"
                    class="inline-flex items-center gap-x-1.5 rounded-md bg-vianney-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-vianney-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vianney-600 sm:ml-2"
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
                  <div class="mt-2">
                    <div class="mt-2 flex rounded-md shadow-sm">
                      <span
                        class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 text-sm leading-6"
                        >+52</span
                      >
                      <input
                        placeholder="teléfono"
                        bind:value={userPhone}
                        type="text"
                        name="phone"
                        id="phone"
                        class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-2 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 text-sm leading-6"
                      />
                    </div>
                  </div>
                  <div class="flex items-center justify-between mt-2">
                    <label
                      for="phone"
                      class="block text-sm font-normal leading-6 text-gray-600"
                      >Teléfono (Aquí recibiras los pedidos)</label
                    >
                  </div>

                  <ul
                    role="list"
                    class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
                  >
                    <li>
                      <button
                        type="button"
                        on:click={shareOnWhatsApp}
                        class="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-vianney-500 focus:ring-offset-2 ring-1 ring-inset ring-gray-300"
                      >
                        <span
                          class="flex min-w-0 flex-1 items-center space-x-3"
                        >
                          <span class="block flex-shrink-0">
                            <img
                              class="h-10 w-10 rounded-full"
                              src="/images/icons/whats.png"
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
                              >Envia el catálogo</span
                            >
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
                        class="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-vianney-500 focus:ring-offset-2 ring-1 ring-inset ring-gray-300"
                      >
                        <span
                          class="flex min-w-0 flex-1 items-center space-x-3"
                        >
                          <span class="block flex-shrink-0">
                            <img
                              class="h-10 w-10 rounded-full"
                              src="/images/icons/face.png"
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
                              >Publica el catálogo</span
                            >
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
                        class="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-vianney-500 focus:ring-offset-2 ring-1 ring-inset ring-gray-300"
                      >
                        <span
                          class="flex min-w-0 flex-1 items-center space-x-3"
                        >
                          <span class="block flex-shrink-0">
                            <img
                              class="h-10 w-10 rounded-full"
                              src="/images/icons/mail.png"
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
                              >Envía el catálogo</span
                            >
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
                        class="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-vianney-500 focus:ring-offset-2 ring-1 ring-inset ring-gray-300"
                      >
                        <span
                          class="flex min-w-0 flex-1 items-center space-x-3"
                        >
                          <span class="block flex-shrink-0">
                            <img
                              class="h-10 w-10 rounded-full"
                              src="/images/icons/apps.png"
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
                              >Envia el catálogo</span
                            >
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
      {/if}
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

  .spinner {
    border: 4px solid rgba(255, 255, 255, 0.3); /* Borde gris claro */
    border-radius: 50%; /* Forma circular */
    border-top: 4px solid white; /* Borde superior blanco */
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .no-arrows::-webkit-inner-spin-button,
  .no-arrows::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Para Firefox */
  .no-arrows {
    -moz-appearance: textfield;
  }
</style>
