<svelte:options immutable />

<script>
  export let href = "#";
</script>

{#if $$slots.default}
  <a {href} target="_blank" rel="noopener noreferrer">
    <slot />
  </a>
{/if}
