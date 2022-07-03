<script>
  import ChannelsList from "./ChannelsList.svelte";
  import ResultsList from "./ResultsList.svelte";
  import { createSubscriptionsStore } from "../stores/subscriptions";
  import { createSearchStore } from "../stores/search";

  const { subscriptionsStore, loadSubscriptions } = createSubscriptionsStore();
  const { searchStore, loadSearch } = createSearchStore();

  let headTitle = "yt-subs-subs";
  let currentChannel = {};
  let query = "";

  $: isLoading = $subscriptionsStore.loading || $searchStore.loading;

  async function getSearchResults() {
    await loadSearch({ query });
  }

  function selectChannel({ snippet }) {
    return async function () {
      await loadSubscriptions({ channelId: snippet.channelId });

      currentChannel = snippet;
      query = snippet.channelTitle;
      headTitle = `yt-subs-subs | ${snippet.channelTitle}`;
    };
  }
</script>

<svelte:head>
  <title>{headTitle}</title>
</svelte:head>

<section>
  <form on:submit|preventDefault={getSearchResults}>
    <input
      bind:value={query}
      placeholder="channel name"
      disabled={isLoading}
      type="text"
      required
    />

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
