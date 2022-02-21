import MobileNavigation from "./components/MobileNavigation/index.js";

import { navbarSearchBtn, navbarUserBtn, navbarCartBtn } from "./elements.js";
import { openCartModal, openSearchModal, openUserModal } from "./events.js";

export const onCheckoutPage =
  window.location.pathname.includes("checkout.html");

navbarSearchBtn.addEventListener("click", openSearchModal);
navbarUserBtn.addEventListener("click", openUserModal);
/* Disable cart modal in checkout page */
if (!onCheckoutPage) {
  navbarCartBtn.addEventListener("click", openCartModal);
}
