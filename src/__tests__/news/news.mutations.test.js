/* eslint-disable no-undef */
const { gql } = require('apollo-boost');
const client = require('../../utils/apolloClient');
const { newsMutation } = require('../../modules/news/news.resolver');
require('dotenv').config();
const newsService = require('../../modules/news/news.service');

let newsToUpdateAndDeleteId = '';

describe('news mutations', () => {
  test('add news', async () => {
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

    newsToUpdateAndDeleteId = res.data.addNews._id;
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

  test('update news', async () => {
    const res = await client.mutate({
      mutation: gql`
        mutation {
          updateNews(id:${newsToUpdateAndDeleteId})(
            news: {
              title: [
                { lang: "uk", value: "змінена новина" }
                { lang: "eng", value: "updated test" }
              ]
          ) {
            _id
          }
        }
      `,
    });

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
});
