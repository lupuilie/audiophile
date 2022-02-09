import createElement from "../../utils/createElement.js";
import Picture from "../../components/Picture/index.js";

const main = document.querySelector("main");
const container = document.querySelector("main .container");

export function setHeading(text) {
  //  <h1 class="category-heading"></h1>
  const h1 = createElement("h1", {
    textContent: text,
    className: "category-heading",
  });

  main.insertBefore(h1, container);
}

export class productsGallerySection {
  constructor(products) {
    this.section = createElement("section", { className: "products-gallery" });
    this.setProducts(products);
  }
  setProducts(products) {
    products.forEach((product) => this.addProduct(product));
  }
  addProduct(product) {
    const article = createElement("article", { className: "product" });
    const imageDiv = createElement("div", { className: "image" });
    imageDiv.append(
      new Picture({ ...product.image, alt: `${product.name} thumbnail` })
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

    this.section.append(article);
  }
}
