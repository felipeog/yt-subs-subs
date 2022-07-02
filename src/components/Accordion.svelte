<svelte:options immutable />

<script>
  export let isAccordionOpen;
</script>

<slot name="trigger" />

{#if isAccordionOpen}
  <slot name="content" />
{/if}
