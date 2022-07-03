<script>
  import SubscriptionsList from "./SubscriptionsList.svelte";
  import ChannelsSearchList from "./ChannelsSearchList.svelte";
  import { createSubscriptionStore } from "../stores/subscription";
  import { createChannelStore } from "../stores/channel";

  const { subscriptionStore, loadSubscriptions } = createSubscriptionStore();
  const { channelStore, searchChannels } = createChannelStore();

  let headTitle = "yt-subs-subs";
  let selectedChannel = {};
  let query = "";

  $: isLoading = $subscriptionStore.loading || $channelStore.loading;

  async function handleChannelsSearch() {
    await searchChannels({ query });
  }

  function handleSubscriptionsLoad({ snippet }) {
    return async function () {
      await loadSubscriptions({ channelId: snippet.channelId });

      selectedChannel = snippet;
      query = snippet.channelTitle;
      headTitle = `yt-subs-subs | ${snippet.channelTitle}`;
    };
  }
</script>

<svelte:head>
  <title>{headTitle}</title>
</svelte:head>

<section>
  <form on:submit|preventDefault={handleChannelsSearch}>
    <input
      bind:value={query}
      placeholder="channel name"
      disabled={isLoading}
      type="text"
      required
    />

    <button type="submit" disabled={isLoading}>search</button>
  </form>

  {#key $channelStore.channels}
    <ChannelsSearchList
      {...$channelStore}
      {selectedChannel}
      handleClick={handleSubscriptionsLoad}
    />
  {/key}

  {#key $subscriptionStore.subscriptions}
    <SubscriptionsList {...$subscriptionStore} />
  {/key}
</section>

<style>
  section {
    margin-top: 6rem;
  }

  form {
    display: flex;
    gap: 0.6rem;
    margin-bottom: 0.6rem;
  }

  input {
    flex-grow: 1;
    width: 18rem;
  }
</style>
