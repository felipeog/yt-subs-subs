import { youtube } from "../services/youtube";
import { createFetchStore } from "./utils/createFetchStore";

function createSearchStore() {
  const { store, load } = createFetchStore(youtube.search);

  return {
    searchStore: store,
    loadSearch: load,
  };
}

export { createSearchStore };
