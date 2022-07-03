<svelte:options immutable />

<script>
  import { customFade } from "../animations/customFade";

  export let currentChannel;
  export let selectChannel;
  export let loading;
  export let error;
  export let data;

  function handleResultClick(snippet) {
    return function () {
      selectChannel({ snippet });
    };
  }

  function handleResultKeyDown(snippet) {
    return function (event) {
      if (event.code.toLowerCase() === "enter") {
        selectChannel({ snippet });
      }
    };
  }
</script>

<div>
  {#if loading}
    <p in:customFade>loading...</p>
  {/if}

  {#if error}
    <p in:customFade>{error}</p>
  {/if}

  {#if data !== undefined}
    {#if data.length}
      <ul>
        {#each data as { snippet } (snippet.channelId)}
          <li
            in:customFade
            on:click={handleResultClick(snippet)}
            on:keydown={handleResultKeyDown(snippet)}
            class:isSelected={snippet.channelId === currentChannel.channelId}
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
