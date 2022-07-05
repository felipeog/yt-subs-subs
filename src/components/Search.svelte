<script>
  import ChannelsList from "./ChannelsList.svelte";
  import ResultsList from "./ResultsList.svelte";
  import SelectedChannelCard from "./SelectedChannelCard.svelte";
  import { searchStore, loadSearch } from "../stores/search";
  import {
    subscriptionsStore,
    loadSubscriptions,
  } from "../stores/subscriptions";

  let query = "";

  $: isLoading = $subscriptionsStore.loading || $searchStore.loading;
  $: headTitle = $searchStore.currentChannel.title
    ? `yt-subs-subs | ${$searchStore.currentChannel.title}`
    : "yt-subs-subs";
  $: {
    (async () => {
      if ($searchStore.currentChannel.channelId) {
        await loadSubscriptions({
          channelId: $searchStore.currentChannel.channelId,
        });
      }
    })();
  }

  async function getSearchResults() {
    await loadSearch({ query });
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

  <ResultsList />
  <SelectedChannelCard />
  <ChannelsList {...$subscriptionsStore} />
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
