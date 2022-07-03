<svelte:options immutable />

<script>
  import BigChannelCard from "./BigChannelCard.svelte";
  import SmallChannelCard from "./SmallChannelCard.svelte";

  export let variation = "big";
  export let snippet;
</script>

{#if variation === "big"}
  <BigChannelCard {snippet} />
{/if}

{#if variation === "small"}
  <SmallChannelCard {snippet} />
{/if}
