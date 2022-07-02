<script>
  import Card from "./components/Card.svelte";
  import Accordion from "./components/Accordion.svelte";
  import { getYtSubs } from "./utils/getYtSubs";

  let channelId = "";
  let loading = false;
  let error = "";
  let ytSubs = undefined;

  async function handleSubmit() {
    loading = true;
    error = "";
    ytSubs = undefined;

    const response = await getYtSubs({ channelId });

    if (typeof response === "string") {
      error = response;
    } else {
      ytSubs = response;
    }

    loading = false;
  }
</script>

<main>
  <header>
    <p>yt-subs-subs</p>
    <h1>browse your yt subs' subs</h1>
  </header>

  <p>
    <a
      href="https://support.google.com/youtube/answer/3250431"
      target="_blank"
      rel="noopener noreferrer"
      >find your yt channel id
    </a>
  </p>

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

  {#if loading}
    <p>loading...</p>
  {/if}

  {#if error}
    <p>{error}</p>
  {/if}

  {#if ytSubs !== undefined}
    <p>{ytSubs.length} subs found</p>

    {#if !ytSubs.length}
      <p>no subs to show</p>
    {/if}

    {#each ytSubs as { snippet }, index}
      <article>
        <Card {snippet} index={index + 1} />
        <Accordion channelId={snippet.resourceId.channelId} />
      </article>
    {/each}
  {/if}
</main>

<style>
  :global(*) {
    text-transform: lowercase;
  }

  header > * {
    margin: 0.6rem 0;
    padding: 0;
  }

  input[type="text"] {
    text-transform: none;
  }
</style>
