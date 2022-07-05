<svelte:options immutable />

<script>
  import ExternalLink from "./ExternalLink.svelte";
  import BrowseThisChannelButton from "./BrowseThisChannelButton.svelte";

  export let channel;
</script>

<div>
  <ExternalLink href="https://www.youtube.com/channel/{channel.channelId}">
    {channel.title}
  </ExternalLink>

  <BrowseThisChannelButton {channel} />
</div>

<style>
  div {
    display: grid;
    gap: 1rem;
    grid-template-columns: auto 10rem;
  }
</style>
