<svelte:options immutable />

<script>
  import ExternalLink from "./ExternalLink.svelte";
  import Accordion from "./Accordion.svelte";

  export let variation = "big";
  export let snippet;
</script>

{#if variation === "big"}
  <article>
    <h1>
      <ExternalLink
        href="https://www.youtube.com/channel/{snippet.resourceId.channelId}"
      >
        {snippet.title}
      </ExternalLink>
    </h1>

    <p>{snippet.description}</p>

    <Accordion channelId={snippet.resourceId.channelId} />
  </article>
{/if}

{#if variation === "small"}
  <ExternalLink
    href="https://www.youtube.com/channel/{snippet.resourceId.channelId}"
  >
    {snippet.title}
  </ExternalLink>
{/if}
