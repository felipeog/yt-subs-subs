<script>
  import { tweened } from "svelte/motion";

  import { Header, Search, ScrollToTheTopButton } from "components";
  import { channelStore } from "stores/channel";

  const wrapperHeight = tweened(undefined, {
    duration: 200,
  });

  let mainHeight;

  $: $wrapperHeight = mainHeight;
  $: headTitle = $channelStore.currentChannel.title
    ? `yt-subs-subs | ${$channelStore.currentChannel.title}`
    : "yt-subs-subs";
</script>

<svelte:head>
  <title>{headTitle}</title>
</svelte:head>

<div style="height: {$wrapperHeight}px;">
  <main bind:clientHeight={mainHeight}>
    <Header />
    <Search />
    <ScrollToTheTopButton />
  </main>
</div>

<style>
  main {
    width: 768px;
    margin: 0 auto;
    padding: 6rem 1rem;
  }
</style>
