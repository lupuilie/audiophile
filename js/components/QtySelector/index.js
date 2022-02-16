import createElement from "../../utils/createElement.js";

class QtySelector {
  constructor({ allowZero = false, startValue = null, onChange = null } = {}) {
    this.onChange = onChange;

    this.allowZero = allowZero;
    this.value = startValue || 1;

    this.increment = () => this.value++;
    this.decrement = () => this.value--;

    this.element = createElement("div", { className: "qty-selector" });
    const decrease = createElement("button", { className: "decrease" });
    decrease.innerHTML = feather.icons.minus.toSvg({ class: "feather-13" });
    decrease.append(
      createElement("span", {
        className: "hidden",
        textContent: "Decrease quantity",
      })
    );
    this.qty = createElement("input", { type: "text", value: "1" });
    if (startValue) this.qty.value = startValue;
    this.qty.ariaLabel = "Input quantity you want to order";
    const increase = createElement("button", { className: "increase" });
    increase.innerHTML = feather.icons.plus.toSvg({ class: "feather-13" });
    increase.append(
      createElement("span", {
        className: "hidden",
        textContent: "Increase quantity",
      })
    );
    this.element.append(decrease, this.qty, increase);

    /* Add Event Listeners */
    decrease.addEventListener("click", () => this.decrementClickHandler());
    increase.addEventListener("click", () => this.incrementClickHandler());

    const inputEvents = ["keyup", "change"];
    inputEvents.forEach((event) =>
      this.qty.addEventListener(event, () => {
        this.qtyInputHandler();
      })
    );
    this.qty.addEventListener("blur", () => {
      if (this.qty.value === "") this.qty.value = this.value;
    });
  }
  qtyInputHandler() {
    if (this.qty.value.length === 0) return;
    if (!Number(this.qty.value) || isNaN(Number(this.qty.value))) {
      this.qty.value = 1;
    }
    if (this.qty.value.startsWith("0")) this.qty.value = 1;
    this.value = Number(this.qty.value);
    if (this.onChange) this.onChange();
  }

  incrementClickHandler() {
    this.increment();
    this.qty.value = this.value;
    if (this.onChange) this.onChange();
  }
  decrementClickHandler() {
    if (this.value === 0) return;
    if (this.value === 1 && !this.allowZero) return;
    this.decrement();
    this.qty.value = this.value;
    if (this.onChange) this.onChange();
  }
}

export default QtySelector;
