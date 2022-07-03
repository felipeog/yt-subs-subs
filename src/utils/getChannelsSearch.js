const searchMap = new Map();

async function getChannelsSearch({ query }) {
  if (searchMap.has(query)) {
    return searchMap.get(query);
  }

  let response = {};
  let preResult = [];
  let errorMessage;

  const searchParams = new URLSearchParams();

  searchParams.set("part", "snippet");
  searchParams.set("maxResults", "50");
  searchParams.set("q", query);
  searchParams.set("type", "channel");
  searchParams.set("key", import.meta.env.VITE_YT_API_KEY);

  try {
    response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?${searchParams.toString()}`
    );
    response = await response.json();

    preResult = preResult.concat(response.items);
  } catch (error) {
    errorMessage = error;
  }

  const result = errorMessage ?? preResult;

  searchMap.set(query, result);

  return result;
}

export { getChannelsSearch };
