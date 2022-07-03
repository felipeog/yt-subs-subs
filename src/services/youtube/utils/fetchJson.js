import { API_KEY, BASE_URL } from "../consts";

async function fetchJson({ path, searchParams }) {
  searchParams.set("key", API_KEY);

  const response = await fetch(`${BASE_URL}${path}?${searchParams.toString()}`);

  return response.json();
}

export { fetchJson };
