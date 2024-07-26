<script lang="ts">
  import { addToCart } from "$lib/components/cartLogic.js";
  import {
    collection,
    query,
    where,
    getDoc,
    getDocs,
    doc,
  } from "firebase/firestore";
  import { db } from "$lib/firebase";
  import { createEventDispatcher } from "svelte";

  export let skus: any[];
  export let clickProduct: string | null = null;

  let selectedProduct = null;
  let selectedVariant = null;
  let selectedVariantId = null;

  async function handleAddAllProducts() {
    for await (const sku of skus) {
      fetchProductDetail("", Number(sku));
    }
  }

  async function fetchProductDetail(event: any, clickId: any) {
    console.log("clickId: ", clickId);

    let productsWithSameName: any = [];

    if (clickId) {
      const productsRef = collection(db, "products");
      const productQuery = query(productsRef, where("Id", "==", clickId));
      const productQuerySnapshot = await getDocs(productQuery);
      productQuerySnapshot.forEach((doc) => {
        productsWithSameName.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    }

    const productName = clickId
      ? productsWithSameName[0].Name
      : event
        ? event.currentTarget.getAttribute("data-id")
        : console.log("vars:", clickId);

    // 1. Buscar todos los productos con el mismo nombre
    const productsRef = collection(db, "products");
    const productQuery = query(productsRef, where("Name", "==", productName));
    const productQuerySnapshot = await getDocs(productQuery);

    productQuerySnapshot.forEach((doc) => {
      productsWithSameName.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // 2. Ahora, para cada producto, buscamos su precio en la colección priceList
    let pricesForProducts = [];
    for (let product of productsWithSameName) {
      const priceRef = doc(db, "priceList", product.id);
      const priceSnap = await getDoc(priceRef);
      if (priceSnap.exists()) {
        pricesForProducts.push(priceSnap.data());
      } else {
        pricesForProducts.push(null); // Puedes manejar esto de otra forma si lo deseas
      }
    }

    // Remove the same products
    productsWithSameName = Object.values(
      productsWithSameName.reduce(
        (acc, obj) => ({ ...acc, [obj.id]: obj }),
        {},
      ),
    );

    // 3. Combinar la información del producto y su precio en un solo objeto
    selectedProduct = productsWithSameName.map((product) => {
      // Encuentra el precio correspondiente al ID del producto
      const productPrice = pricesForProducts.find(
        (price) => price && price.Id === product.Id,
      );

      return {
        product: product,
        price: productPrice,
      };
    });

    selectedVariant = selectedProduct[0];
    selectedVariantId = selectedProduct[0].product.Id.toString(); // Seleccionar el primer producto de la lista
    console.log("selectedVariant: ", selectedVariant);

    console.log("here aniandiendo al carrito...");
    addToCartClick(selectedVariant);
  }

  const dispatch = createEventDispatcher();
  let quantity = 1;

  function addToCartClick(product) {
    console.log("addToCartClick product: ", product);
    selectedProduct = null;
    clickProduct = null;
    product.quantity = Number(quantity); // Añadir la cantidad al producto
    addToCart(product);
    dispatch("addtocart");

    // TODO habilitar gtag
    // if (typeof gtag !== "undefined") {
    //   gtag("event", "add_to_cart", {
    //     event_category: "ecommerce",
    //     event_label: product.product.Name,
    //   });
    // }
  }
</script>

<div class="w-fit">
  <button
    on:click={() => handleAddAllProducts()}
    class="text-white text-right chavos-sm bg-vianney-600 flex items-center mr-5 px-3 py-1.5 rounded-2xl xs:chavos-base"
  >
    <svg
      class="text-white group-hover:text-gray-500 -ml-0 mr-1 h-6 w-6 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1"
      stroke=""
      aria-hidden="true"
    >
      <g>
        <path
          id="Icon"
          d="M3 3.7395H5L5.4 5.7395M7 13.7395H17L21 5.7395H5.4M7 13.7395L5.4 5.7395M7 13.7395L4.70711 16.0324C4.07714 16.6624 4.52331 17.7395 5.41421 17.7395H17M17 17.7395C15.8954 17.7395 15 18.6349 15 19.7395C15 20.8441 15.8954 21.7395 17 21.7395C18.1046 21.7395 19 20.8441 19 19.7395C19 18.6349 18.1046 17.7395 17 17.7395ZM9 19.7395C9 20.8441 8.10457 21.7395 7 21.7395C5.89543 21.7395 5 20.8441 5 19.7395C5 18.6349 5.89543 17.7395 7 17.7395C8.10457 17.7395 9 18.6349 9 19.7395Z"
          stroke="#fff"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
    <span>Agregar todo</span>
  </button>
</div>
