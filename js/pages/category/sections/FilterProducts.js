import createElement from "./../../../utils/createElement.js";
import FilterWidget from "./../../../components/FilterWidget/index.js";
import SortWidget from "./../../../components/SortWidget/index.js";

class FilterProductsSection {
  constructor(productsGallery, productFilters, productSorters) {
    this.node = createElement("div", { className: "filter-products" });
    const filterWidgetsWrapper = createElement("div", {
      className: "filter-widgets-wrapper",
    });

    /* Add Filters */
    productFilters.forEach((filter) => {
      const Widget = new FilterWidget({ filter, productsGallery });
      filterWidgetsWrapper.append(Widget.getElement());
    });

    /* Add Sort */
    const sortWrapper = createElement("div", { className: "sort-wrapper" });
    const sortControlGroup = createElement("div", {
      className: "sort-control-group",
    });
    productSorters.forEach((sortItem) => {
      const Widget = new SortWidget({ sortItem, productsGallery });
      sortControlGroup.append(Widget.getElement());
    });

    /* Add  view select buttons */
    const selectView = createElement("div", { className: "select-view" });
    const selectViewLabel = createElement("span", {
      textContent: "Select view:",
      className: "select-view-label hidden-xs hidden-sm",
    });
    const listViewBtn = createElement("button", {
      className: "btn btn-light active",
    });
    listViewBtn.innerHTML = feather.icons.list.toSvg({ class: "feather-18" });
    listViewBtn.append(
      createElement("span", {
        textContent: "Products List View",
        className: "hidden",
      })
    );
    const gridViewBtn = createElement("button", {
      className: "btn btn-light",
    });
    gridViewBtn.innerHTML = feather.icons.grid.toSvg({ class: "feather-18" });
    gridViewBtn.append(
      createElement("span", {
        textContent: "Products Grid View",
        className: "hidden",
      })
    );

    listViewBtn.addEventListener("click", () => {
      gridViewBtn.classList.remove("active");
      listViewBtn.classList.add("active");
      productsGallery.setListView();
    });
    gridViewBtn.addEventListener("click", () => {
      listViewBtn.classList.remove("active");
      gridViewBtn.classList.add("active");
      productsGallery.setGridView();
    });

    selectView.append(selectViewLabel, listViewBtn, gridViewBtn);
    sortWrapper.append(sortControlGroup, selectView);

    productsGallery.setProducts(productsGallery.getFilteredProducts());

    this.node.append(filterWidgetsWrapper, sortWrapper);
  }
}

export default FilterProductsSection;
