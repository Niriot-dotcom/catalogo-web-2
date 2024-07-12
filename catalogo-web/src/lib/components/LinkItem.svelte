<script>
    export let link;
    export let onDelete;
  
    function handleDelete() {
      onDelete(link);
    }
  </script>
  
  <div class="flex items-center justify-between">
    <div>
      <span class="font-medium">{link.title}</span> ({link.searchTerm})
    </div>
    <button on:click={handleDelete} class="text-red-500 hover:text-red-700">Eliminar</button>
  </div>
  