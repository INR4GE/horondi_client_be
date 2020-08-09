const newsType = `
type News {
_id: ID!
title: String
text: String
images: PrimaryImage
lang: String
author: Author
date: String
show: Boolean
}`;

const newsInput = `
input NewsInput {
title: String
text: String
images: PrimaryImageInput
lang: String
author: AuthorInput
date: String
show: Boolean
}`;

module.exports = { newsType, newsInput };
