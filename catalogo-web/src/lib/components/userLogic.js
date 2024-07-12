import { writable } from "svelte/store";

// Inicializa el store con un valor null por defecto. Más tarde, se cargará el valor real cuando se monte el componente.
export const userStore = writable(null);

// Función para cargar el usuario al iniciar la aplicación
export function loadUserFromLocalStorage() {
  // Verifica si estamos en un entorno de navegador antes de acceder a localStorage
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("user")) || null;
  }
  return null; // Devuelve null si estamos en el lado del servidor
}

// Función para guardar el usuario
export function saveUserToLocalStorage(user) {
  // Verifica si estamos en un entorno de navegador antes de acceder a localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
  userStore.set(user); // Actualizar el store independientemente del entorno
}

// Función para cargar el usuario (llamará a esta función en onMount en el layout)
export function loadUser() {
  userStore.set(loadUserFromLocalStorage());
}

// Función para cerrar sesión
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
  userStore.set(null);
}
