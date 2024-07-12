<script lang="ts">
  export let text: string;
  export let className = "";
  export let customColor = "";
  let colorText = customColor
    ? customColor
    : text?.includes("#")
    ? "#000"
    : "#fff";
  let isOrange = text?.toLowerCase()?.includes("set de ");

  $: {
    colorText = customColor
      ? customColor
      : text?.includes("#")
      ? "#000"
      : "#fff";
    isOrange = text?.toLowerCase()?.includes("set de ");
  }
</script>

{#if isOrange}
  <span
    class={className + " px-[0.75rem] py-[0.1rem] w-fit"}
    style={`color: #fff; background-color: #ffa500;`}
  >
    set de&nbsp;<span style={`font-weight: 600;`}>
      {@html text?.toLowerCase()?.replace("set de ", "").replace("#", "") || ""}
    </span>
  </span>
{:else}
  <p class={className} style={`color: ${colorText}`}>
    {@html text?.replace("#", "").replaceAll("\\", "") || ""}
  </p>
{/if}
