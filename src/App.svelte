<script>
  import Header from "./components/Header.svelte";
  import SubscriptionsSearch from "./components/SubscriptionsSearch.svelte";
</script>

<main>
  <Header />
  <SubscriptionsSearch />
  <!-- TODO: <ScrollToTheTopButton /> -->
</main>

<style>
  main {
    max-width: 960px;
    margin: 0 auto;
    padding: 6rem 1rem;
  }
</style>
