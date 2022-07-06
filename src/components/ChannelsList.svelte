<svelte:options immutable />

<script>
  import { customFade } from "../animations";
  import ChannelItem from "./ChannelItem.svelte";

  export let variation = "big";
  export let loading;
  export let error;
  export let data;
</script>

<div>
  {#if loading}
    <p in:customFade>loading...</p>
  {/if}

  {#if error}
    <p in:customFade>{error}</p>
  {/if}

  {#if data !== undefined}
    {@const channelsCount = data.length}

    <p class="count">{channelsCount} subs found</p>

    {#if data.length}
      <ol>
        {#each data as channel (channel.channelId)}
          <li class={variation} in:customFade>
            <ChannelItem {variation} {channel} />
          </li>
        {/each}
      </ol>
    {/if}
  {/if}
</div>

<style>
  p {
    margin-top: 1rem;
  }

  .count {
    font-style: italic;
    margin-bottom: 1rem;
  }

  .big {
    margin-top: 4rem;
  }

  .big:first-child {
    margin-top: 2rem;
  }

  .small {
    margin-top: 0.1rem;
  }
</style>
