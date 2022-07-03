<svelte:options immutable />

<script>
  import { customFade } from "../animations/customFade";

  let scrollY;
  let innerHeight;

  $: shouldRender = scrollY > innerHeight;

  function scrollToTheTop() {
    document.body.scrollIntoView();
  }
</script>

<svelte:window bind:scrollY bind:innerHeight />

{#if shouldRender}
  <button in:customFade on:click={scrollToTheTop}>to the top</button>
{/if}

<style>
  button {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
  }
</style>
