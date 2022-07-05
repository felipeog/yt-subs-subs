<svelte:options immutable />

<!-- TODO: scroll to the top -->
<script>
  import { selectChannel } from "../stores/search";

  export let channel;

  async function handleClick() {
    selectChannel(channel);
  }
</script>

<button class="small" on:click={handleClick}>browse this channel</button>

<style>
  /* TODO: create smaller button */
</style>
