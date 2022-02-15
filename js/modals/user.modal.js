import createElement from "./../utils/createElement.js";
import { User, logoutUser } from "../events.js";

function loggedUserModal() {
  const { userInfo } = User;
  const modalWrapper = createElement("div", {
    className: "container modal-wrapper",
  });
  const modalContent = createElement("div", { className: "modal-user" });
  const modalHeader = createElement("div", { className: "modal-header" });
  modalHeader.append(
    createElement("h6", { textContent: `Hello, ${userInfo.first_name}` })
  );

  const loggedUserInfo = createElement("p", {
    textContent: `You are authenticated as ${userInfo.first_name} ${userInfo.last_name} with email '${userInfo.email}'`,
  });

  const logoutBtn = createElement("button", {
    textContent: "Logout",
    className: "btn btn-primary submit-btn",
  });

  logoutBtn.addEventListener("click", logoutUser);

  modalContent.append(modalHeader, loggedUserInfo, logoutBtn);
  modalWrapper.append(modalContent);

  return modalWrapper;
}

export default loggedUserModal;
