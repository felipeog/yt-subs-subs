<svelte:options immutable />

<script>
  import ExternalLink from "./ExternalLink.svelte";
  import BrowseThisChannelButton from "./BrowseThisChannelButton.svelte";

  export let snippet;
</script>

<div>
  <ExternalLink
    href="https://www.youtube.com/channel/{snippet.resourceId.channelId}"
  >
    {snippet.title}
  </ExternalLink>

  <BrowseThisChannelButton channelId={snippet.resourceId.channelId} />
</div>
