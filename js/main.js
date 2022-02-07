import MobileNavigation from "./components/MobileNavigation/index.js";

import CartService from "./services/cart.service.js";
import UserService from "./services/user.service.js";

import { navbarSearchBtn, navbarUserBtn, navbarCartBtn } from "./elements.js";
import { openCartModal, openSearchModal, openUserModal } from "./events.js";

export const Cart = new CartService();
export const User = new UserService();

const obj = { email: "eve.holt@reqres.in", password: "pistol" };
// User.login(obj);
// User.register(obj);

navbarSearchBtn.addEventListener("click", () =>
  openSearchModal({ triggeredBy: navbarSearchBtn })
);
navbarUserBtn.addEventListener("click", () =>
  openUserModal({ triggeredBy: navbarUserBtn })
);
navbarCartBtn.addEventListener("click", () =>
  openCartModal({ triggeredBy: navbarCartBtn })
);
