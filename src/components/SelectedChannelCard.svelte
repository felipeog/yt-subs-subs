<script>
  import { channelStore } from "../stores/channel";
</script>

{#if $channelStore.currentChannel.title}
  <article>
    <h1>{$channelStore.currentChannel.title}</h1>

    <p>{$channelStore.currentChannel.description || "no description"}</p>
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
    margin-top: 0.2rem;
  }
</style>
