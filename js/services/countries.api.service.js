import POST from "../utils/POST.js";
import GET from "../utils/GET.js";

class CountriesApi {
  constructor(country) {
    this.country = country;
  }
  async getCities() {
    try {
      const data = { country: this.country };
      const cities = await POST(
        "https://countriesnow.space/api/v0.1/countries/cities",
        data
      );
      return cities;
    } catch (err) {
      throw err;
    }
  }
}

export default CountriesApi;
