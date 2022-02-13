async function POST(url = "", body = {}) {
  if (!url) return;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (data.error) throw data;
    if (!response.ok) throw `Error fetching ${url}`;
    return data;
  } catch (err) {
    throw err;
  }
}

export default POST;
