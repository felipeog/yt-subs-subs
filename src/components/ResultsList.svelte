<svelte:options immutable />

<script>
  import { customFade } from "../animations/customFade";
  import { searchStore, selectChannel } from "../stores/search";

  function handleResultClick(snippet) {
    return () => {
      selectChannel(snippet);
    };
  }

  function handleResultKeyDown(snippet) {
    return (event) => {
      if (event.code.toLowerCase() === "enter") {
        selectChannel(snippet);
      }
    };
  }
</script>

<div>
  {#if $searchStore.loading}
    <p in:customFade>loading...</p>
  {/if}

  {#if $searchStore.error}
    <p in:customFade>{$searchStore.error}</p>
  {/if}

  {#if $searchStore.data !== undefined}
    {#if $searchStore.data.length}
      <ul>
        {#each $searchStore.data as { snippet } (snippet.channelId)}
          <li
            in:customFade
            on:click={handleResultClick(snippet)}
            on:keydown={handleResultKeyDown(snippet)}
            class:isSelected={snippet.channelId ===
              $searchStore.currentChannel.channelId}
            tabindex="0"
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
