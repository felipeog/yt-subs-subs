import { writable } from "svelte/store";

function createFetchStore({ fetchFunction, extraValues = {} }) {
  const store = writable({
    ...extraValues,
    loading: false,
    error: "",
    data: undefined,
  });

  async function load(args) {
    store.update((prevState) => ({
      ...prevState,
      loading: true,
      error: "",
      data: undefined,
    }));

    const response = await fetchFunction(args);

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
