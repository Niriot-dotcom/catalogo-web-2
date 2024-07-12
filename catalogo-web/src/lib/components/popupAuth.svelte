<script>
  import AuthForm from "./authForm.svelte";
  export let showLogin = false;

  function closePopup() {
    showLogin = false;
  }
</script>

{#if showLogin}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click={closePopup} class="popup-overlay show"></div>
  <div
    class="popup show sm:w-auto w-4/5 min-w-1/3 md:max-w-full mx-auto flex flex-col justify-between sm:p-6 p-4 sm:h-full"
  >
    <div class="w-full h-full flex align-top">
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
      <AuthForm />
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

  /* .spinner {
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top: 4px solid white;
      width: 24px;
      height: 24px;
      animation: spin 1s linear infinite;
    } */

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* .no-arrows::-webkit-inner-spin-button,
  .no-arrows::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  } */

  /* Para Firefox */
  /* .no-arrows {
    -moz-appearance: textfield;
  } */
</style>
