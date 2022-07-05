<svelte:options immutable />

<script>
  import BigChannelCard from "./BigChannelCard.svelte";
  import SmallChannelCard from "./SmallChannelCard.svelte";

  export let variation = "big";
  export let channel;
</script>

{#if variation === "big"}
  <BigChannelCard {channel} />
{/if}

{#if variation === "small"}
  <SmallChannelCard {channel} />
{/if}
