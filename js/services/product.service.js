import GET from "../utils/GET.js";

const apiEndpoint = "./api/products.json";

class ProductService {
  constructor() {
    this.getProduct = async function (productSlug) {
      try {
        const products = await GET(apiEndpoint);
        const singleProduct = products.find(
          (product) => product.slug === productSlug
        );
        if (!singleProduct) return Promise.reject("Product not found");
        return singleProduct;
      } catch (err) {
        throw err;
      }
    };
    this.getByCategory = async function (categoryName) {
      try {
        const products = await GET(apiEndpoint);
        const filteredByCategory = products.filter(
          (product) => product.category === categoryName
        );
        if (filteredByCategory.length === 0) throw "Category not found";

        return filteredByCategory;
      } catch (err) {
        throw err;
      }
    };
  }
}

export default ProductService;
