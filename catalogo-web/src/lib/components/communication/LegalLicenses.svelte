<script lang="ts">
  import { LEGALES_SVGS } from "$lib/constants/strings";

  export let license: string;
  let svgs: string[] = LEGALES_SVGS[license];
</script>

<div class="w-1/2 h-full mx-auto">
  {#each svgs as svg, i}
    <div class="w-full h-full">
      <img
        src="/images/legales/{svg}"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>
  {/each}
</div>
