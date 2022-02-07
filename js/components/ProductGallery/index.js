const productsGallerySection = document.querySelector(".products-gallery");
/* TODO: everything from product gallery should be created in js */

class ProductGallery {
  constructor(products) {
    this.products = products;
    this.element = productsGallerySection;
    this.currentView = null;
  }
  setGridView() {
    if (!this.element.classList.contains("grid"))
      this.element.classList.add("grid");
  }
  setListView() {
    if (this.element.classList.contains("grid"))
      this.element.classList.remove("grid");
  }
}

export default ProductGallery;
