async function POST(url = "", data = {}) {
  if (!url) return;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Cannot POST data to ${url}`);
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

export default POST;
