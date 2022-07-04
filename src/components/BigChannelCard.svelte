<svelte:options immutable />

<script>
  import ExternalLink from "./ExternalLink.svelte";
  import Accordion from "./Accordion.svelte";
  import ChannelsList from "./ChannelsList.svelte";
  import { createSubscriptionsStore } from "../stores/subscriptions";

  const { subscriptionsStore, loadSubscriptions } = createSubscriptionsStore();

  export let snippet;

  let isAccordionOpen = false;

  $: {
    if (isAccordionOpen) {
      (async () => {
        await loadSubscriptions({ channelId: snippet.resourceId.channelId });
      })();
    }
  }

  async function toggleAccordion() {
    isAccordionOpen = !isAccordionOpen;
  }
</script>

<article>
  <h1>
    <ExternalLink
      href="https://www.youtube.com/channel/{snippet.resourceId.channelId}"
    >
      {snippet.title}
    </ExternalLink>
  </h1>

  {#if snippet.description}
    <p>{snippet.description}</p>
  {/if}

  <Accordion {isAccordionOpen}>
    <button
      slot="trigger"
      on:click={toggleAccordion}
      disabled={$subscriptionsStore.loading}
    >
      {isAccordionOpen ? "hide sub's subs" : "see sub's subs"}
    </button>

    <ChannelsList slot="content" variation="small" {...$subscriptionsStore} />
  </Accordion>
</article>

<style>
  h1 {
    font-size: 1.6rem;
  }

  p,
  button {
    margin-top: 1rem;
  }
</style>
