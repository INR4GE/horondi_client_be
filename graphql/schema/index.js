const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type CategoryName {
  lang: String!
  value: String!
}

type CategoryImages {
  large: String!
  medium: String!
  small: String!
  thumbnail: String!
}

type Category {
  _id: ID!
  categoryCode: String!
  name: [CategoryName!]!
  images: CategoryImages!
}

type MaterialName {
  lang: String!
  value: String!
}

type Material {
  name: [MaterialName!]!
  available: Boolean!
}

type RootQuery {
  categories: [Category!]!
  materials: [Material!]!
}

schema {
  query: RootQuery

}
`);
