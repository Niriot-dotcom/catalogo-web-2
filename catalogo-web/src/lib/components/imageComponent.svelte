<script>
    export let src= '';
    export let id= '';        // ID de la imagen
    export let classList= '';     // Clases de la imagen
    export let alt= '';       // Texto alternativo de la imagen
    export let loading= '';   // Tipo de carga de la imagen
    export let image= '';     // Imagen de la que se obtiene el src

    // Lista de sufijos que representan las resoluciones
    const resolutions = ['500', '800', '896', '1080', '1280'];

    // Genera todas las URL para el srcset
    function generateSrcSet(base) {
        const baseWithoutExtension = base.replace('.webp', '');
        return resolutions.map(res => `${baseWithoutExtension}-${res}.webp ${res}w`).join(', ');
    }
</script>

    {#if src}
        <img 
           image="{image}"
            data-w-id="{id}"
            alt="{alt}"
            src="{src.replace('.webp', '')}-1280.webp"
            srcset="{generateSrcSet(src)}" 
            loading="{loading}" 
            class="{classList}"
        />
    {/if}

