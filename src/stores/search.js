import { youtube } from "../services/youtube";
import { createFetchStore } from "./utils/createFetchStore";

// TODO: make it global; add selectedChannel
function createSearchStore() {
  const { store, load } = createFetchStore(youtube.search);

  return {
    searchStore: store,
    loadSearch: load,
  };
}

export { createSearchStore };
