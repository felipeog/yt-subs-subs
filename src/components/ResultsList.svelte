<svelte:options immutable />

<script>
  import { customFade } from "../animations/customFade";
  import { searchStore } from "../stores/search";
  import { channelStore, selectChannel } from "../stores/channel";

  function handleResultClick(channel) {
    return () => {
      selectChannel(channel);
    };
  }

  function handleResultKeyDown(channel) {
    return (event) => {
      if (event.code.toLowerCase() === "enter") {
        selectChannel(channel);
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
        {#each $searchStore.data as channel (channel.channelId)}
          <li
            in:customFade
            on:click={handleResultClick(channel)}
            on:keydown={handleResultKeyDown(channel)}
            class:isSelected={channel.channelId ===
              $channelStore.currentChannel.channelId}
            tabindex="0"
          >
            {channel.title}
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
