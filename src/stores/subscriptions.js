import { youtube } from "../services/youtube";
import { createFetchStore } from "./utils/createFetchStore";

function createSubscriptionsStore() {
  const { store, load } = createFetchStore(youtube.subscriptions);

  return {
    subscriptionsStore: store,
    loadSubscriptions: load,
  };
}

export { createSubscriptionsStore };
