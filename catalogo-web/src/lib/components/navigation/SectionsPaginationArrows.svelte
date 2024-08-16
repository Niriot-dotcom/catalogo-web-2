<script lang="ts">
  import tippy from "tippy.js";
  import {
    navigateToNextPage,
    navigateToPreviousPage,
  } from "$lib/utils/navigation";
</script>

<!-- Left navigation button -->
<div
  class="absolute left-0 top-1/2 transform -translate-y-1/2"
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
  class="absolute right-0 top-1/2 transform -translate-y-1/2"
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
