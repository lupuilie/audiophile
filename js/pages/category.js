import ProductService from "../services/product.service.js";
import redirect from "../utils/redirect.js";
import { capitalize } from "../utils/string.js";

import { setHeading, productsGallerySection } from "./category/sections.js";

const url = new URL(window.location);
const urlCategory = url.searchParams.get("c");
const urlSort = url.searchParams.get("sort");
const Products = new ProductService();

if (!urlCategory) redirect(404);
if (urlCategory) getProducts();

async function getProducts() {
  try {
    const productsData = await Products.getByCategory(urlCategory);
    CategoryPage(productsData);
  } catch (err) {
    redirect(404);
  }
}

function CategoryPage(productsData) {
  const title = capitalize(urlCategory);
  const container = document.querySelector("main .container");
  const productGallery = new productsGallerySection(productsData);

  document.title = title;
  setHeading(title);
  container.prepend(productGallery.section);
}
