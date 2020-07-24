const filterService = require('./filter.service');

const filterQuery = {
    getFiltredProducts: (parent, args) => filterService.getFiltredProducts(args.filters),
};


module.exports = { filterQuery };