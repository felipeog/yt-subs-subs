const apiErrors = {
  forbidden: "api connection blocked",
  quotaExceeded: "api quota exceeded",
};

const subscriptionsListErrors = {
  accountClosed: "channel closed",
  accountSuspended: "channel suspended",
  subscriptionForbidden: "channel's subs are private",
  subscriberNotFound: "channel not found",
};

const errorMessages = {
  ...apiErrors,
  ...subscriptionsListErrors,
};

function getErrorMessage(error) {
  return errorMessages?.[error?.errors?.[0]?.reason] ?? "an error occurred";
}

export { getErrorMessage };
