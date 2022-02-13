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
      const keyNotExists = item[key] === undefined;
      const isNotSameValue = !query[key].includes(item[key]);

      if (keyNotExists || isNotSameValue) return false;
    }
    return true;
  });
  return filteredData;
}
