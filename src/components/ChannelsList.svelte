<svelte:options immutable />

<script>
  import { customFade } from "../animations/customFade";

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
    {@const subscriptionsCount = data.length}

    <p class="count">{subscriptionsCount} subs found</p>

    {#if data.length}
      <ol>
        {#each data as { snippet } (snippet.resourceId.channelId)}
          <li class={variation} in:customFade>
            <ChannelItem {variation} {snippet} />
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
