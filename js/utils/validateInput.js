function validateInput(
  formControl,
  options = {
    minLength: null,
    maxLength: null,
    email: null,
    password: null,
    lettersOnly: null,
  }
) {
  const lettersOnlyValidation = (text) => /^[a-zA-Z ]+$/.test(text);
  const passwordValidation = (text) => {
    if (text.length < 8 || text.length > 32) return false;
    return true;
  };
  const emailValidation = (text) => {
    const regex = /([A-Z0-9._-]+)@([A-Z0-9._-]+)\.([A-Z0-9])+/gi;
    return regex.test(text);
  };

  const label = formControl.parentNode;
  if (label.nodeName !== "LABEL") return;
  const inputText = formControl.value;
  let error = null;

  /* Validations */
  if (options.minLength && inputText.length < options.minLength)
    error = `At least ${options.minLength} characters`;
  if (options.lettersOnly && !lettersOnlyValidation(inputText))
    error = "Only letters are allowed";
  if (options.email && !emailValidation(inputText)) error = "Email not valid";
  if (options.password && !passwordValidation(inputText))
    error = "At least 8 characters";

  /* Check if there is any error */
  if (error) {
    label.classList.add("wrong");
    label.dataset.error = error;
    return false;
  }

  label.classList.remove("wrong");
  delete label.dataset.error;
  return true;
}
export default validateInput;
