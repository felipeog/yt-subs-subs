<svelte:options immutable />

<script>
  import { selectChannel } from "../stores/channel";

  export let channel;

  async function handleButtonClick() {
    selectChannel(channel);

    document.body.scrollIntoView();
  }
</script>

<button class="small" on:click={handleButtonClick}>browse this channel</button>

<style>
  /* TODO: create smaller button */
</style>
