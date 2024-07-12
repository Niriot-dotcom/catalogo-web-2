<script lang="ts">
  import { LEGALES_SVGS } from "$lib/constants/strings";

  export let license: string;
  let svgs: string[] = LEGALES_SVGS[license];
</script>

<div class="w-full h-full">
  {#each svgs as svg, i}
    <div class="w-full h-full">
      <img src="/images/legales/{svg}" alt="" class="" />
    </div>
  {/each}
</div>
