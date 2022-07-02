<script>
  export let snippet;
  export let index;
</script>

<h1 style="--index: '{index}. '">
  <a
    href="https://www.youtube.com/channel/{snippet.resourceId.channelId}"
    target="_blank"
    rel="noopener noreferrer"
  >
    {snippet.title}
  </a>
</h1>

<p>{snippet.description}</p>

<style>
  h1::before {
    content: var(--index);
  }
</style>
