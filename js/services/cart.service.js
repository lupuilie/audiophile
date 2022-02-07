import createElement from "../utils/createElement.js";
import { navbarCartBtn } from "../elements.js";

class CartService {
  constructor() {
    const cart = [];
    let count = 0;

    this.getProducts = function () {
      return cart;
    };
    this.addProduct = function (product) {
      cart.push(product);
      count++;
      this.cartUpdate();
    };
    this.getCount = function () {
      return count;
    };
  }
  cartUpdate() {
    let badge = navbarCartBtn.querySelector(".badge");
    if (!badge) {
      badge = createElement("span", {
        className: "badge",
      });
    }
    badge.textContent = this.getCount();
    if (this.getCount() > 0) navbarCartBtn.append(badge);
    if (this.getCount() === 0) badge.remove();
  }
}

export default CartService;
