const CategoryType = `
  type Category {
    _id: ID!
    categoryCode: String!
    name: [CategoryName!]!
    images: CategoryImages!
  }
`;

module.exports = CategoryType;
