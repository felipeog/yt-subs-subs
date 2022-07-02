<script>
  import SubscriptionsList from "./SubscriptionsList.svelte";
  import { createSubscriptionStore } from "../stores/subscription";

  const { subscriptionStore, loadSubscriptions } = createSubscriptionStore();

  export let channelId;

  let isOpen = false;
  let subscriptionsStoreState;

  subscriptionStore.subscribe((nextState) => {
    subscriptionsStoreState = nextState;
  });

  async function handleClick() {
    isOpen = !isOpen;

    if (isOpen && !subscriptionsStoreState.subscriptions) {
      await loadSubscriptions({ channelId });
    }
  }
</script>

<button on:click={handleClick} disabled={subscriptionsStoreState.loading}
  >{isOpen ? "hide sub's subs" : "see sub's subs"}</button
>

{#if isOpen}
  <SubscriptionsList {...subscriptionsStoreState} variation="small" />
{/if}
