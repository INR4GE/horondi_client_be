/* eslint-disable no-undef */
const { gql } = require('apollo-boost');
const client = require('../../utils/apolloClient');
const { newsQuery } = require('../../modules/news/news.resolver');
require('dotenv').config();
const newsService = require('../../modules/news/news.service');

describe('querries', () => {
  test('should receive id,title', async () => {
    const res = await client
      .query({
        query: gql`
          query {
            getAllNews {
              _id
              title {
                lang
                value
              }
            }
          }
        `,
      })
      .then(res => res);

    expect(res.data.getAllNews).toEqual(newsQuery.getAllNews());
    expect(res.data.getAllNews).toEqual(newsService.getAllNews());
  });

  test('delete news', async () => {
    const res = await client
      .mutate({
        mutation: gql`
          mutation {
            deleteNews(id: "5effa0e9943a4d176cf9063f") {
              _id
            }
          }
        `,
      })
      .then(res => res);
    expect(res.data.deleteNews).toBe(null);
  });
});
