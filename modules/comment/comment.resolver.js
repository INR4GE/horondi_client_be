const commentsService = require('./comment.service');
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
    try {
      return await commentsService.getAllCommentsByProduct(args.id);
    } catch (error) {
      return [
        {
          statusCode: 404,
          message: error.message,
        },
      ];
    }
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
  addRate: (parent, args) => commentsService.addRate(args.product, args.rate),
  updateRate: (parent, args) => commentsService.updateRate(args.product, args.rate),
};

module.exports = { commentsQuery, commentsMutation };
