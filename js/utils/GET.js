async function GET(url = "", data = {}) {
  if (!url) return;

  try {
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Cannot POST data to ${url}`);
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

export default GET;
