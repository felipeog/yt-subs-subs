<script>
  import { tweened } from "svelte/motion";

  import Header from "./components/Header.svelte";
  import Search from "./components/Search.svelte";
  import ScrollToTheTopButton from "./components/ScrollToTheTopButton.svelte";

  const wrapperHeight = tweened(undefined, {
    duration: 200,
  });

  let clientHeight;

  $: $wrapperHeight = clientHeight;
</script>

<div style="height: {$wrapperHeight}px;">
  <main bind:clientHeight>
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
