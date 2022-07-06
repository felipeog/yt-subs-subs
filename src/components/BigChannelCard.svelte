<svelte:options immutable />

<script>
  import BrowseThisChannelButton from "./BrowseThisChannelButton.svelte";
  import ExternalLink from "./ExternalLink.svelte";
  import Accordion from "./Accordion.svelte";
  import ChannelsList from "./ChannelsList.svelte";
  import { youtube } from "../services/youtube";
  import { createFetchStore } from "../stores/utils";

  const { store: localSubscriptionsStore, load: localLoadSubscriptions } =
    createFetchStore({ fetchFunction: youtube.subscriptions });

  export let channel;

  let isAccordionOpen = false;

  $: {
    if (isAccordionOpen) {
      (async () => {
        await localLoadSubscriptions({
          channelId: channel.channelId,
        });
      })();
    }
  }

  async function handleTriggerClick() {
    isAccordionOpen = !isAccordionOpen;
  }
</script>

<article>
  <h1>
    <ExternalLink href="https://www.youtube.com/channel/{channel.channelId}">
      {channel.title}
    </ExternalLink>

    <BrowseThisChannelButton {channel} />
  </h1>

  <p>{channel.description || "no description"}</p>

  <Accordion {isAccordionOpen}>
    <button
      slot="trigger"
      on:click={handleTriggerClick}
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
    display: grid;
    gap: 1rem;
    grid-template-columns: auto 10rem;
    font-size: 1.6rem;
  }

  p,
  button {
    margin-top: 1rem;
  }
</style>
