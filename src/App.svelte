<script>
  import Header from "./components/Header.svelte";
  import Search from "./components/Search.svelte";
</script>

<main>
  <Header />
  <Search />
  <!-- TODO: <ScrollToTheTopButton /> -->
</main>

<style>
  main {
    max-width: 960px;
    margin: 0 auto;
    padding: 6rem 1rem;
  }
</style>
