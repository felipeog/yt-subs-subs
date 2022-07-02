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
    <p>{subscriptions.length} subs found</p>

    {#if subscriptions.length}
      <ol>
        {#each subscriptions as { snippet } (snippet.resourceId.channelId)}
          <li transition:fade={{ duration: 200 }}>
            <SubscriptionItem {variation} {snippet} />
          </li>
        {/each}
      </ol>
    {/if}
  {/if}
</section>
