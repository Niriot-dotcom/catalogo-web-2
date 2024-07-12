import { writable } from "svelte/store";

export const cartStore = writable([]);

// Función para añadir productos al carrito
export function addToCart(productToAdd) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProductIndex = cart.findIndex(
    (product) => product.product.id === productToAdd.product.id,
  );

  if (existingProductIndex !== -1) {
    // Producto ya existe en el carrito, aumenta cantidad basado en el valor enviado
    cart[existingProductIndex].quantity += productToAdd.quantity;
    // Puedes añadir más lógica aquí si necesitas asegurarte de que la cantidad total no exceda un límite.
  } else {
    // Producto no está en el carrito, añadirlo
    cart.push(productToAdd);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  cartStore.set(cart); // Actualizar el store

  console.log("Producto añadido al carrito", productToAdd);
}

// Función para jalar el carrito al cargar la aplicación
export function loadCart() {
  let storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  cartStore.set(storedCart);
}

// Función para borrar un producto del carrito
export function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const updatedCart = cart.filter(
    (product) => product.product.id !== productId,
  );

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  cartStore.set(updatedCart); // Actualizar el store

  console.log("Producto removido del carrito", productId);
}

// Función para actualizar la cantidad de un producto en el carrito
export function updateQuantity(productId, newQuantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProductIndex = cart.findIndex(
    (product) => product.product.id === productId,
  );

  if (existingProductIndex !== -1) {
    // Actualizar la cantidad del producto en el carrito
    cart[existingProductIndex].quantity = newQuantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  cartStore.set(cart); // Actualizar el store

  console.log("Cantidad actualizada", productId, newQuantity);
}
