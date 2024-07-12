<script lang="ts">
  export let rightSide: boolean = false;
</script>

<div
  style={rightSide ? "flex-direction: column-reverse;" : ""}
  class="w-full h-full flex items-center rounded-3xl bg-white px-8 py-6 overflow-hidden text-black opacity-80 space-x-3"
>
  <slot name="title" />
  <div class="h-full py-10 border border-black"></div>
  <slot name="content" />
</div>
