<script>
  import { searchStore } from "../stores/search";
</script>

{#if $searchStore.currentChannel.channelTitle}
  <article>
    <h1>{$searchStore.currentChannel.channelTitle}</h1>

    <p>{$searchStore.currentChannel.description ?? "no description"}</p>
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
