import createElement from "./../../../utils/createElement.js";
import Picture from "./../../../components/Picture/index.js";

function relatedProductsSection(productInfo) {
  const { others: relatedProductsList } = productInfo;

  const relatedProducts = createElement("section", {
    className: "related-products",
  });
  relatedProducts.append(
    createElement("h3", {
      textContent: "You may also like",
      className: "section-heading",
    })
  );

  const productsList = createElement("div", { className: "products-list" });
  relatedProductsList.forEach((product) => {
    const article = createElement("article", { className: "product" });
    console.log(product);

    const productImage = Picture({
      ...product.image,
      alt: `${product.name} thumbnail`,
    });

    const productInfo = createElement("div", { className: "product-info" });
    productInfo.append(
      createElement("h4", {
        textContent: product.name,
        className: "product-name",
      })
    );
    productInfo.append(
      createElement("a", {
        textContent: "See Product",
        href: `./product.html?p=${product.slug}`,
        className: "btn btn-primary",
      })
    );

    article.append(productImage, productInfo);
    productsList.append(article);
  });

  relatedProducts.append(productsList);

  return relatedProducts;
}

export default relatedProductsSection;
