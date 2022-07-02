<script>
  import ExternalLink from "./components/ExternalLink.svelte";
  import SubscriptionsList from "./components/SubscriptionsList.svelte";
  import { createSubscriptionStore } from "./stores/subscription";

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

<main>
  <header>
    <h1>browse yt subs' subs</h1>

    <p>
      <ExternalLink href="https://support.google.com/youtube/answer/3250431">
        find your yt channel id
      </ExternalLink>
      /
      <ExternalLink href="https://support.google.com/youtube/answer/7280190">
        make your yt subs public
      </ExternalLink>
    </p>
  </header>

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
  </section>

  <SubscriptionsList {...$subscriptionStore} />
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
