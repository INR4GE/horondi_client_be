/* eslint-disable no-undef */
const { gql } = require('@apollo/client');

const { COMMENT_NOT_FOUND } = require('../../error-messages/comment.messages');
const { setupApp } = require('../helper-functions');

const {
  newComment,
  validEmail,
  invalidEmail,
  productId,
  wrongData,
} = require('./comment.variables');

let commentId = '';
let operations;
describe('Comment queries', () => {
  beforeAll(async () => {
    operations = await setupApp();
    const res = await operations
      .mutate({
        mutation: gql`
          mutation($productId: ID!, $comment: commentInput!) {
            addComment(productId: $productId, comment: $comment) {
              ... on Comment {
                _id
              }
              ... on Error {
                message
                statusCode
              }
            }
          }
        `,
        variables: { productId: productId, comment: newComment },
      })
      .catch(e => e);
    commentId = res.data.addComment._id;
  });

  afterAll(async () => {
    await operations
      .mutate({
        mutation: gql`
          mutation($id: ID!) {
            deleteComment(id: $id) {
              ... on Comment {
                _id
              }
              ... on Error {
                statusCode
                message
              }
            }
          }
        `,
        variables: { id: commentId },
      })
      .catch(e => e);
  });

  it('1 Should receive all comments writen by selected user', async () => {
    const res = await operations
      .query({
        variables: {
          userEmail: validEmail,
        },
        query: gql`
          query($userEmail: String!) {
            getAllCommentsByUser(userEmail: $userEmail) {
              ... on Comment {
                text

                product {
                  _id
                }
                show
                user {
                  email
                }
              }
              ... on Error {
                message
                statusCode
              }
            }
          }
        `,
      })
      .catch(e => e);

    expect(res.data.getAllCommentsByUser).toMatchSnapshot();
    expect(res.data.getAllCommentsByUser).toBeDefined();
    expect(res.data.getAllCommentsByUser).toContainEqual({
      product: { _id: productId },
      text: newComment.text,
      user: newComment.user,
      show: newComment.show,
    });
  });

  it('2 should return error messagePassing unexisting email ', async () => {
    const res = await operations.query({
      variables: {
        userEmail: invalidEmail,
      },
      query: gql`
        query($userEmail: String!) {
          getAllCommentsByUser(userEmail: $userEmail) {
            ... on Comment {
              text

              product {
                _id
              }
              show
              user {
                email
              }
            }
            ... on Error {
              message
              statusCode
            }
          }
        }
      `,
    });

    expect(res.data.getAllCommentsByUser).toBeDefined();
    expect(res.data.getAllCommentsByUser[0]).toHaveProperty('statusCode', 404);
    expect(res.data.getAllCommentsByUser[0]).toHaveProperty(
      'message',
      COMMENT_NOT_FOUND
    );
  });

  it('3 should return error message Passing not email string ', async () => {
    const res = await operations.query({
      variables: {
        userEmail: wrongData,
      },
      query: gql`
        query($userEmail: String!) {
          getAllCommentsByUser(userEmail: $userEmail) {
            ... on Comment {
              text

              product {
                _id
              }
              show
              user {
                email
              }
            }
            ... on Error {
              message
              statusCode
            }
          }
        }
      `,
    });

    expect(res.data.getAllCommentsByUser).toBeDefined();
    expect(res.data.getAllCommentsByUser[0]).toHaveProperty('statusCode', 404);
    expect(res.data.getAllCommentsByUser[0]).toHaveProperty(
      'message',
      COMMENT_NOT_FOUND
    );
  });
});
