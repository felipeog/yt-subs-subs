import { writable } from "svelte/store";

import { getYtSubs } from "../utils/getYtSubs";

function subscription() {
  let subscriptionStore = writable({
    loading: false,
    error: "",
    subscriptions: undefined,
  });

  async function loadSubscriptions({ channelId }) {
    subscriptionStore.set({
      loading: true,
      error: "",
      subscriptions: undefined,
    });

    const response = await getYtSubs({ channelId });

    if (typeof response === "string") {
      subscriptionStore.update((prevState) => ({
        ...prevState,
        error: response,
      }));
    } else {
      subscriptionStore.update((prevState) => ({
        ...prevState,
        subscriptions: response,
      }));
    }

    subscriptionStore.update((prevState) => ({
      ...prevState,
      loading: false,
    }));
  }

  return { subscriptionStore, loadSubscriptions };
}

export { subscription };
