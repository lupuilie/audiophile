import createElement from "./../../../utils/createElement.js";
import Picture from "./../../../components/Picture/index.js";
import { filterData } from "./../../../utils/filter.js";

class ProductsGallerySection {
  constructor(productsData) {
    const allProducts = productsData;
    let filteredProducts = [...productsData];
    this.node = createElement("section", { className: "products-gallery" });

    this.getProducts = () => allProducts;
    this.currentFilters = {};
    this.currentSort = null;
    this.getFilteredProducts = () => filteredProducts;
    this.setFilteredProducts = (products) => (filteredProducts = products);
    this.removeFilter = (filter) => {
      if (this.currentFilters[filter]) delete this.currentFilters[filter];
      this.applyFilter();
    };
    this.applyFilter = (newFilter) => {
      this.currentFilters = { ...this.currentFilters, ...newFilter };

      /* Delete filter if is empty  */
      for (const filter in this.currentFilters) {
        if (this.currentFilters[filter].length === 0)
          delete this.currentFilters[filter];
      }
      const filtered = filterData(this.getProducts(), this.currentFilters);
      this.setFilteredProducts(filtered);
      if (this.currentSort) return this.applySort(this.currentSort);

      this.setProducts(this.getFilteredProducts());
    };

    this.applySort = (sort) => {
      this.currentSort = sort;
      let sortedProducts = [...this.getFilteredProducts()];
      switch (sort) {
        case "name-asc":
          sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-desc":
          sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "price-asc":
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        default:
          this.currentSort = null;
          sortedProducts = this.getFilteredProducts();
      }
      this.setProducts(sortedProducts);
    };
  }

  setListView() {
    if (this.node.classList.contains("grid"))
      this.node.classList.remove("grid");
  }
  setGridView() {
    if (!this.node.classList.contains("grid")) this.node.classList.add("grid");
  }

  setProducts(products) {
    this.node.innerHTML = "";
    if (products.length === 0) console.log("list empty do something");
    products.forEach((product) => this.addProduct(product));
  }

  addProduct(product) {
    const article = createElement("article", { className: "product" });

    const imageDiv = createElement("div", { className: "image" });
    imageDiv.append(
      new Picture({
        ...product.categoryImage,
        alt: `${product.name} thumbnail`,
      })
    );
    const description = createElement("div", { className: "description" });
    if (product.new)
      description.append(
        createElement("p", {
          textContent: "New Product",
          className: "overline",
        })
      );
    const productTitle = createElement("h2", {
      textContent: product.name,
      className: "product-title",
    });
    const productDesc = createElement("p", {
      textContent: product.description,
    });
    const productPrice = createElement("p", {
      textContent: `$${product.price}`,
      className: "price",
    });
    const productLink = createElement("a", {
      textContent: "See Product",
      className: "btn btn-primary",
      href: `./product.html?p=${product.slug}`,
    });
    description.append(productTitle, productDesc, productPrice, productLink);

    article.append(imageDiv, description);

    this.node.append(article);
  }
}

export default ProductsGallerySection;
