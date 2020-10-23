/* eslint-disable no-undef */
const { gql } = require('@apollo/client');
const client = require('../../utils/apollo-test-client');
require('dotenv').config();
const { CONTACT_NOT_FOUND } = require('../../error-messages/contact.messages');
const { newContact } = require('./contact.variables');

const notExistContactId = '5f311ec5f2983e390432a8c3';

let contactsId = '';

describe('Contacts queries', () => {
  beforeAll(async () => {
    const res = await client
      .mutate({
        mutation: gql`
          mutation($contact: contactInput!) {
            addContact(contact: $contact) {
              ... on Contact {
                _id
              }
              ... on Error {
                message
                statusCode
              }
            }
          }
        `,
        variables: { contact: newContact },
      })
      .catch(e => e);
    contactsId = res.data.addContact._id;
  });

  afterAll(async () => {
    await client
      .mutate({
        mutation: gql`
          mutation($id: ID!) {
            deleteContact(id: $id) {
              ... on Contact {
                _id
              }
              ... on Error {
                statusCode
                message
              }
            }
          }
        `,
        variables: { id: contactsId },
      })
      .catch(e => e);
  });

  test('#1 Should receive all contacts', async () => {
    const res = await client
      .query({
        query: gql`
          query($skip: Int, $limit: Int) {
            getContacts(skip: $skip, limit: $limit) {
              items {
                phoneNumber
                openHours {
                  lang
                  value
                }
                address {
                  lang
                  value
                }
                email
                images {
                  value {
                    medium
                  }
                }
                link
              }
              count
            }
          }
        `,
        variables: {
          skip: 1,
          limit: 1,
        },
      })
      .catch(e => e);

    expect(res.data.getContacts).toBeDefined();
    expect(res.data.getContacts.items).toContainEqual({
      __typename: 'Contact',
      address: [
        { __typename: 'Language', lang: 'uk', value: 'Вулиця 4' },
        { __typename: 'Language', lang: 'en', value: 'Street 4' },
      ],
      email: 'test@test.com',
      images: [
        {
          __typename: 'LanguageImageSet',
          value: { __typename: 'ImageSet', medium: 'medium.jpg' },
        },
        {
          __typename: 'LanguageImageSet',
          value: { __typename: 'ImageSet', medium: 'medium.jpg' },
        },
      ],
      link: 'https://testURL.com',
      openHours: [
        { __typename: 'Language', lang: 'uk', value: 'ПН ...' },
        { __typename: 'Language', lang: 'en', value: 'FR ...' },
      ],
      phoneNumber: '1241241242144',
    });
  });

  test('#2 Should receive selected contact', async () => {
    try {
      const res = await client
        .query({
          query: gql`
            query($id: ID!) {
              getContactById(id: $id) {
                ... on Contact {
                  phoneNumber
                  openHours {
                    lang
                    value
                  }
                  address {
                    lang
                    value
                  }
                  email
                  images {
                    value {
                      medium
                    }
                  }
                  link
                }
                ... on Error {
                  statusCode
                  message
                }
              }
            }
          `,
          variables: { id: contactsId },
        })
        .catch(e => e);

      expect(res.data.getContactById).toMatchSnapshot();
      expect(res.data.getContactById).toBeDefined();
      expect(res.data.getContactById).toHaveProperty(
        'phoneNumber',
        '1241241242144'
      );
      expect(res.data.getContactById).toHaveProperty('openHours', [
        {
          __typename: 'Language',
          lang: 'uk',
          value: 'ПН ...',
        },
        {
          __typename: 'Language',
          lang: 'en',
          value: 'FR ...',
        },
      ]);
      expect(res.data.getContactById.openHours).toBeInstanceOf(Array);
      expect(res.data.getContactById).toHaveProperty('address', [
        {
          __typename: 'Language',
          lang: 'uk',
          value: 'Вулиця 4',
        },
        {
          __typename: 'Language',
          lang: 'en',
          value: 'Street 4',
        },
      ]);
      expect(res.data.getContactById.address).toBeInstanceOf(Object);
      expect(res.data.getContactById).toHaveProperty('email', 'test@test.com');
      expect(res.data.getContactById).toHaveProperty('images', [
        {
          __typename: 'LanguageImageSet',
          value: { __typename: 'ImageSet', medium: 'medium.jpg' },
        },
        {
          __typename: 'LanguageImageSet',
          value: { __typename: 'ImageSet', medium: 'medium.jpg' },
        },
      ]);
      expect(res.data.getContactById.images).toBeInstanceOf(Array);
      expect(res.data.getContactById).toHaveProperty(
        'link',
        'https://testURL.com'
      );
    } catch (e) {
      console.error(e);
    }
  });

  test('#3 Returning not existing contact should return error message', async () => {
    const res = await client
      .query({
        query: gql`
          query($id: ID!) {
            getContactById(id: $id) {
              ... on Contact {
                phoneNumber
                openHours {
                  lang
                  value
                }
                address {
                  lang
                  value
                }
                email
                images {
                  value {
                    medium
                  }
                }
                link
              }
              ... on Error {
                statusCode
                message
              }
            }
          }
        `,
        variables: { id: notExistContactId },
      })
      .catch(e => e);
    expect(res.data.getContactById).toBeDefined();
    expect(res.data.getContactById).toHaveProperty('statusCode', 404);
    expect(res.data.getContactById).toHaveProperty(
      'message',
      CONTACT_NOT_FOUND
    );
  });
});
