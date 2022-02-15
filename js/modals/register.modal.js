import createElement from "./../utils/createElement.js";
import { openLoginModal, registerUser } from "./../events.js";
import validateInput from "../utils/validateInput.js";
import { capitalize } from "./../utils/string.js";

function registerModal() {
  const modalWrapper = createElement("div", {
    className: "container modal-wrapper",
  });
  const modalContent = createElement("div", { className: "modal-user" });
  const modalHeader = createElement("div", { className: "modal-header" });
  modalHeader.append(createElement("h6", { textContent: "Register" }));
  const modalForm = createElement("form", { className: "modal-form" });
  const nameInputGroup = createElement("div", { className: "input-group" });
  const nameLabel = createElement("label");
  nameLabel.append(createElement("span", { textContent: "Name" }));
  const nameInput = createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "Type your full name",
  });
  nameLabel.append(nameInput);
  nameInputGroup.append(nameLabel);
  const emailInputGroup = createElement("div", { className: "input-group" });
  const emailLabel = createElement("label");
  emailLabel.append(createElement("span", { textContent: "Email" }));
  const emailInput = createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "Insert your email address",
  });
  emailLabel.append(emailInput);
  emailInputGroup.append(emailLabel);
  const passwordInputGroup = createElement("div", { className: "input-group" });
  const passwordLabel = createElement("label");
  passwordLabel.append(createElement("span", { textContent: "Password" }));
  const passwordInput = createElement("input", {
    type: "password",
    className: "form-control",
    placeholder: "Insert a strong password",
  });
  passwordLabel.append(passwordInput);
  passwordInputGroup.append(passwordLabel);
  const submitBtn = createElement("button", {
    textContent: "Submit",
    className: "btn btn-primary submit-btn",
  });
  modalForm.append(
    nameInputGroup,
    emailInputGroup,
    passwordInputGroup,
    submitBtn
  );
  const p = createElement("p");
  p.append("If you already have an acoount? ");
  const loginLink = createElement("a", {
    textContent: "Login here",
    href: "#",
  });
  p.append(loginLink);

  modalContent.append(modalHeader, modalForm, p);
  modalWrapper.append(modalContent);

  const inputEvents = ["change", "keyup", "keydown"];
  inputEvents.forEach((event) => {
    nameInput.addEventListener(event, () => {
      validateInput(nameInput, { minLength: 5, lettersOnly: true });
    });
    emailInput.addEventListener(event, () =>
      validateInput(emailInput, { email: true })
    );
    passwordInput.addEventListener(event, () =>
      validateInput(passwordInput, { password: true })
    );
  });

  async function onFormSubmit(e) {
    e.preventDefault();
    const modalError = document.querySelector(".modal-error");

    const nameInputValidation = validateInput(nameInput, {
      minLength: 5,
      lettersOnly: true,
    });
    const emailInputValidation = validateInput(emailInput, { email: true });
    const passwordInputValidation = validateInput(passwordInput, {
      password: true,
    });
    if (
      !nameInputValidation ||
      !emailInputValidation ||
      !passwordInputValidation
    )
      return;

    const userInfo = {
      name: nameInput.value,
      email: emailInput.value.toLowerCase(),
      password: passwordInput.value,
    };

    try {
      const register = await registerUser(userInfo);
      if (register.error) throw register.error;
      if (register.success) {
        console.log("user registered");
        openLoginModal();
      }
    } catch (err) {
      if (modalError) return (modalError.textContent = capitalize(err));
      const newModalError = createElement("p", {
        textContent: capitalize(err),
        className: "modal-error",
      });
      modalForm.prepend(newModalError);
    }
  }

  /* Event Listeners */
  modalForm.addEventListener("submit", onFormSubmit);
  loginLink.addEventListener("click", openLoginModal);

  return modalWrapper;
}

export default registerModal;
