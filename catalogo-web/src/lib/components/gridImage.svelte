<script>
    export let src = '';
    export let alt = '';
    export let clasList = '';
    let fallbackSrc = '../images/placeholder.png'; // Cambia esto a la ruta de tu imagen de reserva
  </script>
  
  <img 
    class="{clasList}"
    src={src} 
    alt={alt} 
    on:error={(e) => e.target.src = fallbackSrc} 
  />
  