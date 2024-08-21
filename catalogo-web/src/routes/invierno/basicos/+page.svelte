<script lang="ts">
  import EntradaInvierno from "$lib/templates/invierno/EntradaInvierno.svelte";
  import { EnumEntradaInvierno } from "$lib/constants/strings";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getCurrentCatalog } from "$lib/utils/navigation";
  import { InviernoBasicosSubsections } from "$lib/constants/subSections";

  let currentPageRoute = "basicos";
  let firstLink = InviernoBasicosSubsections[0].link;

  onMount(() =>
    goto("/" + getCurrentCatalog() + "/" + currentPageRoute + "/" + firstLink),
  );
</script>

<!-- ENTRADA -->
<EntradaInvierno
  titleSvg="/images/invierno/copys/ENTRADA-P09-BASICOS-TITULO.svg"
  storySvg="/images/invierno/copys/ENTRADA-P09-BASICOS-COPY.svg"
  variant={EnumEntradaInvierno.SOLO_VIDEO}
  titlePosition="bottom-0 right-0"
  storyPosition="top-16 left-5"
  bgVideo="/images/invierno/portadillas/ENTRADA-P09-BASICOS-VERTICAL.mp4"
/>
