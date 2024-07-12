<script>
    import LinkItem from "$lib/components/LinkItem.svelte";
  
    export let links = [];
  
    let title = '';
    let searchTerm = '';
  
    function addLink() {
      if (title && searchTerm) {
        links = [...links, { title, searchTerm }];
        title = '';
        searchTerm = '';
      }
    }
  
    function deleteLink(linkToRemove) {
      links = links.filter(link => link !== linkToRemove);
    }
  </script>
  
  <div>
    <h3 class="font-medium mb-4">Categorías Principales</h3>
    {#each links as link (link.searchTerm)}
      <LinkItem {link} onDelete={deleteLink} />
    {/each}
    <div class="mt-4">
      <label class="pt-2">
        Categoría: <br><input bind:value={title} class="border rounded p-1 mt-2 mb-2" />
      </label>
      <br>
      <label class="pt-2">
        Termino de busqueda: <br><input bind:value={searchTerm} class="border rounded p-1 mt-2 mb-2" />
      </label>
      <br>
      <button on:click={addLink} type="button" class="rounded-md mt-2 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Agregar</button>
    </div>
  </div>
  