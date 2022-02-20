import POST from "../utils/POST.js";
import GET from "../utils/GET.js";

const endpoint = "./api/cities.json";

class CountriesApi {
  constructor(country) {
    this.country = country;
  }
  async getCities() {
    try {
      const data = { country: this.country };
      const cities = await GET(endpoint, data);
      return { data: cities };
    } catch (err) {
      throw err;
    }
  }
}

export default CountriesApi;
