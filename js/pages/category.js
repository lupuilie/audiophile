import ProductGallery from "../components/ProductGallery/index.js";

const listViewBtn = document.querySelector("#list-view-btn");
const gridViewBtn = document.querySelector("#grid-view-btn");

const categoryProducts = new ProductGallery();

listViewBtn.addEventListener("click", () => {
  categoryProducts.setListView();
  gridViewBtn.classList.remove("active");
  listViewBtn.classList.add("active");
});
gridViewBtn.addEventListener("click", () => {
  listViewBtn.classList.remove("active");
  gridViewBtn.classList.add("active");
  categoryProducts.setGridView();
});
