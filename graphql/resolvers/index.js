const Material = require('../../models/Material');
const Category = require('../../models/Category');

module.exports = {
  categories: () => Category.find(),
  materials: () => Material.find(),
};
