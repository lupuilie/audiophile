import CountriesApi from "../../services/countries.api.service.js";
import createElement from "../../utils/createElement.js";

export function addCities(datalist, country = "romania") {
  const countries = new CountriesApi(country);
  countries.getCities().then((res) => {
    if (!res.data) return;
    const { data: cities } = res;
    for (const city of cities) {
      const option = createElement("option", { value: city });
      datalist.append(option);
    }
  });
}
