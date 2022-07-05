import { youtube } from "../services/youtube";
import { createFetchStore } from "./utils/createFetchStore";
import { loadSubscriptions } from "./subscriptions";

const { store: searchStore, load: loadSearch } = createFetchStore({
  fetchFunction: youtube.search,
  extraValues: { currentChannel: {} },
});

// TODO: create channel store
searchStore.subscribe(async (state) => {
  if (state.currentChannel.channelId) {
    await loadSubscriptions({
      channelId: state.currentChannel.channelId,
    });
  }
});

function selectChannel(channel) {
  console.log("🚀 ~ channel", channel);

  searchStore.update((prevState) => ({
    ...prevState,
    currentChannel: channel,
  }));
}

export { searchStore, loadSearch, selectChannel };
