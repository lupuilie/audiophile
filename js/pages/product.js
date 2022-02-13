import ProductService from "./../services/product.service.js";
import displayError from "./displayError.js";
import { addSection } from "./../elements.js";

import sections from "./product/sections/index.js";

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

function productPage(productInfo) {
  addSection(sections.productWrapper(productInfo));
  addSection(sections.aboutSection(productInfo));
  addSection(sections.imageGallerySection(productInfo));
  addSection(sections.relatedProductsSection(productInfo));
}
