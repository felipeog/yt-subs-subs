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

  const result =
    errorMessage ??
    preResult.map(({ snippet }) => ({
      title: snippet.title,
      description: snippet.description,
      channelId: snippet.channelId,
    }));

  cache.set(query, result);

  return result;
}

export { search };

/*
response's relevant values:

{
  "title": "Ben Awad",
  "description": "I'm a software developer who makes videos about React, React Native, GraphQL, Typescript, Node.js, PostgreSQL, Python, and ...",
  "channelId": "UC-8QAzbLcRglXeN_MY9blyw",
}
*/
