const fs = require("fs");

const BiasiCategories = [
  {
    id: "",
    name: "Muebles",
    link: "muebles",
    mainCategory: "Amueblando",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/portadilla-amueblando-500.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Productos de recámara",
    link: "productos-de-recamara",
    mainCategory: "Descansando",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/portadilla-descansando-500.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Accesorios de decoración",
    link: "accesorios-de-decoracion",
    mainCategory: "Decorando",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/88182-500.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Macetas",
    link: "macetas",
    mainCategory: "Decorando",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/86938-4-500.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Espejos",
    link: "espejos",
    mainCategory: "Decorando",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/88181-500.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Adornos religiosos",
    link: "adornos-religiosos",
    mainCategory: "Decorando",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/71427-500.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Adornos luminosos",
    link: "adornos-luminosos",
    mainCategory: "Decorando",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/87376-2-500.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Edredones",
    link: "edredones",
    mainCategory: "Descansando",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/88305-500.webp",
    isActive: false,
  },
  {
    id: "",
    name: "Cobertores",
    link: "cobertores",
    mainCategory: "Descansando",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/88310-3-500.webp",
    isActive: false,
  },
  {
    id: "",
    name: "Fundas de cojín",
    link: "fundas-de-cojin",
    mainCategory: "Descansando",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/88328-500.webp",
    isActive: false,
  },
  {
    id: "",
    name: "Almohadas",
    link: "almohadas",
    mainCategory: "Descansando",
    image: "https://storage.googleapis.com/catalogo-web/biasi/fotos/",
    isActive: false,
  },
  {
    id: "",
    name: "Protectores de colchón",
    link: "protectores-de-colchon",
    mainCategory: "Descansando",
    image: "https://storage.googleapis.com/catalogo-web/biasi/fotos/",
    isActive: false,
  },
  {
    id: "",
    name: "Valladolid",
    link: "valladolid",
    mainCategory: "Organizando",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/77469-500.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Organización",
    link: "organizacion",
    mainCategory: "Organizando",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/88140-500.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Accesorios de cocina",
    link: "accesorios-de-cocina",
    mainCategory: "Cocinando",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/portadilla-cocinando-500.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Accesorios de lavandería",
    link: "accesorios-de-lavanderia",
    mainCategory: "Lavando",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/portadilla-lavando-500.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Accesorios de baño",
    link: "accesorios-de-bano",
    mainCategory: "Baño",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/portadilla-bano-500.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Vialité",
    link: "vialite",
    mainCategory: "Vialité",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/57037-500.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Accesorios para mascotas",
    link: "accesorios-para-mascotas",
    mainCategory: "Mascotas",
    image:
      "https://storage.googleapis.com/catalogo-web/biasi/fotos/88149-500.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Súper precio",
    link: "super-precio",
    mainCategory: "Súper precio",
    image: "https://storage.googleapis.com/catalogo-web/biasi/fotos/",
    isActive: true,
  },
];

// 1. Create folders
const createFolders = async (categories) => {
  for (const category of categories) {
    await fs.promises.mkdir(
      `./catalogo-web/src/routes/biasi/${category.link}`,
      {
        recursive: true,
      },
    );
  }
};

// 4. save html string to 'custom' file in folder
const writeFile = async (category, htmlString, tsString) => {
  const htmlPath = `./catalogo-web/src/routes/biasi/${category}/+page.svelte`;
  await fs.promises.writeFile(htmlPath, htmlString);

  const tsPath = `./catalogo-web/src/routes/biasi/${category}/+page.ts`;
  await fs.promises.writeFile(tsPath, tsString);
};

// MAIN FUNCTION
(async () => {
  await createFolders(BiasiCategories);

  for (const category of BiasiCategories) {
    if (!category.isActive) {
      continue;
    }
    let htmlString = getScriptTagString();
    htmlString += HTML_SCRIPTS;
    writeFile(category.link, htmlString, getTsString(category.name));
  }
})();

// STRINGS
const getTsString = (categoryName) => {
  return `
import type { PageLoad } from "./$types";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "$lib/firebase";
import { BiasiCollectionName } from "$lib/constants/BiasiDB";

export type VisibleIds = string[];

export const load: PageLoad = async ({ params }) => {
  // firebase query to get all the documents in the collection that match the field value pageType: "Coberot Austral"
  const q = query(
    collection(db, BiasiCollectionName),
    where("pageCategory", "==", "${categoryName}"),
  );
  const querySnapshot = await getDocs(q);
  var products: any = [];
  querySnapshot.forEach((doc) => {
    // map the document data to an array with the data of products
    products.push(doc.data());
  });

  products = products.sort((a, b) => {
    if (a.pageTemplate === "portadilla" && b.pageTemplate !== "portadilla") {
      return -1;
    } else if (
      a.pageTemplate !== "portadilla" &&
      b.pageTemplate === "portadilla"
    ) {
      return 1;
    } else {
      return b.pageTemplate.localeCompare(a.pageTemplate);
    }
  });

  return {
    props: {
      pages: products,
    },
  };
};
`;
};

const getScriptTagString = () => {
  return `
<script lang="ts">
  import VisibleDetector from "$lib/components/visibleDetector.svelte";
  import TemplateDetector from "$lib/components/templateDetector.svelte";
  import NavigatorMenu from "$lib/components/navigatorMenu.svelte";
  import BiasiFooter from "$lib/components/biasiFooter.svelte";
  import type { PageData } from "./$types";
  import VideoAndGrid from "$lib/templates/videoAndGrid.svelte";
  import MainAndElements from "$lib/templates/mainAndElements.svelte";
  import Portadilla from "$lib/templates/portadilla.svelte";
  import TwoSides from "$lib/templates/twoSides.svelte";
  import ImagesAndGrid from "$lib/templates/imagesAndGrid.svelte";
  import FloatingImages from "$lib/templates/floatingImages.svelte";

  let selectedProduct: null | string = null;
  let visibleIds: string[] = [];
  let showPopup = false;
  function handleVisibleChange(event) {
    visibleIds = event.detail;
  }
  function show() {
    showPopup = true;
  }

  export let data: PageData;
  const pages = data.props.pages;

  let initAnimates = Array(pages.length).fill(false);
  function handleTemplateChange(event) {
    if (!event.detail[0]) return;
    initAnimates[+event.detail[0].split("-")[1]] = true;
  }
</script>

<VisibleDetector on:visibleChange={handleVisibleChange} />
<TemplateDetector on:templateChange={handleTemplateChange} />

{#each pages as page, i}
  {#if page.pageTemplate == "portadilla"}
    <Portadilla
      templateId={\`portadilla-\${i.toString()}\`}
      initAnimate={initAnimates[i]}
      bind:selectedProduct
      bind:page
    />
  {:else if page.pageTemplate == "floatingImages"}
    <FloatingImages
      templateId={\`floatingImages-\${i.toString()}\`}
      initAnimate={initAnimates[i]}
      bind:selectedProduct
      bind:page
    />
  {:else if page.pageTemplate == "imagesAndGrid"}
    <ImagesAndGrid
      templateId={\`imagesAndGrid-\${i.toString()}\`}
      initAnimate={initAnimates[i]}
      bind:selectedProduct
      bind:page
    />
  {:else if page.pageTemplate == "mainAndElements"}
    <MainAndElements
      templateId={\`mainAndElements-\${i.toString()}\`}
      initAnimate={initAnimates[i]}
      bind:selectedProduct
      bind:page
    />
  {:else if page.pageTemplate == "twoSides"}
    <TwoSides
      templateId={\`twoSides-\${i.toString()}\`}
      initAnimate={initAnimates[i]}
      bind:selectedProduct
      bind:page
    />
  {:else if page.pageTemplate == "videoAndGrid"}
    <VideoAndGrid
      templateId={\`videoAndGrid-\${i.toString()}\`}
      initAnimate={initAnimates[i]}
      bind:selectedProduct
      bind:page
    />
  {/if}
{/each}
`;
};

const HTML_SCRIPTS = `
<BiasiFooter />

<NavigatorMenu
  bind:visibleIds
  bind:showPopup
  bind:selectedProduct
  isBiasi={true}
/>

<div>
  <script defer src="../js/webflowPage.js"></script>
  <script
    defer
    src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=643738a971c1d64a8bd7a90a"
    type="text/javascript"
    integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
    crossorigin="anonymous"
  ></script>
  <script defer src="https://unpkg.com/split-type"></script>
  <script
    defer
    src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"
  ></script>
  <script
    defer
    src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js"
  ></script>
  <script defer src="../js/animations.js" type="text/javascript"></script>
  <script defer src="../js/webflow.js" type="text/javascript"></script>
</div>
`;
