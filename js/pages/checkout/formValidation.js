import validateInput from "../../utils/validateInput.js";
import { AppCart, User } from "../../events.js";

function formValidation(form, { formSubmit = false } = {}) {
  const name = form.querySelector("#name");
  const email = form.querySelector("#email");
  const phone = form.querySelector("#phone");
  const address = form.querySelector("#address");
  const zip = form.querySelector("#zip");
  const city = form.querySelector("#select-city");
  const country = form.querySelector("#select-country");
  const payOnline = form.querySelector("#pay-online");
  const payDelivery = form.querySelector("#pay-delivery");

  if (User.getLoggedUser()) {
    const loggedUser = User.getLoggedUser();
    name.value = `${loggedUser.first_name} ${loggedUser.last_name}`;
    email.value = loggedUser.email;
  }

  const formInputs = [
    {
      id: "name",
      element: name,
      value: name.value,
      validations: { required: true, minLength: 5, lettersOnly: true },
    },
    {
      id: "email",
      element: email,
      value: email.value,
      validations: { required: true, email: true },
    },
    {
      id: "phone",
      element: phone,
      value: phone.value,
      validations: {
        required: true,
        numbersOnly: true,
        minLength: 10,
        maxLength: 10,
      },
    },
    {
      id: "address",
      element: address,
      value: address.value,
      validations: { required: true, minLength: 10 },
    },
    {
      id: "zip",
      element: zip,
      value: zip.value,
      validations: {
        numbersOnly: true,
        required: false,
        minLength: 5,
        maxLength: 6,
      },
    },
    {
      id: "city",
      element: city,
      value: city.value,
      validations: { required: true },
    },
  ];

  formInputs.forEach((input) => {
    const events = ["change", "keydown", "keyup"];
    events.forEach((event) => {
      input.element.addEventListener(event, () => {
        input.valid = validateInput(input.element, { ...input.validations });
      });
      if (formSubmit)
        input.valid = validateInput(input.element, { ...input.validations });
    });
  });

  /* get form values */
  const formValues = {};
  formInputs.forEach((input) => {
    formValues[input.id] = input.value;
  });

  /* check if all inputs passed validation */
  const success = formInputs.every((input) => input.valid === true);

  return {
    success,
    formValues,
  };
}

export default formValidation;
