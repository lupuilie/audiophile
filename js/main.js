import MobileNavigation from "./components/MobileNavigation/index.js";

import { navbarSearchBtn, navbarUserBtn, navbarCartBtn } from "./elements.js";
import { openCartModal, openSearchModal, openUserModal } from "./events.js";

navbarSearchBtn.addEventListener("click", openSearchModal);
navbarUserBtn.addEventListener("click", openUserModal);
navbarCartBtn.addEventListener("click", openCartModal);
