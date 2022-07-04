<svelte:options immutable />

<script>
  import BrowseThisChannelButton from "./BrowseThisChannelButton.svelte";
  import ExternalLink from "./ExternalLink.svelte";
  import Accordion from "./Accordion.svelte";
  import ChannelsList from "./ChannelsList.svelte";
  import { youtube } from "../services/youtube";
  import { createFetchStore } from "../stores/utils/createFetchStore";

  const { store: localSubscriptionsStore, load: localLoadSubscriptions } =
    createFetchStore({ fetchFunction: youtube.subscriptions });

  export let snippet;

  let isAccordionOpen = false;

  $: {
    if (isAccordionOpen) {
      (async () => {
        await localLoadSubscriptions({
          channelId: snippet.resourceId.channelId,
        });
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

    <BrowseThisChannelButton channelId={snippet.resourceId.channelId} />
  </h1>

  <p>{snippet.description ?? "no description"}</p>

  <Accordion {isAccordionOpen}>
    <button
      slot="trigger"
      on:click={toggleAccordion}
      disabled={$localSubscriptionsStore.loading}
    >
      {isAccordionOpen ? "hide sub's subs" : "see sub's subs"}
    </button>

    <ChannelsList
      slot="content"
      variation="small"
      {...$localSubscriptionsStore}
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
