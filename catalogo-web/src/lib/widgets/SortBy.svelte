<script lang="ts">
  import { connectSortBy } from "instantsearch.js/es/connectors";
  import type { SortByConnectorParams } from "instantsearch.js/es/connectors/sort-by/connectSortBy";

  import connect from "$lib/connect";
  import { cx } from "$lib/utils";

  type SortByClasses = {
    /**
     * Class names to apply to the root element
     */
    root: string;
    /**
     * Class names to apply to the select element
     */
    select: string;
    /**
     * Class names to apply to the option element
     */
    option: string;
  };

  type $$Props = SortByConnectorParams & {
    classes?: Partial<SortByClasses>;
  };

  export let items: $$Props["items"];
  export let transformItems: $$Props["transformItems"] = undefined;
  export let classes: NonNullable<$$Props["classes"]> = {};

  const state = connect(
    connectSortBy,
    {
      items,
      transformItems,
    },
    { $$widgetType: "svelte-ais.sortBy" },
  );

  $: ({ currentRefinement, options, refine } = $state);
</script>

<div class={cx("ais-SortBy", classes.root)}>
  <select
    class={cx("ais-SortBy-select mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6", classes.select)}
    on:change={({ currentTarget: { value } }) => refine(value)}
    value={currentRefinement}
  >
    {#each options as option}
      <option class={cx("ais-SortBy-option", classes.option)} value={option.value}>
        {option.label}
      </option>
    {/each}
  </select>
</div>
