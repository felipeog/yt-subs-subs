<script>
  import Accordion from "./Accordion.svelte";

  export let variation = "big";
  export let snippet;
</script>

{#if variation === "big"}
  <article>
    <h1>
      <a
        href="https://www.youtube.com/channel/{snippet.resourceId.channelId}"
        target="_blank"
        rel="noopener noreferrer"
      >
        {snippet.title}
      </a>
    </h1>

    <p>{snippet.description}</p>

    <Accordion channelId={snippet.resourceId.channelId} />
  </article>
{/if}

{#if variation === "small"}
  <a
    href="https://www.youtube.com/channel/{snippet.resourceId.channelId}"
    target="_blank"
    rel="noopener noreferrer"
  >
    {snippet.title}
  </a>
{/if}
