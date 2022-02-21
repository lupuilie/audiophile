export function randomInRange(min, max) {
  const ids = new Set();
  while (ids.size < max) {
    const number = Math.floor(Math.random() * (max - min) + min);
    ids.add(number);
  }
  return [...ids];
}
