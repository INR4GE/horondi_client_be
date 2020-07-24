const Products = require('../products/products.model');

class FilterService {
    async getFiltredProducts(filters){
        const products = await Products.find()
        const filteredValues = products
            .filter((product) =>
            filters.search.length
                ? product.name[0].value
                .toLowerCase()
                .includes(filters.search.toLowerCase()) ||
                    product.name[1].value
                    .toLowerCase()
                    .includes(filters.search.toLowerCase())
                : product
            )
            .filter(
            (product) =>
                product.basePrice >= filters.price[0] &&
                product.basePrice <= filters.price[1]
            )
            .filter((product) =>
            filters.colors.length
                ? filters.colors.some(
                    (color) =>
                        color.toLowerCase() === product.colors[0].simpleName.toLowerCase()
                    )
                : product
            )
            .filter((product) =>
            filters.patterns.length
                ? filters.patterns.some(
                (pattern) =>
                    pattern.toLowerCase() === product.pattern[1].value.toLowerCase()
                )
                : product
            );
        return filteredValues;
    }
}

module.exports = new FilterService()