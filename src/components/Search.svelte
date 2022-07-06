<script>
  import ChannelsList from "./ChannelsList.svelte";
  import ResultsList from "./ResultsList.svelte";
  import SelectedChannelCard from "./SelectedChannelCard.svelte";
  import { channelStore } from "../stores/channel";
  import { searchStore, loadSearch } from "../stores/search";
  import {
    subscriptionsStore,
    loadSubscriptions,
  } from "../stores/subscriptions";

  let query = "";

  $: isLoading = $subscriptionsStore.loading || $searchStore.loading;
  $: {
    (async () => {
      if ($channelStore.currentChannel.channelId) {
        await loadSubscriptions({
          channelId: $channelStore.currentChannel.channelId,
        });
      }
    })();
  }

  async function handleFormSubmit() {
    await loadSearch({ query });
  }
</script>

<section>
  <form on:submit|preventDefault={handleFormSubmit}>
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
