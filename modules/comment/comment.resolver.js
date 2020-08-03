const commentsService = require('./comment.service');
const productsService = require('../product/product.service');
const { COMMENT_NOT_FOUND } = require('../../error-messages/comment.messages');

const commentsQuery = {
  getCommentById: async (parent, args) => {
    const comment = await commentsService.getCommentById(args.id);
    if (comment) {
      return comment;
    }
    return {
      statusCode: 404,
      message: COMMENT_NOT_FOUND,
    };
  },

  getAllCommentsByProduct: async (parent, args) => {
    const product = await productsService.getProductById(args.id);
    const comment = await commentsService.getAllCommentsByProduct(args.id);
    if (product) {
      return comment;
    }
    return [
      {
        statusCode: 404,
        message: COMMENT_NOT_FOUND,
      },
    ];
  },
};

const commentsMutation = {
  addComment: (parent, args) => commentsService.addComment(args.comment),
  deleteComment: async (parent, args) => {
    const deletedComment = await commentsService.deleteComment(args.id);
    if (deletedComment) {
      return deletedComment;
    }
    return {
      statusCode: 404,
      message: COMMENT_NOT_FOUND,
    };
  },
  updateComment: (parent, args) => commentsService.updateComment(args.id, args.comment),
};

module.exports = { commentsQuery, commentsMutation };
