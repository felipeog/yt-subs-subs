<script>
  import { ExternalLink } from "components";
  import { channelStore } from "stores/channel";
</script>

{#if $channelStore.currentChannel.title}
  {@const channel = $channelStore.currentChannel}

  <article>
    <h1>
      <ExternalLink href="https://www.youtube.com/channel/{channel.channelId}">
        {channel.title}
      </ExternalLink>
    </h1>

    <p>{channel.description || "no description"}</p>
  </article>
{/if}

<style>
  article {
    margin: 4rem 0;
  }

  h1 {
    font-size: 1.6rem;
  }

  p {
    margin-top: 0.6rem;
  }
</style>
