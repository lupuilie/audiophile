import createElement from "../utils/createElement.js";
import { navbarCartBtn } from "../elements.js";

class CartService {
  constructor() {
    let cart = [];

    const localStorageCart = localStorage.getItem("cart");
    if (localStorageCart) cart = JSON.parse(localStorageCart);

    this.addProduct = function (product) {
      if (!product) return;
      const cartIndex = cart.findIndex((p) => p.id === product.id);
      if (cartIndex === -1) {
        const newCartItem = { ...product, value: product.price * product.qty };
        cart.push(newCartItem);
      } else {
        cart[cartIndex].qty += product.qty;
        cart[cartIndex].value = cart[cartIndex].qty * product.price;
      }
      this.cartUpdated();
    };

    this.getItems = () => cart;
    this.getItemsCount = () => cart.length;
    this.getCount = function () {
      return cart.length;
    };
    this.getTotalValue = function () {
      return cart.reduce((acc, curr) => (acc += curr.value), 0);
    };

    this.setItemCount = function (itemId, newCount) {
      const product = cart.findIndex((item) => item.id === itemId);
      if (newCount === 0) cart.splice(product, 1);
      if (newCount !== 0) {
        cart[product].qty = newCount;
        cart[product].value = cart[product].qty * cart[product].price;
      }
      this.cartUpdated();
    };
    this.clearContent = () => {
      cart = [];
      this.cartUpdated();
    };

    // Update cart at every page refresh / app load
    this.cartUpdated();
  }

  cartUpdated() {
    localStorage.setItem("cart", JSON.stringify(this.getItems()));
    this.updateBadge();
  }
  updateBadge() {
    let badge = navbarCartBtn.querySelector(".badge");
    if (!badge) {
      badge = createElement("span", {
        className: "badge",
      });
    }
    badge.textContent = this.getCount();
    if (this.getCount() > 0) navbarCartBtn.append(badge);
    if (this.getCount() > 99) badge.textContent = "+99";
    if (this.getCount() === 0) badge.remove();
  }
}

export default CartService;
