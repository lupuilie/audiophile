import { Products } from "../events.js";
import { addSection, loader, mainEl } from "./../elements.js";
import sections from "./category/sections/index.js";
import displayError from "./displayError.js";
import { capitalize } from "./../utils/string.js";
import redirect from "./../utils/redirect.js";

const url = new URL(window.location);
const urlCategory = url.searchParams.get("c");
const urlParams = {
  category: urlCategory,
  brand: String(url.searchParams.get("brand") || ""),
  sub: String(url.searchParams.get("sub") || ""),
  sort: String(url.searchParams.get("sort") || ""),
};

if (!urlCategory) redirect(404);
if (urlCategory) getProducts();

async function getProducts() {
  try {
    const productsData = await Products.getByCategory(urlCategory);
    CategoryPage(productsData);
  } catch (err) {
    displayError(err);
  }
}

function CategoryPage(productsData) {
  const title = capitalize(urlCategory);
  document.title = title;

  const productFilters = [
    {
      label: "Brand",
      property: "brand",
      options: [...new Set(productsData.map((product) => product.brand))],
      checked: urlParams.brand,
    },
    {
      label: "Connectivity",
      property: "sub",
      options: [...new Set(productsData.map((product) => product.sub))],
      checked: urlParams.sub,
    },
  ];
  const productSorters = [
    {
      label: "Sort by:",
      property: "sort",
      options: [
        {
          label: "Default",
          value: "default",
        },
        {
          label: "Name A-Z",
          value: "name-asc",
        },
        {
          label: "Name Z-A",
          value: "name-desc",
        },
        {
          label: "Lower Price",
          value: "price-asc",
        },
        {
          label: "Higher Price",
          value: "price-desc",
        },
      ],
      selected: urlParams.sort,
    },
  ];

  const productsGallery = new sections.ProductsGallerySection(productsData);
  const filterProducts = new sections.FilterProductsSection(
    productsGallery,
    productFilters,
    productSorters
  );

  mainEl.prepend(sections.categoryHeading(title));
  addSection(filterProducts.node);
  addSection(productsGallery.node);
  loader.remove();
}
