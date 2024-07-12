<script lang="ts">
  import { cx } from "../utils";

  export let isDisabled: boolean;
  export let itemClass: string;
  export let anchorClass: string = "";
  export let ariaLabel: string;
  export let href: string;
  export let onClick: () => void;
</script>

<style>
  .ais-Pagination-item--selected a{
    border-color: var(--customButton-color);
    box-shadow: 0 0 0 1px var(--customButton-color);
    border-radius: 8px;
  }
</style>

<li class={cx("", isDisabled && "disabled", itemClass)}>
  {#if isDisabled}
    <span style="background-color: var(--customCard-color); color:var(--customText-color);"class={cx("mx-0.5 inline-flex h-10 items-center rounded-md border border-gray-300 px-4  focus:outline-none focus:ring-2 focus:ring-opacity-25 focus:ring-offset-1", anchorClass)}><slot /></span>
  {:else}
    <a style="background-color: var(--customCard-color); color:var(--customText-color);"
      class={cx("inline-flex h-10 items-center rounded-md border border-gray-300  px-4  focus:outline-none  focus:ring-offset-1", anchorClass)}
      aria-label={ariaLabel}
      on:click|preventDefault={onClick}
      {href}><slot /></a
    >
  {/if}
</li>
