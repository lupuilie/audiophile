function formValidation(form) {
  let success = false;
  const name = form.querySelector("#name");
  const email = form.querySelector("#email");
  const phone = form.querySelector("#phone");
  const address = form.querySelector("#address");
  const zip = form.querySelector("#zip");
  const city = form.querySelector("#select-city");
  const country = form.querySelector("#select-country");
  const payOnline = form.querySelector("#pay-online");
  const payDelivery = form.querySelector("#pay-delivery");

  const values = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
    zip: zip.value,
    city: city.value,
    country: country.value,
    payOnline: payOnline.checked ? true : false,
  };

  return {
    values,
    success,
  };
}

export default formValidation;
