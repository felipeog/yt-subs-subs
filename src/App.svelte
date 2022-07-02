<script>
  import SubscriptionsList from "./components/SubscriptionsList.svelte";
  import { subscription } from "./stores/subscription";

  const { subscriptionStore, loadSubscriptions } = subscription();

  let loading;
  let error;
  let subscriptions;

  subscriptionStore.subscribe((nextState) => {
    loading = nextState.loading;
    error = nextState.error;
    subscriptions = nextState.subscriptions;
  });

  let channelId = "";

  async function handleSubmit() {
    await loadSubscriptions({ channelId });
  }
</script>

<main>
  <header>
    <h1>browse yt subs' subs</h1>

    <p>
      <a
        href="https://support.google.com/youtube/answer/3250431"
        target="_blank"
        rel="noopener noreferrer"
        >find your yt channel id
      </a>
      /
      <a
        href="https://support.google.com/youtube/answer/7280190"
        target="_blank"
        rel="noopener noreferrer"
        >make your yt subs public
      </a>
    </p>
  </header>

  <section>
    <form on:submit|preventDefault={handleSubmit} disabled={loading}>
      <input
        bind:value={channelId}
        placeholder="channel id"
        disabled={loading}
        type="text"
        required
      />
      <button type="submit" disabled={loading}>get subs</button>
    </form>
  </section>

  <SubscriptionsList {loading} {error} {subscriptions} />
</main>

<style>
  :global(*) {
    text-transform: lowercase;
    font-family: monospace;
  }

  main {
    max-width: 960px;
    margin: 0 auto;
  }

  input[type="text"] {
    text-transform: none;
  }
</style>
