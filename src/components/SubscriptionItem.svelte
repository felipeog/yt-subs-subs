<svelte:options immutable />

<script>
  import BigSubscriptionCard from "./BigSubscriptionCard.svelte";
  import SmallSubscriptionCard from "./SmallSubscriptionCard.svelte";

  export let variation = "big";
  export let snippet;
</script>

{#if variation === "big"}
  <BigSubscriptionCard {snippet} />
{/if}

{#if variation === "small"}
  <SmallSubscriptionCard {snippet} />
{/if}
