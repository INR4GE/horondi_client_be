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
      })
      .then(res => res);
    expect(res.data.getAllNews).toEqual([
      {
        _id: '5ef3970c0ab5dd42436dd5cf',
        images: {
          primary: {
            medium: 'https://ukr.media/static/ba/aimg/3/9/3/393626_1.jpg',
          },
          additional: [
            {
              small: null,
              medium: 'https://ukr.media/static/ba/aimg/3/9/3/393626_3.jpg',
            },
            {
              small: null,
              medium: 'https://ukr.media/static/ba/aimg/3/9/3/393626_4.jpg',
            },
            {
              small: null,
              medium: 'https://ukr.media/static/ba/aimg/3/9/3/393626_5.jpg',
            },
          ],
        },
      },
      {
        _id: '5ef3970c0ab5dd42436dd5d0',
        images: {
          primary: {
            medium:
              'https://s.032.ua/section/newsInternalIcon/upload/images/news/icon/000/052/185/trendi-lita-golovna_5edf9266621db.jpg',
          },
          additional: [
            {
              small: null,
              medium:
                'https://s.032.ua/section/newsInText/upload/images/news/intext/000/052/185/solomani_5edf8e4b209ed.jpg',
            },
            {
              small: null,
              medium:
                'https://s.032.ua/section/newsInText/upload/images/news/intext/000/052/185/11_5edf8f3209c11.jpg',
            },
            {
              small: null,
              medium:
                'https://s.032.ua/section/newsInText/upload/images/news/intext/000/052/185/cepki_5edf8fffc7403.jpg',
            },
            {
              small: null,
              medium:
                'https://s.032.ua/section/newsInText/upload/images/news/intext/000/052/185/ertfg4_5edf90563e5b1.jpg',
            },
            {
              small: null,
              medium:
                'https://s.032.ua/section/newsInText/upload/images/news/intext/000/052/185/9_5edf90b4381c8.jpg',
            },
            {
              small: null,
              medium:
                'https://s.032.ua/section/newsInText/upload/images/news/intext/000/052/185/11_5edf9163c6237.jpg',
            },
            {
              small: null,
              medium:
                'https://s.032.ua/section/newsInText/upload/images/news/intext/000/052/185/7_5edf942a343c8.jpg',
            },
          ],
        },
      },
      {
        _id: '5ef3970c0ab5dd42436dd5d1',
        images: {
          primary: {
            medium:
              'https://images.stylight.net/image/upload/t_web_post_500x667/q_auto,f_auto/post-c27c63a5b58deb0d4535ddd5993e68b2e4d0776d756fdc41c0f7c391.jpg',
          },
          additional: [
            {
              small: 'https://intersumka.ua/image/catalog/_all/banan2.jpg',
              medium: null,
            },
            {
              small: 'https://intersumka.ua/image/catalog/_all/banan3.jpg',
              medium: null,
            },
          ],
        },
      },
      {
        _id: '5effa0a2943a4d176cf90619',
        images: {
          primary: {
            medium: null,
          },
          additional: [
            {
              small: null,
              medium: null,
            },
          ],
        },
      },
    ]);
    expect(res.data.getAllNews).toEqual([
      {
        _id: '5ef3970c0ab5dd42436dd5cf',
        images: {
          primary: {
            medium: 'https://ukr.media/static/ba/aimg/3/9/3/393626_1.jpg',
          },
          additional: [
            {
              small: null,
              medium: 'https://ukr.media/static/ba/aimg/3/9/3/393626_3.jpg',
            },
            {
              small: null,
              medium: 'https://ukr.media/static/ba/aimg/3/9/3/393626_4.jpg',
            },
            {
              small: null,
              medium: 'https://ukr.media/static/ba/aimg/3/9/3/393626_5.jpg',
            },
          ],
        },
      },
      {
        _id: '5ef3970c0ab5dd42436dd5d0',
        images: {
          primary: {
            medium:
              'https://s.032.ua/section/newsInternalIcon/upload/images/news/icon/000/052/185/trendi-lita-golovna_5edf9266621db.jpg',
          },
          additional: [
            {
              small: null,
              medium:
                'https://s.032.ua/section/newsInText/upload/images/news/intext/000/052/185/solomani_5edf8e4b209ed.jpg',
            },
            {
              small: null,
              medium:
                'https://s.032.ua/section/newsInText/upload/images/news/intext/000/052/185/11_5edf8f3209c11.jpg',
            },
            {
              small: null,
              medium:
                'https://s.032.ua/section/newsInText/upload/images/news/intext/000/052/185/cepki_5edf8fffc7403.jpg',
            },
            {
              small: null,
              medium:
                'https://s.032.ua/section/newsInText/upload/images/news/intext/000/052/185/ertfg4_5edf90563e5b1.jpg',
            },
            {
              small: null,
              medium:
                'https://s.032.ua/section/newsInText/upload/images/news/intext/000/052/185/9_5edf90b4381c8.jpg',
            },
            {
              small: null,
              medium:
                'https://s.032.ua/section/newsInText/upload/images/news/intext/000/052/185/11_5edf9163c6237.jpg',
            },
            {
              small: null,
              medium:
                'https://s.032.ua/section/newsInText/upload/images/news/intext/000/052/185/7_5edf942a343c8.jpg',
            },
          ],
        },
      },
      {
        _id: '5ef3970c0ab5dd42436dd5d1',
        images: {
          primary: {
            medium:
              'https://images.stylight.net/image/upload/t_web_post_500x667/q_auto,f_auto/post-c27c63a5b58deb0d4535ddd5993e68b2e4d0776d756fdc41c0f7c391.jpg',
          },
          additional: [
            {
              small: 'https://intersumka.ua/image/catalog/_all/banan2.jpg',
              medium: null,
            },
            {
              small: 'https://intersumka.ua/image/catalog/_all/banan3.jpg',
              medium: null,
            },
          ],
        },
      },
      {
        _id: '5effa0a2943a4d176cf90619',
        images: {
          primary: {
            medium: null,
          },
          additional: [
            {
              small: null,
              medium: null,
            },
          ],
        },
      },
    ]);
  });
});
