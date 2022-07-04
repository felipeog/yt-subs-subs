import { youtube } from "../services/youtube";
import { createFetchStore } from "./utils/createFetchStore";
import { loadSubscriptions } from "./subscriptions";

const { store: searchStore, load: loadSearch } = createFetchStore({
  fetchFunction: youtube.search,
  extraValues: { currentChannel: {} },
});

searchStore.subscribe((state) => {
  if (state.currentChannel?.snippet?.channelId) {
    loadSubscriptions({ channelId: state.currentChannel.snippet.channelId });
  }
});

function selectChannel(channel) {
  searchStore.update((prevState) => ({
    ...prevState,
    currentChannel: channel,
  }));
}

export { searchStore, loadSearch, selectChannel };
