<script>
  import SubscriptionsList from "./SubscriptionsList.svelte";
  import { createSubscriptionStore } from "../stores/subscription";

  const { subscriptionStore, loadSubscriptions } = createSubscriptionStore();

  let headTitle = "yt-subs-subs";
  let channelId = import.meta.env.DEV
    ? import.meta.env.VITE_DEV_CHANNEL_ID ?? ""
    : "";

  async function handleSubmit() {
    await loadSubscriptions({ channelId });

    headTitle = `yt-subs-subs | channel id: ${channelId}`;
  }
</script>

<svelte:head>
  <title>{headTitle}</title>
</svelte:head>

<section>
  <form on:submit|preventDefault={handleSubmit}>
    <input
      bind:value={channelId}
      placeholder="channel id"
      disabled={$subscriptionStore.loading}
      type="text"
      required
    />
    <button type="submit" disabled={$subscriptionStore.loading}>
      get subs
    </button>
  </form>

  {#key $subscriptionStore.subscriptions}
    <SubscriptionsList {...$subscriptionStore} />
  {/key}
</section>

<style>
  section {
    margin-top: 6rem;
  }

  input {
    width: 18rem;
  }
</style>
