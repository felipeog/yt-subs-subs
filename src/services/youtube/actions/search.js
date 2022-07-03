import { getErrorMessage, fetchJson } from "../utils";

const cache = new Map();

async function search({ query }) {
  if (cache.has(query)) {
    return cache.get(query);
  }

  let response = {};
  let preResult = [];
  let errorMessage;

  const searchParams = new URLSearchParams();

  searchParams.set("part", "snippet");
  searchParams.set("maxResults", "50");
  searchParams.set("q", query);
  searchParams.set("type", "channel");

  try {
    response = await fetchJson({
      path: "/search",
      searchParams,
    });

    if (response.error) {
      errorMessage = getErrorMessage(response.error);
    } else {
      preResult = preResult.concat(response.items);
    }
  } catch (error) {
    errorMessage = error;
  }

  const result = errorMessage ?? preResult;

  cache.set(query, result);

  return result;
}

export { search };
