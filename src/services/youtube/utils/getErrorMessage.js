const coreErrors = {
  forbidden: "api connection blocked",
  quotaExceeded: "api quota exceeded",
};

const searchListErrors = {
  // no relevant errors
};

const subscriptionsListErrors = {
  accountClosed: "channel closed",
  accountSuspended: "channel suspended",
  subscriptionForbidden: "channel's subs are private",
  subscriberNotFound: "channel not found",
};

const errorMessages = {
  ...coreErrors,
  ...searchListErrors,
  ...subscriptionsListErrors,
};

function getErrorMessage(error) {
  return errorMessages?.[error?.errors?.[0]?.reason] ?? "an error occurred";
}

export { getErrorMessage };
