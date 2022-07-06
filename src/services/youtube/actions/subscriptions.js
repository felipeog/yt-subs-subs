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

  const searchParams = new URLSearchParams({
    part: "snippet",
    channelId: channelId,
    maxResults: "50",
  });

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
    preResult
      .map(({ snippet }) => ({
        title: snippet.title,
        description: snippet.description,
        channelId: snippet.resourceId.channelId,
      }))
      .sort((a, b) => {
        return a.title.localeCompare(b.title);
      });

  cache.set(channelId, result);

  return result;
}

export { subscriptions };

/*
response's relevant values:

{
  "title": "Joshua Fluke",
  "description": "I make a variety of content. I'm always having these wild ideas.",
  "resourceId": {
    "channelId": "UC-91UA-Xy2Cvb98deRXuggA",
  },
}
*/
