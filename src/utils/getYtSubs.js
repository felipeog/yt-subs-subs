const ERRORS = {
  accountClosed: "account closed",
  accountSuspended: "account suspended",
  subscriptionForbidden: "account's subs are private",
  subscriberNotFound: "account not found",
};

async function getYtSubs({ channelId }) {
  let response = {};
  let results = [];
  let pageToken = "";
  let errorMessage;

  const searchParams = new URLSearchParams();

  searchParams.set("part", "snippet");
  searchParams.set("channelId", channelId);
  searchParams.set("maxResults", "50");
  searchParams.set("key", import.meta.env.VITE_YT_API_KEY);
  // FIXME: does not work:
  // searchParams.set("order", "alphabetical");

  do {
    try {
      if (pageToken) {
        searchParams.set("pageToken", pageToken);
      } else {
        searchParams.set("pageToken", pageToken);
      }

      response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/subscriptions?${searchParams.toString()}`
      );
      response = await response.json();

      if (response.error) {
        console.error(`${channelId} >>>>> ${response.error.message}`);

        errorMessage =
          `error: ${ERRORS?.[response.error.errors[0].reason]}` ??
          "an error occurred";

        break;
      }

      results = results.concat(response.items);
      pageToken = response.nextPageToken;
    } catch (error) {
      console.error(`${channelId} >>>>> ${error}`);

      errorMessage = error;

      break;
    }
  } while (response.nextPageToken);

  return errorMessage ?? results;
}

export { getYtSubs };
