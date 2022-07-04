<svelte:options immutable />

<!-- TODO: scroll to the top -->
<script>
  import { loadSubscriptions } from "../stores/subscriptions";

  export let channelId;

  async function handleClick() {
    await loadSubscriptions({ channelId });
  }
</script>

<button class="small" on:click={handleClick}>browse this channel</button>

<style>
  /* TODO: create smaller button */
</style>
