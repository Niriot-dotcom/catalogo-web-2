<script lang="ts">
  import { CATALOGS_DESCRIPTIONS } from "$lib/constants/strings";
  let catalog = "chavos";
  let title = CATALOGS_DESCRIPTIONS[catalog].title;
  let year = CATALOGS_DESCRIPTIONS[catalog].year;
  let image = CATALOGS_DESCRIPTIONS[catalog].image;
</script>

<svelte:head>
  <title>Vianney {title} {year}</title>
  <meta property="og:image" content={image} />
</svelte:head>

<div class="">
  <slot />
  <style>
    @media (max-width: 600px) {
      body {
        margin-top: 60px;
        max-width: 100vw !important;
        overflow-x: hidden !important;
      }
    }
  </style>
</div>
