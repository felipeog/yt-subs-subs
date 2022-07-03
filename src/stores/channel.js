import { writable } from "svelte/store";

import { youtube } from "../services/youtube";

// TODO: create createFetchStore
function createChannelStore() {
  const channelStore = writable({
    loading: false,
    error: "",
    channels: undefined,
  });

  async function searchChannels({ query }) {
    channelStore.set({
      loading: true,
      error: "",
      channels: undefined,
    });

    const response = await youtube.search({ query });

    if (typeof response === "string") {
      channelStore.update((prevState) => ({
        ...prevState,
        error: response,
      }));
    } else {
      channelStore.update((prevState) => ({
        ...prevState,
        channels: response,
      }));
    }

    channelStore.update((prevState) => ({
      ...prevState,
      loading: false,
    }));
  }

  return { channelStore, searchChannels };
}

export { createChannelStore };
