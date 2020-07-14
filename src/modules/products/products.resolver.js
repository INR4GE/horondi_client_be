const productsService = require('./products.service');

const productsQuery = {
  getAllProducts: () => productsService.getAllProducts(),
  // getProductsById: (parent, args) => productsService.getProductsById(args.id),
};
// const productsMutation = {
// addProducts: (parent, args) => productsService.addProducts(args.news),
// deleteProducts: (parent, args) => productsService.deleteProducts(args.id),
// updateProducts: (parent, args) => productsService.updateProducts(args.id, args.news),
// };

module.exports = {
  productsQuery,
  // productsMutation
};
