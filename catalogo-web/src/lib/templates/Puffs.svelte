<script lang="ts">
  export let puffPage;
  export let selectedProduct: null | string;

  const handleImageClick = (sku) => {
    selectedProduct = sku;
  };
</script>

<div id="Puffs" class="">
  <section id="inicio" class="introducci-n sticky top-0 z-10">
    <div class="div-block">
      <div class="sticky-container primary-container" style="height: 75vh;">
        <div class="sticky-parent primary-sticky" style="height: 75vh;">
          <div class="card-parent pillows-background">
            <section
              class="hero-image-left pillows-hero"
              style="background-image: url({puffPage.pageMainImage.replace(
                '.webp',
                '-1280.webp',
              )}) ;     background-position: center;     justify-content: flex-end; align-items: flex-start; display: flex;"
            >
              <section id="page1" class="div-block-3 primary-copy-box">
                <div class="div-block-48">
                  <div class="page-title-box">
                    <h2
                      text-split=""
                      words-slide-from-right=""
                      class="heading-4"
                    >
                      {puffPage.pageTitle}
                    </h2>
                    <p
                      text-split=""
                      words-slide-from-right=""
                      class="paragraph product-detail-subtitle alternate"
                    >
                      Pelo Largo y Suaves
                    </p>
                  </div>
                </div>
              </section>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="page3" class="section-text pt-16 sticky top-0 z-10">
    <div
      text-split=""
      words-slide-from-right=""
      class="text-block-5 subtitle-intro"
    >
      <span class="text-span-5"></span><span class="text-span-2"
        >bonitos y esponjosos</span
      ><span class="text-span-6"></span>
    </div>
    <div
      words-slide-from-right=""
      text-split=""
      class="text-block-4 secondary intro"
      style="margin-top: 24px;"
    >
      {puffPage.pageDescriptions}
    </div>
    <div class="div-block-5">
      {#each puffPage.pageProductsImages.slice(0, 3) as item}
        <div
          class="div-block-6 everest-ideal rounded-xl"
          data-visible-id={item}
          on:click={() => handleImageClick(item)}
        >
          <img
            src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{item}.jpg"
            class="rounded-xl"
            loading="lazy"
            alt=""
            style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; cursor: pointer;"
          />
        </div>
      {/each}

      <div class="div-block-5">
        {#each puffPage.pageProductsImages.slice(3) as item}
          <div
            class="div-block-6 everest-ideal rounded-xl"
            data-visible-id={item}
            on:click={() => handleImageClick(item)}
          >
            <img
              src="https://storage.googleapis.com/imagenes-productos/Productos_Vianney/{item}.jpg"
              class="rounded-xl"
              loading="lazy"
              alt=""
              style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; cursor: pointer"
            />
          </div>
        {/each}
      </div>
    </div>
  </section>
</div>
