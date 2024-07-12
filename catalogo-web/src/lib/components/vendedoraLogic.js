import { writable } from "svelte/store";
import { goto } from "$app/navigation";

export const vendedoraStore = writable(null);

export function loadVendedoraFromUrl(vendedoraId) {
  let storedVendedoraId = localStorage.getItem("adi");

  // Si hay un vendedoraId en la URL y es diferente al almacenado
  if (vendedoraId && vendedoraId !== storedVendedoraId) {
    localStorage.setItem("adi", vendedoraId);
    vendedoraStore.set(vendedoraId);

    // Redireccionar para quitar el ID de la URL, sólo si viene de la URL
    if (vendedoraId) {
      let currentPath = window.location.pathname;
      goto(currentPath); // Redirige al mismo lugar pero sin query params
    }
  } else if (storedVendedoraId && !vendedoraId) {
    // Si no viene en la URL pero está en localStorage
    vendedoraStore.set(storedVendedoraId);
    // Vendedora cargada desde localStorage", storedVendedoraId);
  }
}
