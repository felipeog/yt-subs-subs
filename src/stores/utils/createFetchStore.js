import { writable } from "svelte/store";

function createFetchStore(get) {
  const store = writable({
    loading: false,
    error: "",
    data: undefined,
  });

  async function load(args) {
    store.set({
      loading: true,
      error: "",
      data: undefined,
    });

    const response = await get(args);

    if (typeof response === "string") {
      store.update((prevState) => ({
        ...prevState,
        error: response,
      }));
    } else {
      store.update((prevState) => ({
        ...prevState,
        data: response,
      }));
    }

    store.update((prevState) => ({
      ...prevState,
      loading: false,
    }));
  }

  return { store, load };
}

export { createFetchStore };
