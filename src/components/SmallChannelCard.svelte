<svelte:options immutable />

<script>
  import ExternalLink from "./ExternalLink.svelte";

  export let snippet;
</script>

<ExternalLink
  href="https://www.youtube.com/channel/{snippet.resourceId.channelId}"
>
  {snippet.title}
</ExternalLink>
