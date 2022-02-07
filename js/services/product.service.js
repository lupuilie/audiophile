import GET from "../utils/get.js";

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
        Promise.reject(err);
      }
    };
    this.getByCategory = function (categoryName) {};
  }
}

export default ProductService;
