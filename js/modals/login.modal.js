import createElement from "./../utils/createElement.js";
import {
  loginUser,
  openRegisterModal,
  openLoggedUserModal,
} from "../events.js";
import validateInput from "../utils/validateInput.js";
import { capitalize } from "../utils/string.js";

function loginModal() {
  const modalWrapper = createElement("div", {
    className: "container modal-wrapper",
  });
  const modalContent = createElement("div", { className: "modal-user" });
  const modalHeader = createElement("div", { className: "modal-header" });
  modalHeader.append(createElement("h6", { textContent: "Login" }));
  const modalForm = createElement("form", { className: "modal-form" });
  const emailInputGroup = createElement("div", { className: "input-group" });
  const emailLabel = createElement("label");
  emailLabel.append(createElement("span", { textContent: "Email" }));
  const emailInput = createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "Insert your email address (Hint: eve.holt@reqres.in)",
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
  modalForm.append(emailInputGroup, passwordInputGroup, submitBtn);
  const p = createElement("p");
  p.append("You don't have an account? ");
  const registerLink = createElement("a", {
    textContent: "Register here",
    href: "#",
  });
  p.append(registerLink);

  modalContent.append(modalHeader, modalForm, p);
  modalWrapper.append(modalContent);

  const inputEvents = ["change", "keyup", "keydown"];
  inputEvents.forEach((event) => {
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

    const emailInputValidation = validateInput(emailInput, { email: true });
    const passwordInputValidation = validateInput(passwordInput, {
      password: true,
    });

    if (!emailInputValidation || !passwordInputValidation) return;

    const userInfo = {
      email: emailInput.value.toLowerCase(),
      password: passwordInput.value,
    };
    try {
      const login = await loginUser(userInfo);
      if (login.error) throw login.error;
      if (login.success) openLoggedUserModal();
    } catch (err) {
      if (modalError) return (modalError.textContent = capitalize(err));
      modalForm.prepend(
        createElement("p", {
          textContent: capitalize(err),
          className: "modal-error",
        })
      );
    }
  }

  /* Event Listeners */
  modalForm.addEventListener("submit", onFormSubmit);
  registerLink.addEventListener("click", openRegisterModal);

  return modalWrapper;
}

export default loginModal;
