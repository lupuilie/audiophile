import { buildFilter } from "../../utils/filter.js";
import createElement from "../../utils/createElement.js";
import { capitalize } from "../../utils/string.js";
import onClickOutside from "../../utils/onClickOutside.js";

class FilterWidget {
  constructor({ filter, productsGallery }) {
    this.filter = filter;
    this.filter.checked =
      filter.checked.length > 0 ? filter.checked.toLowerCase().split(",") : [];
    this.productsGallery = productsGallery;
    this.applyFilter();
  }

  applyFilter() {
    const widgetFilters = buildFilter({
      [this.filter.property]: this.filter.checked,
    });
    this.productsGallery.applyFilter(widgetFilters);
  }
  setFilterTitle(title) {
    this.filterTitle.textContent = title;
  }
  formControlHandler() {
    const filterListLabels = this.filtersList.querySelectorAll(".filter");
    filterListLabels.forEach((filterLabel) => {
      const txtValue = filterLabel.textContent || filterLabel.innerText;
      const isSearchMatch = txtValue
        .toLowerCase()
        .startsWith(this.formControl.value.toLowerCase());
      if (isSearchMatch) {
        filterLabel.style.display = "";
      } else {
        filterLabel.style.display = "none";
      }
    });
  }
  onFilterUpdate() {
    const checked = this.filter.checked;
    if (checked.length === 0) {
      this.filterRemove.classList.add("invisible");
      this.setFilterTitle("Select");
    }
    if (checked.length > 0) {
      this.filterRemove.classList.remove("invisible");
      const newTitle = checked.map((item) => capitalize(item)).join(", ");
      this.setFilterTitle(newTitle);
    }
  }
  removeBtnHandler() {
    this.filter.checked = [];
    this.productsGallery.removeFilter(this.filter.property);
    this.filtersList.querySelectorAll("input").forEach((checkbox) => {
      checkbox.checked = false;
    });
    this.formControl.value = "";
    this.onFilterUpdate();
    this.formControlHandler();
  }

  getElement() {
    const element = createElement("div", { className: "filter-item" });
    const filterControlLabel = createElement("span", {
      textContent: this.filter.label,
      className: "filter-control-label",
    });
    const filterItemInner = createElement("div", {
      className: "filter-item-inner",
    });
    const filterBtn = createElement("div", { className: "filter-btn" });
    this.filterRemove = createElement("div", {
      className: "filter-remove invisible",
    });
    const filterRemoveBtn = createElement("button", {
      className: "filter-remove-btn",
    });
    filterRemoveBtn.innerHTML = feather.icons.x.toSvg({ class: "feather-17" });
    filterRemoveBtn.ariaLabel = `Remove filters for ${this.filter.label}`;
    this.filterRemove.append(filterRemoveBtn);

    this.filterTitle = createElement("span", {
      textContent: "Select",
      className: "filter-title",
    });
    const filters = createElement("div", { className: "filters" });
    const searchContainer = createElement("div", {
      className: "input-group search-container",
    });
    this.formControl = createElement("input", {
      type: "text",
      className: "form-control",
      placeholder: "Search",
    });
    this.formControl.ariaLabel = `Search in ${this.filter.label} filters list`;
    searchContainer.append(this.formControl);

    this.filtersList = createElement("div", { className: "filters-list" });
    this.filter.options.forEach((option) => {
      const label = createElement("label", { className: "filter" });
      const checkbox = createElement("input", { type: "checkbox" });
      if (this.filter.checked.includes(option)) {
        checkbox.setAttribute("checked", true);
      }
      checkbox.addEventListener("change", () => {
        const idx = this.filter.checked.indexOf(option);
        if (!checkbox.checked) this.filter.checked.splice(idx, 1);
        if (checkbox.checked) this.filter.checked.push(option);
        this.applyFilter();
        this.onFilterUpdate();
      });
      const span = createElement("span", { textContent: capitalize(option) });
      label.append(checkbox, span);
      this.filtersList.append(label);
      this.onFilterUpdate();
    });

    /* Event Listeners */
    this.filterTitle.addEventListener("click", () => {
      element.classList.toggle("active");
    });
    onClickOutside(filterBtn, () => {
      if (element.classList.contains("active"))
        element.classList.remove("active");
    });
    this.formControl.addEventListener("keyup", () => {
      this.formControlHandler();
    });
    filterRemoveBtn.addEventListener("click", () => {
      this.removeBtnHandler();
    });

    /* Make Element */
    filters.append(searchContainer, this.filtersList);
    filterBtn.append(this.filterTitle, filters);
    filterItemInner.append(filterControlLabel, filterBtn, this.filterRemove);
    element.append(filterControlLabel, filterItemInner);

    return element;
  }
}

export default FilterWidget;
