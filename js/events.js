import Modal from "./components/Modal/index.js";

import cartModal from "./modals/cart.modal.js";

const AppModal = new Modal();

export const openSearchModal = ({ triggeredBy }) =>
  console.log("navbarSearchClick");
export const openUserModal = ({ triggeredBy }) =>
  console.log("navbarUserClick");
export const openCartModal = ({ triggeredBy }) => {
  AppModal.show(cartModal, { triggeredBy });
};

export const onSubmitAddToCart = (productId, qty) => {
  console.log("onSubmitAddToCart", productId, qty);
};
