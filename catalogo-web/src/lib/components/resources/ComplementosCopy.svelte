<script lang="ts">
  import { CATALOGS_ROUTES } from "$lib/constants/strings";

  export let catalog: string;
</script>

{#if catalog === CATALOGS_ROUTES.INVIERNO}
  <img
    src="/images/invierno/recursos/ComplementaElLook.svg"
    loading="eager"
    alt=""
    class="h-full scale-[0.8]"
  />
  <!-- {:else if catalog === CATALOGS_ROUTES.BIASI} -->
{:else if catalog === CATALOGS_ROUTES.CHAVOS}
  <img
    src="/images/copys/AgregaComplementosBlack.svg"
    loading="eager"
    alt=""
    class="h-full scale-150"
  />
{:else if catalog === CATALOGS_ROUTES.VIANNEY}
  <img
    src="/images/copys/CambiaElLookConEstosComplementos.svg"
    loading="eager"
    alt=""
    class="h-full scale-[0.8]"
  />
  <!-- {:else if catalog === CATALOGS_ROUTES.BEBE}
  <img
    src="/images/copys/AgregaComplementosBlack.svg"
    loading="eager"
    alt=""
    class="h-full scale-[0.8]"
  /> -->
{:else}
  <div class="w-full h-full flex text-center justify-center m-auto">
    <p class="text-black chavos-3xl text-center m-auto">complementa con:</p>
  </div>
{/if}
