<script>
  import Accordion from "./Accordion.svelte";

  export let snippet;
</script>

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
