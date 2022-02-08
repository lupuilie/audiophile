import createElement from "../../utils/createElement.js";
import QtySelector from "../../components/QtySelector/index.js";
import Picture from "../../components/Picture/index.js";

import { onSubmitAddToCart } from "../../events.js";

/* section.product-wrapper */
export function productSection(productInfo) {
  if (!productInfo) return;

  const { image: productImages, name, description, price } = productInfo;
  const productWrapper = createElement("section", {
    className: "product-wrapper",
  });

  const imageDiv = createElement("div", { className: "image" });
  const pictureEl = Picture({
    ...productImages,
    alt: `${name} thumbnail`,
    className: "product-image",
  });
  imageDiv.append(pictureEl);

  const descriptionDiv = createElement("div", { className: "description" });
  if (productInfo.new)
    descriptionDiv.append(
      createElement("p", {
        className: "overline new-product",
        textContent: "New Product",
      })
    );

  descriptionDiv.append(
    createElement("h1", { textContent: name, className: "title" })
  );
  descriptionDiv.append(createElement("p", { textContent: description }));
  descriptionDiv.append(
    createElement("h2", {
      textContent: `$ ${price}`,
      className: "price",
    })
  );

  const cartAddForm = createElement("form", { className: "cart-add" });
  const qty = QtySelector();
  const toCartBtn = createElement("button", {
    textContent: "Add to Cart",
    className: "btn btn-primary",
  });
  cartAddForm.append(qty.node, toCartBtn);
  descriptionDiv.append(cartAddForm);

  cartAddForm.addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmitAddToCart(productInfo.id, qty.getValue());
  });

  productWrapper.append(imageDiv, descriptionDiv);
  return productWrapper;
}

/* section.about */
export function aboutSection(productInfo) {
  if (!productInfo) return;

  const about = createElement("section", { className: "about" });
  const features = createElement("div", { className: "features" });
  features.append(createElement("h3", { textContent: "Features" }));
  const featuresTexts = productInfo.features.split("\n").filter(Boolean);
  featuresTexts.forEach((text) =>
    features.append(createElement("p", { textContent: text }))
  );
  const packageDiv = createElement("div", { className: "package" });
  const packageItems = createElement("ul", { className: "package-items" });
  productInfo.includes.forEach((included) => {
    const packageItem = createElement("li", { className: "package-item" });
    const qty = createElement("span", {
      textContent: `${included.quantity}x`,
      className: "qty",
    });
    const item = createElement("span", {
      textContent: included.item,
      className: "item",
    });
    packageItem.append(qty, item);
    packageItems.append(packageItem);
  });
  packageDiv.append(
    createElement("h3", { textContent: "In The Box" }),
    packageItems
  );

  about.append(features, packageDiv);
  return about;
}

/* section.image-gallery */
export function imageGallerySection(productInfo) {
  const { gallery, name } = productInfo;
  const imageGallery = createElement("section", { className: "image-gallery" });

  const image1 = Picture({
    ...gallery.first,
    className: "image-1",
    alt: `${name} image 1 `,
  });
  const image2 = Picture({
    ...gallery.second,
    className: "image-2",
    alt: `${name} image 2`,
  });
  const image3 = Picture({
    ...gallery.third,
    className: "image-3",
    alt: `${name} image 3`,
  });

  imageGallery.append(image1, image2, image3);

  return imageGallery;
}

/* section.related-products */
export function relatedProductsSection(productInfo) {
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
