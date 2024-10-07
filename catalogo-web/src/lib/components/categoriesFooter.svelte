<script lang="ts">
  import { page as sveltePage } from "$app/stores";
  import { Catalogs, type SectionCategory } from "$lib/constants/globalTypes";

  export let categories: SectionCategory[];
  export let HeaderComponent: string | undefined = undefined;
  export let catalog: string;

  categories = categories.filter((category) => category.title !== "");
</script>

<section class="z-10 sticky top-0">
  <div
    id="w-node-f5ab1b35-365f-ca7a-3311-3ceb3b540049-3b540049"
    class="w-layout-layout quick-stack-2 desktop wf-layout-layout"
  >
    {#each categories as category, index}
      <div
        id="w-node-f5ab1b35-365f-ca7a-3311-3ceb3b54004a-3b540049"
        class={$sveltePage.url.pathname.split("/").slice(0, 3).join("/") ===
        "/" + catalog.toLowerCase() + "/" + category.link
          ? "w-layout-cell cell scale-90 border-[8px] border-[#fff]"
          : "w-layout-cell cell"}
      >
        <a
          data-sveltekit-preload-data="tap"
          data-sveltekit-reload
          href={"/" + catalog.toLowerCase() + "/" + category.link}
          aria-current="page"
          class="link-block-11 w-inline-block w--current"
        >
          <div class="category-div">
            <div class="page-details-container categorias-card">
              <div
                class="page-title category-title"
                style={catalog === Catalogs.BIASI
                  ? "font-weight: 500; text-transform: lowercase; color: #d8d5d4; letter-spacing: 0.05em;"
                  : ""}
              >
                {@html category.title}
              </div>
            </div>
            {#if catalog === Catalogs.BIASI && category.title !== category.subtitle}
              <div class="page-details-container categorias-card">
                <div class="mt-16 font-extralight tracking-wider text-base">
                  {category.subtitle}
                </div>
              </div>
            {/if}
            <img
              src={category.image}
              loading="eager"
              width="Auto"
              sizes="100vw"
              alt=""
              class="image-24 {catalog !== Catalogs.BIASI ? 'zoomed-in' : ''}"
            />
          </div>
        </a>
      </div>
    {/each}
  </div>
</section>
