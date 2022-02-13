import MobileNavigation from "./components/MobileNavigation/index.js";

import { navbarSearchBtn, navbarUserBtn, navbarCartBtn } from "./elements.js";
import { openCartModal, openSearchModal, openUserModal } from "./events.js";

navbarSearchBtn.addEventListener("click", () =>
  openSearchModal({ triggeredBy: navbarSearchBtn })
);
navbarUserBtn.addEventListener("click", () =>
  openUserModal({ triggeredBy: navbarUserBtn })
);
navbarCartBtn.addEventListener("click", () =>
  openCartModal({ triggeredBy: navbarCartBtn })
);
