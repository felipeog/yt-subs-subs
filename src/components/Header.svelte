<script>
  import ExternalLink from "./ExternalLink.svelte";
</script>

<header>
  <h1>yt subs' subs</h1>

  <p>
    <ExternalLink href="https://support.google.com/youtube/answer/3250431">
      find your yt channel id
    </ExternalLink>
    /
    <ExternalLink href="https://support.google.com/youtube/answer/7280190">
      make your yt subs public
    </ExternalLink>
  </p>
</header>

<style>
  header {
    display: grid;

    gap: 0.6rem;
  }

  h1 {
    font-size: 2.4rem;
    font-weight: bold;
  }
</style>
