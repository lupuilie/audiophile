/**
 * Source:
 * https://tylerburdsall.medium.com/building-a-dynamic-filter-with-es6-javascript-71dfeb50c371
 */

export function buildFilter(filter) {
  const query = {};
  for (const key in filter) {
    if (filter[key].constructor === Array && filter[key].length > 0) {
      query[key] = filter[key];
    }
  }
  return query;
}

export function filterData(data = [], query = {}) {
  const filteredData = data.filter((item) => {
    for (let key in query) {
      const keyNotFound = !item.hasOwnProperty(key);
      const notMatchingQuery = !query[key].includes(item[key]);
      if (keyNotFound || notMatchingQuery) return false;
    }
    return true;
  });
  return filteredData;
}
