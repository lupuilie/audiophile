import GET from "../utils/GET.js";
import { randomInRange } from "../utils/array.js";

const apiEndpoint = "./api/products.json";

class ProductService {
  constructor() {
    this.productsCount = 0;
    this.products = [];
  }
  async getById(id) {
    try {
      const products = await GET(apiEndpoint);
      if (this.products.length === 0) this.products = products;
      const singleProduct = this.products.find((product) => product.id === id);
      if (!singleProduct) return Promise.reject("Product not found");
      return singleProduct;
    } catch (err) {
      throw err;
    }
  }
  async getProduct(productSlug) {
    try {
      const products = await GET(apiEndpoint);
      if (this.products.length === 0) this.products = products;
      const singleProduct = this.products.find(
        (product) => product.slug === productSlug
      );
      if (!singleProduct) return Promise.reject("Product not found");
      return singleProduct;
    } catch (err) {
      throw err;
    }
  }
  async getByCategory(categoryName) {
    try {
      const products = await GET(apiEndpoint);
      if (this.products.length === 0) this.products = products;
      const filteredByCategory = this.products.filter(
        (product) => product.category === categoryName
      );
      if (filteredByCategory.length === 0)
        throw `Category '${categoryName}' not found.`;

      return filteredByCategory;
    } catch (err) {
      throw err;
    }
  }
  async getRandom(productsCount) {
    try {
      const products = await GET(apiEndpoint);
      if (this.products.length === 0) this.products = products;
      if (productsCount > this.products.length) productsCount = products.length;

      const randomProductIds = randomInRange(0, productsCount);
      const randomProducts = randomProductIds.map((id) => products[id]);
      return randomProducts;
    } catch (err) {
      console.log("err");
    }
  }
  async getByName(name) {
    try {
      const products = await GET(apiEndpoint);
      if (this.products.length === 0) this.products = products;

      const filtered = products.filter((product) => {
        return product.name.toLowerCase().includes(name.toLowerCase());
      });
      return filtered;
    } catch (err) {
      console.log(err);
    }
  }
}

export default ProductService;
