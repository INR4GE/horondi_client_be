const Products = require('./products.model');

class ProductsService {
  getAllProducts() {
    return Products.find();
  }

  // getProductsById(id) {
  //   return Products.findById(id);
  // }

  // updateProducts(id, products) {
  //   return Products.findByIdAndUpdate(id, products);
  // }

  // addProducts(data) {
  //   const user = new Products(data);
  //   return user.save();
  // }

  // deleteProducts(id) {
  //   return Products.findByIdAndDelete(id);
  // }
}
module.exports = new ProductsService();
