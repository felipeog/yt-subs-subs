<script>
  import Card from "./components/Card.svelte";
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

  <section>
    {#if loading}
      <p>loading...</p>
    {/if}

    {#if error}
      <p>{error}</p>
    {/if}

    {#if ytSubs !== undefined}
      <p>{ytSubs.length} subs found</p>

      {#if ytSubs.length}
        <ol>
          {#each ytSubs as { snippet }}
            <li>
              <Card {snippet} />
            </li>
          {/each}
        </ol>
      {/if}
    {/if}
  </section>
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
