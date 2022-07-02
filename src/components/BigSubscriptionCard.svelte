<svelte:options immutable />

<script>
  import ExternalLink from "./ExternalLink.svelte";
  import Accordion from "./Accordion.svelte";
  import SubscriptionsList from "./SubscriptionsList.svelte";
  import { createSubscriptionStore } from "../stores/subscription";

  const { subscriptionStore, loadSubscriptions } = createSubscriptionStore();

  export let snippet;

  let isAccordionOpen = false;

  async function handleClick() {
    isAccordionOpen = !isAccordionOpen;

    if (isAccordionOpen && !$subscriptionStore.subscriptions) {
      await loadSubscriptions({ channelId: snippet.resourceId.channelId });
    }
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

  <p>{snippet.description}</p>

  <Accordion {isAccordionOpen}>
    <button
      slot="trigger"
      on:click={handleClick}
      disabled={$subscriptionStore.loading}
    >
      {isAccordionOpen ? "hide sub's subs" : "see sub's subs"}
    </button>

    <SubscriptionsList
      slot="content"
      variation="small"
      {...$subscriptionStore}
    />
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
