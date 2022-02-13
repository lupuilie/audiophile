import createElement from "../../utils/createElement.js";
import { capitalize } from "../../utils/string.js";
import onClickOutside from "../../utils/onClickOutside.js";

class SortWidget {
  constructor({ sortItem, productsGallery }) {
    this.sortItem = sortItem;
    this.productsGallery = productsGallery;
    this.currentSort = sortItem.options[0];
    this.selected = null;
  }

  applySort() {
    if (!this.selected) return;
    if (this.selected.value === this.currentSort.value) return;
    this.productsGallery.applySort(this.selected.value);
    this.currentSort = this.selected;
  }
  close() {
    if (this.element.classList.contains("active"))
      this.element.classList.remove("active");
  }
  toggle() {
    this.element.classList.toggle("active");
  }
  getElement() {
    console.log(this.sortItem);
    this.element = createElement("div", {
      className: "sort-control-item",
    });
    const controlLabel = createElement("span", {
      textContent: this.sortItem.label,
      className: "sort-control-label hidden-xs hidden-sm",
    });
    const sortControlInner = createElement("div", {
      className: "sort-control-inner",
    });
    const sortControlBtn = createElement("button", {
      textContent: this.currentSort.label,
      className: "btn sort-control-btn",
    });
    const sortControlDropdown = createElement("ul", {
      className: "sort-control-dropdown",
    });
    this.sortItem.options.forEach((option) => {
      const li = createElement("li");
      const a = createElement("a", { textContent: option.label, href: "#" });
      li.append(a);
      a.addEventListener("click", (e) => {
        e.preventDefault();
        sortControlBtn.textContent = option.label;
        this.selected = option;
        this.close();
        this.applySort();
      });
      sortControlDropdown.append(li);
    });

    /* Event Listeners */
    sortControlBtn.addEventListener("click", () => {
      this.toggle();
    });
    onClickOutside(sortControlInner, () => {
      this.close();
    });

    sortControlInner.append(sortControlBtn, sortControlDropdown);
    this.element.append(controlLabel, sortControlInner);

    return this.element;
  }
}

export default SortWidget;
