const API_URL = "http://locahost:1337";

export async function listenLogs() {
  const response = await fetch("http://localhost:1337/api/logs");
  const json = await response.json();

  return json;
}

export async function createLogs(entry) {
  const URL = `${API_URL}/api/logs`;
  const apiKey = entry.apiKey;

  delete entry.apiKey;

  const response = await fetch("http://localhost:1337/api/logs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify(entry),
  });

  const json = await response.json();

  if (response.ok) {
    return json;
  }

  const error = new Error(json.message);
  error.response = json;
  throw error;
}
