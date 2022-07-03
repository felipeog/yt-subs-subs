import { API_KEY, BASE_URL } from "../consts";

const errorMessages = {
  accountClosed: "channel closed",
  accountSuspended: "channel suspended",
  subscriptionForbidden: "channel's subs are private",
  subscriberNotFound: "channel not found",
};

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
  searchParams.set("key", API_KEY);

  do {
    try {
      if (pageToken) {
        searchParams.set("pageToken", pageToken);
      }

      response = await fetch(
        `${BASE_URL}/subscriptions?${searchParams.toString()}`
      );
      response = await response.json();

      if (response.error) {
        errorMessage =
          `error: ${errorMessages?.[response.error.errors[0].reason]}` ??
          "an error occurred";

        break;
      }

      preResult = preResult.concat(response.items);
      pageToken = response.nextPageToken;
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
