const productsType = `
type Products {
_id: ID!,
name: [Language],
description: [Language],
images: [PrimaryImage],
rate: Int,
rateCount: Int,
votedUsers: User,
basePrice: Int,
available: Boolean,
category: Category,

}`;

// const productsInput = `
// input ProductsInput {
// title: [LanguageInput]
// text: [LanguageInput]
// images: PrimaryImageInput
// video: String
// author: AuthorInput
// date: String
// }`;

module.exports = {
  productsType,
  // , productsInput
};
