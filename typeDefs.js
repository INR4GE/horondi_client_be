const { gql } = require('apollo-server-express');
const { newsType, newsInput } = require('./modules/news/news.graphql');
const {
  userType,
  userInput,
  userRegisterInput,
  userFilterInput,
  LoginInput,
  adminConfirmInput,
  adminRegisterInput,
  UserForStatisticsInput,
} = require('./modules/user/user.graphql');
const {
  productType,
  productInput,
} = require('./modules/product/product.graphql');
const { orderTypes, orderInputs } = require('./modules/order/order.graphql');
const { modelType, modelInput } = require('./modules/model/model.graphql');
const {
  categoryType,
  categoryInput,
} = require('./modules/category/category.graphql');
const {
  materialType,
  materialInput,
} = require('./modules/material/material.graphql');
const {
  patternType,
  patternInput,
} = require('./modules/pattern/pattern.graphql');
const {
  currencyType,
  currencyInput,
} = require('./modules/currency/currency.graphql.js');
const {
  commentType,
  commentInput,
} = require('./modules/comment/comment.graphql');
const {
  businessTextType,
  businessTextInput,
} = require('./modules/business-text/business-text.graphql');
const {
  contactType,
  contactInput,
} = require('./modules/contact/contact.graphql');
const {
  deliveryType,
  deliveryInput,
} = require('./modules/delivery/delivery.graphql');
const {
  emailQuestionType,
  emailQuestionInput,
} = require('./modules/email-chat/email-question.graphql');
const {
  paymentType,
  paymentInput,
} = require('./modules/payment/payment.graphql');
const { headerType, headerInput } = require('./modules/header/header.graphql');

const typeDefs = gql`
  ${categoryType}
  ${currencyType}
  ${materialType}
  ${newsType}
  ${patternType}
  ${userType}
  ${productType}
  ${commentType}
  ${businessTextType}
  ${modelType}
  ${contactType}
  ${orderTypes}
  ${emailQuestionType}
  ${deliveryType}
  ${paymentType}
  ${headerType}

  scalar Upload

  enum RoleEnum {
    superadmin
    admin
    user
  }
  type Language {
    lang: String!
    value: String
  }
  type CurrencySet {
    currency: String!
    value: Float!
  }
  type ImageSet {
    large: String
    medium: String
    small: String
    thumbnail: String
  }
  type Credential {
    source: String
    tokenPass: String
  }

  type Address {
    country: String
    region: String
    city: String
    zipcode: String
    street: String
    buildingNumber: String
    appartment: String
  }
  type PrimaryImage {
    primary: ImageSet
    additional: [ImageSet]
  }
  type ConvertOption {
    name: String
    exchangeRate: Float
  }
  type Subcategory {
    _id: ID!
    categoryCode: String
    name: [Language]
    images: ImageSet
    available: Boolean
  }
  type Author {
    name: [Language]
    image: ImageSet
  }
  type Color {
    code: Int
    name: [Language]
    images: ImageSet
    available: Boolean
    simpleName: [Language]
  }

  type ProductOptions {
    size: Size
    bottomMaterial: Material
    description: [Language]
    bottomColor: [Language]
    availableCount: Int
    additions: [ProductAdditions]
  }

  type ProductAdditions {
    name: [Language]
    description: [Language]
    available: Boolean
    additionalPrice: [CurrencySet]
  }

  type AllProductOptions {
    sizes: [Size]
    bottomMaterials: [Material]
  }

  type Size {
    _id: ID!
    name: String
    heightInCm: Int
    widthInCm: Int
    depthInCm: Int
    volumeInLiters: Int
    weightInKg: Float
    available: Boolean
    additionalPrice: [CurrencySet]
  }

  type UserForComment {
    email: String!
    name: String
    images: ImageSet
    isAdmin: Boolean
  }

  type UserRate {
    user: User!
    rate: Int!
  }

  type Error {
    statusCode: Int
    message: String
  }

  type ProductOptionsAdditonals {
    name: [Language!]
    description: [Language!]
    available: Boolean
    additionalPrice: Int
  }

  type PaginatedProducts {
    items: [Product]
    count: Int
  }
  type PaginatedPatterns {
    items: [Pattern!]!
    count: Int!
  }
  type PaginatedNews {
    items: [News]
    count: Int
  }
  type PaginatedMaterials {
    items: [Material]
    count: Int
  }

  type PaginatedContacts {
    items: [Contact]
    count: Int
  }
  type PaginatedModels {
    items: [Model]
    count: Int
  }

  type PaginatedEmailQuestion {
    questions: [EmailQuestion]
    count: Int
  }

  type LanguageImageSet {
    lang: String
    value: ImageSet
  }

  type PaginatedComments {
    items: [Comment]
    count: Int
  }

  type SuccessfulResponse {
    isSuccess: Boolean
  }

  type EmailAnswer {
    admin: User!
    date: String!
    text: String!
  }

  type StatisticDoughnut {
    names: [String!]
    counts: [Int!]
    relations: [Int!]
  }

  type StatisticBar {
    labels: [String!]
    counts: [Int!]
  }

  union CategoryResult = Category | Error
  union CurrencyResult = Currency | Error
  union MaterialResult = Material | Error
  union PatternResult = Pattern | Error
  union NewsResult = News | Error
  union ProductResult = Product | Error
  union CommentResult = Comment | Error
  union BusinessTextResult = BusinessText | Error
  union LogicalResult = SuccessfulResponse | Error
  union ModelResult = Model | Error
  union ContactResult = Contact | Error
  union OrderResult = Order | Error
  union UserResult = User | Error
  union EmailQuestionResult = EmailQuestion | Error
  union NovaPoshtaOrderResult = NovaPoshtaOrder | Error
  union HeaderResult = Header | Error

  type Query {
    getAllCurrencies: [Currency!]!
    getCurrencyById(id: ID): CurrencyResult

    getAllCategories: [Category]
    getPopularCategories: StatisticDoughnut!
    getCategoryById(id: ID): CategoryResult
    getSubcategories(parentCategoryId: ID!): [Category]

    getAllMaterials(limit: Int, skip: Int): PaginatedMaterials!
    getMaterialById(id: ID): MaterialResult

    getAllPatterns(limit: Int, skip: Int): PaginatedPatterns!
    getPatternById(id: ID): PatternResult

    getAllOrders: [Order!]!
    getOrderById(id: ID): OrderResult
    getUserOrders: [Order!]
    getOrdersStatistic(date: Int!): StatisticDoughnut!
    getPaidOrdersStatistic(date: Int!): StatisticBar!

    getAllNews(limit: Int, skip: Int): PaginatedNews!
    getNewsById(id: ID): NewsResult

    getAllUsers(filter: UserFilterInput): [User]
    getUsersForStatistic(filter: UserForStatisticsInput): StatisticBar!
    getUserByToken: UserResult
    getUserById(id: ID!): User

    validateConfirmationToken(token: String!): LogicalResult!

    getProductById(id: ID!): ProductResult
    getProducts(
      filter: FilterInput
      limit: Int
      skip: Int
      search: String
      sort: SortInput
    ): PaginatedProducts!
    getProductOptions: AllProductOptions
    getPopularProducts: StatisticBar!

    getCommentById(id: ID!): CommentResult
    getAllCommentsByProduct(productId: ID!): [CommentResult]
    getAllCommentsByUser(userEmail: String!): [Comment]
    getAllRecentComments(limit: Int, skip: Int): PaginatedComments!

    getAllBusinessTexts: [BusinessText]
    getBusinessTextById(id: ID!): BusinessTextResult
    getBusinessTextByCode(code: String!): BusinessTextResult

    getAllModels(limit: Int, skip: Int): PaginatedModels
    getModelsByCategory(id: ID!): [Model]
    getModelById(id: ID!): ModelResult

    getContacts(limit: Int, skip: Int): PaginatedContacts!
    getContactById(id: ID!): ContactResult

    getNovaPoshtaCities(city: String): [NovaPoshtaCity]
    getNovaPoshtaStreets(cityRef: String, street: String): [NovaPoshtaStreet]
    getNovaPoshtaWarehouses(city: String): [NovaPoshtaWarehouse]
    getNovaPoshtaPrices(data: NovaPoshtaPriceInput): [NovaPoshtaPrice]
    createNovaPoshtaOrder(data: NovaPoshtaOrderInput): NovaPoshtaOrderResult

    getUkrPoshtaRegion(region: String): UkrPoshtaRegion

    getPaymentCheckout(data: PaymentInput): Payment
    getPaymentRefund(data: PaymentInput): Payment

    getAllEmailQuestions(
      filter: FilterInput
      skip: Int
    ): PaginatedEmailQuestion!
    getEmailQuestionById(id: ID!): EmailQuestionResult
    getPendingEmailQuestionsCount: Int

    getAllHeaders: [Header!]!
    getHeaderById(id: ID!): HeaderResult
  }

  input SortInput {
    purchasedCount: Int
    basePrice: Int
    rate: Int
    isHotItem: Boolean
  }

  input FilterInput {
    pattern: [String]
    materials: [String]
    colors: [String]
    price: [Int]
    category: [String]
    search: String
    isHotItem: Boolean
    models: [String]
    currency: Int
    emailQuestionStatus: [String]
  }
  input RoleEnumInput {
    role: String
  }
  input PrimaryImageInput {
    primary: ImageSetInput!
    additional: [ImageSetInput!]
  }
  input AuthorInput {
    name: [LanguageInput]
    image: ImageSetInput
  }

  ${categoryInput}
  ${currencyInput}
  ${materialInput}
  ${newsInput}
  ${patternInput}
  ${userInput}
  ${productInput}
  ${commentInput}
  ${LoginInput}
  ${userRegisterInput}
  ${businessTextInput}
  ${userFilterInput}
  ${adminConfirmInput}
  ${adminRegisterInput}
  ${modelInput}
  ${contactInput}
  ${orderInputs}
  ${emailQuestionInput}
  ${UserForStatisticsInput}
  ${deliveryInput}
  ${paymentInput}
  ${headerInput}

  input LanguageInput {
    lang: String!
    value: String
  }

  input CurrencySetInput {
    currency: String!
    value: Float!
  }
  input AddressInput {
    country: String
    region: String
    city: String
    zipcode: String
    street: String
    buildingNumber: String
    appartment: String
  }
  input UserForCommentInput {
    email: String!
    name: String
    images: ImageSetInput
    isAdmin: Boolean
  }
  input ImageSetInput {
    large: String
    medium: String
    small: String
    thumbnail: String
  }
  input ColorInput {
    code: Int!
    name: [LanguageInput!]
    images: ImageSetInput
    available: Boolean!
    simpleName: [LanguageInput!]
  }
  input ConvertOptionInput {
    name: String!
    exchangeRate: Float!
  }
  input SubcategoryInput {
    categoryCode: String!
    name: [LanguageInput!]
    images: ImageSetInput
    available: Boolean!
  }
  input CredentialInput {
    source: String
    tokenPass: String
  }

  type File {
    fileNames: ImageSet!
    prefixUrl: String!
  }

  input ProductOptionsInput {
    size: ID
    bottomMaterial: ID
    description: [LanguageInput!]
    bottomColor: [LanguageInput!]
    availableCount: Int
    additions: [ProductOptionsAdditonalsInput]
  }

  input SizeInput {
    name: String
    heightInCm: Int
    widthInCm: Int
    depthInCm: Int
    volumeInLiters: Int
    weightInKg: Float
    available: Boolean
    additionalPrice: Int
  }
  input ProductOptionsAdditonalsInput {
    name: [LanguageInput!]
    description: [LanguageInput!]
    available: Boolean
    additionalPrice: [CurrencySetInput]
  }

  input LanguageImageSetInput {
    lang: String!
    value: ImageSetInput
  }

  input MapImage {
    lang: String!
    image: Upload!
  }

  input UserRateInput {
    rate: Int!
  }

  type Mutation {
    uploadFiles(files: [Upload]!): [File]!
    deleteFiles(fileNames: [String]): [String]
    "Pattern Mutations"
    addPattern(pattern: PatternInput!, image: Upload!): PatternResult
    deletePattern(id: ID!): PatternResult
    updatePattern(
      id: ID!
      pattern: PatternInput!
      image: Upload!
    ): PatternResult

    "Material Mutation"
    addMaterial(material: MaterialInput!, images: Upload): MaterialResult
    deleteMaterial(id: ID!): MaterialResult
    updateMaterial(
      id: ID!
      material: MaterialInput!
      images: Upload!
    ): MaterialResult

    "Category Mutation"
    addCategory(
      category: CategoryInput!
      parentId: ID
      upload: Upload
    ): CategoryResult
    deleteCategory(id: ID!): CategoryResult
    updateCategory(
      id: ID!
      category: CategoryInput!
      upload: Upload
    ): CategoryResult

    "Currency Mutation"
    addCurrency(currency: CurrencyInput!): CurrencyResult
    deleteCurrency(id: ID!): CurrencyResult
    updateCurrency(id: ID!, currency: CurrencyInput!): CurrencyResult

    "News Mutation"
    addNews(news: NewsInput!): NewsResult
    deleteNews(id: ID!): NewsResult
    updateNews(id: ID!, news: NewsInput!): NewsResult

    "User Mutation"
    registerUser(user: userRegisterInput!, language: Int!): User
    registerAdmin(user: AdminRegisterInput!): UserResult
    loginUser(loginInput: LoginInput!): User
    loginAdmin(loginInput: LoginInput!): User
    deleteUser(id: ID!): UserResult
    updateUserById(user: UserInput!, id: ID!, upload: Upload): User
    updateUserByToken(user: UserInput!): User
    confirmUser(token: String!): Boolean
    confirmUserEmail(token: String!): Boolean
    recoverUser(email: String!, language: Int!): Boolean
    switchUserStatus(id: ID!): LogicalResult!
    resetPassword(password: String!, token: String!): Boolean
    checkIfTokenIsValid(token: String!): Boolean
    sendEmailConfirmation(email: String!, language: Int!): Boolean
    completeAdminRegister(
      user: AdminConfirmInput!
      token: String!
    ): LogicalResult!

    "Product Mutation"
    addProduct(product: ProductInput!, upload: Upload!): ProductResult
    deleteProduct(id: ID!): ProductResult
    updateProduct(
      id: ID!
      product: ProductInput!
      upload: Upload
      primary: Upload
    ): ProductResult
    deleteImages(id: ID!, images: [String!]!): PrimaryImage

    "Comment Mutation"
    addComment(productId: ID!, comment: commentInput!): CommentResult
    deleteComment(id: ID!): CommentResult
    updateComment(id: ID!, comment: commentInput!): CommentResult

    "BusinessText Mutation"
    addBusinessText(
      businessText: BusinessTextInput!
      files: [Upload]!
    ): BusinessTextResult
    deleteBusinessText(id: ID!): BusinessTextResult
    updateBusinessText(
      id: ID!
      businessText: BusinessTextInput!
      files: [Upload]!
    ): BusinessTextResult

    "Rate Mutation"
    addRate(product: ID!, userRate: UserRateInput!): ProductResult

    "Model Mutation"
    addModel(model: ModelInput!, upload: Upload): ModelResult
    updateModel(id: ID!, model: ModelInput!, upload: Upload): ModelResult
    deleteModel(id: ID!): ModelResult

    "Contacts Mutation"
    addContact(contact: contactInput!, mapImages: [MapImage]!): ContactResult
    deleteContact(id: ID!): ContactResult
    updateContact(
      id: ID!
      contact: contactInput!
      mapImages: [MapImage]
    ): ContactResult

    "Order Mutation"
    addOrder(order: OrderInput!): OrderResult
    updateOrder(id: ID!, order: OrderInput!): OrderResult
    deleteOrder(id: ID!): OrderResult
    "EmailChat Mutation"
    addEmailQuestion(question: EmailQuestionInput!): EmailQuestion
    deleteEmailQuestions(questionsToDelete: [String]): [EmailQuestion]
    makeEmailQuestionsSpam(
      questionsToSpam: [String]
      adminId: ID!
    ): [EmailQuestion]
    answerEmailQuestion(
      questionId: ID!
      adminId: ID!
      text: String!
    ): EmailQuestionResult
    deleteEmailQuestion(id: ID!): EmailQuestionResult
    makeQuestionSpam(questionId: ID!): EmailQuestionResult

    "Header Mutation"
    addHeader(header: HeaderInput!): HeaderResult
    deleteHeader(id: ID!): HeaderResult
    updateHeader(id: ID!, header: HeaderInput!): HeaderResult
  }
`;

module.exports = typeDefs;
