import { youtube } from "../services/youtube";
import { createFetchStore } from "./utils";

const { store: subscriptionsStore, load: loadSubscriptions } = createFetchStore(
  { fetchFunction: youtube.subscriptions }
);

export { subscriptionsStore, loadSubscriptions };
