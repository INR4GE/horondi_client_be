const validEmail = 'test@mail.com';
const invalidEmail = 'resttestqwerty123@gmail.com';
const productId = 'be89b5471126f0fdef739755';
const productWrongId = '111111111111111111111111';
const commentWrongId = '111111171126f0fdef739755';
const wrongData = '123siSTm#';
const rate = 4;
const updatedRate = 1;
const newComment = {
  text: 'Test text',
  user: { email: 'test@mail.com' },
  product: 'be89b5471126f0fdef739755',
  show: false,
};
const updatedComment = {
  text: 'updated text',
  user: { email: 'ermn7dyptp@yahoo.com' },
  product: 'be89b5471126f0fdef739755',
  show: true,
};

module.exports = {
  validEmail,
  invalidEmail,
  productId,
  newComment,
  wrongData,
  updatedComment,
  commentWrongId,
  productWrongId,
  rate,
  updatedRate,
};
