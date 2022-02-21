import { AppCart, openCheckoutModal } from "./../events.js";
import {
  checkoutSections,
  citiesDatalist,
  checkoutForm,
  checkoutSummary,
} from "../elements.js";
import { productsList, summaryInfo } from "./checkout/summary.js";
import formValidation from "./checkout/formValidation.js";
import { addCities } from "./checkout/datalists.js";
import createElement from "../utils/createElement.js";

const isCartEmpty = AppCart.getCount() === 0;
const summaryLoader = checkoutSummary.querySelector(".loader");

if (isCartEmpty) checkoutSections.classList.add("blur");

/* Add datalist options to City */
addCities(citiesDatalist);

/* Summary  */
checkoutSummary.append(productsList(AppCart.getItems()));
summaryLoader.remove();
checkoutSummary.append(summaryInfo(AppCart));
const submit = createElement("button", {
  textContent: "Send Order",
  type: "submit",
  className: "btn btn-primary",
  form: "checkout-form",
});
checkoutSummary.append(submit);

formValidation(checkoutForm);

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = formValidation(checkoutForm, { formSubmit: true });
  if (formData.success) openCheckoutModal();
});
