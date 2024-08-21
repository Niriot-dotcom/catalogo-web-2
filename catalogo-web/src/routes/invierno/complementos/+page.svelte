<script lang="ts">
  import EntradaInvierno from "$lib/templates/invierno/EntradaInvierno.svelte";
  import { EnumEntradaInvierno } from "$lib/constants/strings";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getCurrentCatalog } from "$lib/utils/navigation";
  import { InviernoComplementosSubsections } from "$lib/constants/subSections";

  let currentPageRoute = "complementos";
  let firstLink = InviernoComplementosSubsections[0].link;

  onMount(() =>
    goto("/" + getCurrentCatalog() + "/" + currentPageRoute + "/" + firstLink),
  );
</script>

<!-- ENTRADA -->
<EntradaInvierno
  titleSvg="/images/invierno/copys/ENTRADA-P08-COMPLEMENTOS-TITULO.svg"
  storySvg="/images/invierno/copys/ENTRADA-P08-COMPLEMENTOS-COPY.svg"
  variant={EnumEntradaInvierno.SOLO_FOTO}
  titleSize="h-[30vh]"
  titlePosition="bottom-0 right-0"
  storyPosition="-bottom-10 left-0"
  bgImage="/images/invierno/portadillas/ENTRADA-P08-COMPLEMENTOS.webp"
/>
