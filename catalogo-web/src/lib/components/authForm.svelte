<script lang="ts">
  import { auth, user, db } from "$lib/firebase";
  import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
  } from "firebase/auth";
  import { get, writable } from "svelte/store";
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { onMount } from "svelte";

  const email = writable("");
  const password = writable("");
  const confirmPassword = writable("");
  let userDoc;
  let adiDoc;

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const user = await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  }

  let passwordError = false;
  let errorMessage = "";

  async function registerWithEmailAndPassword() {
    const emailValue = $email;
    const passwordValue = $password;
    const confirmPasswordValue = $confirmPassword;
    if (passwordValue !== confirmPasswordValue) {
      passwordError = true;
      errorMessage = "Las contraseñas no coinciden, intenta de nuevo";
    } else {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue,
        );
        clearform();
      } catch (error) {
        if (error.message == "Firebase: Error (auth/email-already-in-use).") {
          passwordError = true;
          errorMessage =
            "El correo electrónico ya esta registrado, intenta iniciar sesión";
        }
      }
    }
  }

  async function signInWithEmail() {
    const emailValue = $email;
    const passwordValue = $password;
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue,
      );

      clearform();
    } catch (error) {
      if (error.message == "Firebase: Error (auth/wrong-password).") {
        passwordError = true;
        errorMessage = "La contraseña es incorrecta, intenta de nuevo";
      }
    }
  }

  async function registerWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error al registrar con Google:", error);
    }
  }

  // Función para recuperar contraseña
  let passwordResetSent = false;
  async function resetPassword() {
    const emailValue = $email;
    try {
      await sendPasswordResetEmail(auth, emailValue);

      passwordResetSent = true;
    } catch (error) {
      console.error("Error al enviar correo de recuperación:", error);
    }
  }

  function handlePasswordReset() {
    passwordResetSent = false;
    showLogin();
  }

  function clearform() {
    email.set("");
    password.set("");
    confirmPassword.set("");
    passwordError = false;
    errorMessage = "";
    passwordResetSent = false;
  }

  async function logout() {
    try {
      await user.logout();
      clearform();
      //reset the values of adiDoc and userDoc
      adiDoc = null;
      userDoc = null;
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  }

  var authForm = "register";

  function showRegister() {
    authForm = "register";
    clearform();
  }

  function showLogin() {
    authForm = "login";
    clearform();
  }

  function showReset() {
    authForm = "reset";
    clearform();
  }

  let searchCard: string = "";
  let searchCardError: boolean = false;
  let loadingChallenge: boolean = false;
  let challegeRecived: boolean = false;
  let maskedName: string = "";
  let maskedPhone: string = "";
  let challengeAnswer: string = "";
  let maskInputLabel: string = "";
  let maskPlaceholder: string = "";
  let inputInstructions: string = "";

  async function searchCardChallenge() {
    loadingChallenge = true;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: searchCard,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      let response = await fetch(
        "https://us-central1-mx-vianney-001.cloudfunctions.net/mitienda/vtexAccessChallenge",
        requestOptions,
      );
      let result = await response.json();
      maskedName = result.NOMBRECLIENTE;
      maskedPhone = result.MOBIL;
      maskInputLabel = maskedName;
      maskPlaceholder = "Introduce tu nombre completo";
      inputInstructions = "Escribe tu nombre en mayúsculas sin acentos";
      loadingChallenge = false;
      challegeRecived = true;
      searchCardError = false;
    } catch (error) {
      loadingChallenge = false;
      searchCardError = true;
    }
  }

  function handleLabelChange() {
    if (maskInputLabel == maskedName) {
      maskInputLabel = maskedPhone;
      maskPlaceholder = "Introduce tu celular";
      inputInstructions =
        "Escribe tu celular sin espacios, incluyendo los caracteres faltantes";
    } else {
      maskInputLabel = maskedName;
      maskPlaceholder = "Introduce tu nombre completo";
      inputInstructions = "Escribe tu nombre en mayúsculas sin acentos";
    }
  }
  async function verifyCardChallenge() {
    let verificationRequest = {
      email: $user.email,
      id: searchCard.toString(),
      telefono: maskInputLabel != maskedName ? challengeAnswer : "",
      nombre: maskInputLabel == maskedName ? challengeAnswer : "",
      uid: $user.uid,
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(verificationRequest),
      redirect: "follow",
    };

    try {
      let response = await fetch(
        "https://us-central1-mx-vianney-001.cloudfunctions.net/mitienda/catalogoWebAccessChallengeVerify",
        requestOptions,
      );
      let result = await response.json();

      getUserDoc();
    } catch (error) {}
  }

  //flujo de carga del componente, si el usuario esta logueado trae el usuario de la base de datos
  var loadingAdiDoc: boolean;

  async function getUserDoc() {
    loadingAdiDoc = true;

    if (!$user) {
      loadingAdiDoc = false;
      return;
    }

    const docRef = doc(db, "users", $user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      loadingAdiDoc = false;
      return;
    }

    userDoc = docSnap.data();

    if (!userDoc.adiDoc) {
      loadingAdiDoc = false;
      return;
    }

    const adiDocRef = doc(db, "adis", userDoc.adiDoc.id);
    const adiDocSnap = await getDoc(adiDocRef);

    if (!adiDocSnap.exists()) {
      loadingAdiDoc = false;
      return;
    }

    adiDoc = adiDocSnap.data();

    const catalogOwnerDocRef = doc(db, "catalogOwner", adiDoc.tarjeta_adi);
    const catalogOwnerDocSnap = await getDoc(catalogOwnerDocRef);

    if (!catalogOwnerDocSnap.exists()) {
      const catalogOwnerDoc = {
        id: adiDoc.tarjeta_adi,
        email: userDoc.email,
        telefono: adiDoc.phone_number,
      };
      await setDoc(catalogOwnerDocRef, catalogOwnerDoc);
    }

    loadingAdiDoc = false;
  }

  $: if ($user) getUserDoc();

  onMount(() => {});
</script>

<!-- Header -->
<div class="min-h-full flex-col justify-center align-top lg:px-8">
  {#if $user}
    <div>
      <h2
        class="text-left sm:text-2xl text-xl font-medium leading-9 tracking-tight text-gray-900"
      >
        Información de la cuenta
      </h2>
      <p
        class="block text-base font-normal mt-2 leading-6 text-left text-gray-600"
      >
        Administra tu información personal y de contacto
      </p>
    </div>
    <ul
      role="list"
      class="mt-4 sm:mx-auto sm:w-full sm:max-w-lg mb-4 divide-y divide-gray-200 border-b border-t border-gray-200"
    >
      <li class="flex items-center justify-between py-3">
        <div class="flex items-center">
          <img
            src="../images/icons/adi.svg"
            alt=""
            class={adiDoc ? "h-8 w-8" : "hidden"}
          />
          <p class="ml-4 text-sm font-medium text-gray-900">
            {$user.email}
          </p>
        </div>
        <button
          type="button"
          on:click={logout}
          class="ml-6 rounded-md bg-white text-sm font-medium text-vianney-600 hover:text-vianney-500 focus:outline-none focus:ring-2 focus:ring-vianney-500 focus:ring-offset-2"
          >Cerrar sesión
        </button>
      </li>
    </ul>
    {#if loadingAdiDoc}
      <div class="flex justify-center h-1/2 items-center align-middle">
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-vianney-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0
                    3.042 1.135 5.824 3 7.938l3-2.647z"
          >
          </path>
        </svg>
      </div>
    {:else if !adiDoc}
      <div class="bg-gray-100 sm:rounded-lg sm:mx-auto sm:w-full sm:max-w-lg">
        {#if !challegeRecived}
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">
              ¿Estas afiliado a Vianney?
            </h3>
            <div class="mt-2 max-w-xl text-xs leading-5 text-gray-500">
              <p>
                Ingresa tu número de tarjeta ADI para desbloquear beneficios
                exclusivos, compartir el catálgo con tus clientes y recibir los
                pedidos en tu celular.
              </p>
            </div>
            {#if searchCardError}
              <div class="rounded-md bg-red-50 mt-2 p-4">
                <div class="flex-col flex">
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
                        Error buscando la tarjeta ADI
                      </h3>
                    </div>
                  </div>
                  <div class="mt-2 text-sm text-red-700">
                    <ul role="list" class="list-disc space-y-1 pl-5">
                      <li>
                        Ingresa un número de tarjeta ADI valido y vuelve a
                        intentarlo.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            {/if}
            <form
              on:submit|preventDefault={searchCardChallenge}
              class="mt-3 sm:flex sm:items-start"
            >
              <div class="w-full sm:max-w-xs">
                <input
                  bind:value={searchCard}
                  required
                  type="number"
                  placeholder="Tarjeta ADI"
                  name="tarjeta_adi"
                  id="adi"
                  class="block px-2 w-full rounded-md border-0 py-2 mb-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 sm:text-sm sm:leading-6"
                />
                <a
                  target="_blank"
                  href="https://vianney.mx/pages/buscador-de-tarjeta"
                  class="text-sm text-gray-500"
                  id="email-description"
                  >¿No recuerdas tu tarjeta? <span class="text-vianney-600"
                    >Buscala aquí</span
                  >
                </a>
              </div>
              <button
                disabled={loadingChallenge}
                type="submit"
                class="mt-3 inline-flex w-full items-center justify-center rounded-md bg-vianney-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-vianney-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vianney-600 sm:ml-3 sm:mt-0 sm:w-auto"
              >
                {loadingChallenge ? "Cargando..." : "Buscar"}
              </button>
            </form>
          </div>
        {:else}
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">
              Completa tus datos personales
            </h3>
            <div class="mt-2 max-w-xl text-xs leading-5 text-gray-500">
              <p>
                Para validar tu identidad escribe tus datos personales
                completando los caracteres faltantes.
              </p>
            </div>
            <label
              for="email"
              class="block mt-3 text-sm font-medium leading-6 text-gray-900"
              >{maskInputLabel}</label
            >
            <p class="text-vianney-600 text-xs">{inputInstructions}</p>
            <form
              on:submit|preventDefault={verifyCardChallenge}
              class="mt-2 sm:flex sm:items-start"
            >
              <div class="w-full sm:max-w-xs">
                <input
                  bind:value={challengeAnswer}
                  placeholder={maskPlaceholder}
                  required
                  type="text"
                  name="tarjeta_adi"
                  id="adi"
                  class="block px-2 w-full rounded-md border-0 py-2 mb-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  on:click={handleLabelChange}
                  class="text-sm text-gray-500"
                  id="email-description"
                  >¿No lo recuerdas? <span class="text-vianney-600"
                    >Completa otro dato</span
                  >
                </button>
              </div>
              <button
                disabled={loadingChallenge}
                type="submit"
                class="mt-3 inline-flex w-full items-center justify-center rounded-md bg-vianney-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-vianney-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vianney-600 sm:ml-3 sm:mt-0 sm:w-auto"
              >
                {loadingChallenge ? "Cargando..." : "Validar"}
              </button>
            </form>
          </div>
        {/if}
      </div>
    {:else}
      <div
        class="rounded-md bg-vianney-400 p-4 mb-3 sm:mx-auto sm:w-full sm:max-w-sm"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-vianney-600"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3 flex-1 md:flex md:justify-between">
            <p class="text-sm text-vianney-700">
              Accediste como ADI (Asesora en Decoración Independiente)
            </p>
          </div>
        </div>
        <p
          class="font-medium text-xs p-4 text-vianney-700 hover:text-vianney-600"
        >
          Ya puedes compartir los catálogos con tus clientes y recibir los
          pedidos en tu correo electrónico.
        </p>
      </div>
      <div class="pb-5 pt-5 sm:px-0 sm:pt-0">
        <dl class="space-y-8 px-4 sm:space-y-6 sm:px-2">
          <div>
            <dt
              class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0"
            >
              Número de tarjeta ADI
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
              <p>{adiDoc.tarjeta_adi}</p>
            </dd>
          </div>
          <div>
            <dt
              class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0"
            >
              Nombre
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
              {adiDoc.display_name}
            </dd>
          </div>
          <div>
            <dt
              class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0"
            >
              Teléfono
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
              {adiDoc.phone_number}
            </dd>
          </div>
        </dl>
      </div>
    {/if}
  {:else}
    <!-- forms -->
    <div>
      {#if authForm == "login"}
        <!-- Sign In -->
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2
            class="text-left sm:text-2xl text-xl font-medium leading-9 tracking-tight text-gray-900"
          >
            Iniciar sesión
          </h2>
          <p
            class="block text-base font-normal mt-2 leading-6 text-left text-gray-600"
          >
            Ingresa tu correo electrónico y contraseña para acceder a tu cuenta
          </p>
          {#if passwordError}
            <div class="rounded-md bg-red-50 mt-2 p-4">
              <div class="flex-col flex">
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
                      Error iniciando sesión
                    </h3>
                  </div>
                </div>
                <div class="mt-2 text-sm text-red-700">
                  <ul role="list" class="list-disc space-y-1 pl-5">
                    <li>{errorMessage}</li>
                  </ul>
                </div>
              </div>
            </div>
          {/if}
        </div>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            on:submit|preventDefault={signInWithEmail}
            class="space-y-4 pt-6 pb-2"
            action="#"
            method="POST"
          >
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Correo electrónico
              </label>
              <div class="mt-0.5">
                <input
                  bind:value={$email}
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Contraseña</label
                >
                <div class="text-sm">
                  <button
                    on:click={showReset}
                    class="font-semibold text-vianney-600 hover:text-vianney-500"
                    >¿Olvidaste tu contraseña?</button
                  >
                </div>
              </div>
              <div class="mt-0.5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  bind:value={$password}
                  autocomplete="current-password"
                  required
                  class="px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-vianney-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-vianney-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vianney-600"
                >Iniciar sesión</button
              >
            </div>
            <p class="text-center text-sm text-gray-500">
              ¿Aún no tienes una cuenta? <button
                on:click={showRegister}
                class="font-semibold leading-6 text-vianney-600 hover:text-vianney-500"
                >Regístrate</button
              >
            </p>
          </form>
          <div class="mb-4 mt-2 pt-4">
            <div class="relative">
              <div
                class="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div class="w-full border-t border-gray-200"></div>
              </div>
              <div
                class="relative flex justify-center text-sm font-medium leading-6"
              >
                <span class="bg-white px-6 text-gray-900"
                  >Inicio de sesión social</span
                >
              </div>
            </div>

            <div class="mt-4 mb-6 grid grid-cols gap-2">
              <button
                on:click={signInWithGoogle}
                class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  >
                  </path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  >
                  </path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  >
                  </path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  >
                  </path>
                </svg>
                <span class="text-sm font-semibold leading-6"
                  >Iniciar sesión con Google</span
                >
              </button>
            </div>
          </div>
        </div>
      {:else if authForm == "register"}
        <!-- Register -->
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2
            class="text-left sm:text-2xl text-xl font-medium leading-9 tracking-tight text-gray-900"
          >
            Regístrate
          </h2>
          <p
            class="block text-base font-normal mt-2 leading-6 text-left text-gray-600"
          >
            Regístrate en la plataforma para compartir los catálogos y
            personalizar tu experiencia
          </p>
          {#if passwordError}
            <div class="rounded-md bg-red-50 mt-2 p-4">
              <div class="flex-col flex">
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
                      Error registrando la cuenta
                    </h3>
                  </div>
                </div>
                <div class="mt-2 text-sm text-red-700">
                  <ul role="list" class="list-disc space-y-1 pl-5">
                    <li>{errorMessage}</li>
                  </ul>
                </div>
              </div>
            </div>
          {/if}
        </div>
        <div class="mb-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              on:submit|preventDefault={registerWithEmailAndPassword}
              class="space-y-4 pt-6 pb-2"
              action="#"
              method="POST"
            >
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Correo electrónico
                </label>
                <div class="mt-0.5">
                  <input
                    bind:value={$email}
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Contraseña</label
                  >
                  <div class="text-sm"></div>
                </div>
                <div class="mt-0.5">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    bind:value={$password}
                    autocomplete="current-password"
                    required
                    minlength="8"
                    class="px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Confirmar contraseña</label
                  >
                  <div class="text-sm"></div>
                </div>
                <div class="mt-0.5">
                  <input
                    id="confirm-password"
                    name="password"
                    type="password"
                    bind:value={$confirmPassword}
                    autocomplete="current-password"
                    required
                    minlength="8"
                    class="px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-vianney-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-vianney-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vianney-600"
                  >Regístrarme</button
                >
              </div>
              <p class="mt-4 text-center text-sm text-gray-500">
                ¿Ya tienes una cuenta? <button
                  on:click={showLogin}
                  class="font-semibold leading-6 text-vianney-600 hover:text-vianney-500"
                  >Inicia sesión</button
                >
              </p>
            </form>
            <div class="mt-4">
              <div class="relative">
                <div
                  class="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div class="w-full border-t border-gray-200"></div>
                </div>
                <div
                  class="relative flex justify-center text-sm font-medium leading-6"
                >
                  <span class="bg-white px-6 text-gray-900"
                    >Inicio de sesión social</span
                  >
                </div>
              </div>
              <div class="mt-4 mb-6 grid grid-cols gap-2">
                <button
                  on:click={registerWithGoogle}
                  class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    >
                    </path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    >
                    </path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    >
                    </path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    >
                    </path>
                  </svg>
                  <span class="text-sm font-semibold leading-6"
                    >Registro con Google</span
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      {:else if authForm == "reset"}
        <!-- Reset Password -->
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2
            class="text-left sm:text-2xl text-xl font-medium leading-9 tracking-tight text-gray-900"
          >
            Restablecer contraseña
          </h2>
          <p
            class="block text-base font-normal mt-2 leading-6 text-left text-gray-600"
          >
            Ingresa el correo electrónico asociado a tu cuenta para recibir un
            enlace con las instrucciones para restablecer tu contraseña
          </p>
        </div>
        {#if passwordResetSent}
          <div class="sm:mx-auto sm:w-full sm:max-w-sm pt-6">
            <div class="rounded-md bg-green-50 p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg
                    class="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-green-800">
                    Solicitud de recuperación exitosa
                  </h3>
                  <div class="mt-2 text-sm text-green-700">
                    <p>
                      Si el correo electrónico esta registrado, en un momento
                      recibiras un correo electrónico con las instrucciones para
                      recuperar tu contraseña.
                    </p>
                  </div>
                  <div class="mt-4">
                    <div class="-mx-2 -my-1.5 flex">
                      <button
                        on:click={handlePasswordReset}
                        type="button"
                        class="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                        >Regresar al inicio</button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {:else}
          <div class="mb-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                on:submit|preventDefault={resetPassword}
                class="space-y-4 pt-6 pb-2"
                action="#"
                method="POST"
              >
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Correo electrónico
                  </label>
                  <div class="mt-0.5">
                    <input
                      bind:value={$email}
                      id="email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      required
                      class="px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vianney-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-vianney-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-vianney-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vianney-600"
                    >Recuperar contraseña</button
                  >
                </div>
              </form>
            </div>
            <p class="mt-2 text-center text-sm text-gray-500">
              <button
                on:click={showLogin}
                class="font-semibold leading-6 text-vianney-600 hover:text-vianney-500"
                >Regresar al inicio de sesión</button
              >
            </p>
          </div>
        {/if}
      {/if}
    </div>
  {/if}
</div>
