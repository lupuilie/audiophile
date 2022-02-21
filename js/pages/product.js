import { Products } from "../events.js";
import displayError from "./displayError.js";
import { addSection, loader } from "./../elements.js";

import sections from "./product/sections/index.js";

const url = new URL(window.location);
const urlProductSlug = url.searchParams.get("p");

if (!urlProductSlug) displayError("Product not found");
if (urlProductSlug) getProduct();

async function getProduct() {
  try {
    const productInfo = await Products.getProduct(urlProductSlug);
    productPage(productInfo);
  } catch (err) {
    loader.remove();
    displayError(err);
  }
}

function productPage(productInfo) {
  addSection(sections.productWrapper(productInfo));
  addSection(sections.aboutSection(productInfo));
  loader.remove();
  addSection(sections.imageGallerySection(productInfo));
  addSection(sections.relatedProductsSection(productInfo));
}
