/* eslint-disable no-undef */
const { gql } = require('apollo-boost');
const client = require('../../utils/apolloClient');
const { newsQuery, newsMutation } = require('../../modules/news/news.resolver');
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
          getNewsById(id: "5ef3970c0ab5dd42436dd5cf") {
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
      newsQuery.getNewsById(null, '5ef3970c0ab5dd42436dd5cf'),
    ).resolves.toBe(res);
    expect(newsService.getNewsById('5ef3970c0ab5dd42436dd5cf')).resolves.toBe(
      res,
    );
  });

  test('should receive one news text, video, date', async () => {
    const res = await client.query({
      query: gql`
        query {
          getNewsById(id: "5ef3970c0ab5dd42436dd5cf") {
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
          getNewsById(id: "5ef3970c0ab5dd42436dd5cf") {
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
    expect(newsQuery.getAllNews()).resolves.toBe(res);
    expect(newsService.getAllNews()).resolves.toBe(res);
  });
  let newsToDeleteId = '';
  test('addNews news', async () => {
    const res = await client.mutate({
      mutation: gql`
        mutation {
          addNews(
            news: {
              title: [
                { lang: "uk", value: "тест" }
                { lang: "eng", value: "test" }
              ]
              text: [
                { lang: "ua", value: "тест новина" }
                { lang: "eng", value: "test news" }
              ]
              images: {
                primary: { medium: "sdfsdf4.jpg" }
                additional: { small: "dfgfdg.jpg" }
              }
              video: "3ffefefds.jpg"
              date: "1212121"
            }
          ) {
            _id
          }
        }
      `,
    });

    newsToDeleteId = res.data.addNews._id;
    expect(
      newsMutation.addNews(null, {
        title: [
          { lang: 'uk', value: 'тест' },
          { lang: 'eng', value: 'test' },
        ],
        text: [
          { lang: 'ua', value: 'тест новина' },
          { lang: 'eng', value: 'test news' },
        ],
        images: {
          primary: { medium: 'sdfsdf4.jpg' },
          additional: { small: 'dfgfdg.jpg' },
        },
        video: '3ffefefds.jpg',
        date: '1212121',
      }),
    ).resolves.toBe(res);
    expect(
      newsService.addNews({
        title: [
          { lang: 'uk', value: 'тест' },
          { lang: 'eng', value: 'test' },
        ],
        text: [
          { lang: 'ua', value: 'тест новина' },
          { lang: 'eng', value: 'test news' },
        ],
        images: {
          primary: { medium: 'sdfsdf4.jpg' },
          additional: { small: 'dfgfdg.jpg' },
        },
        video: '3ffefefds.jpg',
        date: '1212121',
      }),
    ).resolves.toBe(res);
  });
  test('delete news', async () => {
    const res = await client
      .mutate({
        mutation: gql`
          mutation {
            deleteNews(id: ${newsToDeleteId}) {
              _id
            }
          }
        `,
      })
      .then(res => res);
    console.log(res.data);

    expect(res).toMatchSnapshot();
    expect(newsMutation.deleteNews(null, newsToDeleteId)).resolves.toBe(null);
    expect(newsService.deleteNews(newsToDeleteId)).resolves.toBe(null);
  });
});
