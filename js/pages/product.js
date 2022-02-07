import ProductService from "../services/product.service.js";
import createElement from "../utils/createElement.js";
import displayError from "./product/displayError.js";

import {
  productSection,
  aboutSection,
  imageGallerySection,
} from "./product/sections.js";

const url = new URL(window.location);
const urlProductSlug = url.searchParams.get("p");
const Product = new ProductService();

if (!urlProductSlug) displayError("Product not found");
if (urlProductSlug) getProduct();

async function getProduct() {
  try {
    const productInfo = await Product.getProduct(urlProductSlug);
    productPage(productInfo);
  } catch (err) {
    displayError(err);
  }
}

async function productPage(productInfo) {
  console.log("productInfo", productInfo);
  const container = document.querySelector("main .container");
  const categoriesSection = document.querySelector("main .categories");

  addSection(productSection(productInfo));
  addSection(aboutSection(productInfo));
  addSection(imageGallerySection(productInfo));

  /* Add section after 'Go Back' and before Categories */
  function addSection(node) {
    container.insertBefore(node, categoriesSection);
  }
}
