<script>
  import { customFade } from "../animations";
  import { scrollToTop } from "../utils";

  let scrollY;
  let innerHeight;

  $: shouldRender = scrollY > innerHeight;
</script>

<svelte:window bind:scrollY bind:innerHeight />

{#if shouldRender}
  <button in:customFade on:click={scrollToTop}>to the top</button>
{/if}

<style>
  button {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
  }
</style>
