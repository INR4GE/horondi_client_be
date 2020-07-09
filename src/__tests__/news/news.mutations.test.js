/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
const { gql } = require('apollo-boost');
const client = require('../../utils/apolloClient');
const newsService = require('../../modules/news/news.service');
const { newsMutation } = require('../../modules/news/news.resolver');
require('dotenv').config();

let newsToUpdateAndDeleteId = '';

const createQuery = JSON.stringify({
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
});

describe('news mutations', () => {
  test('add news', async () => {
    const res = await client
      .mutate({
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
      })
      .then(res => res)
      .catch(e => console.log(e));

    newsToUpdateAndDeleteId = res.data.addNews._id;

    expect(newsMutation.addNews(null, createQuery)).resolves.toBe(res);
    expect(newsService.addNews(null, createQuery)).resolves.toBe(res);
  });
  test('update news', async () => {
    const updateQuery = `
          mutation {
            updateNews(
              id:"${newsToUpdateAndDeleteId}"
              news: {
                title: [
                  { lang: "uk", value: "тест" }
                  { lang: "eng", value: "blabla" }
                ]
                text: [
                  { lang: "uk", value: "текст новини" }
                  { lang: "eng", value: "news text" }
                ]
                date: "43423"
                video: "g34g4g4g4"
                images: { primary: { medium: "3g3g3g32g.jpg" } }
              }
            ) {
              title {
                lang
                value
              }
            }
          }
        `;
    const res = await client
      .mutate({
        mutation: gql`
          ${updateQuery}
        `,
      })
      .then(res => res)
      .catch(e => console.log(e));

    expect(
      newsMutation.updateNews(newsToUpdateAndDeleteId, {
        ...updateQuery,
      }),
    ).resolves.toBe(res);
    expect(
      newsService.updateNews(newsToUpdateAndDeleteId, {
        ...updateQuery,
      }),
    );
  });

  test('delete news', async () => {
    const deleteQuery = `
mutation {
  deleteNews(id:"${newsToUpdateAndDeleteId}") {
    title{
      lang
      value
    }
  }
}
`;
    const res = await client.mutate({
      mutation: gql`
        ${deleteQuery}
      `,
    });

    expect(res).toMatchSnapshot();
    expect(
      newsMutation.deleteNews(null, newsToUpdateAndDeleteId),
    ).resolves.toBe(res);
    expect(newsService.deleteNews(newsToUpdateAndDeleteId)).resolves.toBe(res);
  });
});
