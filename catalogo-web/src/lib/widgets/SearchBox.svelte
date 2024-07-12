<script lang="ts">
  import { connectSearchBox } from "instantsearch.js/es/connectors";
  import type { SearchBoxConnectorParams } from "instantsearch.js/es/connectors/search-box/connectSearchBox";

  import connect from "$lib/connect";
  import { cx } from "$lib/utils";
  export let initialQuery: string | null = null;
 
  type SearchBoxClasses = {
    /**
     * Class names to apply to the root element
     */
    root: string;
    /**
     * Class names to apply to the form element
     */
    form: string;
    /**
     * Class names to apply to the input element
     */
    input: string;
    /**
     * Class names to apply to the submit button
     */
    submit: string;
    /**
     * Class names to apply to the submit button icon
     */
    submitIcon: string;
    /**
     * Class names to apply to the reset button
     */
    reset: string;
    /**
     * Class names to apply to the reset button icon
     */
    resetIcon: string;
    /**
     * Class names to apply to the loading indicator
     */
    loadingIndicator: string;
    /**
     * Class names to apply to the loading indicator icon
     */
    loadingIcon: string;
  };

  type SearchBoxTranslations = {
    /**
     * The alternative text of the submit button.
     */
    submitButtonTitle: string;
    /**
     * The alternative text of the reset button.
     */
    resetButtonTitle: string;
  };

  type $$Props = SearchBoxConnectorParams & {
    placeholder?: string;
    searchAsYouType?: boolean;
    classes?: Partial<SearchBoxClasses>;
    translations?: Partial<SearchBoxTranslations>;
  };
  export let queryHook: $$Props["queryHook"] = undefined;

  export let placeholder = "";
  export let searchAsYouType = true;
  // TODO: add support for handlers

  export let classes: NonNullable<$$Props["classes"]> = {};
  export let translations: $$Props["translations"] = {};

  $: if (initialQuery !== null) {
      refine(initialQuery);
      initialQuery = null; // reset after refining
  }

  const labels: SearchBoxTranslations = {
    submitButtonTitle: "Buscar",
    resetButtonTitle: "Reiniciar",
    ...translations,
  };

  const state = connect(
    connectSearchBox,
    { queryHook },
    {
      $$widgetType: "svelte-ais.SearchBox",
    },
  );
  $: ({ query, refine, clear, isSearchStalled } = $state);

  let input: HTMLInputElement;

  function onReset() {
    clear();
    input.focus();
  }

  function onSubmit() {
    if (!searchAsYouType) {
      refine(input.value);
    }

    input.blur();
  }
  export let currentSearch: any 
  
  // bind reactive variable to the search query
  $: currentSearch = query;
</script>

<div class={cx("ais-SearchBox flex items-center w-full", classes.root)} style="background-color: transparent;">
  <form
    class={cx("ais-SearchBox-form flex items-center w-full pr-4", classes.form)}
    novalidate
    action=""
    style="background-color: transparent !important;"
    on:reset|preventDefault|stopPropagation={onReset}
    on:submit|preventDefault|stopPropagation={onSubmit}
  >
    <input
      bind:this={input}
      class={cx("h-12 flex-grow border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-base sm:text-sm", classes.input)}
      type="search"
      style="outline: none;"
      value={query}
      autofocus
      on:input={(event) => searchAsYouType && refine(event.currentTarget.value)}
      {placeholder}
    />

    <button
      class={cx("ais-SearchBox-submit", classes.submit)}
      type="submit"
      title={labels.submitButtonTitle}
    >
      {#if $$slots.submitIcon}
        <slot name="submitIcon" />
      {:else}
        <svg
          class={cx("ais-SearchBox-submitIcon text-gray-900", classes.submitIcon)}
          width="10"
          height="10"
          viewBox="0 0 40 40"
          style="display: none;"
        >
          <path
            d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"
          />
        </svg>
      {/if}
    </button>

    <button
      class={cx("ais-SearchBox-reset", classes.reset)}
      type="reset"
      title={labels.resetButtonTitle}
      hidden={query.length === 0 || isSearchStalled}
    >
      {#if $$slots.resetIcon}
        <slot name="resetIcon" />
      {:else}
      
  
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"  class={cx("ais-SearchBox-resetIcon h-6 w-6 text-gray-400", classes.resetIcon)}>
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
      {/if}
    </button>

    <span style="display: none;"
      class={cx("ais-SearchBox-loadingIndicator", classes.loadingIndicator)}
      hidden={!isSearchStalled}
    >
      {#if $$slots.loadingIcon}
        <slot name="loadingIcon" />
      {:else}
        <svg
          width="16"
          height="16"
          viewBox="0 0 38 38"
          stroke="#444"
          class={cx("ais-SearchBox-loadingIcon", classes.loadingIcon)}
        >
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
              <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
      {/if}
    </span>
  </form>
</div>

<style>
  .searchBox:focus {
    box-shadow: inset 0 0 0 2px var(--customButton-color) !important; 
}
</style>
