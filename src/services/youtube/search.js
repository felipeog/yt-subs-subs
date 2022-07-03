import { API_KEY, BASE_URL } from "./consts";

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
  searchParams.set("key", API_KEY);

  try {
    response = await fetch(`${BASE_URL}/search?${searchParams.toString()}`);
    response = await response.json();

    preResult = preResult.concat(response.items);
  } catch (error) {
    errorMessage = error;
  }

  const result = errorMessage ?? preResult;

  cache.set(query, result);

  return result;
}

export { search };
