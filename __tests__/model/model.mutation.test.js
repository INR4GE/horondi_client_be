/* eslint-disable no-undef */
const { gql } = require('apollo-boost');
const client = require('../../utils/apollo-test-client');
const { newCategory, newModelMutation } = require('./model.variables');
require('dotenv').config();

let modelId, categoryName, categoryId;

describe('Product queries', () => {
  beforeAll(async () => {
    const createCategory = await client.mutate({
      mutation: gql`
        mutation($category: CategoryInput!) {
          addCategory(category: $category) {
            ... on Category {
              _id
              name {
                value
              }
            }
          }
        }
      `,
      variables: { category: newCategory },
    });
    categoryName = createCategory.data.addCategory.name;
    categoryId = createCategory.data.addCategory._id;
  });
  test('Should create model', async () => {
    const createModel = await client.mutate({
        mutation: gql`
          mutation($model: ModelInput!) {
            addModel(model: $model) {
              ... on Model {
                _id
                name {
                    value
                    lang
                }
                description {
                    value
                    lang
                }
                images {
                    large
                    medium
                    small
                    thumbnail
                }
                category {
                    name { 
                        value
                    }
                }
              }
            }
          }
        `,
        variables: { model: { ...newModelMutation, category: categoryId } },
      });

      model = createModel.data.addModel;
      modelId = model._id;
    
    expect(model).toBeDefined();
    expect(model).toHaveProperty('name', [ 
        { "__typename": "Language", value: "Мутація", lang: "uk" }, 
        { "__typename": "Language", value: "Mutation", lang: "en" } 
      ]);
    expect(model).toHaveProperty('description', [
        { "__typename": "Language", value: "Мутація", lang: "uk" }, 
        { "__typename": "Language", value: "Mutation", lang: "en" } 
      ]);
    expect(model).toHaveProperty('images', {
        "__typename": "ImageSet",
        "large": "large_new",
        "medium": "medium_new",
        "small": "small_new",
        "thumbnail": "thumbnail_new"
          
    });
    expect(model).toHaveProperty('category', {"__typename": "Category", "name": categoryName});
  });
  test('Should throw error MODEL_ALREADY_EXIST', async () => {
    const res = await client.mutate({
        mutation: gql`
          mutation($model: ModelInput!) {
            addModel(model: $model) {
              ... on Model {
                _id
                name {
                    value
                    lang
                }
                description {
                    value
                    lang
                }
                images {
                    large
                }
                category {
                    name { 
                        value
                    }
                }
              }
              ...on Error {
                  statusCode
                  message
              }
            }
          }
        `,
        variables: { model: { ...newModelMutation, category: categoryId } },
      });

      const error = res.data.addModel;
      expect(error).toBeDefined();
      expect(error).toHaveProperty('statusCode', 400);
      expect(error).toHaveProperty('message', 'MODEL_ALREADY_EXIST');
  });
  test('Should throw error MODEL_NOT_FOUND', async () => {
    const res = await client.mutate({
        mutation: gql`
          mutation($id: ID!) {
            deleteModel(id: $id) {
              ... on Model {
                name {
                    value
                    lang
                }
                description {
                    value
                    lang
                }
                images {
                    large
                }
                category {
                    name { 
                        value
                    }
                }
              }
              ... on Error {
                statusCode
                message
              }
            }
          }
        `,
        variables: { id: "56ade69dd46eafc5968e5390" },
      });

      const error = res.data.deleteModel;
      expect(error).toBeDefined();
      expect(error).toHaveProperty('statusCode', 404);
      expect(error).toHaveProperty('message', 'MODEL_NOT_FOUND');
  });
  test('Should delete model', async () => {
    const deleteModel =  await client.mutate({
        mutation: gql`
          mutation($id: ID!) {
            deleteModel(id: $id) {
              ... on Model {
                name {
                    value
                    lang
                }
                description {
                    value
                    lang
                }
                images {
                    large
                    medium
                    small
                    thumbnail
                }
                category {
                    name { 
                        value
                    }
                }
              }
              ... on Error {
                statusCode
                message
              }
            }
          }
        `,
        variables: { id: modelId },
      });

      model = deleteModel.data.deleteModel;
    
    expect(model).toBeDefined();
    expect(model).toHaveProperty('name', [ 
        { "__typename": "Language", value: "Мутація", lang: "uk" }, 
        { "__typename": "Language", value: "Mutation", lang: "en" } 
      ]);
    expect(model).toHaveProperty('description', [
        { "__typename": "Language", value: "Мутація", lang: "uk" }, 
        { "__typename": "Language", value: "Mutation", lang: "en" } 
      ]);
    expect(model).toHaveProperty('images', {
        "__typename": "ImageSet",
        "large": "large_new",
        "medium": "medium_new",
        "small": "small_new",
        "thumbnail": "thumbnail_new"
    });
    expect(model).toHaveProperty('category', {"__typename": "Category", "name": categoryName});
  });
  afterAll(async () => {
    await client.mutate({
      mutation: gql`
        mutation($id: ID!) {
          deleteCategory(id: $id) {
            ... on Category {
              _id
            }
            ... on Error {
              statusCode
              message
            }
          }
        }
      `,
      variables: { id: categoryId },
    });
  });
});
