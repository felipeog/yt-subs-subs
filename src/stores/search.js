import { youtube } from "../services/youtube";
import { createFetchStore } from "./utils/createFetchStore";

const { store: searchStore, load: loadSearch } = createFetchStore({
  fetchFunction: youtube.search,
});

export { searchStore, loadSearch };
