/* eslint-disable no-undef */
const { gql } = require('@apollo/client');
const client = require('../../utils/apollo-test-client');
const { newOrder } = require('./order.variables');

let orderId;

describe('Order queries', () => {
  beforeAll(async () => {
    const createOrder = await client.mutate({
      mutation: gql`
        mutation($order: OrderInput!) {
          addOrder(order: $order) {
            ... on Order {
              _id
            }
          }
        }
      `,
      variables: { order: newOrder },
    });
    orderId = createOrder.data.addOrder._id;
  });

  test('Should receive all orders', async () => {
    const res = await client.query({
      query: gql`
        query {
          getAllOrders {
            user {
              email
              lastName
              firstName
              phoneNumber
              patronymicName
            }
            delivery {
              sentOn
              sentBy
              byCourier
              invoiceNumber
              courierOffice
            }
            isPaid
            status
            address {
              appartment
              buildingNumber
              region
              street
              city
              country
              zipcode
            }
            completed
            userComment
            cancellationReason
            adminComment
            items {
              bottomColor {
                lang
                value
              }
              closure {
                lang
                value
              }
              model {
                lang
                value
              }
              closureColor
              size {
                widthInCm
                weightInKg
                heightInCm
                volumeInLiters
                depthInCm
              }
              additions {
                lang
                value
              }
              actualPrice {
                currency
                value
              }
              name {
                lang
                value
              }
              pattern {
                lang
                value
              }
              category {
                lang
                value
              }
              quantity
              colors {
                lang
                value
              }
              subcategory {
                lang
                value
              }
              bottomMaterial {
                lang
                value
              }
            }
            totalItemsPrice {
              currency
              value
            }
            totalPriceToPay {
              currency
              value
            }
            paymentMethod
          }
        }
      `,
    });

    const orders = res.data.getAllOrders;

    expect(orders).toBeDefined();
    expect(orders.length).toBeGreaterThan(0);
    expect(orders).toBeInstanceOf(Array);
    expect(orders).toContainEqual({
      user: {
        email: 'test@gmail.com',
        lastName: 'Test',
        firstName: 'Test',
        phoneNumber: '380953544271',
        patronymicName: 'Test',
        __typename: 'OrderUser',
      },
      delivery: {
        sentOn: null,
        sentBy: 'Nova Poshta',
        byCourier: true,
        invoiceNumber: '6280260',
        courierOffice: 10,
        __typename: 'Delivery',
      },
      isPaid: false,
      status: 'DELIVERED',
      address: {
        appartment: '97',
        buildingNumber: '25',
        region: 'Кіровоградська область',
        street: 'Бульвар Марії Приймаченко',
        city: 'Новомиргород',
        country: 'Україна',
        zipcode: 98908,
        __typename: 'Address',
      },
      completed: false,
      userComment: '',
      cancellationReason: '',
      adminComment: '',
      items: [
        {
          __typename: 'OrderItems',
          category: [
            {
              __typename: 'Language',
              lang: 'uk',
              value: 'Сумки',
            },
            {
              __typename: 'Language',
              lang: 'en',
              value: 'Bags',
            },
          ],
          subcategory: [
            {
              __typename: 'Language',
              lang: 'uk',
              value: 'Сумки',
            },
            {
              __typename: 'Language',
              lang: 'en',
              value: 'Bags',
            },
          ],
          model: [
            {
              __typename: 'Language',
              lang: 'uk',
              value: 'Сумка з гобеленом',
            },
            {
              __typename: 'Language',
              lang: 'en',
              value: 'Bag with a Pattern',
            },
          ],
          name: [
            {
              __typename: 'Language',
              lang: 'uk',
              value: 'Сумка з гобеленом синя',
            },
            {
              __typename: 'Language',
              lang: 'en',
              value: 'Bag with a Pattern Blue',
            },
          ],
          colors: [
            [
              {
                __typename: 'Language',
                lang: 'uk',
                value: 'Сталево-блакитний',
              },
              {
                __typename: 'Language',
                lang: 'en',
                value: 'Steel-blue',
              },
            ],
          ],
          pattern: [
            {
              __typename: 'Language',
              lang: 'uk',
              value: 'Олені',
            },
            {
              __typename: 'Language',
              lang: 'en',
              value: 'Deers',
            },
          ],
          closure: [],
          closureColor: '',
          size: {
            __typename: 'Size',
            heightInCm: 38,
            widthInCm: 36,
            depthInCm: 10,
            volumeInLiters: 0,
            weightInKg: 0,
          },
          bottomMaterial: [
            {
              __typename: 'Language',
              lang: 'uk',
              value: 'Тканина Кордура',
            },
            {
              __typename: 'Language',
              lang: 'en',
              value: 'Cordura fabric',
            },
          ],
          bottomColor: [
            {
              __typename: 'Language',
              lang: 'uk',
              value: 'чорний',
            },
            {
              __typename: 'Language',
              lang: 'en',
              value: 'black',
            },
          ],
          additions: [],
          actualPrice: [
            {
              __typename: 'CurrencySet',
              currency: 'UAH',
              value: 90000,
            },
            {
              __typename: 'CurrencySet',
              currency: 'USD',
              value: 3246,
            },
          ],
          quantity: 1,
        },
      ],
      totalItemsPrice: [
        { currency: 'UAH', value: 90000, __typename: 'CurrencySet' },
        { currency: 'USD', value: 3246, __typename: 'CurrencySet' },
      ],
      totalPriceToPay: [
        { currency: 'UAH', value: 97000, __typename: 'CurrencySet' },
        { currency: 'USD', value: 3486, __typename: 'CurrencySet' },
      ],
      paymentMethod: 'CARD',
      __typename: 'Order',
    });
  });

  test('should recive order by id', async () => {
    const res = await client.query({
      query: gql`
        query($id: ID!) {
          getOrderById(id: $id) {
            ... on Order {
              user {
                email
                lastName
                firstName
                phoneNumber
                patronymicName
              }
              dateOfCreation
              delivery {
                sentOn
                sentBy
                byCourier
                invoiceNumber
                courierOffice
              }
              isPaid
              status
              address {
                appartment
                buildingNumber
                region
                street
                city
                country
                zipcode
              }
              completed
              userComment
              lastUpdatedDate
              cancellationReason
              adminComment
              items {
                bottomColor {
                  lang
                  value
                }
                closure {
                  lang
                  value
                }
                model {
                  lang
                  value
                }
                closureColor
                size {
                  widthInCm
                  weightInKg
                  heightInCm
                  volumeInLiters
                  depthInCm
                }
                additions {
                  lang
                  value
                }
                actualPrice {
                  currency
                  value
                }
                name {
                  lang
                  value
                }
                pattern {
                  lang
                  value
                }
                category {
                  lang
                  value
                }
                quantity
                colors {
                  lang
                  value
                }
                subcategory {
                  lang
                  value
                }
                bottomMaterial {
                  lang
                  value
                }
              }
              totalItemsPrice {
                currency
                value
              }
              totalPriceToPay {
                currency
                value
              }
              paymentMethod
            }
            ... on Error {
              statusCode
              message
            }
          }
        }
      `,
      variables: {
        id: orderId,
      },
    });

    const order = res.data.getOrderById;

    expect(order).toBeDefined();
    expect(order).toHaveProperty('status', 'DELIVERED');
    expect(order).toHaveProperty('user', {
      __typename: 'OrderUser',
      firstName: 'Test',
      lastName: 'Test',
      patronymicName: 'Test',
      email: 'test@gmail.com',
      phoneNumber: '380953544271',
    });
    expect(order).toHaveProperty('address', {
      __typename: 'Address',
      country: 'Україна',
      region: 'Кіровоградська область',
      city: 'Новомиргород',
      zipcode: 98908,
      street: 'Бульвар Марії Приймаченко',
      buildingNumber: '25',
      appartment: '97',
    });
    expect(order).toHaveProperty('delivery', {
      __typename: 'Delivery',
      sentBy: 'Nova Poshta',
      byCourier: true,
      courierOffice: 10,
      invoiceNumber: '6280260',
      sentOn: null,
    });
    expect(order).toHaveProperty('items', [
      {
        __typename: 'OrderItems',
        category: [
          {
            __typename: 'Language',
            lang: 'uk',
            value: 'Сумки',
          },
          {
            __typename: 'Language',
            lang: 'en',
            value: 'Bags',
          },
        ],
        subcategory: [
          {
            __typename: 'Language',
            lang: 'uk',
            value: 'Сумки',
          },
          {
            __typename: 'Language',
            lang: 'en',
            value: 'Bags',
          },
        ],
        model: [
          {
            __typename: 'Language',
            lang: 'uk',
            value: 'Сумка з гобеленом',
          },
          {
            __typename: 'Language',
            lang: 'en',
            value: 'Bag with a Pattern',
          },
        ],
        name: [
          {
            __typename: 'Language',
            lang: 'uk',
            value: 'Сумка з гобеленом синя',
          },
          {
            __typename: 'Language',
            lang: 'en',
            value: 'Bag with a Pattern Blue',
          },
        ],
        colors: [
          [
            {
              __typename: 'Language',
              lang: 'uk',
              value: 'Сталево-блакитний',
            },
            {
              __typename: 'Language',
              lang: 'en',
              value: 'Steel-blue',
            },
          ],
        ],
        pattern: [
          {
            __typename: 'Language',
            lang: 'uk',
            value: 'Олені',
          },
          {
            __typename: 'Language',
            lang: 'en',
            value: 'Deers',
          },
        ],
        closure: [],
        closureColor: '',
        size: {
          __typename: 'Size',
          heightInCm: 38,
          widthInCm: 36,
          depthInCm: 10,
          volumeInLiters: 0,
          weightInKg: 0,
        },
        bottomMaterial: [
          {
            __typename: 'Language',
            lang: 'uk',
            value: 'Тканина Кордура',
          },
          {
            __typename: 'Language',
            lang: 'en',
            value: 'Cordura fabric',
          },
        ],
        bottomColor: [
          {
            __typename: 'Language',
            lang: 'uk',
            value: 'чорний',
          },
          {
            __typename: 'Language',
            lang: 'en',
            value: 'black',
          },
        ],
        additions: [],
        actualPrice: [
          {
            __typename: 'CurrencySet',
            currency: 'UAH',
            value: 90000,
          },
          {
            __typename: 'CurrencySet',
            currency: 'USD',
            value: 3246,
          },
        ],
        quantity: 1,
      },
    ]);
    expect(order).toHaveProperty('paymentMethod', 'CARD');
    expect(order).toHaveProperty('totalItemsPrice');
    expect(order).toHaveProperty('totalPriceToPay');
  });

  test('Should throw error ORDER_NOT_FOUND', async () => {
    const res = await client
      .query({
        query: gql`
          query($id: ID!) {
            getOrderById(id: $id) {
              ... on Order {
                _id
                user {
                  email
                  lastName
                  firstName
                  phoneNumber
                  patronymicName
                }
                dateOfCreation
                delivery {
                  sentOn
                  sentBy
                  byCourier
                  invoiceNumber
                  courierOffice
                }
                isPaid
                status
                address {
                  appartment
                  buildingNumber
                  region
                  street
                  city
                  country
                  zipcode
                }
                completed
                userComment
                lastUpdatedDate
                cancellationReason
                adminComment
                items {
                  bottomColor {
                    lang
                    value
                  }
                  closure {
                    lang
                    value
                  }
                  model {
                    lang
                    value
                  }
                  closureColor
                  size {
                    widthInCm
                    weightInKg
                    heightInCm
                    volumeInLiters
                    depthInCm
                  }
                  additions {
                    lang
                    value
                  }
                  actualPrice {
                    currency
                    value
                  }
                  name {
                    lang
                    value
                  }
                  pattern {
                    lang
                    value
                  }
                  category {
                    lang
                    value
                  }
                  quantity
                  colors {
                    lang
                    value
                  }
                  subcategory {
                    lang
                    value
                  }
                  bottomMaterial {
                    lang
                    value
                  }
                }
                totalItemsPrice {
                  currency
                  value
                }
                totalPriceToPay {
                  currency
                  value
                }
                paymentMethod
              }
              ... on Error {
                statusCode
                message
              }
            }
          }
        `,
        variables: {
          id: '5f46a8ac90e86913ed0a95d8',
        },
      })
      .catch(err => err);

    const error = res;

    expect(error.graphQLErrors[0].message).toBe('ORDER_NOT_FOUND');
  });

  afterAll(async () => {
    await client.mutate({
      mutation: gql`
        mutation($id: ID!) {
          deleteOrder(id: $id) {
            ... on Order {
              _id
            }
            ... on Error {
              statusCode
              message
            }
          }
        }
      `,
      variables: { id: orderId },
    });
  });
});
