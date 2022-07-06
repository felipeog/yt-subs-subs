<svelte:options immutable />

<script>
  import { BigChannelCard, SmallChannelCard } from "components";

  export let variation = "big";
  export let channel;
</script>

{#if variation === "big"}
  <BigChannelCard {channel} />
{/if}

{#if variation === "small"}
  <SmallChannelCard {channel} />
{/if}
