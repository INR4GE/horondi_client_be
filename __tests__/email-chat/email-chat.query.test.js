/* eslint-disable no-undef */
const { gql } = require('apollo-boost');
const client = require('../../utils/apollo-test-client');
const { newQuestion, badQuestionId } = require('./email-chat.variables');

let questionId;

describe('Questions queries', () => {
  beforeAll(async () => {
    const createQuestion = await client.mutate({
      mutation: gql`
        mutation($question: EmailQuestionInput!) {
          addEmailQuestion(question: $question) {
            _id
          }
        }
      `,
      variables: {
        question: newQuestion,
      },
    });
    questionId = createQuestion.data.addEmailQuestion._id;
  });
  test('#1 Should receive all questions', async () => {
    const questions = await client.query({
      query: gql`
        query {
          getAllEmailQuestions {
            _id
            senderName
            text
            date
            email
            status
          }
        }
      `,
    });
    const allquestions = questions.data.getAllEmailQuestions;
    expect(allquestions).toBeDefined();
    expect(allquestions.length).toBeGreaterThan(0);
    expect(allquestions).toMatchSnapshot();
  });
  test('#2 Should receive question by ID', async () => {
    const createdQuestion = await client.query({
      query: gql`
        query($id: ID!) {
          getEmailQuestionById(id: $id) {
            ... on EmailQuestion {
              _id
              senderName
              text
              date
              email
              status
              answer {
                text
                date
              }
            }
            ... on Error {
              statusCode
              message
            }
          }
        }
      `,
      variables: { id: questionId },
    });
    const resultQuestion = createdQuestion.data.getEmailQuestionById;
    expect(resultQuestion).toBeDefined();
    expect(resultQuestion).toHaveProperty('senderName', 'Peter the Rabbit');
    expect(resultQuestion).toHaveProperty('text', 'I like your aplication!!!');
    expect(resultQuestion.date).toBeDefined();
    expect(resultQuestion).toHaveProperty('email', 'vovasays@goodbye.com');
    expect(resultQuestion).toHaveProperty('status', 'PENDING');
    expect(resultQuestion.answer).toBeNull();
  });
  test('#3 Should receive error if product ID is wrong', async () => {
    const badQuestion = await client.query({
      query: gql`
        query($id: ID!) {
          getEmailQuestionById(id: $id) {
            ... on EmailQuestion {
              _id
              senderName
              text
              date
              email
              status
              answer {
                text
                date
              }
            }
            ... on Error {
              statusCode
              message
            }
          }
        }
      `,
      variables: { id: badQuestionId },
    });
    const receivedError = badQuestion.data.getEmailQuestionById;
    expect(receivedError).toBeDefined();
    expect(receivedError).toHaveProperty('statusCode', 404);
    expect(receivedError).toHaveProperty('message', 'QUESTION_NOT_FOUND');
  });
  afterAll(async () => {
    await client.mutate({
      mutation: gql`
        mutation($id: ID!) {
          deleteEmailQuestion(id: $id) {
            ... on EmailQuestion {
              _id
            }
            ... on Error {
              statusCode
              message
            }
          }
        }
      `,
      variables: { id: questionId },
    });
  });
});
