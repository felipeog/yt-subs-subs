<svelte:options immutable />

<script>
  import { customFade } from "../animations/customFade";

  import SubscriptionItem from "./SubscriptionItem.svelte";

  export let variation = "big";
  export let loading;
  export let error;
  export let subscriptions;
</script>

<div>
  {#if loading}
    <p in:customFade>loading...</p>
  {/if}

  {#if error}
    <p in:customFade>{error}</p>
  {/if}

  {#if subscriptions !== undefined}
    {@const subscriptionsCount = subscriptions.length}

    <p class="count">{subscriptionsCount} subs found</p>

    {#if subscriptions.length}
      <ol>
        {#each subscriptions as { snippet } (snippet.resourceId.channelId)}
          <li class={variation} in:customFade>
            <SubscriptionItem {variation} {snippet} />
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
