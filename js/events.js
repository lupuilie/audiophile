import UserService from "./services/user.service.js";

import Modal from "./components/Modal/index.js";
import loginModal from "./modals/login.modal.js";
import registerModal from "./modals/register.modal.js";
import loggedUserModal from "./modals/user.modal.js";

const AppModal = new Modal();
export const User = new UserService();

export const openLoggedUserModal = () => AppModal.show(loggedUserModal());
export const openRegisterModal = () => AppModal.show(registerModal());
export const openLoginModal = () => AppModal.show(loginModal());
export const openSearchModal = () => console.log("navbarSearchClick");
export const openCartModal = () => {};

export function openUserModal() {
  console.log(User.getLoggedUser());
  if (!User.getLoggedUser()) openLoginModal();
  if (User.getLoggedUser()) openLoggedUserModal();
}

export const onSubmitAddToCart = (productId, qty) => {
  console.log("onSubmitAddToCart", productId, qty);
};
export const logoutUser = () => {
  User.logout();
  AppModal.close();
};

export async function loginUser(userInfo) {
  try {
    const login = await User.login(userInfo);
    if (login) return { success: true };
  } catch (err) {
    return err;
  }
}

export async function registerUser(userInfo) {
  try {
    const register = await User.register(userInfo);
    if (register.error) throw register.error;
    if (register.success) return { success: true };
  } catch (err) {
    return err;
  }
}
