<script lang="ts">
  import { getChavosProducts } from "$lib/constants/ChavosCategories";
  import type { FooterCategory } from "$lib/constants/globalTypes";

  export let categories: FooterCategory[];
  export let showOnlyGrid = false;
  export let HeaderComponent: string | undefined = undefined;
  export let catalog: string;

  let productList = getChavosProducts();
</script>

<section
  class={showOnlyGrid ? "z-10 absolute bottom-3 w-full" : "z-10 bg-white"}
>
  {#if !showOnlyGrid && HeaderComponent}
    {@html HeaderComponent}
  {/if}

  <div
    class="w-full h-[85vh] grid grid-cols-5 md:grid-cols-8 overflow-y-scroll place-items-center gap-3 px-3"
  >
    {#each productList as product, index}
      <div
        class="w-full h-full flex flex-col items-center justify-center whitespace-nowrap overflow-x-clip"
      >
        <a class="w-full h-full" href={product.ref}>
          <img
            src={product.image ||
              "https://storage.googleapis.com/catalogo-web/biasi/fotos/portadilla-amueblando-500.webp"}
            loading="eager"
            alt=""
            class="w-full h-2/3 rounded-full"
          />
          <div class="w-full self-center flex items-center justify-center">
            <span class="w-full truncate text-center">
              {product.name}
            </span>
          </div>
        </a>
      </div>
    {/each}
  </div>

  <!-- <div
    id="w-node-f5ab1b35-365f-ca7a-3311-3ceb3b540049-3b540049"
    class="quick-stack-2 desktop grid grid-cols-5"
  >
    {#each productList as product, index}
      <div
        id="w-node-f5ab1b35-365f-ca7a-3311-3ceb3b54004a-3b540049"
        class={$sveltePage.url.pathname + $sveltePage.url.hash ===
        "/" + catalog.toLowerCase() + "/" + product.ref
          ? showOnlyGrid
            ? "scale-90 border-[8px] border-[#fff]"
            : "scale-90 border-[8px] border-vianney-600 rounded-[14px]"
          : ""}
      >
        <a
          data-sveltekit-preload-data="tap"
          data-sveltekit-reload
          href={product.ref}
          aria-current="page"
          class="link-block-11 w-inline-block w--current"
        >
          <div class="category-div">
            <div class="page-details-container categorias-card">
              <div class="page-title category-title">
                {@html product.name}
              </div>
            </div>
            <img
              src={product.image}
              loading="lazy"
              width="Auto"
              sizes="100vw"
              alt=""
              class="image-24 zoomed-in"
            />
          </div>
        </a>
      </div>
    {/each}
  </div> -->
</section>

<!-- 
  <script lang="ts">
  import { getChavosProducts } from "$lib/constants/ChavosCategories";
  import type { Catalogs, FooterCategory } from "$lib/constants/globalTypes";

  export let categories: FooterCategory[];
  export let showOnlyGrid = false;
  export let HeaderComponent: string | undefined = undefined;
  export let catalog: string;

  let productList = getChavosProducts();
</script>

<section
  class={showOnlyGrid ? "z-10 absolute bottom-3 w-full" : "z-10 bg-white"}
>
  {#if !showOnlyGrid && HeaderComponent}
    {@html HeaderComponent}
  {/if}

  <div
    class="w-full h-[85vh] grid grid-cols-5 md:grid-cols-8 overflow-y-scroll place-items-center gap-3 px-3"
  >
    {#each productList as product, index}
      <div
        class="w-full flex flex-col items-center justify-center whitespace-nowrap overflow-x-clip"
      >
        <a
          class="w-full"
          href={`${product.ref}/${catalog.toLowerCase()}/cortinas`}
        >
          <img
            src={product.image ||
              "https://storage.googleapis.com/catalogo-web/biasi/fotos/portadilla-amueblando-500.webp"}
            loading="eager"
            alt=""
            class="w-full h-2/3 rounded-lg"
          />
          <div class="w-full self-center flex items-center justify-center">
            <span class="w-full truncate text-center">
              {product.name}
            </span>
          </div>
        </a>
      </div>
    {/each}
  </div>

  <!-- <div
    id="w-node-f5ab1b35-365f-ca7a-3311-3ceb3b540049-3b540049"
    class="quick-stack-2 desktop grid grid-cols-5"
  >
    {#each productList as product, index}
      <div
        id="w-node-f5ab1b35-365f-ca7a-3311-3ceb3b54004a-3b540049"
        class={$sveltePage.url.pathname + $sveltePage.url.hash ===
        "/" + catalog.toLowerCase() + "/" + product.ref
          ? showOnlyGrid
            ? "scale-90 border-[8px] border-[#fff]"
            : "scale-90 border-[8px] border-vianney-600 rounded-[14px]"
          : ""}
      >
        <a
          data-sveltekit-preload-data="tap"
          data-sveltekit-reload
          href={product.ref}
          aria-current="page"
          class="link-block-11 w-inline-block w--current"
        >
          <div class="category-div">
            <div class="page-details-container categorias-card">
              <div class="page-title category-title">
                {@html product.name}
              </div>
            </div>
            <img
              src={product.image}
              loading="lazy"
              width="Auto"
              sizes="100vw"
              alt=""
              class="image-24 zoomed-in"
            />
          </div>
        </a>
      </div>
    {/each}
  </div>
</section>

-->
