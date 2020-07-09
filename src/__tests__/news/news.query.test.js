/* eslint-disable no-undef */
const { gql } = require('apollo-boost');
const client = require('../../utils/apolloClient');
const { newsQuery } = require('../../modules/news/news.resolver');
require('dotenv').config();
const newsService = require('../../modules/news/news.service');

describe('querries', () => {
  test('should receive id,title', async () => {
    const res = await client.query({
      query: gql`
        query {
          getAllNews {
            _id
            images {
              primary {
                medium
              }
              additional {
                small
                medium
              }
            }
          }
        }
      `,
    });

    expect(newsQuery.getAllNews()).resolves.toBe(res);
    expect(newsService.getAllNews()).resolves.toBe(res);
  });

  test('should receive text, video, date', async () => {
    const res = await client.query({
      query: gql`
        query {
          getAllNews {
            text {
              lang
              value
            }
            video
            date
          }
        }
      `,
    });

    expect(newsQuery.getAllNews()).resolves.toBe(res);
    expect(newsService.getAllNews()).resolves.toBe(res);
  });

  test('should receive author, images', async () => {
    const res = await client.query({
      query: gql`
        query {
          getAllNews {
            author {
              name {
                lang
                value
              }
              image {
                small
              }
            }
            images {
              primary {
                medium
              }
              additional {
                medium
                small
                large
              }
            }
          }
        }
      `,
    });

    expect(newsQuery.getAllNews()).resolves.toBe(res);
    expect(newsService.getAllNews()).resolves.toBe(res);
  });

  test('should receive one news id,title', async () => {
    const res = await client.query({
      query: gql`
        query {
          getNewsById(id: "5f0462f514438544ec76a783") {
            _id
            images {
              primary {
                medium
              }
              additional {
                small
                medium
              }
            }
          }
        }
      `,
    });

    expect(res).toMatchSnapshot();
    expect(
      newsQuery.getNewsById(null, '5f0462f514438544ec76a783'),
    ).resolves.toBe(res);
    expect(newsService.getNewsById('5f0462f514438544ec76a783')).resolves.toBe(
      res,
    );
  });

  test('should receive one news text, video, date', async () => {
    const res = await client.query({
      query: gql`
        query {
          getNewsById(id: "5f0462f514438544ec76a783") {
            text {
              lang
              value
            }
            video
            date
          }
        }
      `,
    });

    expect(res).toMatchSnapshot();
    expect(newsQuery.getAllNews()).resolves.toBe(res);
    expect(newsService.getAllNews()).resolves.toBe(res);
  });
  test('should receive one news author, images', async () => {
    const res = await client.query({
      query: gql`
        query {
          getNewsById(id: "5a0462f514438544ec76a783") {
            author {
              name {
                lang
                value
              }
              image {
                small
              }
            }
            images {
              primary {
                medium
              }
              additional {
                medium
                small
                large
              }
            }
          }
        }
      `,
    });

    expect(res).toMatchSnapshot();
    expect(
      newsQuery.getNewsById(null, '5f0462f514438544ec76a783'),
    ).resolves.toBe(res);
    expect(newsService.getNewsById('5f0462f514438544ec76a783')).resolves.toBe(
      res,
    );
  });
  test('should receive error', async () => {
    const res = await client.query({
      query: gql`
        query {
          getNewsById(id: "3a0462f514438544ec76a783") {
            author {
              name {
                lang
                value
              }
              image {
                small
              }
            }
            images {
              primary {
                medium
              }
              additional {
                medium
                small
                large
              }
            }
          }
        }
      `,
    });

    expect(res).toMatchSnapshot();
    expect(
      newsQuery.getNewsById(null, '3a0462f514438544ec76a783'),
    ).resolves.toBe(res);
    expect(
      newsService.getNewsById('3a0462f514438544ec76a783'),
    ).resolves.toThrow();
  });
});
