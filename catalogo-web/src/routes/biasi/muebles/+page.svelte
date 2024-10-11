<script lang="ts">
  import { BiasiMueblesSubsections } from "$lib/constants/subSections";
  import { getCurrentCatalog } from "$lib/utils/navigation";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let currentPageRoute = "muebles";
  let firstLink = BiasiMueblesSubsections[0].link;

  onMount(() =>
    goto("/" + getCurrentCatalog() + "/" + currentPageRoute + "/" + firstLink),
  );
</script>
