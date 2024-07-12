<script lang="ts">
  import { userStore } from "$lib/components/userLogic.js";

  let currentUser: any = null;

  userStore.subscribe((value) => {
    currentUser = value || { authorized: false };
  });
</script>

{#if currentUser?.authorized}
  <slot />
{:else}
  <p class="text-error">
    Debes estar registrado para ver esta página.
    <a class="btn btn-primary" href="/login">Iniciar sesión</a>
  </p>
{/if}
