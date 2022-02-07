import createElement from "../../utils/createElement.js";
import onClickOutside from "../../utils/onClickOutside.js";

function MobileNavigation() {
  const mobileNavBtn = document.querySelector(".mobile-menu-toggle");
  const mobileNav = document.querySelector(".mobile-navigation .wrapper");
  let isVisible = false;

  const mobileNavToggle = () => {
    isVisible = !isVisible;
    const darkOverlay = document.querySelector(".mobile-menu-overlay");
    mobileNav.classList.toggle("visible");
    mobileNavBtn.classList.toggle("nav-visible");
    if (darkOverlay) return darkOverlay.remove();
    if (!darkOverlay)
      document.body.append(
        createElement("div", { className: "mobile-menu-overlay" })
      );
  };
  const closeMobileNav = () => {
    if (isVisible) mobileNavToggle();
  };

  mobileNavBtn.addEventListener("click", mobileNavToggle);
  onClickOutside(mobileNav, closeMobileNav, { ignore: mobileNavBtn });

  return {
    isVisible,
    mobileNavToggle,
  };
}

export default MobileNavigation();
