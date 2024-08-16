<!-- TODO bug with the first element of the group -->
<script lang="ts">
  import LegalLicenses from "$lib/components/communication/LegalLicenses.svelte";
  import OptimImg from "$lib/components/OptimImg.svelte";
  import type { DatabasePage } from "$lib/constants/globalTypes";
  import {
    CATALOGS_ROUTES,
    COLORS,
    EnumVariantesDeColor,
    LEGALES_SVGS,
    URLS,
  } from "$lib/constants/strings";
  import { getCurrentCatalog } from "$lib/utils/navigation";
  import { onMount } from "svelte";

  export let visibleIds: string[];
  export let groupPages: DatabasePage[];
  export let title: string;
  export let handleImageClick: (sku: string, relatedProds: string[]) => void;
  let currentCatalog: string;
  let selectedColorIndex = 0;
  let selectedProductSku = groupPages[selectedColorIndex].SKU;
  let bgColor =
    groupPages[selectedColorIndex].pageResources &&
    groupPages[selectedColorIndex].pageResources?.length > 0 &&
    groupPages[selectedColorIndex].pageResources[0] !== "" &&
    groupPages[selectedColorIndex].pageResources[0] !== "#"
      ? groupPages[selectedColorIndex].pageResources[0]
      : COLORS.beige;
  let config =
    groupPages[selectedColorIndex].pageResources &&
    groupPages[selectedColorIndex].pageResources?.length > 2 &&
    groupPages[selectedColorIndex].pageResources[2] !== "" &&
    groupPages[selectedColorIndex].pageResources[2] !== "#"
      ? groupPages[selectedColorIndex].pageResources[2]
      : "";

  const handleChangeColor = (colorIndex: number) => {
    selectedColorIndex = colorIndex;
    selectedProductSku = groupPages[selectedColorIndex].SKU;
    visibleIds = [selectedProductSku];
  };

  onMount(() => {
    if (window) {
      currentCatalog = getCurrentCatalog();
    }
  });
</script>

<!-- MOBILE -->
{#if config === EnumVariantesDeColor.HORIZONTAL}
  <div
    data-visible-id={groupPages[selectedColorIndex].SKU}
    class="w-full overflow-hidden px-5 relative py-2 bg-beige"
    style={`background-color: ${groupPages[selectedColorIndex].pageResources[0]}`}
  >
    <!-- line header text -->
    <div class="w-full text-center mb-5 text-black mt-5">
      {#if title.split(" ").length > 1}
        <p class="chavos-bold-2xl xs:chavos-bold-3xl">{title.split(" ")[0]}</p>
        <p class="chavos-4xl xs:chavos-5xl">
          {title.replace(title.split(" ")[0], "")}
        </p>
      {:else}
        <p class="chavos-4xl xs:chavos-5xl">
          {title.split(" ")[0]}
        </p>
      {/if}
    </div>

    <!-- color title -->
    <p class="text-black chavos-base xs:chavos-xl">
      {groupPages[selectedColorIndex].pageTitle}
    </p>

    <div class="w-full h-[30vh] flex space-x-1">
      <!-- main image -->
      <div
        class="w-[50vw] h-full"
        on:click={() =>
          handleImageClick(
            groupPages[selectedColorIndex].SKU,
            groupPages[selectedColorIndex].pageRelatedProducts,
          )}
      >
        <img
          class="object-cover w-full h-full"
          src={`${URLS.fotos}${groupPages[selectedColorIndex].SKU}-1280.webp`}
          alt=""
        />
      </div>

      <!-- environment image -->
      <div
        class="w-[30vw] h-full"
        on:click={() =>
          handleImageClick(
            groupPages[selectedColorIndex].SKU,
            groupPages[selectedColorIndex].pageRelatedProducts,
          )}
      >
        <img
          class="object-cover w-full h-full"
          src={`${URLS.fotos}${groupPages[selectedColorIndex].SKU}-2-1280.webp`}
        />
      </div>

      <!-- colors -->
      <div
        class="w-fit h-full flex flex-col flex-wrap items-center justify-center"
      >
        {#each groupPages as _, i}
          <button
            on:click={() => handleChangeColor(i)}
            class="w-7 h-7 rounded-[50%] mt-1"
            style={selectedColorIndex === i
              ? `background-color: ${
                  groupPages[i].pageResources &&
                  groupPages[i].pageResources.length > 1
                    ? groupPages[i].pageResources[1]
                    : "#888"
                }; border: 4px solid #fff;`
              : `background-color: ${
                  groupPages[i].pageResources &&
                  groupPages[i].pageResources.length > 1
                    ? groupPages[i].pageResources[1]
                    : "#fff"
                };`}
          />

          {#if i === 4 && groupPages.length === 7}
            <div class="h-full ml-1"></div>
          {/if}
          {#if i === 3 && groupPages.length === 8}
            <div class="h-full ml-1"></div>
          {/if}
        {/each}
      </div>
    </div>
  </div>
{:else}
  <div
    style={`background-color: ${groupPages[selectedColorIndex].pageResources[0]}`}
    class="md:hidden relative text-black w-screen min-h-[85vh] pt-8 {title ===
      'Rodapié' && currentCatalog === CATALOGS_ROUTES.INVIERNO
      ? 'pb-28'
      : 'pb-0'} px-3 flex flex-col justify-center overflow-hidden"
  >
    <!-- line header text -->
    <div class="w-full text-center mb-5">
      {#if title.split(" ").length > 1}
        <p class="chavos-bold-2xl xs:chavos-bold-3xl">{title.split(" ")[0]}</p>
        <p class="chavos-4xl xs:chavos-5xl">
          {title.replace(title.split(" ")[0], "")}
        </p>
      {:else}
        <p class="chavos-4xl xs:chavos-5xl">
          {title.split(" ")[0]}
        </p>
      {/if}
    </div>

    <!-- color title -->
    <p class="chavos-base xs:chavos-lg text-center">
      {groupPages[selectedColorIndex].pageTitle}
    </p>

    <!-- image -->
    <!-- data-visible-id={groupPages.map((p) => p.SKU).join(", ")} -->
    <div
      id="container-{title.replaceAll(' ', '')}"
      data-visible-id={selectedProductSku}
      class="{config === EnumVariantesDeColor.SIN_ACERCAMIENTO
        ? 'h-[35vh]'
        : 'h-[50vh]'} w-full pt-2"
    >
      <!-- main image -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="h-[35vh] w-full mb-2 overflow-hidden"
        on:click={() =>
          handleImageClick(
            groupPages[selectedColorIndex].SKU,
            groupPages[selectedColorIndex].pageRelatedProducts,
          )}
      >
        <!-- TODO change to OptimImg -->
        <img
          alt=""
          class="object-cover w-full h-full"
          style={title.toLowerCase().includes("sábanas")
            ? `transform: scale(2.3); transform-origin: top;`
            : groupPages[selectedColorIndex].productType
                  .toLowerCase()
                  .includes("fundas de cojín velvet") ||
                groupPages[selectedColorIndex].productType
                  .toLowerCase()
                  .includes("protectores de silla veli")
              ? `transform: scale(1); object-fit: contain;`
              : ``}
          src={title.toLowerCase().includes("fundas de silla niza")
            ? `${URLS.fotos}${groupPages[selectedColorIndex].SKU}-2-1280.webp`
            : `${URLS.fotos}${groupPages[selectedColorIndex].SKU}-1280.webp`}
        />
      </div>

      {#if config !== EnumVariantesDeColor.SIN_ACERCAMIENTO}
        <!-- texture image -->
        <!-- title.toLowerCase().includes("sábanas")
      ? `object-position: center; transform: scale(1.2); transform-origin: center; object-fit: contain;`
      : `` -->
        <div class="h-[15vh] w-full relative overflow-hidden">
          <!-- TODO change to OptimImg -->
          <img
            alt=""
            class="object-cover w-full h-full"
            style={title.toLowerCase().includes("sábanas")
              ? groupPages[selectedColorIndex].pageResources[2] &&
                groupPages[selectedColorIndex].pageResources[2] === "AMPLIAR"
                ? `object-position: center; transform: scale(1.2); transform-origin: center; object-fit: contain;`
                : `object-position: top;`
              : title.toLowerCase().includes("fundas de silla niza")
                ? `transform: scale(1.7); object-position: center 60%;`
                : ``}
            src={title.toLowerCase().includes("fundas de silla niza")
              ? `${URLS.fotos}${groupPages[selectedColorIndex].SKU}-1280.webp`
              : `${URLS.fotos}${groupPages[selectedColorIndex].SKU}-2-1280.webp`}
          />

          <!-- copy -->
          {#if groupPages[selectedColorIndex].pageCopys && groupPages[selectedColorIndex].pageCopys.length > 0 && groupPages[selectedColorIndex].pageCopys[0] !== ""}
            <p
              class="uppercase text-black text-right chavos-sm bg-white px-3 py-1.5 w-fit rounded-2xl absolute bottom-0 right-0 mb-3 mr-3 xs:chavos-base"
            >
              {@html groupPages[selectedColorIndex].pageCopys[0]}
            </p>
          {/if}
        </div>
      {/if}

      <!-- licenses -->
      {#if LEGALES_SVGS.hasOwnProperty(groupPages[selectedColorIndex].pageTitle
          .replaceAll(" ", "")
          .toUpperCase())}
        <div class="my-3">
          <LegalLicenses
            license={groupPages[selectedColorIndex].pageTitle
              .replaceAll(" ", "")
              .toUpperCase()}
          />
        </div>
      {/if}
    </div>

    <!-- colors -->
    <!-- <div class="flex items-center justify-center mt-6 border border-red-400 h-14">
  </div> -->
    <div class="w-full flex">
      <div class="mt-6 flex flex-wrap flex-row w-full justify-center">
        {#each groupPages as _, i}
          {#if currentCatalog === CATALOGS_ROUTES.VIANNEY}
            <button
              on:click={() => handleChangeColor(i)}
              class="w-10 h-10 relative mr-1 mt-4"
              style={selectedColorIndex === i
                ? `background-color: ${
                    groupPages[i].pageResources &&
                    groupPages[i].pageResources.length > 1
                      ? groupPages[i].pageResources[1]
                      : "#888"
                  }; outline: 6px solid #fff; z-index: 1;`
                : `background-color: ${
                    groupPages[i].pageResources &&
                    groupPages[i].pageResources.length > 1
                      ? groupPages[i].pageResources[1]
                      : "#fff"
                  }; outline: 2px solid #fff;`}
            />

            {#if i === 4 && (groupPages.length === 7 || groupPages.length === 8)}
              <div class="w-full mt-2"></div>
            {/if}
          {:else}
            <button
              on:click={() => handleChangeColor(i)}
              class="w-7 h-7 rounded-[50%] mr-3"
              style={selectedColorIndex === i
                ? `background-color: ${
                    groupPages[i].pageResources &&
                    groupPages[i].pageResources.length > 1
                      ? groupPages[i].pageResources[1]
                      : "#888"
                  }; border: 4px solid #fff;`
                : `background-color: ${
                    groupPages[i].pageResources &&
                    groupPages[i].pageResources.length > 1
                      ? groupPages[i].pageResources[1]
                      : "#fff"
                  };`}
            />

            {#if i === 4 && groupPages.length === 7}
              <div class="w-full mt-2"></div>
            {/if}
            {#if i === 4 && groupPages.length === 8}
              <div class="w-full mt-2"></div>
            {/if}
          {/if}
        {/each}
      </div>
    </div>
  </div>
{/if}

<!-- DESKTOP -->
<div
  style={`background-color: ${groupPages[selectedColorIndex].pageResources[0]}`}
  class="hidden md:block w-screen h-screen"
>
  <div class="w-full h-full flex justify-center items-center">
    <!-- content -->
    <div class="w-11/12 h-4/6 flex justify-center items-center space-x-8">
      <!-- images -->
      <div
        data-visible-id={selectedProductSku}
        class="w-7/12 h-full flex space-x-3 cursor-pointer"
        on:click={() =>
          handleImageClick(
            groupPages[selectedColorIndex].SKU,
            groupPages[selectedColorIndex].pageRelatedProducts,
          )}
      >
        <div
          class="{config === EnumVariantesDeColor.SIN_ACERCAMIENTO
            ? 'w-full'
            : 'w-4/6'} h-full overflow-hidden"
        >
          <img
            alt=""
            class="object-cover w-full h-full"
            style={title.toLowerCase().includes("sábanas")
              ? `transform: scale(1.5); transform-origin: top; object-position: top;`
              : ``}
            src={`${URLS.fotos}${groupPages[selectedColorIndex].SKU}-1280.webp`}
          />
        </div>

        {#if config !== EnumVariantesDeColor.SIN_ACERCAMIENTO}
          <div class="w-2/6 h-full relative overflow-hidden">
            <img
              alt=""
              class="object-cover w-full h-full"
              style={title.toLowerCase().includes("sábanas")
                ? `object-position: top;`
                : ``}
              src={`${URLS.fotos}${groupPages[selectedColorIndex].SKU}-2-1280.webp`}
            />

            {#if groupPages[selectedColorIndex].pageCopys && groupPages[selectedColorIndex].pageCopys.length > 0 && groupPages[selectedColorIndex].pageCopys[0] !== ""}
              <p
                class="uppercase text-black chavos-sm bg-white px-3 py-1.5 w-fit rounded-2xl absolute bottom-0 right-0 mb-3 mr-3 xs:chavos-base"
              >
                {groupPages[selectedColorIndex].pageCopys[0]}
              </p>
            {/if}
          </div>
        {/if}
      </div>

      <!-- title and colors -->
      <div class="w-4/12 h-full">
        <!-- text -->
        <div class="text-black text-center">
          <p class="chavos-bold-3xl xs:chavos-bold-4xl">
            {title.split(" ")[0]}
          </p>
          <p class="chavos-5xl xs:chavos-6xl">
            {title.replace(title.split(" ")[0], "")}
          </p>
        </div>

        <!-- colors -->
        <div class="flex flex-col items-center justify-center mt-5">
          {#each groupPages as _, i}
            <div
              on:click={() => handleChangeColor(i)}
              class="w-full h-full text-black flex items-center my-2 cursor-pointer"
            >
              <!-- color circle -->
              <div
                class="w-7 h-7 rounded-[50%] shadow-xl"
                style={selectedColorIndex === i
                  ? `background-color: ${
                      groupPages[i].pageResources &&
                      groupPages[i].pageResources.length > 1
                        ? groupPages[i].pageResources[1]
                        : "#888"
                    }; border: 4px solid #fff;`
                  : `background-color: ${
                      groupPages[i].pageResources &&
                      groupPages[i].pageResources.length > 1
                        ? groupPages[i].pageResources[1]
                        : "#888"
                    };`}
              />

              <!-- color title -->
              <p class="chavos-lg xs:chavos-xl w-full pl-3">
                {groupPages[i].pageTitle}
              </p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
