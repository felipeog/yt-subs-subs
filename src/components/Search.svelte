<script>
  import ChannelsList from "./ChannelsList.svelte";
  import ResultsList from "./ResultsList.svelte";
  import { createSubscriptionsStore } from "../stores/subscriptions";
  import { createSearchStore } from "../stores/search";

  const { subscriptionsStore, loadSubscriptions } = createSubscriptionsStore();
  const { searchStore, loadSearch } = createSearchStore();

  let currentChannel = {};
  let query = "";

  $: isLoading = $subscriptionsStore.loading || $searchStore.loading;
  $: headTitle = !currentChannel.channelTitle
    ? "yt-subs-subs"
    : `yt-subs-subs | ${currentChannel.channelTitle}`;
  $: {
    (async () => {
      if (currentChannel.channelId) {
        await loadSubscriptions({ channelId: currentChannel.channelId });
      }
    })();
  }

  async function getSearchResults() {
    await loadSearch({ query });
  }

  async function selectChannel({ snippet }) {
    currentChannel = snippet;
  }
</script>

<svelte:head>
  <title>{headTitle}</title>
</svelte:head>

<section>
  <form on:submit|preventDefault={getSearchResults}>
    <input bind:value={query} placeholder="channel name" type="text" required />

    <button type="submit" disabled={isLoading}>search</button>
  </form>

  {#key $searchStore.data}
    <ResultsList {currentChannel} {selectChannel} {...$searchStore} />
  {/key}

  {#key $subscriptionsStore.data}
    <ChannelsList {...$subscriptionsStore} />
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
