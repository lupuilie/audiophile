import createElement from "../../utils/createElement.js";

function QtySelector() {
  let value = 1;
  const node = createElement("div", { className: "qty-selector" });

  function increaseClickHandler(e) {
    e.preventDefault();
    value++;
    qty.value = value;
  }

  function decreaseClickHandler(e) {
    e.preventDefault();
    if (value === 1) return;
    value--;
    qty.value = value;
  }

  function onInputChange(e) {
    if (e.target.value.length === 0) return;
    if (!Number(e.target.value) || isNaN(Number(e.target.value))) {
      qty.value = "1";
    }
    if (e.target.value.startsWith("0")) qty.value = "1";
    value = qty.value;
  }

  const decrease = createElement("button", { className: "decrease" });
  decrease.innerHTML = feather.icons.minus.toSvg({ class: "feather-13" });
  decrease.append(
    createElement("span", {
      className: "hidden",
      textContent: "Decrease quantity",
    })
  );
  decrease.addEventListener("click", decreaseClickHandler);

  const qty = createElement("input", { type: "text", value: "1" });
  qty.ariaLabel = "Input quantity you want to order";

  qty.addEventListener("keyup", onInputChange);
  qty.addEventListener("change", onInputChange);
  qty.addEventListener("blur", (e) => {
    if (qty.value === "") qty.value = 1;
    onInputChange(e);
  });

  const increase = createElement("button", { className: "increase" });
  increase.innerHTML = feather.icons.plus.toSvg({ class: "feather-13" });
  increase.append(
    createElement("span", {
      className: "hidden",
      textContent: "Decrease quantity",
    })
  );
  increase.addEventListener("click", increaseClickHandler);

  node.append(decrease, qty, increase);

  function getValue() {
    return value;
  }

  return {
    node,
    getValue,
  };
}

export default QtySelector;
