import UserService from "./services/user.service.js";

import Modal from "./components/Modal/index.js";
import loginModal from "./modals/login.modal.js";

const AppModal = new Modal();
const User = new UserService();

export function openSearchModal({ triggeredBy }) {
  return console.log("navbarSearchClick");
}

export async function openUserModal({ triggeredBy }) {
  if (!User.logged) AppModal.show(loginModal(User), { triggeredBy });
}

export async function openCartModal({ triggeredBy, Cart }) {}
export const onSubmitAddToCart = (productId, qty) => {
  console.log("onSubmitAddToCart", productId, qty);
};

export async function loginUser(userInfo) {
  console.log("loginUser");
  try {
    const user = await User.login(userInfo);
    console.log(user);
    console.log(User);
    return { success: true };
  } catch (err) {
    return err;
  }
}
