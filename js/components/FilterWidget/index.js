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

  getElement() {
    this.element = createElement("div", { className: "filter-item" });
    const filterControlLabel = createElement("span", {
      textContent: this.filter.label,
      className: "filter-control-label",
    });
    const filterItemInner = createElement("div", {
      className: "filter-item-inner",
    });
    const filterBtn = createElement("div", { className: "filter-btn" });
    const filterRemove = createElement("div", {
      className: "filter-remove invisible",
    });
    const filterRemoveBtn = createElement("button", {
      className: "filter-remove-btn",
    });
    filterRemoveBtn.innerHTML = feather.icons.x.toSvg({ class: "feather-17" });
    filterRemoveBtn.ariaLabel = `Remove filters for ${this.filter.label}`;
    filterRemove.append(filterRemoveBtn);

    const filterTitle = createElement("span", {
      textContent: "Select",
      className: "filter-title",
    });
    const filters = createElement("div", { className: "filters" });
    const searchContainer = createElement("div", {
      className: "input-group search-container",
    });
    const formControl = createElement("input", {
      type: "text",
      className: "form-control",
      placeholder: "Search",
    });
    formControl.ariaLabel = `Search in ${this.filter.label} filters list`;
    searchContainer.append(formControl);

    const filtersList = createElement("div", { className: "filters-list" });
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
        updateFilter.call(this);
      });
      const span = createElement("span", { textContent: capitalize(option) });
      label.append(checkbox, span);
      filtersList.append(label);
      updateFilter.call(this);
    });

    /* Functions */
    function formControlHandler() {
      console.log("keyup");
      const filterListLabels = filtersList.querySelectorAll(".filter");
      filterListLabels.forEach((filterLabel) => {
        const txtValue = filterLabel.textContent || filterLabel.innerText;
        const isSearchMatch = txtValue
          .toLowerCase()
          .startsWith(formControl.value.toLowerCase());
        if (isSearchMatch) {
          filterLabel.style.display = "";
        } else {
          filterLabel.style.display = "none";
        }
      });
    }
    onClickOutside(filterBtn, () => {
      if (this.element.classList.contains("active"))
        this.element.classList.remove("active");
    });
    function updateFilter() {
      const checked = this.filter.checked;
      if (checked.length === 0) {
        filterRemove.classList.add("invisible");
        filterTitle.textContent = "Select";
      }
      if (checked.length > 0) {
        filterRemove.classList.remove("invisible");
        filterTitle.textContent = checked
          .map((item) => capitalize(item))
          .join(", ");
      }
    }

    /* Event Listeners */
    filterTitle.addEventListener("click", () => {
      this.element.classList.toggle("active");
    });
    formControl.addEventListener("keyup", formControlHandler);

    filterRemoveBtn.addEventListener("click", () => {
      this.filter.checked = [];
      filtersList.querySelectorAll("input").forEach((checkbox) => {
        checkbox.checked = false;
      });
      updateFilter.call(this);
      this.productsGallery.removeFilter(this.filter.property);
      formControl.value = "";
    });

    filters.append(searchContainer, filtersList);
    filterBtn.append(filterTitle, filters);
    filterItemInner.append(filterControlLabel, filterBtn, filterRemove);
    this.element.append(filterControlLabel, filterItemInner);

    return this.element;
  }
}

export default FilterWidget;
