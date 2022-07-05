import { writable } from "svelte/store";

import { loadSubscriptions } from "./subscriptions";

const channelStore = writable({
  currentChannel: {},
});

channelStore.subscribe(async (state) => {
  if (state.currentChannel.channelId) {
    await loadSubscriptions({
      channelId: state.currentChannel.channelId,
    });
  }
});

function selectChannel(channel) {
  channelStore.update(() => ({
    currentChannel: channel,
  }));
}

export { channelStore, selectChannel };
