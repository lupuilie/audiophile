import UserService from "./services/user.service.js";
import CartService from "./services/cart.service.js";
import ProductService from "./services/product.service.js";
import Modal from "./components/Modal/index.js";
import redirect from "./utils/redirect.js";

import loginModal from "./modals/login.modal.js";
import registerModal from "./modals/register.modal.js";
import loggedUserModal from "./modals/user.modal.js";
import cartModal from "./modals/cart.modal.js";
import checkoutModal from "./modals/checkout.modal.js";

const AppModal = new Modal();
export const User = new UserService();
export const AppCart = new CartService();
export const Products = new ProductService();

/* User */
export const openLoggedUserModal = () => AppModal.show(loggedUserModal());
export const openRegisterModal = () => AppModal.show(registerModal());
export const openLoginModal = () => AppModal.show(loginModal());
export function openUserModal() {
  if (!User.getLoggedUser()) openLoginModal();
  if (User.getLoggedUser()) openLoggedUserModal();
}
export const openCheckoutModal = () => {
  redirect;
  AppModal.show(checkoutModal(), {
    centered: true,
    onClose: () => {
      // AppCart.clearContent();
      // redirect("home");
    },
  });
};

export async function registerUser(userInfo) {
  try {
    const register = await User.register(userInfo);
    if (register.error) throw register.error;
    if (register.success) return { success: true };
  } catch (err) {
    return err;
  }
}
export async function loginUser(userInfo) {
  try {
    const login = await User.login(userInfo);
    if (login) return { success: true };
  } catch (err) {
    return err;
  }
}
export const logoutUser = () => {
  User.logout();
  AppModal.close();
};

/* Search */
export const openSearchModal = () => console.log("open search modal");
/* Cart */
export const openCartModal = () => AppModal.show(cartModal());

export const onSubmitAddToCart = (product) => {
  AppCart.addProduct(product);
};

/* Checkout */
