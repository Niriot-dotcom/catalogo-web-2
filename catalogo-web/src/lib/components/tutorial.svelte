<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  export let showHorizontalHand: boolean = false;
  let isUp = false;
  let tutorialDiv: any;

  function animate() {
    isUp = !isUp;

    setTimeout(
      () => {
        animate();
      },
      isUp ? 400 : 700,
    );
  }

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > 40) {
        window.removeEventListener("scroll", handleScroll);
        tutorialDiv.style.opacity = "0";
      }
    }
  };

  onMount(() => {
    animate();
    tutorialDiv = document.getElementById("tutorial-div");

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  });

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("scroll", handleScroll);
    }
  });
</script>

<div
  id="tutorial-div"
  class="absolute z-50 w-screen h-screen bg-[#00000088] overflow-hidden flex flex-col justify-center items-center opacity-100"
  style="transition: all 0.5 linear;"
>
  <div class="w-10/12 h-3/6">
    <!-- vertical -->
    <div class="w-full h-1/2">
      <div class="w-full h-full">
        <img
          src="../images/icons/hand-scroll.svg"
          loading="eager"
          alt=""
          class="w-full h-1/2 scale-[0.7]"
          style={isUp
            ? "transition: transform 0.2s ease-out; transform: translateY(-70px);"
            : "transition: transform 0.2s ease-out; transform: translateY(0);"}
        />

        <!-- text -->
        <div class="h-full text-center">
          <p class="xs:chavos-bold-2xl chavos-xl mb-2">
            ¡Bienvenido al catálogo web!
          </p>
          <p class="xs:chavos-lg chavos-base">
            para ver los productos desliza hacia abajo
          </p>
        </div>
      </div>
    </div>

    <!-- horizontal -->
    {#if showHorizontalHand}
      <div class="w-full h-1/2">
        <div class="w-full h-full">
          <img
            src="../images/icons/hand-scroll.svg"
            loading="eager"
            alt=""
            class="w-full h-1/2 scale-[0.7] ml-[50px]"
            style={isUp
              ? "transition: transform 0.2s ease-out; transform: translateX(-100px);"
              : "transition: transform 0.2s ease-out; transform: translateX(0);"}
          />

          <!-- text -->
          <div class="h-full text-center">
            <p class="xs:chavos-lg chavos-base">
              desliza a los lados o usa las flechas para cambiar de sección
            </p>
          </div>
        </div>
      </div>
    {/if}

    <!-- recommendation text -->
    <div class="h-full text-center">
      <p class="xs:chavos-base chavos-sm">
        Se recomienda usar Google Chrome como navegador.
      </p>
    </div>
  </div>
</div>
