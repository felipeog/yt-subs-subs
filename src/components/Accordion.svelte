<script>
  import SubscriptionsList from "./SubscriptionsList.svelte";
  import { subscription } from "../stores/subscription";

  const { subscriptionStore, loadSubscriptions } = subscription();

  export let channelId;

  let isOpen = false;
  let loading;
  let error;
  let subscriptions;

  subscriptionStore.subscribe((nextState) => {
    loading = nextState.loading;
    error = nextState.error;
    subscriptions = nextState.subscriptions;
  });

  async function handleClick() {
    isOpen = !isOpen;

    if (isOpen && !subscriptions) {
      await loadSubscriptions({ channelId });
    }
  }
</script>

<button on:click={handleClick} disabled={loading}
  >{isOpen ? "hide sub's subs" : "see sub's subs"}</button
>

{#if isOpen}
  <SubscriptionsList {loading} {error} {subscriptions} variation="small" />
{/if}
