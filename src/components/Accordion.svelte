<script>
  import { getYtSubs } from "../utils/getYtSubs";

  export let channelId;

  let loading = false;
  let error = "";
  let ytSubsSubs = undefined;
  let isOpen = false;

  async function loadSubsSubs() {
    loading = true;
    error = "";
    ytSubsSubs = undefined;

    const response = await getYtSubs({ channelId });

    if (typeof response === "string") {
      error = response;
    } else {
      ytSubsSubs = response;
    }

    loading = false;
  }

  async function handleClick() {
    isOpen = !isOpen;

    if (isOpen && !ytSubsSubs) {
      await loadSubsSubs();
    }
  }
</script>

<button on:click={handleClick} disabled={loading}
  >{isOpen ? "hide sub's subs" : "see sub's subs"}</button
>

{#if isOpen}
  {#if loading}
    <p>loading...</p>
  {/if}

  {#if error}
    <p>{error}</p>
  {/if}

  {#if ytSubsSubs !== undefined}
    <p>{ytSubsSubs.length} subs found</p>

    {#if !ytSubsSubs.length}
      <p>no subs to show</p>
    {/if}

    <ol>
      {#each ytSubsSubs as { snippet }}
        <li>
          <a
            href="https://www.youtube.com/channel/{snippet.resourceId
              .channelId}"
            target="_blank"
            rel="noopener noreferrer"
          >
            {snippet.title}
          </a>
        </li>
      {/each}
    </ol>
  {/if}
{/if}
