<svelte:options immutable />

<script>
  import SubscriptionsList from "./SubscriptionsList.svelte";
  import { createSubscriptionStore } from "../stores/subscription";

  const { subscriptionStore, loadSubscriptions } = createSubscriptionStore();

  export let channelId;

  let isOpen = false;

  async function handleClick() {
    isOpen = !isOpen;

    if (isOpen && !$subscriptionStore.subscriptions) {
      await loadSubscriptions({ channelId });
    }
  }
</script>

<button on:click={handleClick} disabled={$subscriptionStore.loading}
  >{isOpen ? "hide sub's subs" : "see sub's subs"}</button
>

{#if isOpen}
  <SubscriptionsList {...$subscriptionStore} variation="small" />
{/if}
