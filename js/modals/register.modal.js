import createElement from "./../utils/createElement.js";
import { openLoginModal, registerUser } from "./../events.js";
import validateInput from "../utils/validateInput.js";

function registerModal() {
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

  /* Functions */
  function modalAlert(text) {
    if (!text) return;
    let modalAlert = document.querySelector(".modal-alert");
    if (!modalAlert) {
      modalAlert = createElement("p", {
        className: "modal-alert",
      });
    }
    modalAlert.innerHTML = "";
    modalAlert.append(text);
    modalForm.prepend(modalAlert);
  }

  function successMessage() {
    const message = createElement("p", {
      textContent: `Your account has been registered. Go to `,
    });
    const link = createElement("a", {
      textContent: "login",
      href: "#",
    });
    link.addEventListener("click", openLoginModal);
    message.append(link);
    return message;
  }

  async function onFormSubmit(e) {
    e.preventDefault();

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
      return modalAlert("Please make sure all fields are filled in correctly");

    const userInfo = {
      name: nameInput.value,
      email: emailInput.value.toLowerCase(),
      password: passwordInput.value,
    };

    try {
      const register = await registerUser(userInfo);
      if (register.error) throw register.error;
      if (register.success) openLoginModal();
    } catch (err) {
      modalAlert(err);
    }
  }

  /* Event Listeners */
  modalForm.addEventListener("submit", onFormSubmit);
  loginLink.addEventListener("click", openLoginModal);

  return modalContent;
}

export default registerModal;
