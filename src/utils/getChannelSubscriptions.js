const ERRORS = {
  accountClosed: "channel closed",
  accountSuspended: "channel suspended",
  subscriptionForbidden: "channel's subs are private",
  subscriberNotFound: "channel not found",
};

const channelsMap = new Map();

async function getChannelSubscriptions({ channelId }) {
  if (channelsMap.has(channelId)) {
    return channelsMap.get(channelId);
  }

  let response = {};
  let preResult = [];
  let pageToken = "";
  let errorMessage;

  const searchParams = new URLSearchParams();

  searchParams.set("part", "snippet");
  searchParams.set("channelId", channelId);
  searchParams.set("maxResults", "50");
  searchParams.set("key", import.meta.env.VITE_YT_API_KEY);

  do {
    try {
      if (pageToken) {
        searchParams.set("pageToken", pageToken);
      }

      response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/subscriptions?${searchParams.toString()}`
      );
      response = await response.json();

      if (response.error) {
        errorMessage =
          `error: ${ERRORS?.[response.error.errors[0].reason]}` ??
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

  channelsMap.set(channelId, result);

  return result;
}

export { getChannelSubscriptions };
