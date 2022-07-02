<svelte:options immutable />

<script>
  import { fade } from "svelte/transition";

  import SubscriptionItem from "./SubscriptionItem.svelte";

  export let variation = "big";
  export let loading;
  export let error;
  export let subscriptions;
</script>

<section>
  {#if loading}
    <p>loading...</p>
  {/if}

  {#if error}
    <p>{error}</p>
  {/if}

  {#if subscriptions !== undefined}
    {@const subscriptionsCount = subscriptions.length}

    <p class="count">{subscriptionsCount} subs found</p>

    {#if subscriptions.length}
      <ol>
        {#each subscriptions as { snippet } (snippet.resourceId.channelId)}
          <li class={variation} transition:fade={{ duration: 200 }}>
            <SubscriptionItem {variation} {snippet} />
          </li>
        {/each}
      </ol>
    {/if}
  {/if}
</section>

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
