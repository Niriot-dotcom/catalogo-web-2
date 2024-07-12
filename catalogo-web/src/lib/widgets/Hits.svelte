<script lang="ts">
  import { connectHits } from "instantsearch.js/es/connectors";
  import type { HitsConnectorParams } from "instantsearch.js/es/connectors/hits/connectHits";

  import connect from "$lib/connect";
  import { cx } from "$lib/utils";
  

  type HitsClasses = {
    /**
     * Class names to apply to the root element
     */
    root: string;
    /**
     * Class names to apply to the root element without results
     */
    emptyRoot: string;
    /**
     * Class names to apply to the list element
     */
    list: string;
    /**
     * Class names to apply to each item element
     */
    item: string;
  };

  type $$Props = HitsConnectorParams & {
    classes?: Partial<HitsClasses>;
  };
  export let escapeHTML: $$Props["escapeHTML"] = undefined;
  export let transformItems: $$Props["transformItems"] = undefined;
  export let classes: NonNullable<$$Props["classes"]> = {};

  const state = connect(
    connectHits,
    {
      escapeHTML,
      transformItems,
    },
    { $$widgetType: "svelte-ais.hits" },
  );
  $: ({ hits, sendEvent } = $state);
</script>

<div style="background-color: inherit;"
  class={cx("",
  classes.root,
  hits.length === 0 && cx("ais-Hits--empty", classes.emptyRoot),
  )}
>
{#if hits.length > 0}
  <ol class={cx("", classes.list)}>
    {#each hits as hit}
      <li class={cx("", classes.item)} >
        <slot {hit} {sendEvent}>
          <div style="word-break: break-all;">{JSON.stringify(hit).slice(0, 100)}</div></slot
        >
      </li>
    {/each}
  </ol>
{:else}
  <div class="ais-Hits--empty">
    <div class="px-6 py-14 text-center text-sm sm:px-14">
      <svg class="mx-auto h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <p class="mt-4 font-semibold text-gray-900">No se encontraron resultados</p>
      <p class="mt-2 text-gray-500">No pudimos encontrar nada con ese termino de busqueda, porfavor intenta de nuevo.</p>
    </div>
  </div>
{/if}
</div>
