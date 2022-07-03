import { getErrorMessage, fetchJson } from "../utils";

const cache = new Map();

async function subscriptions({ channelId }) {
  if (cache.has(channelId)) {
    return cache.get(channelId);
  }

  let response = {};
  let preResult = [];
  let pageToken = "";
  let errorMessage;

  const searchParams = new URLSearchParams();

  searchParams.set("part", "snippet");
  searchParams.set("channelId", channelId);
  searchParams.set("maxResults", "50");

  do {
    try {
      if (pageToken) {
        searchParams.set("pageToken", pageToken);
      }

      response = await fetchJson({
        path: "/subscriptions",
        searchParams,
      });

      if (response.error) {
        errorMessage = getErrorMessage(response.error);

        break;
      } else {
        preResult = preResult.concat(response.items);
        pageToken = response.nextPageToken;
      }
    } catch (error) {
      errorMessage = error;

      break;
    }
  } while (response.nextPageToken);

  const result =
    errorMessage ??
    preResult.sort((a, b) => {
      return a.snippet.title.localeCompare(b.snippet.title);
    });

  cache.set(channelId, result);

  return result;
}

export { subscriptions };
