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
  .small {
    font-size: 0.8rem;
    padding: 0.1rem 0.2rem;
    background-color: transparent;
    color: var(--primary_color);
  }
</style>
