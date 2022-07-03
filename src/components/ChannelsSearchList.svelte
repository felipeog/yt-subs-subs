<svelte:options immutable />

<script>
  import { customFade } from "../animations/customFade";

  export let loading;
  export let error;
  export let channels;
  export let selectedChannel;
  export let handleClick;
</script>

<div>
  {#if loading}
    <p in:customFade>loading...</p>
  {/if}

  {#if error}
    <p in:customFade>{error}</p>
  {/if}

  {#if channels !== undefined}
    {#if channels.length}
      <ul>
        {#each channels as { snippet } (snippet.channelId)}
          <!-- TODO: make tabbable -->
          <li
            in:customFade
            on:click={handleClick({ snippet })}
            class:isSelected={snippet.channelId === selectedChannel.channelId}
          >
            {snippet.channelTitle}
          </li>
        {/each}
      </ul>
    {:else}
      <p>no search results</p>
    {/if}
  {/if}
</div>

<style>
  div {
    height: 10rem;
  }

  ul {
    height: 10rem;
    overflow-y: scroll;
    border-style: solid;
    border-width: 0.1rem;
    border-color: var(--medium_gray);
  }

  li {
    padding: 0.4rem 0.6rem;
    cursor: pointer;
  }

  li:not(.isSelected):hover {
    font-weight: bold;
  }

  .isSelected {
    background-color: var(--primary_color);
    color: var(--light_gray);
  }
</style>
